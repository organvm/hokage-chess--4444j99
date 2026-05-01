# Canonical Prompts → Full Build (Batch Plan)

**Date:** 2026-05-01
**Repo:** `/Users/4jp/Workspace/4444J99/hokage-chess`
**Stream:** D (Rob / hokage-chess)
**Slash command:** `/batch canonical source of all my prompts broken into atomic asks, find plans devised--full total build of all suggested`
**Mode:** Auto + plan-mode + parallel worktree dispatch
**Mirror target (post-approval):** `<repo>/.claude/plans/2026-05-01-canonical-prompts-full-build.md`

---

## Context

The user's instruction asked to take the canonical source of their prompts, find the plans devised from atomization, and execute "full total build of all suggested." After research, this maps cleanly to a synthesized work queue rather than 24,599 raw prompt-atoms — the user's own system already condensed atoms → plans → §9.2 register. Operating on the §9.2 register (the queue CLAUDE.md explicitly names "the canonical next-session work queue") is the correct interpretation, not raw atoms.

Per user response to scope question: **Option A** — §9.2 register + §B.3 codable skeletons + V-A/V-B repo-locked subset (~10 units inside `4444J99/hokage-chess/**`). Per dispatch question: **the more elevated ideal** — honor CLAUDE.md's dispatch protocol (Claude for strategic, Codex for testing/mechanical, Gemini for content), surfaced per-unit in the dispatch matrix below. /batch's parallel-worktree-PR flow stays the spawn mechanism; the cognitive class is named in each agent prompt so the worker applies the right discipline.

---

## Canonical-source map (Phase 1 research output)

The user's prompt corpus and synthesis chain:

| Layer | Location | Size | Role |
|---|---|---|---|
| Raw prompts (annotated) | `~/.claude/prompts/annotated-prompts.jsonl` | 25 MB | Workspace-wide prompt corpus |
| Per-client prompts | `~/.claude/prompts/{rob,maddie}-prompts-2026-04-27.jsonl` | 6.2 MB | Client-bound corpora |
| Atom system | `conductor` MCP server (live: 24,599 atoms, 6,361 done) | — | Workspace-wide atomization |
| Plans devised | `~/.claude/plans/*.md` (~30 files) + `<repo>/.claude/plans/*.md` (5 files) | varies | Synthesized work units |
| Vacuum table | `<repo>/HANDOFF.md` (V1–V10 + V-A..V-F) | 16.7 KB | Durable session-bridging queue |
| GH issues | `4444J99/hokage-chess` (52 open) | — | Triple-referenced atomization |
| **Canonical work queue** | **`<repo>/docs/reviews/2026-04-30-eval-to-growth-master.md` §9.2** | **682-line review** | **What CLAUDE.md flags as authoritative** |

The work queue (§9.2 register, 10 items) + skeleton register (§B.3, 4 items, 1 codable in-scope) + V-A/V-B agent-fix issues (#47, #48 hokage-side portion) constitute the "all suggested" surface for this batch.

---

## Unit decomposition (9 units)

Each unit is self-contained, worktree-isolated, and independently mergeable. File-conflict bundling: §9.2 items P0/P2/P3 all touch `tools/project_manifest.py` (lines 20, 166–190, 193–223 — spatially isolated but worktree-conflict-prone) → bundled into Unit 7 with one PR. §9.2 P1 drift tool is a NEW file → separate Unit 8.

### Unit 1 — Pillars route + dead-link fix + per-pillar long-tail
**§9.2 P0 (dead-link fix) + §9.2 P3 (per-pillar route) + §B.3 (skeleton candidate)**
**Cognitive class:** Strategic (architecture: route shape + content composition decisions)

**Files (3 new, 1 edited):**
- NEW: `src/app/pillars/[slug]/page.tsx` — dynamic route with `generateStaticParams` returning all 6 pillars (tactics, strategy, calculation, endgame, time-management, tilt-resistance)
- NEW: `src/app/for/[persona]/[pillar]/page.tsx` — long-tail SEO surface (3 personas × 6 pillars = 18 SSG pages)
- NEW: `tests/pillars-routes.test.ts` — generateStaticParams coverage + composition assertions
- EDITED: `src/lib/landing-engine/sections.ts:104` — verify `/pillars/${slug}` href resolves (no change to href; only validation)

**Pattern source:** Mirror `src/app/for/[persona]/page.tsx` exactly. Consume `PILLAR_DESCRIPTIONS` (sections.ts:64–71) + `PILLAR_ADJACENCY` (sections.ts:55–62) for hero + adjacency grid. Compose CTAs back to `/for/<persona>` for pillar-specific persona match.

### Unit 2 — `src/lib/xp-ledger.ts` module + tests
**§B.3 code-skeleton candidate + IRF-PRT-038 (port from sister codebase)**
**Cognitive class:** Strategic (architecture: data model + level curves)

**Files (2 new):**
- NEW: `src/lib/xp-ledger.ts` — pure functions + types: `Character`, `XPGain`, `Level`, `Tier`; `calculateXP(pillar, action) → number`, `determineLevel(totalXP) → Level`, `getTierForElo(elo) → Tier ('genin' | 'chunin' | 'jonin')`; XP threshold constants per pillar
- NEW: `tests/xp-ledger.test.ts` — function-coverage + boundary cases

**Pillar source:** Reuse `PillarId` from `src/lib/landing-engine/personas.ts:20–26` (6 chess pillars). Tier boundaries from strategy v6: 0–1199 / 1200–1599 / 1600+. **Do not over-engineer** — strategy doc references this as a port from `a-organvm/gamified-coach-interface`, not greenfield design.

### Unit 3 — `docs/substrate/hokage/` 8-strata skeleton
**§9.2 P1**
**Cognitive class:** Content-tactical (Gemini-class, but doc-structural)

**Files (9 new):**
- NEW: `docs/substrate/hokage/README.md` — top-level index naming the 8 strata + their Hokage-specific intent
- NEW: `docs/substrate/hokage/01-ontology/README.md` through `08-external-contribution/README.md` — per-stratum stub: 1-sentence intent + sources block + "TBD" expansion notes

**Pattern source:** Mirror `docs/substrate/bodi/` exactly (already 8-strata, full-tree, populated). Hokage tree should be a **stub skeleton**, not populated — closure surface for §7.6 BODI/Hokage scope confusion in eval review.

### Unit 4 — V-B hokage-side anchor + `seed.yaml` `dual_purpose: true`
**§9.2 P1 (dual_purpose) + V-B (#48 hokage-side portion only — cross-repo migration deferred)**
**Cognitive class:** Strategic (governance) + mechanical (schema edit)

**Files (1 edited, 1 new):**
- EDITED: `seed.yaml` — add `metadata.dual_purpose: true` (closes §7.6 scope mismatch; signals dual landing-page-and-substrate function declared in CLAUDE.md)
- NEW: `docs/governance/CANONICAL-HOME-ANCHOR.md` — short forwarding note declaring the canonical workspace-wide home for `client-separation-substrate.md` (target: `meta-organvm/governance/`); flags Phase 3 cross-repo migration as deferred to `meta-organvm` stream
- EDITED: `docs/governance/client-separation-substrate.md` — append link to anchor doc (single-line)

**Out of scope (cross-repo, breaks repo-lock):** moving the doc to `meta-organvm/governance/`, schema-definitions update, sovereign-systems migration. These are tracked in #48 for Phase 3 cross-repo work.

### Unit 5 — `/api/subscribe` integration test
**§9.2 P2 + §B.4 test gap**
**Cognitive class:** Tactical (testing) — Codex-class

**Files (1 new):**
- NEW: `tests/api-subscribe.test.ts` — vitest fetch-mock covering 5 response branches:
  1. `invalid_json` (400) — POST with non-JSON body
  2. `invalid_email` (400) — JSON without email or malformed
  3. `config_incomplete` (503) — env vars absent
  4. `kit_error` (502) — Kit API returns non-200
  5. `ok` (200) — happy path, env vars present, Kit returns 200

**Pattern source:** Mirror `tests/landing-engine.test.ts` test-shape (Vitest `describe`/`it`/`expect`). Mock `fetch` via `vi.spyOn(global, 'fetch')`. Stub env vars via `vi.stubEnv()` at suite head; restore at suite end.

### Unit 6 — Component snapshot tests (`landing/*Section.tsx`)
**§9.2 P2 + §B.4 test gap**
**Cognitive class:** Tactical (testing) — Codex-class

**Files (2 new + 1 edited):**
- NEW: `tests/components/landing.test.tsx` — render-and-snapshot for `HeroSection`, `ProblemSection`, `ThreePathsSection`, `CtaSection`; assert prop-contract failures via `expectTypeOf`
- NEW: `vitest.workspace.ts` (or extend `vitest.config.ts`) — add a second project entry with `environment: 'jsdom'` constrained to `tests/components/**/*.test.tsx`
- EDITED: `package.json` — add `@testing-library/react`, `jsdom` to devDependencies; add `@types/react-dom` if absent

**Pattern source:** No existing `.test.tsx` in repo. Use Testing Library `render` + `asFragment().toMatchSnapshot()`. Component prop contracts captured by Explore (HeroSectionProps with type/pillarLabel/ratingBand/heading/subhead/ctaLabel/ctaHref, etc.).

### Unit 7 — Manifest tool overhaul (3 changes bundled)
**§9.2 P0 (EXCLUDED_DIRS) + §9.2 P2 (cross-doc refs) + §9.2 P3 (frontmatter tagger)**
**Cognitive class:** Mechanical (refactoring + extension) — Codex/OpenCode-class

**Files (1 edited):**
- EDITED: `tools/project_manifest.py`
  - Line 20 (`EXCLUDED_DIRS`): add `.history`, `.lh`, `.gemini`
  - Lines 166–190 (`tags_for()`): YAML-frontmatter-aware extraction; merge user-supplied tags with keyword detection
  - Lines 193–223 (`thread_group()` or new post-pass): regex-extract `IRF-PRT-\d+|PRT-\d+|[a-f0-9]{7,40}|[a-z/\-.]+\.(md|ts|yaml)` → emit edge list to JSONL (new `references` field per file entry)

**Verification:** Run `python3 tools/project_manifest.py`; `jq '.references | length' docs/manifests/2026-05-01*.jsonl | head` → expect non-zero edge counts on threaded files. `.history/`, `.lh/`, `.gemini/` files absent from output.

### Unit 8 — `tools/manifest_drift.py` (new tool)
**§9.2 P1**
**Cognitive class:** Mechanical (boilerplate generation) — Codex-class

**Files (1 new):**
- NEW: `tools/manifest_drift.py` — argparse CLI taking `--baseline <path-to-prior-jsonl>` + `--current <path>` (default: latest in `docs/manifests/`); emits per-thread diff: ADDED / REMOVED / HASH-CHANGED files + summary table

**Verification:** Run `python3 tools/manifest_drift.py --baseline docs/manifests/2026-04-29-project-manifest-annotated-bibliography.jsonl --current docs/manifests/2026-04-30-project-manifest-annotated-bibliography.jsonl` → expect output matching ANNEX A drift report (2 substantive + 11 editor-noise files).

### Unit 9 — V-A pre-commit guard (cross-client keyword bleed)
**V-A (#47, P1) + closes Phase 2 of client-separation-substrate**
**Cognitive class:** Mechanical (script + hook setup) — Codex/OpenCode-class

**Files (2 new + 1 edited):**
- NEW: `scripts/check-cross-client-bleed.sh` — bash script that scans staged diff (`git diff --cached`) for cross-client keyword set: `maddie|Maddie|Sovereign Spiral|sovereign-systems|elevatealign\.com|stopdrinkingacid\.com|eaucohub\.com`; exits 1 if matched outside whitelist (the substrate doc itself, audit-log entries)
- NEW: `.husky/pre-commit` (or use `scripts/install-git-hook.sh` to copy to `.git/hooks/pre-commit`) — invokes the check
- EDITED: `package.json` — add `husky` to devDependencies + `prepare` script (`husky install`)

**Verification:** Stage a sample doc with "maddie" inside `docs/business/` → expect rejection; stage a doc with "maddie" inside `docs/governance/client-separation-substrate.md` → expect pass (whitelist).

---

## Dispatch matrix (per CLAUDE.md protocol)

Per the user's "more elevated ideal" answer, each unit is classified per the work-type table. /batch's parallel-worktree spawn stays the mechanism (general-purpose Agents); the cognitive class is named in each agent prompt so the worker applies the right discipline. Units flagged "Codex-class" or "Gemini-class" are spawned as general-purpose for /batch contract compliance, but the user is alerted that an external `conductor_fleet_dispatch` rerun for those units is the protocol-faithful path.

| # | Unit | Class | Ideal target | Spawned as |
|---|---|---|---|---|
| 1 | Pillars route | Strategic (arch) | Claude | general-purpose worktree |
| 2 | xp-ledger | Strategic (arch) | Claude | general-purpose worktree |
| 3 | Hokage substrate skeleton | Tactical (content) | Gemini | general-purpose worktree (note: Gemini-class) |
| 4 | V-B + dual_purpose | Strategic (governance) | Claude | general-purpose worktree |
| 5 | /api/subscribe test | Tactical (testing) | Codex | general-purpose worktree (note: Codex-class) |
| 6 | Component tests | Tactical (testing) | Codex | general-purpose worktree (note: Codex-class) |
| 7 | Manifest overhaul | Mechanical | Codex/OpenCode | general-purpose worktree (note: Codex-class) |
| 8 | Manifest drift tool | Mechanical | Codex | general-purpose worktree (note: Codex-class) |
| 9 | V-A pre-commit guard | Mechanical | Codex/OpenCode | general-purpose worktree (note: Codex-class) |

---

## E2E test recipe matrix

Per advisor: e2e recipe varies by unit type. Each worker applies the recipe matching its unit.

| Unit | Type | E2E recipe |
|---|---|---|
| 1 | code-runtime route | `npm run build` (expect prerender ✓ for `/pillars/[slug]` × 6 + `/for/[persona]/[pillar]` × 18); `npm run dev` → curl `http://localhost:3000/pillars/tactics`, `/pillars/tilt-resistance`, `/for/stuck-beginner/tactics` → expect 200 + body containing pillar label/description |
| 2 | logic-only | `npm test -- xp-ledger` (expect new tests pass); skip browser e2e |
| 3 | docs | `ls docs/substrate/hokage/` shows 8 stratum dirs + 9 README files; `cat` each is non-empty markdown; skip e2e |
| 4 | docs+schema | `python3 -c "import yaml; yaml.safe_load(open('seed.yaml'))"` succeeds and contains `metadata.dual_purpose == True`; skip browser e2e |
| 5 | tests | `npm test -- api-subscribe` (expect 5 branches all pass); skip dev-server e2e — fetch is mocked |
| 6 | tests | `npm test -- components/landing` (expect snapshot matches; jsdom env active for `.test.tsx`); skip browser e2e |
| 7 | tool | `python3 tools/project_manifest.py` → `jq 'select(.path | test("\\.history/")) | .path' <jsonl>` returns empty (exclusion working); `jq '.references' <jsonl>` shows non-empty edge lists on docs that cite `IRF-PRT-NNN`; `jq '.tags' <jsonl>` shows frontmatter tags merged in |
| 8 | tool | `python3 tools/manifest_drift.py --baseline <2026-04-29.jsonl> --current <2026-04-30.jsonl>` → expect 2 ADDED substantive files + 11 ADDED editor-noise (matching ANNEX A) |
| 9 | hook | sample-stage with "maddie" in `docs/business/foo.md` → `bash scripts/check-cross-client-bleed.sh` exits non-zero; sample-stage with "maddie" in `docs/governance/client-separation-substrate.md` → exits zero (whitelist) |

**Cross-cutting verification (all units):** `npm test` (expect 80 + new tests passing — no regressions); `npm run build` (expect 10 routes baseline + new routes from Unit 1).

---

## Worker template (verbatim per /batch)

Each agent prompt contains:
1. The user's overall instruction (verbatim)
2. The unit's specific task (title + file list + change description, copied verbatim from above)
3. Cognitive class label (e.g., "this is Codex-class mechanical refactoring — be terse, minimal, no architecture mode")
4. Codebase conventions discovered:
   - Path alias `@/*` → `./src/*` (from `tsconfig.json`)
   - Tailwind v3 (not v4); design tokens in `tailwind.config.js` + `src/app/globals.css`
   - Vitest run-mode (`vitest.config.ts`, env: `node`); `.test.tsx` requires jsdom env (Unit 6 sets this up)
   - Pre-commit gitleaks runs aggressively on credential-keyword substrings — use `// allow-secret` if needed; never `--no-verify`
   - Path discipline: stay inside `4444J99/hokage-chess/**`; do NOT touch `meta-organvm` or `~/.claude/`
5. The unit's e2e recipe from above
6. The standard worker instructions (verbatim):

```
After you finish implementing the change:
1. **Simplify** — Invoke the `Skill` tool with `skill: "simplify"` to review and clean up your changes.
2. **Run unit tests** — Run `npm test` (and `npm run build` if your unit touches `src/` routes or pages). If tests fail, fix them before committing.
3. **Test end-to-end** — Follow the e2e test recipe from the coordinator's prompt. If the recipe says to skip e2e for this unit, skip it.
4. **Commit and push** — Commit all changes with a clear conventional-commit message (`feat:`, `fix:`, `chore:`, `test:`, `docs:`). Push the branch (the worktree branch name is auto-generated by the isolation:worktree mechanism). Create a PR with `gh pr create --title "<title>" --body "<body>" --base main`. Use a descriptive title scoped to the unit. Do NOT push to main directly.
5. **Report** — End with a single line: `PR: <url>` so the coordinator can track it. If no PR was created, end with `PR: none — <reason>`.
```

---

## Pre-spawn checklist (coordinator side, post-approval)

Before spawning workers:
1. Mirror this plan to `<repo>/.claude/plans/2026-05-01-canonical-prompts-full-build.md` per CLAUDE.md plan-discipline rule
2. Commit + push the plan mirror (`git add .claude/plans/2026-05-01... && git commit -m "plans: 2026-05-01 canonical-prompts-full-build batch plan" && git push`)
3. Verify `gh auth status` (workers will use `gh pr create`)
4. Confirm baseline `npm test` (80 tests) + `npm run build` (10 routes) — workers verify against this baseline

---

## Spawn (Phase 2)

All 9 agents in a single message, `isolation: "worktree"`, `run_in_background: true`, `subagent_type: "general-purpose"`. Each gets the worker template + their unit's specifics + the cognitive-class note.

---

## Verification (final, post-spawn)

Once all 9 agents report:
1. Render PR-tracking table (PRs landing as URLs from each agent)
2. For each PR: read the diff, confirm scope adherence, confirm e2e recipe was honored
3. Render final table: `9/9 units landed as PRs` (or note failures)
4. Recommend follow-on: external `conductor_fleet_dispatch` rerun for the 5 Codex-class + 1 Gemini-class units if user wants protocol-faithful alternative implementations

---

## Out of scope (explicitly)

These were considered but excluded by the chosen scope (Option A) or by repo-lock:
- §9.2 §9.4 arch-tier (extract landing-engine to npm, repo-health pulse GH Action) — deferred to Option B/C
- V-C #49 (conductor MCP scope binding) — workspace-level, breaks repo-lock
- V-D #50 (Maddie-side substrate parallel) — outside repo
- V-E #51 (cross-scope conventions reconciliation) — workspace-level
- V-F #52 (chezmoi mirror) — touches `~/.local/share/` + chezmoi source, not worktree-able
- AF-1..5 — meta-organvm parity work, breaks repo-lock
- RB-1..11 / CWS-x / FWS-x / BR-x / MP-x — Rob's actions / strategic docs / content (not codable)
- B.3 Discord bot, Character Sheet Canva template — external services
- Cross-repo portion of V-B (#48 Phase 3 substrate move + sovereign-systems schema migration)
