# Canonical Home Anchor — Client-Separation Substrate

## Why this file exists

`docs/governance/client-separation-substrate.md` is v0 of the 4-zone client-separation topology. It currently lives at `<repo>/docs/governance/` for session-scope reasons (authored in a hokage-chess-scoped session under repo lock). **The canonical workspace-wide home is `meta-organvm/governance/`** — a path that does not yet exist.

This anchor file forwards future readers and tooling to the canonical target. It exists so that the v0 placement is explicitly named as transitional, not silently treated as the permanent home.

## Phase 3 deferred work

Per GH issue [#48](https://github.com/4444J99/hokage-chess/issues/48), the Phase 3 cross-repo migration covers:

1. Create `meta-organvm/governance/` directory + governance index
2. Move `client-separation-substrate.md` from `hokage-chess/docs/governance/` to `meta-organvm/governance/`
3. Leave a forwarding stub at the original path
4. Update `meta-organvm/schema-definitions/schemas/seed-v1.schema.json` to canonicalize `client` field at top-level (currently inconsistent: hokage-chess uses `metadata.client`, sovereign-systems uses top-level `client:`)
5. Migrate both `4444J99/hokage-chess/seed.yaml` and `organvm/sovereign-systems--elevate-align/seed.yaml` to the unified schema

## Why deferred

This stream is repo-locked to `4444J99/hokage-chess/**` per `CLAUDE.md`. Cross-repo writes — especially into `meta-organvm/` and the sibling `organvm/sovereign-systems--elevate-align/` repo — require a `meta-organvm`-scoped stream session with the appropriate write permissions and cross-stream coordination. Attempting Phase 3 from inside a hokage-chess-locked stream would violate the repo-lock invariant the substrate itself depends on.

## Status

- v0 hosted at: `docs/governance/client-separation-substrate.md` (this repo)
- Canonical target: `meta-organvm/governance/client-separation-substrate.md` (not yet created)
- Tracking: GH issue [#48](https://github.com/4444J99/hokage-chess/issues/48) — `agent-fix`, P2
- Vacuum row: `HANDOFF.md` V-B — "Phase 3 canonical-home promotion + seed.yaml schema normalization"

## Related anchors

- `seed.yaml: metadata.dual_purpose: true` — declares the repo's two-role nature (Rob landing surface + BODI substrate host) so the v0 placement of this governance doc inside a client repo is a known configuration, not accidental drift.
- `CLAUDE.md` § Client-Separation Substrate — top-level pointer that defers detail to `client-separation-substrate.md`; will need its path updated when Phase 3 ships.
