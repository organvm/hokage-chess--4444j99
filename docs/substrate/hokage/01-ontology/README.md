# Stratum 01 — Ontology

This layer names the entities, relations, and tools specific to the Hokage Chess single-pillar deliverable, before any optimization work begins. It is the chess-pedagogy ontology — distinct from BODI's fitness/network-marketing ontology at `../../bodi/01-ontology/`.

This layer elaborates on actors, ELO-banded tiers, content surfaces, and named formats so research, copy, and tooling decisions all reference a stable vocabulary rather than reinventing terms per artifact. Where BODI's ontology spans a multi-funnel parent business, Hokage's ontology is bounded to one chess channel, one creator (Rob Bonavoglia), and the audience climbing alongside him from ~1300 toward ~1500 ELO.

## Seed entities

- **Creator:** Rob Bonavoglia (`@HokageChess`), NYC, ~1350 ELO authentic-climb authority
- **Audience tiers (rating-banded, Naruto-stack):**
  - **Genin** (0–1199 ELO) — newcomers, largest tier, future $9/mo Genin Squad
  - **Chunin** (1200–1599 ELO) — current core, Rob's tribe, future $29/mo Chunin Dojo
  - **Jonin** (1600+ ELO) — peers and mentors, future $99/mo Jonin Mentorship
- **Content surfaces:** YouTube long-form, YouTube Shorts (daily puzzle), Discord ("The Village"), Kit newsletter ("The Scroll"), `hokagechess.com` landing
- **Named formats:** Jutsu of the Week (Tuesday cadence, single-technique), Boss Battle (monthly, opponent-encounter; Park / Online / Title / Echo variants)
- **Lead-magnet asset:** "The 1300 Escape Plan" — 7-position breakdown of typical 1300-instinct mistakes
- **Flagship series:** Road to 1500 (long-running climb documentary)

## Sources

- `../../../ROB-FIRST-30-DAYS.md` — Genin/Chunin/Jonin tier definitions, named formats, Discord / Kit / lead-magnet entities
- `../../business/2026-04-25-hokage-4-level-funnel-architecture.md` — L1→L4 entities and the Naruto-stack pricing tiers
- `../../business/2026-04-25-strategy-v6-master.md` — channel-health diagnosis, hook-first format, founder-asset position

## TBD

- Build an `entities.yaml` (or equivalent) enumerating actors / surfaces / formats with stable IDs, mirroring `../../bodi/01-ontology/` patterns
- Disambiguate Naruto-stack tier names from Naruto trademark concerns (legal scope is in `02-lineage/`, not here)
- Add a relations sub-doc when more than two formats interact (e.g., "Jutsu of the Week" episode → "Sparring Partners" Discord channel → Kit broadcast follow-up)

