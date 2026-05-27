# Stratum 07 — Internal Magnet

This layer governs what Hokage Chess pulls in, refines, or rejects when it encounters BODI parent-business primitives, sibling chess-creator tactics, or adjacent disciplines. BODI's internal magnet at `../../bodi/07-internal-magnet/` defines absorption rules for the parent fitness/coaching business; Hokage's magnet is **load-bearing in the opposite direction** — it specifies what flows from BODI into Hokage as the cross-pollination instantiation.

Without this stratum the substrate looks like duplicated BODI. The magnet rule is what gives Hokage its independent identity: same architectural pattern, different domain content, with explicit absorption-and-rejection boundaries between the two.

## Absorbed from BODI parent (cross-pollination IN)

- **L1→L4 funnel mechanism.** The cold-leads → opt-ins → customers → ambassadors cascade from `2026-04-25-bodi-funnel-with-premium-content-architecture.md`, mirrored exactly into `2026-04-25-hokage-4-level-funnel-architecture.md`
- **Apex-predator parent architecture.** XP / Character Sheet / quest-achievement model from `research/apex-predator-parent-architecture/` (Dec 2025, fitness first instantiation at `a-organvm/gamified-coach-interface`); inherited not invented
- **Persona × Narrative × Section primitive.** From `src/lib/landing-engine/`; shared with the Maddie spiral in sibling repo `organvm/sovereign-systems--elevate-align`; kept brand-agnostic in `content-strategy.ts` so chess vocabulary is parameterized not baked
- **Naming-convention discipline.** Naruto-stack tier names (Genin / Chunin / Jonin) used dual-purpose — Discord roles in Phase 1, paid product tiers in Phase 2 — mirrors BODI's pattern of one vocabulary across community + commerce
- **Content-strategy heuristics.** Title-CTR auditing rhythm and emotion/stakes-first formula generalize from BODI's reel-hook discipline

## Refined for chess

- **Hook semantics.** BODI hooks lean transformation/aspiration; Hokage hooks lean stakes/emotion within an authentic-climb frame ("I FINALLY Beat the Opening That Destroyed Me" — not "Become a chess god in 30 days")
- **Authority position.** BODI is fitness-coach authority; Hokage is *climber-among-climbers* authority — Rob's ~1350 ELO is the asset, not a credential to inflate
- **Cadence.** BODI is daily IG content; Hokage is daily Shorts + weekly long-form Bridge Content — different platform mix, same volume discipline

## Rejected — does NOT transfer from BODI

- **Network-marketing distribution layer.** BODI rides MLM affiliate mechanics (Teamzy, BODi affiliates, downline ambassadors); chess audience does not respond to MLM cadence and the model would damage authentic-climber positioning
- **Wearable-data / bio-syncing layer.** Whoop/Oura have no chess analog; Phase-1 Hokage does not consume biometric data
- **Fitness-influencer constellation.** The 75-person constellation's fitness/coaching domains are out-of-scope (see `../03-constellation/README.md` filtration rule)
- **Beachbody / BODi-corporate scaffolding.** Hokage does not have a parent corporate platform to ride; everything is owned-channel

## Sources

- `../../bodi/07-internal-magnet/README.md` and `../../bodi/07-internal-magnet/absorption-rules.yaml` — parent magnet rules
- `../../business/2026-04-25-cross-pollination-master-diagnosis.md` — the master diagnosis that justifies the IN/OUT flow
- `../../../research/apex-predator-parent-architecture/` — Dec-2025 architecture that both BODI and Hokage instantiate
- `../../../CLAUDE.md` "Architecture" section — describes the brand-agnostic primitive boundary in `content-strategy.ts` and `landing-engine/`

## TBD *(last swept 2026-06-01)*

- Build `hokage-absorption-rules.yaml` (mirror of `../../bodi/07-internal-magnet/absorption-rules.yaml`) with explicit IN/REFINE/REJECT entries and rationale
  - *Sweep note: **created** — `hokage-absorption-rules.yaml` (30-day TBD sweep 2026-06-01). 12 rules: ABSORB × 5, REFINE × 3, REJECT × 4. Seeded from the three sections of this README (Absorbed / Refined / Rejected). Review for completeness when new BODI primitives are proposed for Hokage adoption.*
- Add a `cross-pollination.md` companion documenting the flow direction per primitive
  - *Sweep note: flow direction is currently one-way (BODI → Hokage only). Specific data needed to create `cross-pollination.md`: (1) whether any Hokage primitives flow back to BODI (e.g., does chess-pedagogy scaffold discipline transfer?); (2) whether the sister-stream landing engine (see CLAUDE.md §Architecture, "Cross-stream context") receives any Hokage primitives. Cannot write confidently without Anthony's architectural decision on bidirectionality.*
- Track refusal events: when a BODI tactic is proposed for Hokage and rejected, log it here with the rejection reason
  - *Sweep note: deferred — AR-009 through AR-012 in `hokage-absorption-rules.yaml` document the four founding rejections. Add a `refusal_log` section to the YAML when new rejection events occur in future sessions.*

