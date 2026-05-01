# Stratum 05 — Agent Fleet

This layer turns the Hokage 30-day plan into named operating roles. Each role can be performed by Rob, by Anthony (during the engagement), by a future collaborator, or by automation — but the role itself remains stable so the work survives operator turnover. BODI's agent fleet at `../../bodi/05-agent-fleet/` covers the parent-business roles (lead screener, ambassador-pipeline curator, content triager); Hokage's fleet is bounded to the chess deliverable.

The roles below are seeded directly from the Week 1–4 actions in `ROB-FIRST-30-DAYS.md`. Each role names what gets done, not who does it.

## Seed roles

- **Title Editor.** Audits top 20 videos; pushes "Episode X" suffixes; A/B tests title-only changes; enforces the `[EMOTION or STAKES] + [CONTEXT]` formula and the "<3% CTR = new title within 48h" red line
- **Thumbnail A/B Tester.** Designs thumbnails consistent with authentic-climber positioning (no clickbait conflict); runs A/B paired with title tests
- **Lead-Magnet Builder.** Mines last 30 games for typical-1300-instinct positions; writes the 7-position breakdown; designs in Canva; exports PDF; hosts on Drive/Gumroad; wires CTA to YouTube descriptions and channel About tab
- **Email Curator ("The Scroll").** Configures Kit (ConvertKit) free tier; drafts the 3-email welcome sequence (who-I-am / embarrassing-loss / Village invite); ships once lead magnet lands
- **Shorts Cutter.** Daily vertical puzzle (1/day × 28); position-on-screen open, no intro, hook reveal at 30s; same template, low overhead
- **Bridge Content Producer.** Tuesday "Jutsu of the Week" (8–12 min long-form + 60–90s Shorts re-cut); monthly "Boss Battle" (Park / Online / Title / Echo variants — Echo recommended for Episode 1, lowest scheduling friction)
- **Discord Moderator ("The Village").** Stands up three role tiers (Genin / Chunin / Jonin) and three channels (`#jutsu-of-the-week`, `#sparring-partners`, `#study-hall`); curates to first 50 active members; resists broadcast scaling
- **CTA Stack Enforcer.** Audits every long-form, Short, and pinned comment for the canonical stack (`hokagechess.com/free-plan` → Discord → subscribe); patches inconsistent surfaces

## Sources

- `../../../ROB-FIRST-30-DAYS.md` — Week 1–4 actions that ground each role
- `../../business/2026-04-25-hokage-4-level-funnel-architecture.md` — funnel mechanisms each role services (L1→L2 capture, L3 retention, L4 multiplier)
- `../../bodi/05-agent-fleet/README.md` — parent fleet (some roles transfer; network-marketing-specific roles do not)

## TBD

- Build `roles.yaml` enumerating each role with inputs, outputs, cadence, and current owner (Rob / Anthony / unassigned)
- Add automation candidates: Title Editor and CTA Stack Enforcer have low cognitive load and high cadence — first targets for AI-assisted operator handoff
- Track role-coverage status against the 30-day timeline; flag any role where Week-1 cadence has not started by Week 2

