#!/usr/bin/env python3
"""Per-thread JSONL diff CLI for project-manifest annotated-bibliography files.

Codifies the jq/comm workflow used in `docs/reviews/2026-04-30-eval-to-growth-master.md`
ANNEX A drift report. Read-only; emits text or JSON to stdout.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path


MANIFEST_GLOB = "*-project-manifest-annotated-bibliography.jsonl"
DEFAULT_MANIFEST_DIR = Path("docs/manifests")


@dataclass
class ManifestRecord:
    path: str
    sha256: str
    thread_id: str


@dataclass
class DriftReport:
    baseline_path: Path
    current_path: Path
    baseline_count: int
    current_count: int
    added: list[ManifestRecord] = field(default_factory=list)
    removed: list[ManifestRecord] = field(default_factory=list)
    hash_changed: list[ManifestRecord] = field(default_factory=list)

    @property
    def net_delta(self) -> int:
        return self.current_count - self.baseline_count


def load_manifest(path: Path) -> dict[str, ManifestRecord]:
    """Parse JSONL manifest into dict keyed by path."""
    records: dict[str, ManifestRecord] = {}
    with path.open("r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            entry = json.loads(line)
            records[entry["path"]] = ManifestRecord(
                path=entry["path"],
                sha256=entry["sha256"],
                thread_id=entry.get("thread_id", ""),
            )
    return records


def discover_manifests(manifest_dir: Path) -> list[Path]:
    """Return manifest JSONL files sorted by mtime (newest first)."""
    candidates = list(manifest_dir.glob(MANIFEST_GLOB))
    candidates.sort(key=lambda p: p.stat().st_mtime, reverse=True)
    return candidates


def resolve_defaults(
    baseline: Path | None,
    current: Path | None,
    manifest_dir: Path,
) -> tuple[Path, Path]:
    """Auto-derive baseline/current from newest two manifests if not provided."""
    if baseline is not None and current is not None:
        return baseline, current
    discovered = discover_manifests(manifest_dir)
    if current is None:
        if not discovered:
            raise FileNotFoundError(
                f"No manifest files matching {MANIFEST_GLOB} in {manifest_dir}"
            )
        current = discovered[0]
    if baseline is None:
        prior = [p for p in discovered if p != current]
        if not prior:
            raise FileNotFoundError(
                f"Cannot auto-derive baseline; only one manifest present in {manifest_dir}"
            )
        baseline = prior[0]
    return baseline, current


def compute_drift(
    baseline_records: dict[str, ManifestRecord],
    current_records: dict[str, ManifestRecord],
) -> tuple[list[ManifestRecord], list[ManifestRecord], list[ManifestRecord]]:
    """Return (added, removed, hash_changed) record lists."""
    baseline_keys = set(baseline_records)
    current_keys = set(current_records)
    added = sorted(
        (current_records[k] for k in current_keys - baseline_keys),
        key=lambda r: r.path,
    )
    removed = sorted(
        (baseline_records[k] for k in baseline_keys - current_keys),
        key=lambda r: r.path,
    )
    hash_changed = sorted(
        (
            current_records[k]
            for k in current_keys & baseline_keys
            if current_records[k].sha256 != baseline_records[k].sha256
        ),
        key=lambda r: r.path,
    )
    return added, removed, hash_changed


def filter_by_thread(records: list[ManifestRecord], thread_id: str) -> list[ManifestRecord]:
    return [r for r in records if r.thread_id == thread_id]


_THREAD_LABEL_RE = re.compile(r"^-\s+\*\*(HOK-THREAD-\d+)\*\*\s+`([^`]+)`")


def load_thread_labels(jsonl_path: Path) -> dict[str, str]:
    r"""Read thread_id → label mapping from sibling markdown manifest if present.

    The markdown file is named identically to the JSONL but with `.md` extension.
    Looks for lines like: `- **HOK-THREAD-NNNN** \`label\`: N files`
    """
    md_path = jsonl_path.with_suffix(".md")
    labels: dict[str, str] = {}
    if not md_path.exists():
        return labels
    for line in md_path.read_text(encoding="utf-8").splitlines():
        match = _THREAD_LABEL_RE.match(line.strip())
        if match:
            labels[match.group(1)] = match.group(2)
    return labels


def group_by_thread(records: list[ManifestRecord]) -> dict[str, list[ManifestRecord]]:
    grouped: dict[str, list[ManifestRecord]] = {}
    for r in records:
        grouped.setdefault(r.thread_id, []).append(r)
    return grouped


def render_text(report: DriftReport, labels: dict[str, str]) -> str:
    lines: list[str] = []
    lines.append("Manifest drift report")
    lines.append("=====================")
    lines.append(
        f"Baseline: {report.baseline_path} ({report.baseline_count} entries)"
    )
    lines.append(
        f"Current:  {report.current_path} ({report.current_count} entries)"
    )
    lines.append("")
    sign = "+" if report.net_delta >= 0 else ""
    lines.append(f"Net delta: {sign}{report.net_delta} files")
    lines.append("")

    by_thread_added = group_by_thread(report.added)
    by_thread_removed = group_by_thread(report.removed)
    by_thread_changed = group_by_thread(report.hash_changed)
    all_threads = sorted(
        set(by_thread_added) | set(by_thread_removed) | set(by_thread_changed)
    )
    if all_threads:
        lines.append("By thread:")
        rows: list[tuple[str, str]] = []
        for tid in all_threads:
            label = labels.get(tid, "")
            label_part = f" {label}" if label else ""
            head = f"  {tid}{label_part}:"
            parts: list[str] = []
            if tid in by_thread_added:
                parts.append(f"+{len(by_thread_added[tid])} ADDED")
            if tid in by_thread_removed:
                parts.append(f"-{len(by_thread_removed[tid])} REMOVED")
            if tid in by_thread_changed:
                parts.append(f"~{len(by_thread_changed[tid])} HASH-CHANGED")
            rows.append((head, ", ".join(parts)))
        head_width = max(len(h) for h, _ in rows) + 1
        for head, body in rows:
            lines.append(f"{head:<{head_width}}{body}")
        lines.append("")

    lines.append("Detail:")
    lines.append(f"  ADDED ({len(report.added)}):")
    for r in report.added:
        lines.append(f"    {r.path} ({r.thread_id})")
    lines.append(f"  REMOVED ({len(report.removed)}):")
    for r in report.removed:
        lines.append(f"    {r.path} ({r.thread_id})")
    lines.append(f"  HASH-CHANGED ({len(report.hash_changed)}):")
    for r in report.hash_changed:
        lines.append(f"    {r.path} ({r.thread_id})")
    return "\n".join(lines) + "\n"


def render_json(report: DriftReport) -> str:
    payload = {
        "baseline_path": str(report.baseline_path),
        "current_path": str(report.current_path),
        "baseline_count": report.baseline_count,
        "current_count": report.current_count,
        "net_delta": report.net_delta,
        "added": [
            {"path": r.path, "sha256": r.sha256, "thread_id": r.thread_id}
            for r in report.added
        ],
        "removed": [
            {"path": r.path, "sha256": r.sha256, "thread_id": r.thread_id}
            for r in report.removed
        ],
        "hash_changed": [
            {"path": r.path, "sha256": r.sha256, "thread_id": r.thread_id}
            for r in report.hash_changed
        ],
    }
    return json.dumps(payload, indent=2, sort_keys=True) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Per-thread JSONL diff for project-manifest annotated bibliography files."
    )
    parser.add_argument(
        "--baseline",
        type=Path,
        default=None,
        help="Prior JSONL manifest. Defaults to second-newest in --manifest-dir.",
    )
    parser.add_argument(
        "--current",
        type=Path,
        default=None,
        help="Current JSONL manifest. Defaults to newest in --manifest-dir.",
    )
    parser.add_argument(
        "--manifest-dir",
        type=Path,
        default=DEFAULT_MANIFEST_DIR,
        help=f"Directory holding manifest JSONL files (default: {DEFAULT_MANIFEST_DIR}).",
    )
    parser.add_argument(
        "--format",
        choices=("text", "json"),
        default="text",
        help="Output format (default: text).",
    )
    parser.add_argument(
        "--thread",
        default=None,
        help="Filter ADDED / REMOVED / HASH-CHANGED to a single thread_id.",
    )
    args = parser.parse_args()

    try:
        baseline_path, current_path = resolve_defaults(
            args.baseline, args.current, args.manifest_dir
        )
    except FileNotFoundError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2

    baseline_records = load_manifest(baseline_path)
    current_records = load_manifest(current_path)
    added, removed, hash_changed = compute_drift(baseline_records, current_records)

    if args.thread:
        added = filter_by_thread(added, args.thread)
        removed = filter_by_thread(removed, args.thread)
        hash_changed = filter_by_thread(hash_changed, args.thread)

    report = DriftReport(
        baseline_path=baseline_path,
        current_path=current_path,
        baseline_count=len(baseline_records),
        current_count=len(current_records),
        added=added,
        removed=removed,
        hash_changed=hash_changed,
    )

    if args.format == "json":
        sys.stdout.write(render_json(report))
    else:
        labels = load_thread_labels(current_path)
        sys.stdout.write(render_text(report, labels))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
