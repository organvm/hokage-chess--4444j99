# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

`GEMINI.md` is a compressed Gemini-twin of this doc — not load-bearing for Claude, kept in shape-parity for cross-agent orientation.

## What this is

Client engagement for Rob Bonavoglia (@HokageChess, NYC chess YouTuber). A Next.js 16 + React 19 landing page + business strategy substrate for the Hokage Chess brand. `seed.yaml` declares `organ: PERSONAL`, `tier: standard`, `type: client-project`, `status: LOCAL`, `implementation: ACTIVE`.

The repo is dual-purpose: (1) the deployable landing surface for the Rob client engagement, and (2) a working substrate for the broader BODI (Body Of Discipline) cross-pollination architecture, including the 8-layer substrate at `docs/substrate/bodi/` that feeds product-domain-engine work.

## Commands

```bash
npm run dev          # Next.js dev server → http://localhost:3000
npm run build        # Production build (verify before any deploy; baseline ≈10 routes)
npm run start        # Serve the production build
npm run lint         # ESLint (eslint.config.mjs, eslint-config-next preset)
npm run test         # Vitest run-mode (baseline ≈80 tests across 6 suites — re-check, don't trust)
npm run test:watch   # Vitest watch-mode
npx vitest run tests/content-strategy.test.ts   # Single suite
npx vitest run -t "scoreVideo applies time-bonus"  # Single test by name
node scripts/generate-og-image.mjs               # Regenerate src/app/opengraph-image.png (source: scripts/og-source.svg)
```

## Architecture

### Three engines in `src/lib/`

The lib layer is **brand-agnostic** by design — Rob's domain vocabulary is parameterized, not baked in. A single creator running multiple domains (chess + fitness + life-coaching) can score titles for each without forking.

- **`content-strategy.ts`** — universal title / thumbnail / video-idea scoring. Pure heuristic. Domain vocabulary injected via `ContentLexicon`. The brand-neutral parametric refactor is load-bearing — do not re-bake "chess" or "Hokage" terms into the scoring core. Defaults catch cross-domain emphasis + numeric stakes + named-conflict patterns.
- **`landing-engine/`** — Persona × Narrative × Section primitive (`compose.ts`, `personas.ts`, `narratives.ts`, `sections.ts`). Same primitive shipped in the sibling repo `organvm/sovereign-systems--elevate-align@3d8cabd` (Maddie spiral) — keep the two implementations in shape-parity. Adding a persona to `personas.ts` makes it appear at `/for/<id>` automatically via `generateStaticParams` in `src/app/for/[persona]/page.tsx`.
- **`growth.ts`, `narrative.ts`, `analytics.ts`, `engine.ts`** — supporting modules. Each has a sibling `tests/<name>.test.ts`.

### App routes (Next.js 16, App Router)

- `src/app/page.tsx` — root landing page (9 sections: Hero, Problem, Identity, Three Roads, Social Proof, Offer, Journey Map, FAQ, Final CTA)
- `src/app/for/[persona]/page.tsx` — dynamic per-persona routes generated from `landing-engine/personas.ts`
- `src/app/api/subscribe/route.ts` — Kit (ConvertKit) email-capture handler. Reads API key from env; the form in `page.tsx` POSTs here
- `src/app/opengraph-image.png` + `opengraph-image.alt.txt` + `twitter-image.png` — Next.js 16 file-convention OG images (no metadata API needed)
- `src/components/landing/` — section components (Hero, Problem, ThreePaths, Cta)

### Visual system

Dark mode. Hokage Red `#C41E3A` is the lead accent, but the canonical palette (crimson / gold / charcoal / dark / gray / light variants) lives in `tailwind.config.js`, with matching CSS custom properties exposed in `src/app/globals.css` — reference these tokens rather than inventing ad-hoc colors. Oswald for headlines, DM Sans for body, JetBrains Mono for ELO numbers. Tailwind v3, not v4 — adjust expectations.

Imports use the path alias `@/*` → `./src/*` (declared in `tsconfig.json`); follow this convention rather than relative `../../` chains.

### Substrate layer (`docs/substrate/bodi/`)

Eight-layer substrate per the domain-ideal-whole schema (ontology → lineage → constellation → gap-map → agent-fleet → production-stack → internal-magnet → external-contribution). `actor-cards/` under `03-constellation/` holds named-actor analysis for the 75-person constellation work (`docs/business/2026-04-29-75-person-constellation-master.md`). The skill that generates this substrate lives at `~/Workspace/a-i--skills/skills/project-management/domain-ideal-whole-substrate/`.

#### Other `docs/` subdirs

Beyond `substrate/bodi/` and `archive/`, the repo carries dated working material that future instances will encounter:

- `docs/business/` — business-strategy artifacts (2026-04-25 → 2026-04-27): BODI funnel architecture, pitch decks v1–v3, strategy v4–v6, cross-pollination diagnosis, GTM pipeline, Rob/Anthony funnel-audit transcript, world-maps. Where the 75-person constellation master lives.
- `docs/content/` — content-pillar drafts and Discord/LinkedIn artifacts.
- `docs/rob/` — collaborator-facing working docs (e.g. `2026-04-28-rob-magnetic-manifest.md`).
- `docs/manifests/` — project-manifest annotated bibliography (`.jsonl` + `.md`). Regenerate via `python3 tools/project_manifest.py`; the generator script is preserved in `tools/` for repeatable refreshes. **Caveat:** current `EXCLUDED_DIRS` does NOT exclude `.history/`, `.lh/`, `.gemini/` — drift counts are inflated by editor-history noise until that's patched (see `docs/reviews/2026-04-30-eval-to-growth-master.md` §1.6 / §A.2).
- `docs/reviews/` — periodic master reviews structured by the Evaluation-to-Growth framework (Critique → Logic → Logos → Pathos → Ethos → Blind Spots → Shatter Points → Bloom → Evolve). Most recent review carries the canonical next-session work queue (§9.2 register). Append-only — never overwrite; new dates supersede.
- `docs/superpowers/intakes/` — superpower intake material.
- `docs/governance/` — meta-governance documents. (Note: `client-separation-substrate.md` has been promoted to its canonical home at `~/workspace/meta-organvm/governance/client-separation-substrate.md`).
- `docs/ROB-FIRST-30-DAYS.md` — top-level engagement plan for the Rob client engagement.

### Research lineage (`research/apex-predator-parent-architecture/`)

Hokage Chess is the **second instantiation** of an architectural pattern Anthony designed in December 2025 for fitness-niche-coaching. The directory carries the parent-architecture proof: 9 docx + 4 md + 1 xlsx (Apex Predator Playbook, Cheat Codes to a Killer Coaching Biz, Strategic Framework, Gamified Life formal+casual, Project Chimera Master Content Checklist, Legion of Fitness Battle Plan Interrogation). The first instantiation is the **Legion Command Center** at `a-organvm/gamified-coach-interface` (live production since 2025-11). Strategy v6 master + pitch-deck v3 + business-plan v2 cite this lineage explicitly; the "Architect's Demonstrated Capacity" claim depends on it. When auditing or evolving any strategy doc, treat `research/apex-predator-parent-architecture/` as authoritative upstream lineage — do NOT reinvent primitives that exist there (XP / Character Sheet / quest-achievement model are inherited, not invented).

### Storefront opt-in (`storefront.config.yaml`)

Per-repo opt-in for the `personalized-storefront-render` skill. When present, `organvm storefront sync --repo .` walks `source.globs`, reads `audiences:` frontmatter, and emits per-persona `_generated/*.client.md` drafts. `persona_id: rob`, `render_adapter: nextjs`, `primary_target: rob.hokagechess.com`.

## Next.js 16 — read the docs first

`AGENTS.md` carries the project rule: this Next.js version has breaking changes from training-data-era Next.js. Read `node_modules/next/dist/docs/` for any feature you're touching, especially:

- File-convention OG images (this repo uses them — do NOT add a `metadata` export for OG when the file convention is in play)
- App Router conventions (server vs. client components, `generateStaticParams`, route handlers)
- Async params handling

Heed deprecation notices in build output; do not silence them.

## Working-state coordination

The repo carries three coordination surfaces. Each has a distinct role:

- **`HANDOFF.md`** (top-level) — durable vacuum table (V1–V10) per work-group. Updated at session close; read at session open.
- **`.conductor/active-handoff.md`** — single-session entry permit. Read FIRST in any new session before any write. Carries repo lock, scope constraints, prior-session inheritance, and audit findings.
- **`docs/archive/2026-MM/`** — dated close-out summaries (`YYYY-MM-DD-stream-d-closeout.md`, `…-late-closeout.md`). Append-only — never overwrite a prior close-out; create a new dated artifact instead.
- **`~/.claude/projects/-Users-4jp-Workspace-4444J99-hokage-chess/memory/`** (off-repo, in user-tooling space) — Claude Code auto-loads `MEMORY.md` from here at session start. Carries durable `feedback_*` (rules), `project_*` (artifacts/findings), and `collaborator_*` entries. Per the client-separation substrate's live-paste rule: save the *rule* of any cross-client realization, never the *body* — wrong-scope content must not be quoted verbatim here. Index in `MEMORY.md`.

Plan discipline: plans live at BOTH `~/.claude/plans/<slug>.md` AND `<repo>/.claude/plans/YYYY-MM-DD-<slug>.md`. Mirror after writing. The sibling `.codex/plans/` directory is the codex agent's parallel planning surface (5 plans as of 2026-04-30) — codex plans are NOT mirrored to the Claude paths; each agent owns its own dir.

## Cross-stream context

This repo runs as **Stream D** in a multi-stream partition. The sister stream is **Maddie spiral** at `organvm/sovereign-systems--elevate-align`. The two streams share the Persona × Narrative × Section primitive (keep in shape-parity) and a constellation gap-map. Cross-stream signals surface in `docs/archive/2026-04/gemini-2026-04-28-refactored-workstreams.md` § A.4–A.7. Repo lock is enforced — do NOT write outside `4444J99/hokage-chess/**` from this stream.

The IRF (Index Rerum Faciendarum) at `meta-organvm/organvm-corpvs-testamentvm/INST-INDEX-RERUM-FACIENDARUM.md` tracks Stream-D items under the `IRF-PRT-NNN` prefix. Read-only from this stream — IRF promotions are Stream H Gate territory.

## Pre-commit hooks

Gitleaks runs on every commit. It is aggressive about literal credential-keyword substrings — even inside narrative prose or code-diff transcripts. If a commit fails on a false positive:

1. Rephrase to avoid the literal pattern (e.g. "credential-keyword substring" instead of the literal token)
2. Or add `// allow-secret` / `# allow-secret` to the line (per gitleaks config)
3. Or, for transcripts unsafe to ever commit, route to `~/.local/share/hokage-chess/operational/exports/` (per the client-separation substrate's R1 routing) and gitignore the repo-root path

The repo `.gitignore` already catches three orphan-transcript patterns at root: `Untitled-*.md`, `export-*.md`, `session-ses_*.md` (intentional safety nets from prior bleed events). Files matching these are off-tree by design — if you produce one, triage per substrate R1 to the appropriate `~/.local/share/<stream>/operational/exports/` rather than `git add`-ing it. The off-repo durable trees survive macOS temp-purge but their remote-parity gap is tracked in `HANDOFF.md` (vacuum V-F).

Never bypass with `--no-verify`. The pre-commit hook is the source of truth; if a hook fails legitimately, fix the root cause.

## Tests baseline

Last-known-green: ≈80 tests across 6 suites, build emits ≈10 routes. Both must stay green before any push touching `src/`. **Treat these numbers as advisory** — re-check via `npm test` and `npm run build` rather than trusting the figure. Tests are pure-function unit tests against `src/lib/`; no fixtures, no DB, no network.

## Client-Separation Substrate

Client information must never bleed across clients or into public surfaces. The four zones (`public:all`, `(me)`, `{client:rob}`, `{client:maddie}`) and their flow rules are documented at `~/workspace/meta-organvm/governance/client-separation-substrate.md`. Read that doc before triaging any cross-scope artifact, before pasting external session content into a chat bound to this repo, or before writing files that name another client. Routing rule: route by content / scope-of-generation (R1), not by user-declared intent. Live-paste rule: if cross-client material lands in this scope's chat, refuse to operationalize, suggest correct routing, never absorb the wrong-scope content into auto-memory.

## What NOT to do

- Do not re-bake brand-specific vocabulary into `content-strategy.ts` — keep it parametric.
- Do not add a Next.js `metadata` export for OG images when the file convention is already wired (creates duplicates).
- Do not bundle-commit working-tree changes — per-step disposition only.
- Do not write to the DONE counter at `meta-organvm/organvm-corpvs-testamentvm/data/done-id-counter.json` from this stream unless the active handoff explicitly authorizes a claim.
- Do not author new IRF rows for substrate that maps onto existing rows. Verify against `INST-INDEX-RERUM-FACIENDARUM.md` before claiming "new candidate emitted."
