# Maddie-Side Client-Separation Substrate Patch

**Date:** 2026-06-22
**Tracking issue:** `4444J99/hokage-chess#50`
**Target repo:** `organvm/sovereign-systems--elevate-align`
**Target branch suggestion:** `codex/gh-4444j99-50-client-separation-substrate`
**Source lineage:** `4444J99/hokage-chess@27c50f4`

## Status

This is the Maddie-side governance-substrate patch packet for the GH#50
tracking proxy. The actual work belongs in `organvm/sovereign-systems--elevate-align`,
but this session's local writable root is the Hokage worktree. A remote GitHub
branch creation attempt for the target repo was cancelled, so the exact target
diff is preserved here under the substrate-approved cross-stream coordination
path: `docs/archive/orchestration/`.

This packet does not quote client-content bodies from either stream. It only
names repositories, governance paths, and the metadata of the 2026-04-30
ask-Maddie-receive-Rob incident that originated the substrate.

## Intended Target Changes

1. Add `docs/governance/client-separation-substrate.md` in the Maddie repo.
2. Add a short `CLAUDE.md` pointer after the existing `.private/` section.

## Patch

Apply from the root of `organvm/sovereign-systems--elevate-align`:

```diff
diff --git a/CLAUDE.md b/CLAUDE.md
--- a/CLAUDE.md
+++ b/CLAUDE.md
@@ -34,0 +35,4 @@
+## Client-Separation Substrate
+
+Client information must never bleed across clients or into public surfaces. The four zones (`public:all`, `(me)`, `{client:maddie}`, `{client:rob}`), the flow rules between them, and the live-paste protocol are documented at `docs/governance/client-separation-substrate.md`. Read that doc before triaging any cross-scope artifact, before pasting external session content into a chat bound to this repo, or before writing files that name another client. Routing rule: route by content / scope-of-generation (R1), not by user-declared intent. If mixed-client material is operationally useful but unsafe to track, route it to `.private/` or the workspace-meta archive, not tracked Maddie docs.
+
diff --git a/docs/governance/client-separation-substrate.md b/docs/governance/client-separation-substrate.md
new file mode 100644
--- /dev/null
+++ b/docs/governance/client-separation-substrate.md
@@
+# Client-Separation Substrate (Maddie Side)
+
+> **Sister-stream parity.** This document is the Maddie-side counterpart to
+> `4444J99/hokage-chess/docs/governance/client-separation-substrate.md`,
+> shipped in commit `27c50f4` after the 2026-04-30 ask-Maddie-receive-Rob
+> bleed event. It is governance metadata, not an import of Rob-side content.
+
+## What this is
+
+A containment topology for studio work across multiple client engagements,
+public surfaces, and the operator's private workspace. This repo already has a
+client IP rule: content is the client's IP; code and architecture are studio IP.
+This substrate adds the cross-client routing layer that tells agents where
+artifacts may live and what to do when the wrong scope receives them.
+
+## Why it exists here
+
+The original substrate was authored in `4444J99/hokage-chess` because that was
+the writable scope of the session that detected the incident. That protected
+Rob's stream, but left Maddie's sister stream relying on scattered references:
+`CLAUDE.md` stream-isolation notes, the `.private/` convention, archive
+closeouts, and feedback memories.
+
+This document makes the Maddie-side rule local and first-class: agents entering
+`organvm/sovereign-systems--elevate-align` can see the same containment
+contract before they read or write cross-scope material.
+
+## The Four Zones
+
+| Zone | Canonical Source Tree | Operational Sink | Audience Anchor |
+| --- | --- | --- | --- |
+| `public:all` | Public portfolio / publication surfaces | N/A - already public | No client-private info ever |
+| `(me)` | Workspace-meta / operator-private stores | `~/.local/share/workspace/operational/exports/` | Cross-stream or non-client material |
+| `{client:maddie}` | `organvm/sovereign-systems--elevate-align/` | `~/.local/share/sovereign-systems/operational/exports/` | `seed.yaml: client: maddie`; this repo's client IP boundary |
+| `{client:rob}` | `4444J99/hokage-chess/` | `~/.local/share/hokage-chess/operational/exports/` | Hokage repo client declaration and storefront persona |
+
+**Local mixed-IP sink.** This repo also has `.private/`, gitignored except for
+`.private/README.md`, for operationally useful material that mixes multiple
+clients. `.private/` is not public, not a substitute for source control, and not
+a place to hide work that should live in `(me)` or in another client's repo.
+
+## Flow Rules
+
+```text
+                  public:all
+              no client-private info
+                        ^
+                        | sanitized release only
+                        |
+                      (me)
+        absorbs any zone; dispatches only by scope
+            |                              |
+            v                              v
+      {client:maddie}        X        {client:rob}
+                         no direct flow
+```
+
+Allowed by default:
+
+- `(me) -> {client:N}` when the artifact is relevant to that client only.
+- `(me) -> public:all` after explicit sanitization.
+- `{client:N} -> (me)` because the operator owns the workspace.
+- `public:all -> anywhere` because the source is already public.
+
+Forbidden by default:
+
+- `{client:N} -> {client:M}` unless the artifact is explicit cross-stream
+  governance metadata or the user has authorized a cross-stream coordination
+  packet.
+- `{client:N} -> public:all` unless the release is explicitly audited and
+  client-approved.
+- Wrong-scope chat paste -> local implementation. A prompt containing other
+  client material does not grant permission to operationalize it here.
+
+Studio code is not client information. Shared implementation primitives may be
+portable across clients when they are free of client content, strategy, and
+private relationship context. Brand copy, client transcripts, strategy notes,
+pricing context, outreach drafts, and decision artifacts are client information.
+
+## Routing Rule (R1)
+
+When triaging a misplaced artifact, route by **content / scope-of-generation**,
+not by user-declared intent.
+
+- **R1 chosen:** If an agent in the Maddie repo generated Maddie-flavored output,
+  it routes to the Maddie source tree or Maddie ops tree, even if the user's
+  original intent named another stream.
+- **R2 rejected:** Routing only by declared intent is too interpretive. It can
+  place actual generated content into the wrong client's namespace.
+
+R1 keeps routing deterministic. Intent/content mismatches should be documented
+as incident metadata, not papered over.
+
+## Live-Paste Rule
+
+When cross-client material lands inside a wrong-scope chat, the receiving agent:
+
+1. Refuses to operationalize wrong-scope content in this repo.
+2. Names the correct scope and the likely destination path.
+3. Treats the paste as a triage event and records metadata if needed.
+4. Does not save the wrong-scope body into this scope's memory, docs, or tracked
+   files.
+5. Saves the rule, not the body, when the event teaches a reusable governance
+   lesson.
+
+For this repo, wrong-scope Rob/Hokage material normally routes to the Hokage
+repo or `~/.local/share/hokage-chess/operational/exports/`. Mixed orchestration
+material routes to `(me)` or `.private/` depending on durability and sensitivity.
+
+## Triage Protocol
+
+1. Identify the artifact path, size, mtime, session ID if present, and content
+   scope. Read only what is necessary to classify it.
+2. Determine destination by R1:
+   - Maddie/Sovereign content -> this repo or
+     `~/.local/share/sovereign-systems/operational/exports/`.
+   - Rob/Hokage content -> `4444J99/hokage-chess` or
+     `~/.local/share/hokage-chess/operational/exports/`.
+   - Cross-stream / non-client material -> workspace-meta or
+     `~/.local/share/workspace/operational/exports/`.
+   - Mixed-client operational material needed locally but unsafe for git ->
+     `.private/`.
+3. Move rather than copy when the artifact is in the wrong tree.
+4. Verify source absence, destination presence, and size/hash preservation when
+   moving files.
+5. Record event metadata in a governance note or closeout. Do not quote the
+   wrong-scope body.
+
+Filename convention for operational exports:
+`YYYY-MM-DD-HHMMSS-<title-slug>-ses_<id>.md`.
+
+## Audience-Declaration Anchors
+
+Existing anchors this substrate composes with:
+
+- `seed.yaml: client: maddie` declares this repo's client scope.
+- `CLAUDE.md` declares content = client IP and code/architecture = studio IP.
+- `.private/README.md` documents the local gitignored sink for mixed-client IP.
+- `docs/archive/YYYY-MM/` stores Maddie-only transcript exports; Rob transcripts
+  route to Hokage, and workspace-meta transcripts route to workspace-meta.
+- `src/lib/landing-engine/` is studio code shared in shape with Hokage; this is
+  not bleed as long as content remains parameterized.
+
+## Canonical Lineage Event
+
+| Field | Value |
+| --- | --- |
+| Triggering substrate | `4444J99/hokage-chess@27c50f4` |
+| Incident class | ask-Maddie-receive-Rob scope bleed |
+| Date | 2026-04-30 |
+| Metadata retained here | Date, repo names, session title/session ID if needed |
+| Body retained here | None |
+| Maddie-side response | Add local substrate so agents entering this repo see the rule in-scope |
+
+## Audit Log
+
+| Date | Event | Action | Reference |
+| --- | --- | --- | --- |
+| 2026-06-22 | Sister-stream parity gap from `4444J99/hokage-chess#50` | Added Maddie-side substrate and `CLAUDE.md` pointer | This document |
+
+## Deferred Enforcement
+
+- Add a staged-file guard for inverse cross-client keywords, with allow-listed
+  paths for governance metadata, archives, `.private/README.md`, and explicit
+  orchestration packets.
+- Promote the four-zone model into workspace/meta governance so neither client
+  repo is the only canonical home.
+- Normalize client-declaration schema across repos if `metadata.client` and
+  top-level `client` both remain in use.
+- Bind conductor/session startup to explicit client scope when a repo declares
+  one in `seed.yaml`.
+
+## Self-Test
+
+- **Quotes other-client content?** No. This document names the governance event
+  and repositories only.
+- **Right scope?** Yes. The rule governs how this repo receives, rejects, and
+  routes cross-scope material.
+- **Composes with existing conventions?** Yes. It keeps `.private/` for
+  gitignored mixed-IP artifacts and `docs/archive/YYYY-MM/` for Maddie-only
+  transcripts.
+- **Preserves studio-code reuse?** Yes. It distinguishes portable code and
+  architecture from client content and strategy.
```

## Verification After Applying

From the target repo root:

```bash
git diff --check
npm run format:check
```

This is doc-only. `npm run test:all` is optional but recommended before landing
directly on `main` in the target repo because its session-close rules require it
for any new commit on `main`.
