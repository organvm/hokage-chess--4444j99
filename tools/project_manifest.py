#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import html
import json
import mimetypes
import os
import re
import subprocess
import sys
import zipfile
from dataclasses import dataclass, asdict, field
from pathlib import Path
from xml.etree import ElementTree as ET

try:
    import yaml  # type: ignore[import-untyped]
except ImportError:  # pragma: no cover - PyYAML required for frontmatter parsing
    yaml = None  # type: ignore[assignment]


EXCLUDED_DIRS = {
    ".git", "node_modules", ".next", "__pycache__",
    ".history", ".lh", ".gemini",
}
SELF_MANIFEST_RE = re.compile(r"^\d{4}-\d{2}-\d{2}-project-manifest-annotated-bibliography\.(jsonl|md)$")
TEXT_SUFFIXES = {
    ".css", ".csv", ".html", ".ini", ".js", ".json", ".jsonl", ".jsx", ".lock",
    ".md", ".mjs", ".svg", ".toml", ".ts", ".tsx", ".txt", ".yaml", ".yml",
}
CODE_SUFFIXES = {".css", ".js", ".jsx", ".mjs", ".ts", ".tsx"}
DOC_SUFFIXES = {".md", ".pdf", ".docx", ".xlsx", ".html", ".txt"}


@dataclass
class ManifestEntry:
    id: str
    path: str
    title: str
    tags: list[str]
    kind: str
    mime: str
    bytes: int
    sha256: str
    modified: str
    extract_status: str
    annotation: str
    thread_id: str
    references: list[str] = field(default_factory=list)


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def normalize_space(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def title_from_path(path: Path, text: str) -> str:
    if path.suffix.lower() in {".md", ".txt"}:
        for line in text.splitlines()[:80]:
            stripped = line.strip()
            if stripped.startswith("#"):
                return stripped.lstrip("#").strip()[:140] or path.stem
    if path.suffix.lower() == ".html":
        match = re.search(r"<title[^>]*>(.*?)</title>", text, re.I | re.S)
        if match:
            return normalize_space(html.unescape(match.group(1)))[:140]
    return path.stem.replace("-", " ").replace("_", " ").strip()[:140] or path.name


def read_text_file(path: Path) -> tuple[str, str]:
    data = path.read_bytes()
    for enc in ("utf-8", "utf-16", "latin-1"):
        try:
            return data.decode(enc), "ok"
        except UnicodeDecodeError:
            continue
    return "", "binary-unreadable"


def extract_pdf(path: Path) -> tuple[str, str]:
    try:
        result = subprocess.run(
            ["pdftotext", "-layout", str(path), "-"],
            check=False,
            capture_output=True,
            text=True,
            timeout=30,
        )
    except Exception as exc:
        return "", f"pdf-extract-error:{exc.__class__.__name__}"
    if result.returncode != 0:
        return "", "pdf-extract-failed"
    return result.stdout, "ok"


def extract_docx(path: Path) -> tuple[str, str]:
    try:
        with zipfile.ZipFile(path) as zf:
            xml = zf.read("word/document.xml")
    except Exception as exc:
        return "", f"docx-extract-error:{exc.__class__.__name__}"
    root = ET.fromstring(xml)
    texts = [node.text or "" for node in root.iter() if node.tag.endswith("}t")]
    return "\n".join(texts), "ok"


def extract_xlsx(path: Path) -> tuple[str, str]:
    try:
        with zipfile.ZipFile(path) as zf:
            shared = []
            if "xl/sharedStrings.xml" in zf.namelist():
                sroot = ET.fromstring(zf.read("xl/sharedStrings.xml"))
                for si in sroot:
                    shared.append("".join(t.text or "" for t in si.iter() if t.tag.endswith("}t")))
            sheet_names = [n for n in zf.namelist() if re.match(r"xl/worksheets/sheet\d+\.xml", n)]
            cells = []
            for name in sheet_names[:20]:
                root = ET.fromstring(zf.read(name))
                for cell in root.iter():
                    if not cell.tag.endswith("}c"):
                        continue
                    value = next((child.text for child in cell if child.tag.endswith("}v")), None)
                    if value is None:
                        continue
                    if cell.attrib.get("t") == "s" and value.isdigit() and int(value) < len(shared):
                        cells.append(shared[int(value)])
                    else:
                        cells.append(value)
            return "\n".join(cells), "ok"
    except Exception as exc:
        return "", f"xlsx-extract-error:{exc.__class__.__name__}"


def extract_text(path: Path) -> tuple[str, str]:
    suffix = path.suffix.lower()
    if suffix in TEXT_SUFFIXES or path.name in {"AGENTS.md", "CLAUDE.md", "GEMINI.md", "HANDOFF.md", "README.md"}:
        return read_text_file(path)
    if suffix == ".pdf":
        return extract_pdf(path)
    if suffix == ".docx":
        return extract_docx(path)
    if suffix == ".xlsx":
        return extract_xlsx(path)
    return "", "metadata-only"


def classify_kind(path: Path) -> str:
    suffix = path.suffix.lower()
    parts = set(path.parts)
    if suffix in CODE_SUFFIXES or "src" in parts or "tests" in parts or "scripts" in parts:
        return "source"
    if suffix in {".png", ".ico", ".svg"} or "public" in parts:
        return "asset"
    if "plans" in parts:
        return "plan"
    if ".history" in parts or ".lh" in parts or path.name.startswith("export-"):
        return "thread-record"
    if suffix in DOC_SUFFIXES:
        return "document"
    if suffix in {".json", ".yaml", ".yml", ".toml", ".mjs", ".config", ".lock"}:
        return "configuration"
    return "file"


FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*(?:\n|$)", re.DOTALL)


def parse_frontmatter_tags(text: str) -> list[str]:
    """Parse YAML frontmatter tags from a text head.

    Returns a list of stringified tag values, deduplicated. Silently skips when
    PyYAML is unavailable, when no frontmatter is present, when the YAML is
    malformed, or when ``tags`` is missing/empty/non-iterable.
    """
    if yaml is None or not text:
        return []
    match = FRONTMATTER_RE.match(text)
    if not match:
        return []
    try:
        data = yaml.safe_load(match.group(1))
    except yaml.YAMLError:
        return []
    if not isinstance(data, dict):
        return []
    raw = data.get("tags")
    if not raw:
        return []
    if isinstance(raw, str):
        raw = [raw]
    elif not isinstance(raw, (list, tuple, set)):
        return []
    out: list[str] = []
    seen: set[str] = set()
    for item in raw:
        if item is None:
            continue
        s = str(item).strip()
        if s and s not in seen:
            seen.add(s)
            out.append(s)
    return out


def tags_for(path: Path, kind: str, text: str) -> list[str]:
    tags = {kind, path.suffix.lower().lstrip(".") or "no-extension"}
    for part in path.parts[:-1]:
        if part not in {".", ""}:
            tags.add(part)
    for fm_tag in parse_frontmatter_tags(text):
        tags.add(fm_tag)
    lower = text.lower()
    keywords = {
        "rob": "rob",
        "bodi": "bodi",
        "chess": "chess",
        "fitness": "fitness",
        "funnel": "funnel",
        "strategy": "strategy",
        "growth": "growth",
        "analytics": "analytics",
        "gemini": "gemini",
        "claude": "claude",
        "codex": "codex",
        "thread": "thread",
        "handoff": "handoff",
    }
    for needle, tag in keywords.items():
        if needle in lower or needle in path.as_posix().lower():
            tags.add(tag)
    return sorted(tags)


def thread_group(path: Path, kind: str) -> str:
    p = path.as_posix()
    if kind == "thread-record":
        if p.startswith(".history/") or p.startswith(".lh/"):
            return "local-history-audit-2026-04-28"
        if path.name.startswith("export-"):
            return "codex-export-thread"
    if "plans" in path.parts:
        if p.startswith(".codex/"):
            return "codex-plan-thread"
        if p.startswith(".claude/"):
            return "claude-plan-thread"
        if p.startswith(".gemini/"):
            return "gemini-plan-thread"
    if p.startswith("docs/business/"):
        return "business-documentation-thread"
    if p.startswith("docs/content/"):
        return "content-documentation-thread"
    if p.startswith("docs/rob/"):
        return "rob-documentation-thread"
    if p.startswith("research/apex-predator-parent-architecture/"):
        return "apex-predator-research-thread"
    if p.startswith("research/"):
        return "research-thread"
    if p.startswith("reference/"):
        return "reference-thread"
    if p.startswith("src/") or p.startswith("tests/") or p.startswith("scripts/"):
        return "implementation-thread"
    if p.startswith("public/"):
        return "public-assets-thread"
    return "project-root-thread"


_REF_IRF_RE = re.compile(r"\bIRF-PRT-\d{3,}\b")
_REF_PRT_RE = re.compile(r"\bPRT-\d{3,}\b")
_REF_SHA_RE = re.compile(r"\b[a-f0-9]{7,40}\b")
_REF_PATH_RE = re.compile(r"[a-z][a-z0-9/_\-.]*\.(?:md|tsx|ts|yaml|json|py)\b", re.IGNORECASE)
_REF_ISSUE_BRACKET_RE = re.compile(r"\[#(\d+)\]")
_REF_ISSUE_CONTEXT_RE = re.compile(
    r"\b(?:issue|issues|pr|prs|pull|pull-request|gh|fixes|closes|resolves)[\s:#-]*#(\d+)\b",
    re.IGNORECASE,
)
_SHA_FALSE_POSITIVE_PREFIX_RE = re.compile(r"(?:0x|#)$", re.IGNORECASE)


def _filter_sha_false_positives(content: str, sha: str, start: int) -> bool:
    """Heuristic: drop tokens that look like commits but are pure-digit IDs or hex literals."""
    if not re.search(r"[a-f]", sha):
        return False
    prefix = content[max(0, start - 2):start]
    if _SHA_FALSE_POSITIVE_PREFIX_RE.search(prefix):
        return False
    return True


def extract_references(content: str) -> list[str]:
    """Extract cross-document references for edge-list construction.

    Patterns:
    - IRF row IDs: ``IRF-PRT-NNN``
    - PRT short IDs: ``PRT-NNN``
    - Git commit SHAs (7+ hex), filtered for obvious false positives
    - File paths with ``.md/.ts/.tsx/.yaml/.json/.py`` suffixes
    - GH issue refs: ``[#NNN]`` or in PR/issue context (``fixes #NNN`` etc.)

    Returns deduplicated, sorted list.
    """
    if not content:
        return []
    refs: set[str] = set()
    irf_refs = _REF_IRF_RE.findall(content)
    refs.update(irf_refs)
    # Skip bare PRT-NNN matches that are subsumed by an IRF-PRT-NNN ID.
    irf_suffixes = {ref.split("IRF-", 1)[1] for ref in irf_refs}
    for prt in _REF_PRT_RE.findall(content):
        if prt not in irf_suffixes:
            refs.add(prt)
    for m in _REF_SHA_RE.finditer(content):
        sha = m.group(0)
        if _filter_sha_false_positives(content, sha, m.start()):
            refs.add(sha)
    refs.update(_REF_PATH_RE.findall(content))
    refs.update(f"#{n}" for n in _REF_ISSUE_BRACKET_RE.findall(content))
    refs.update(f"#{n}" for n in _REF_ISSUE_CONTEXT_RE.findall(content))
    return sorted(refs)


def annotation_for(path: Path, kind: str, text: str, status: str) -> str:
    if text:
        excerpt = normalize_space(re.sub(r"<[^>]+>", " ", text))[:280]
        if excerpt:
            return f"{kind.capitalize()} file. Extracted text begins: {excerpt}"
    if status == "metadata-only":
        return f"{kind.capitalize()} file tracked by metadata only; no safe text extractor was applied for this binary or opaque format."
    return f"{kind.capitalize()} file. Text extraction status: {status}."


def excluded_counts(root: Path) -> dict[str, int]:
    counts = {name: 0 for name in sorted(EXCLUDED_DIRS)}
    for name in counts:
        for base in root.rglob(name):
            if base.is_dir():
                counts[name] += sum(1 for p in base.rglob("*") if p.is_file())
    return counts


def iter_files(root: Path) -> list[Path]:
    files = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = sorted(d for d in dirnames if d not in EXCLUDED_DIRS)
        for name in sorted(filenames):
            p = Path(dirpath) / name
            rel = p.relative_to(root)
            if any(part in EXCLUDED_DIRS for part in rel.parts):
                continue
            if rel.parent.as_posix() == "docs/manifests" and SELF_MANIFEST_RE.match(rel.name):
                continue
            files.append(p)
    return sorted(files, key=lambda p: p.relative_to(root).as_posix())


def build_entries(root: Path) -> tuple[list[ManifestEntry], dict[str, str]]:
    files = iter_files(root)
    thread_keys = sorted({thread_group(p.relative_to(root), classify_kind(p.relative_to(root))) for p in files})
    thread_ids = {key: f"HOK-THREAD-{i:04d}" for i, key in enumerate(thread_keys, 1)}
    entries = []
    for i, path in enumerate(files, 1):
        rel = path.relative_to(root)
        text, status = extract_text(path)
        kind = classify_kind(rel)
        thread_key = thread_group(rel, kind)
        stat = path.stat()
        mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        entries.append(
            ManifestEntry(
                id=f"HOK-FILE-{i:04d}",
                path=rel.as_posix(),
                title=title_from_path(rel, text),
                tags=tags_for(rel, kind, text),
                kind=kind,
                mime=mime,
                bytes=stat.st_size,
                sha256=sha256_file(path),
                modified=dt.datetime.fromtimestamp(stat.st_mtime, dt.timezone.utc).isoformat(),
                extract_status=status,
                annotation=annotation_for(rel, kind, text, status),
                thread_id=thread_ids[thread_key],
                references=extract_references(text),
            )
        )
    return entries, thread_ids


def write_outputs(root: Path, entries: list[ManifestEntry], thread_ids: dict[str, str], out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    today = dt.date.today().isoformat()
    md_path = out_dir / f"{today}-project-manifest-annotated-bibliography.md"
    jsonl_path = out_dir / f"{today}-project-manifest-annotated-bibliography.jsonl"
    existing = {e.path for e in entries}
    entries = [
        e for e in entries
        if e.path not in {
            md_path.relative_to(root).as_posix(),
            jsonl_path.relative_to(root).as_posix(),
        }
    ]
    with jsonl_path.open("w", encoding="utf-8") as f:
        for entry in entries:
            f.write(json.dumps(asdict(entry), ensure_ascii=False, sort_keys=True) + "\n")

    by_thread: dict[str, list[ManifestEntry]] = {}
    labels = {v: k for k, v in thread_ids.items()}
    for entry in entries:
        by_thread.setdefault(entry.thread_id, []).append(entry)
    by_kind: dict[str, int] = {}
    by_suffix: dict[str, int] = {}
    for entry in entries:
        by_kind[entry.kind] = by_kind.get(entry.kind, 0) + 1
        suffix = Path(entry.path).suffix.lower() or "[no extension]"
        by_suffix[suffix] = by_suffix.get(suffix, 0) + 1
    excluded = excluded_counts(root)

    lines = [
        "# Hokage Chess Project Manifest: Annotated Bibliography",
        "",
        f"- Generated: {dt.datetime.now(dt.timezone.utc).isoformat()}",
        f"- Project root: `{root}`",
        f"- Included files: {len(entries)}",
        f"- Excluded from bibliographic entries: {', '.join(f'`{name}/`' for name in sorted(EXCLUDED_DIRS))}.",
        "- ID policy: `HOK-FILE-####` and `HOK-THREAD-####` assigned deterministically by sorted path/group.",
        "- Extraction policy: text/code/Markdown/HTML/JSON/YAML/SVG read directly; PDF via `pdftotext`; DOCX/XLSX via OOXML extraction; opaque binaries get metadata-only entries.",
        "",
        "## Completeness Audit",
        "",
        "### Included by Kind",
        "",
    ]
    for kind, count in sorted(by_kind.items()):
        lines.append(f"- `{kind}`: {count}")
    lines.extend(["", "### Included by File Type", ""])
    for suffix, count in sorted(by_suffix.items()):
        lines.append(f"- `{suffix}`: {count}")
    lines.extend(["", "### Excluded Repository Mechanics", ""])
    for name, count in sorted(excluded.items()):
        lines.append(f"- `{name}/`: {count} files")
    lines.extend(
        [
            "",
            "### Manifest Generation Outputs",
            "",
            f"- Markdown output: `{md_path.relative_to(root).as_posix()}`",
            f"- JSONL output: `{jsonl_path.relative_to(root).as_posix()}`",
            "- These two files are named here rather than self-hashed inside the bibliography to avoid recursive checksum churn.",
            "",
        "## Thread Index",
        "",
        ]
    )
    for thread_id in sorted(by_thread):
        label = labels.get(thread_id, "unknown-thread")
        ref_total = sum(len(e.references) for e in by_thread[thread_id])
        lines.append(
            f"- **{thread_id}** `{label}`: {len(by_thread[thread_id])} files, {ref_total} references"
        )
    lines.extend(["", "## Annotated Bibliography", ""])
    for thread_id in sorted(by_thread):
        label = labels.get(thread_id, "unknown-thread")
        lines.extend([f"### {thread_id} `{label}`", ""])
        for entry in sorted(by_thread[thread_id], key=lambda e: e.path):
            tag_text = ", ".join(f"`{tag}`" for tag in entry.tags)
            ref_count = len(entry.references)
            lines.extend(
                [
                    f"#### {entry.id}: {entry.title}",
                    "",
                    f"- Path: `{entry.path}`",
                    f"- Kind: `{entry.kind}`; MIME: `{entry.mime}`; Bytes: `{entry.bytes}`",
                    f"- SHA-256: `{entry.sha256}`",
                    f"- Modified UTC: `{entry.modified}`",
                    f"- Tags: {tag_text}",
                    f"- Extraction: `{entry.extract_status}`",
                    f"- References: {ref_count}",
                    f"- Annotation: {entry.annotation}",
                    "",
                ]
            )
    md_path.write_text("\n".join(lines), encoding="utf-8")
    missing = existing - {e.path for e in entries}
    if missing:
        print(f"Skipped generated output paths already present: {sorted(missing)}")
    print(json.dumps({"markdown": str(md_path), "jsonl": str(jsonl_path), "entries": len(entries)}, indent=2))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=".")
    parser.add_argument("--out-dir", default="docs/manifests")
    args = parser.parse_args()
    root = Path(args.root).resolve()
    entries, thread_ids = build_entries(root)
    write_outputs(root, entries, thread_ids, root / args.out_dir)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
