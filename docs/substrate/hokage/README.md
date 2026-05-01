# Hokage Substrate

This directory is the eight-strata substrate for the **Hokage Chess client deliverable** — the chess-creator brand, the YouTube channel at `@HokageChess`, the Discord-and-newsletter community, and the landing surface served by this repo. It is the *cross-pollination instantiation* of the BODI parent-business architecture, scoped to a single chess pillar rather than the multi-funnel parent.

## Why this exists separately from `../bodi/`

The BODI substrate at `../bodi/` formalizes Rob's **parent business**: a fitness/coaching/network-marketing funnel running across Instagram, Teamzy, BODi affiliates, and a creator-economy stack borrowed from ~50 named operators. Hokage is the **second pillar** — chess only — and inherits some BODI primitives (the L1→L4 funnel logic, the apex-predator XP/quest model from `research/apex-predator-parent-architecture/`, the Persona × Narrative × Section landing primitive) while explicitly rejecting others (the network-marketing distribution layer does not transfer to chess).

Resolves the scope ambiguity flagged in `docs/reviews/2026-04-30-eval-to-growth-master.md` §7.6 / §9.2 P1: `seed.yaml` declares `type: client-project` for Hokage, but the repo also carries the BODI parent substrate; reading `seed.yaml` first leads to mis-scoping. This substrate disambiguates by giving Hokage its own eight strata.

## Canonical local sources

- `../../ROB-FIRST-30-DAYS.md` — the engagement plan that defines Hokage Phase 1 (audit, lead magnet, Discord, Shorts cadence)
- `../../business/2026-04-25-hokage-4-level-funnel-architecture.md` — Hokage's L1→L4 mirror of the BODI funnel
- `../../business/2026-04-29-75-person-constellation-master.md` — joint Rob+Anthony constellation; Hokage's subset is the chess-creator domain
- `../../../seed.yaml` — repo declaration (`type: client-project`, `client: Rob Bonavoglia`)
- `../../../research/apex-predator-parent-architecture/` — upstream lineage (XP / Character Sheet / quest model inherited, not invented)
- `../bodi/README.md` — parent substrate this one differentiates from

## Strata

1. `01-ontology/` — chess-pedagogy entities, ELO tiers (Genin / Chunin / Jonin), content surfaces, named formats
2. `02-lineage/` — Rob's 322-video catalog, NYC chess scene, Naruto-IP context, channel state
3. `03-constellation/` — chess-creator subset of the 75-person joint constellation
4. `04-gap-map/` — Discord, lead magnet, Kit list, premium tier — what is missing for Hokage
5. `05-agent-fleet/` — operator roles for the 30-day plan (title editor, Shorts cutter, moderator, curator)
6. `06-production-stack/` — YouTube long-form / Shorts, Discord, Kit, hokagechess.com landing, OG pipeline
7. `07-internal-magnet/` — what Hokage absorbs from BODI vs. rejects
8. `08-external-contribution/` — community moderation, guest streams, viewer-submitted positions

## Status

This is a STUB skeleton. Each stratum carries a single README naming intent, sources, and TBD expansion notes. Population (per-stratum YAML / data files / actor cards) follows the BODI pattern but is deferred — the named-format contract here is the README itself.

