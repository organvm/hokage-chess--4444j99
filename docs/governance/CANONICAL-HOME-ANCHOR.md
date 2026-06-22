# Canonical Home Anchor — Client-Separation Substrate

## Why this file exists

`docs/governance/client-separation-substrate.md` was v0 of the 4-zone client-separation topology. It lived at `<repo>/docs/governance/` for session-scope reasons (authored in a hokage-chess-scoped session under repo lock). **The canonical workspace-wide home is now `meta-organvm/governance/`.**

This anchor file forwards future readers and tooling to the canonical target. It exists so that the v0 placement is explicitly named as historical, not silently treated as the permanent home.

## Phase 3 work

Per GH issue [#48](https://github.com/4444J99/hokage-chess/issues/48), the Phase 3 cross-repo migration covers:

1. Create `meta-organvm/governance/` directory + governance index
2. Move `client-separation-substrate.md` from `hokage-chess/docs/governance/` to `meta-organvm/governance/`
3. Leave a forwarding stub at the original path
4. Normalize Hokage `seed.yaml` to the top-level `client:` declaration pattern

## Scope note

This Hokage worktree remains repo-locked to `4444J99/hokage-chess/**` per `CLAUDE.md`, so the in-repo responsibility is limited to removing the full governance body from Rob scope and preserving a forwarding pointer. The canonical file and index live in the workspace meta-governance checkout.

## Status

- Forwarding stub: `docs/governance/client-separation-substrate.md` (this repo)
- Canonical target: `meta-organvm/governance/client-separation-substrate.md`
- Tracking: GH issue [#48](https://github.com/4444J99/hokage-chess/issues/48) — `agent-fix`, P2
- Vacuum row: `HANDOFF.md` V-B — "Phase 3 canonical-home promotion + seed.yaml schema normalization"

## Related anchors

- `seed.yaml: client` — declares the client at top level; `metadata.dual_purpose: true` declares the repo's two-role nature (Rob landing surface + BODI substrate host).
- `CLAUDE.md` § Client-Separation Substrate — top-level pointer that names the canonical workspace path and the local forwarding stub.
