# Stratum 06 — Production Stack

This layer stores the actual operating surfaces of the Hokage Chess deliverable: tools, channels, assets, and recurring rhythms. BODI's production stack at `../../bodi/06-production-stack/` enumerates the parent-business stack (Teamzy CRM, MP-7 shared subscriber base, BODi affiliate, Whoop/Oura wearables); Hokage's stack is bounded to chess-content production and the closed-loop funnel from YouTube to Kit to Discord to landing.

The stack splits cleanly between content surfaces (where Rob produces) and capture/retention surfaces (where Anthony's repo and tooling operates).

## Confirmed stack (engagement-start)

| Layer | Surface | Role | Status |
| :--- | :--- | :--- | :--- |
| **Content (long-form)** | YouTube `@HokageChess` | 322-video catalog, "Road to 1500" series | `ACTIVE` |
| **Content (short)** | YouTube Shorts | Daily vertical puzzle format | `PROVISIONAL` (cadence not started) |
| **Bridge Content** | YouTube Tuesday cadence + monthly | "Jutsu of the Week" + "Boss Battle" named formats | `PROVISIONAL` |
| **Email** | Kit (ConvertKit) free tier | "The Scroll" / Hokage chess track inside the MP-7 shared subscriber base | `PROVISIONAL` (key blocked, list not built) |
| **Community** | Discord — "The Village" | 3 role tiers (Genin/Chunin/Jonin), 3 channels | `PROVISIONAL` (not shipped) |
| **Landing** | `hokagechess.com` (this repo) | Next.js 16 + React 19; persona × narrative × section primitive | `ACTIVE` (Phase 1 deployable) |
| **Lead magnet hosting** | Google Drive / Gumroad free | "The 1300 Escape Plan" PDF | `PROVISIONAL` (asset not built) |
| **OG / social cards** | `scripts/generate-og-image.mjs` | OG/Twitter image regeneration from SVG source | `ACTIVE` |
| **Trademark** | USPTO chess-product classes | HOKAGE CHESS filing window (Phase 2) | `BLOCKED` (Phase 2, $500–$1,500 budget) |

## Performance rhythms (KPIs)

- **CTR ratchet.** Top 20 videos audited; <3% CTR triggers title rewrite within 48h
- **Email opt-in rate.** Lead magnet conversion measured per traffic source (YouTube description / pinned comment / About tab)
- **Discord active 7-day rate.** First 50 active members beats first 500 ghosts; curated growth
- **Cadence integrity.** "Jutsu of the Week" Tuesday consistency; daily Shorts uptime (28-day count)
- **CTA stack consistency.** % of videos with the canonical CTA stack present in description and pinned comment

## Sources

- `../../../ROB-FIRST-30-DAYS.md` — channels, cadences, and KPIs that define the stack
- `../../../CLAUDE.md` — "What this is" / "Architecture" / "Visual system" / "Storefront opt-in" sections describing the repo's role in the stack
- `../../business/2026-04-25-hokage-4-level-funnel-architecture.md` — funnel layers each stack surface services
- `../../business/2026-06-21-email-list-architecture-decision.md` — MP-7 shared-base/two-track email model
- `../../../seed.yaml` — repo metadata declaring channel and brand bindings

## TBD *(last swept 2026-06-01)*

- Build `hokage-production-stack.md` mirroring `../../bodi/06-production-stack/bodi-production-stack.md` with detailed per-surface specs (Kit list ID, Discord server ID, YouTube playlist IDs)
  - *Sweep note: blocked on operational data that does not yet exist — Kit account not created (list ID unknown), Discord server not shipped (server ID unknown), YouTube playlist IDs need Rob to share from YouTube Studio. The surface table above (§ Confirmed stack) is the skeleton; `hokage-production-stack.md` can be created once Kit list ID and Discord server ID are known. See `../04-gap-map/hokage-gap-map.md` for gap status.*
- Add a `kpi-targets.yaml` setting numeric Phase-1 targets (Discord 50 active, daily Shorts 28-day count, lead-magnet conversion rate)
  - *Sweep note: partial data available — Discord active-member target = 50; Shorts 28-day uptime target = 28/28 (100%); CTR red-line = <3% per video (already in `../05-agent-fleet/roles.yaml`). Still needed: lead-magnet opt-in rate target (needs Rob to set expectation), Kit list growth target (per week), "The Scroll" open-rate baseline. Can create skeleton once Rob confirms these numbers.*
- Cross-link to BODI production stack where shared tooling appears (Canva, Google Drive); flag chess-only tools (Chess.com / Lichess game pull for lead-magnet positions)
  - *Sweep note: shared tools are Canva (lead magnet design, Phase-1 PDF production) and Google Drive (interim PDF hosting before Gumroad free account is set up). Chess-only tools: Chess.com / Lichess game export API for mining Rob's last 30 games for "1300 Escape Plan" positions. Add explicit cross-link once `hokage-production-stack.md` is created.*
