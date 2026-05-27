# Stratum 08 — External Contribution

This layer defines how outside inputs become structured assets for Hokage Chess instead of scattered DM threads, Discord messages, or one-off comments. BODI's external-contribution stratum at `../../bodi/08-external-contribution/` defines parent-business contributor surfaces (ambassador onboarding, affiliate downline normalization); Hokage's contributor surfaces are bounded to chess-community participation around the channel and Discord.

The seed surfaces below are the structured intake points for Phase-1 community contribution.

## Contributor surfaces

- **Discord moderation co-leads.** Once "The Village" passes ~50 active members, identify trusted Chunin or Jonin members to co-moderate `#jutsu-of-the-week`, `#sparring-partners`, `#study-hall`. Surface contract: clear role-tier promotion logic, no ambiguous mod authority
- **Guest streams / collabs.** Inbound from chess creators (constellation subset) for Boss Battle Online or Title variants, or co-streamed analysis. Surface contract: pre-stream brief documenting CTA stack, role-tier reference, and authentic-climber framing so guest content does not break brand voice
- **Viewer-submitted positions.** Audience submits real positions from their own games for Jutsu-of-the-Week analysis or future "1300 Escape Plan v2" iterations. Surface contract: a single intake form (Google Form or Discord channel) with attribution rules and a "your-game-on-the-channel" consent toggle
- **Tournament reports.** Discord members report their own tournament games / OTB results — fuels community proof and informs Boss Battle archetype selection
- **Storefront opt-in clients.** `storefront.config.yaml` allows the `personalized-storefront-render` skill to emit per-persona drafts; future contributors (operators, future-Anthony-replacement, automation) read from this contract rather than reverse-engineering the persona structure
- **Pull requests / issues against this repo.** For collaborators (dev, design, content) — gated by the standard contribution flow once the repo passes from LOCAL → CANDIDATE in the promotion lifecycle

## Sources

- `../../../ROB-FIRST-30-DAYS.md` — Discord section defining role tiers and channel structure
- `../../../storefront.config.yaml` — per-repo storefront opt-in contract that governs how external generators emit Hokage-shaped artifacts
- `../../bodi/08-external-contribution/README.md` — parent contribution surface (some patterns transfer, MLM-affiliate flows do not)
- `../../../seed.yaml` — repo-level promotion-state declaration (`status: LOCAL`)

## TBD *(last swept 2026-06-01)*

- Build `contributor-surfaces.yaml` enumerating each surface with intake URL, contract notes, and the role responsible for triage (see `../05-agent-fleet/`)
  - *Sweep note: blocked on operational data — Discord not shipped (no invite URL), viewer-submitted positions form not created (no Google Form URL), guest-stream scheduling not started. Surface names and contract notes are fully documented in this README; the YAML cannot be created without the live intake URLs. Prerequisite: Discord setup + Google Form creation. Revisit once "Discord not shipped" gap closes in `../04-gap-map/hokage-gap-map.md`.*
- Draft a `guest-stream-brief-template.md` once first guest is scheduled — codify CTA stack and brand-voice constraints once rather than re-explaining each time
  - *Sweep note: deferred — no guest streams scheduled as of this sweep. Template components are known (CTA stack: hokagechess.com/free-plan → Discord → subscribe; brand-voice constraint: authentic-climber framing, no clickbait, no MLM language). Draft once first guest conversation is in progress — pre-drafting before a concrete guest adds overhead with no benefit.*
- When Discord co-mod onboarding starts, document the criteria used (active days, message quality, ELO band) so the promotion path is reproducible
  - *Sweep note: deferred — Discord not yet shipped; 0 members. Promotion criteria (active days, message quality, ELO band per README) are clear conceptually. Formalize as a `co-mod-criteria.md` once "The Village" has ≥30 active members and co-mod candidacy is imminent.*

