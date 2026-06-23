# Session Handoff — Hokage Chess + Product Domain Engine
## 2026-04-25 | 5 Work Groups | 10 Vacuums

Previous session built the full Hokage Chess client project (market gap analysis, business model, landing page, course catalog, trademark research) and formalized the Product Domain Engine as a meta-system. Everything is committed and pushed. Nothing is deployed.

---

## Vacuum Namespace Index

This file tracks two distinct vacuum namespaces from different originating sessions. They share the word "vacuum" but are otherwise unrelated — each was atomized for a different concern.

| Namespace | Origin date | Source | Topic | Tracking |
|-----------|-------------|--------|-------|----------|
| **V1–V10** | 2026-04-25 | hokage-chess unified strategy session | Landing deploy, ORGANVM registration, Kit wiring, Discord, Cloudflare, etc. | Inline in this file (Groups 1–5 below); V7 = [#46](https://github.com/4444J99/hokage-chess/issues/46), V8 = [#45](https://github.com/4444J99/hokage-chess/issues/45) already promoted to GH |
| **V-A through V-F** | 2026-04-30 | client-separation substrate v0 (commit `27c50f4`) | Substrate Phases 2–4, sister-stream parity, conventions reconciliation, off-repo durability | All promoted to GH issues 2026-04-30 (see map below) |

**V-A..V-F → GH issue map:**

| Vacuum | Issue | Priority | What |
|--------|-------|----------|------|
| V-A | [#47](https://github.com/4444J99/hokage-chess/issues/47) | P1 | Phase 2 pre-commit guard (cross-client keyword bleed) — ✓ PR #61 merged 2026-05-02 (`c02797d`) |
| V-B | [#48](https://github.com/4444J99/hokage-chess/issues/48) | P2 | Phase 3 canonical-home promotion + seed.yaml schema normalization — ⊘ partial: PR #54 merged 2026-05-02 (`ad7ced8`) lands the anchor + `dual_purpose` flag; cross-repo migration to `meta-organvm/governance/` still deferred |
| V-C | [#49](https://github.com/4444J99/hokage-chess/issues/49) | P2 | Phase 4 conductor MCP scope-binding |
| V-D | [#50](https://github.com/4444J99/hokage-chess/issues/50) | P1 | Maddie-side parallel substrate (tracking proxy — actual work on Maddie repo) |
| V-E | [#51](https://github.com/4444J99/hokage-chess/issues/51) | P2 | Cross-scope conventions reconciliation (transcript-routing drift) |
| V-F | [#52](https://github.com/4444J99/hokage-chess/issues/52) | P1 | Chezmoi mirror of `~/.local/share/hokage-chess/operational/` — ✓ DONE |

Query both at once: `gh issue list --repo 4444J99/hokage-chess --label agent-fix`

---

## Group 1: SHIP THE LANDING PAGE
**Priority**: HIGH — this is the thing Rob can see and share TODAY
**Vacuums**: V6, V7, V8

### Relay Prompt:
```
The hokage-chess landing page is built at ~/Workspace/4444J99/hokage-chess/ (Next.js 16 + Tailwind v3).
It works at localhost:3000. It has NOT been deployed.

1. Deploy to Vercel (the repo is at 4444J99/hokage-chess on GitHub, private)
2. Check if hokagechess.com is available — if so, register it via Cloudflare
3. Wire the email capture form in src/app/page.tsx (currently console.log) to Kit (ConvertKit) API
4. Add OG image metadata for social sharing
5. Test on mobile (70%+ of YouTube traffic is mobile)

The landing page has 9 sections: Hero, Problem, Identity, Three Roads, Social Proof, Offer,
Journey Map, FAQ, Final CTA. Visual system: dark mode, Hokage Red #C41E3A, Oswald headlines,
DM Sans body, JetBrains Mono for ELO numbers.

Reference: ~/.claude/plans/2026-04-25-hokage-chess-unified-strategy-v3.md (Part 3: Landing Page Architecture)
```

---

## Group 2: ORGANVM REGISTRATION
**Priority**: MEDIUM — system hygiene, not customer-facing
**Vacuums**: V1, V2, V10

### Relay Prompt:
```
The hokage-chess project at ~/Workspace/4444J99/hokage-chess/ needs ORGANVM integration:

1. Create seed.yaml — organ: PERSONAL (4444J99), tier: standard, type: client-project,
   status: LOCAL. Edges: produces → nothing yet. Implementation: ACTIVE.
2. Register in registry-v2.json at meta-organvm/organvm-corpvs-testamentvm/
   — add entry under the PERSONAL organ section
3. Update IRF (INST-INDEX-RERUM-FACIENDARUM.md) with:
   - COMPLETED: hokage-chess market gap analysis, business model, landing page built
   - NEW ITEMS: deploy landing page, register domain, wire email funnel, build PDE skill
4. Note: the old a-organvm/hokage-chess repo is ARCHIVED in registry. The new repo is
   4444J99/hokage-chess. Update the registry entry to point to the new location.

Reference: registry-v2.json already has a stale "hokage-chess" entry under organvm-iii-ergon
with status ARCHIVED and note "Dissolved to materia-collider 2026-03-11". Update it.
```

---

## Group 3: BUILD THE PRODUCT DOMAIN ENGINE SKILL
**Priority**: HIGH — this is the meta-system that makes all future product builds repeatable
**Vacuum**: V4

### Relay Prompt:
```
Build the product-domain-engine skill at ~/Workspace/a-i--skills/skills/project-management/product-domain-engine/

The full plan is at ~/.claude/plans/mutable-weaving-raccoon.md (Parts 1-8).

Key design decisions already made:
- The PDE is a CONDUCTOR that orchestrates 7 existing skills (systemic-product-analyst,
  market-gap-analysis, research-synthesis-workflow, product-requirements-designer,
  brand-guidelines, pitch-deck-patterns, content-distribution)
- It adds: the rhetorical mode framework (logos=internal skeleton, ethos=built through
  academic density, pathos=built through social/media content, kairos=market timing)
- It adds: the 5-phase domain formalization protocol (IDENTIFY agents → MAP structures →
  ENCODE as computable objects → EXPRESS through rhetorical modes → DEPLOY with density)
- It adds: the composition matrix (which outputs serve which rhetorical function)
- It adds: the prompt sequence (universal build commands ordered per domain stage)
- It adds: cross-domain fertilization registry and organ chain traversal scoring

The skill should NOT duplicate existing skill content. It should reference them by name
and add only what they don't cover: the rhetorical framework, the formalization protocol,
the conductor sequencing, and the autopoietic feedback loop.

Four proof instances exist:
1. public-record-data-scrapper — logos+ethos dominant (density creates gravity)
2. styx — logos dominant (dissertation-grade, full organ chain I→II→III)
3. sovereign-systems--elevate-align — balanced (hub-and-spoke, 13-node brand system)
4. hokage-chess — pathos dominant (underdog narrative, shonen arc, community identity)

Also create: scripts/domain-audit.sh that scans a repo and scores it against the 3 modes.
```

---

## Group 4: ROB'S IMMEDIATE ACTIONS (Non-Code)
**Priority**: HIGH for channel growth, but these are ROB's actions, not ours
**Vacuums**: V6 (domain), V7 (email)

### Relay Prompt (for presenting to Rob):
```
Compile the following into a client-ready one-pager for Rob Bonavoglia (@HokageChess):

From the Strategic Growth Blueprint + our analysis, Rob's immediate actions are:

WEEK 1-2:
- Title audit: retitle top 20 videos with emotional hooks, push "Episode X" to end
- Set up Kit (ConvertKit) free account for The Scroll newsletter
- Create "The 1300 Escape Plan" lead magnet PDF (7 positions from his own games)
- Add lead magnet link to every YouTube video description

WEEK 3-4:
- Set up Discord server ("The Village") with Genin/Chunin/Jonin roles
- Launch "Jutsu of the Week" short-form content (3-5 min, one concept learned that week)
- Start 1 YouTube Short per day (dramatic puzzle format)

IMPORTANT — TRADEMARK:
- Using "Hokage Chess" for the YouTube channel = LOW risk
- Putting "Hokage" on MERCH or PHYSICAL PRODUCTS = needs trademark lawyer first
- Both existing HOKAGE USPTO filings are abandoned/stalled — opportunity to file his own
- Budget $500-1500 for proper clearance before any physical products
- NEVER use actual Naruto imagery, fonts, or character designs

Reference: ~/.claude/plans/2026-04-25-hokage-chess-unified-strategy-v3.md
Also: ~/Workspace/4444J99/hokage-chess/reference/docs/strategy/HokageChess_Quick_Reference.md
(the original operational playbook — already has daily/weekly/monthly checklists)
```

---

## Group 5: CHEZMOI PLAN DEBT
**Priority**: LOW — system hygiene, not blocking anything
**Vacuum**: V9

### Relay Prompt:
```
54 plan files exist in ~/.claude/plans/ that are NOT synced to chezmoi source at
~/Workspace/4444J99/domus-semper-palingenesis/private_dot_claude/plans/

Batch sync them:
  cp ~/.claude/plans/2026-04-2* ~/Workspace/4444J99/domus-semper-palingenesis/private_dot_claude/plans/
  cd ~/Workspace/4444J99/domus-semper-palingenesis
  git add private_dot_claude/plans/
  git commit -m "chore: sync 54 untracked plan files to chezmoi source"
  git push

Note: also check if any mutable-* plan files should be archived or renamed
to dated versions before syncing.
```

---

## Vacuum Summary

| # | Vacuum | Group | Status |
|---|--------|-------|--------|
| V1 | No seed.yaml | Group 2 | DONE 2026-04-25 (commit `b544076`) |
| V2 | Not in registry | Group 2 | DONE 2026-04-25 (commit `e68933d` in `meta-organvm/organvm-corpvs-testamentvm`) |
| V3 | No GitHub issues | Group 2 | IN PROGRESS — #44 (PRT-046) + #45 (V8 Vercel) + #46 (V7 Kit) opened 2026-04-29; new findings (dead-link `/pillars/<slug>`, manifest `EXCLUDED_DIRS` patch) registered in `docs/reviews/2026-04-30-eval-to-growth-master.md` §9.2 P0 — not yet GH-issued |
| V4 | PDE skill not built | Group 3 | OPEN — out of scope for Stream D execution |
| V5 | MEMORY.md missing entries | — | FIXED |
| V6 | Domain not registered | Group 1+4 | OPEN — user action (financial transaction) |
| V7 | No email funnel | Group 1+4 | DONE 2026-06-21 (commit `c253df8`) |
| V8 | Landing page not deployed | Group 1 | IN PROGRESS — OG asset + mobile QA + Vercel preflight doc (Phase 3); deploy gated on user auth |
| V9 | 54 plans unsynced to chezmoi | Group 5 | OPEN — out of scope for Stream D execution |
| V10 | IRF not updated | Group 2 | IN PROGRESS — Stream H Reconciliation Gate at session close |

---

## Session updates

### Stream D 2026-04-29 (`S-2026-04-29-rob-hokage`)

Macro-execution session derived from `~/.claude/plans/snuggly-gathering-bear.md` partition. Plan: `.claude/plans/` (synced post-execution).

**Working-tree alchemy (Phase 1):**
- `.gemini/`, `.history/` added to `.gitignore` (commit `deb23b1`)
- 2026-04-25 Rob call transcript restored from deletion + moved to `docs/archive/2026-04/` (commit `a2c5031`)
- 2026-04-28 audit ledger archived (3 snapshots: final 41KB, snapshot 16KB, raw .ini 86KB) (commit `ecf6300`)
- 2026-04-28 cross-stream Gemini workstream synthesis archived (commit `0afd1bc`)
- `.conductor/active-handoff.md` (Stream D entry permit) tracked (commit `6c248ae`)

**Substrate (Phase 2):**
- 75-person constellation master index + gap manifest shipped at `docs/business/2026-04-29-75-person-constellation-master.md` (commit `ef75cb1`); GH issue #44 opened (PRT-046).
- Vacuum status table refreshed (this section).

**Verified during Phase 0 preflight:** 56/56 vitest tests pass; `next build` succeeds; static prerender ✓ for `/`, `/_not-found`, `/for/[persona]` (3 personas: stuck-beginner, climbing-intermediate, returning-adult-improver).

**A1+A2 from `.claude/plans/2026-04-28-rob-world-allusions-sweep.md`:** confirmed shipped in commits `e4ed095`, `53bcd32` (content-strategy.ts at `src/lib/content-strategy.ts`, vitest wired, 52→56 tests across 4 suites).

**Closing this session (deferred to Phase 5):** Phase 3 deploy assets · Phase 4 Kit form wiring + runbook + Rob homework refresh · DONE counter increment · close-out summary · `.conductor/active-handoff.md` refresh for next Stream-D session.

### Stream D 2026-04-30 (`S-2026-04-30-eval-to-growth-ingest-digest`)

User-directed full ingest+digest pass with the 9-step Evaluation-to-Growth framework as the deliverable spine. Bounded contract: log exhaustively, implement bounded by tier-priority.

**Shipped (3 commits, pushed origin/main):**
- `c9fc331` chore(manifest): regenerate 2026-04-30 ingest snapshot (220→233 entries; +13 drift, of which 11 editor-noise + 2 substantive)
- `0485505` docs(review): 2026-04-30 evaluation-to-growth master review at `docs/reviews/2026-04-30-eval-to-growth-master.md` (682 insertions, 9-step framework, master register §9.2)
- `4319b4f` test: cover engine.ts barrel + landing-engine composition layer (56→80 tests, 4→6 suites)

**Verified:** `npm test` 80/80 ✓ · `npm run build` 10/10 routes ✓ · working tree clean · local:remote = 0:0.

**Load-bearing surprise (P0):** `src/lib/landing-engine/sections.ts:104` emits `href: \`/pillars/${slug}\`` but the `/app/pillars/` route does not exist — every `/for/<persona>` page renders 3 dead links. Tests don't validate route resolvability; Next.js doesn't statically check internal hrefs. Surfaced only via deep code-read. Fix options: (a) interim 1-line `/#cta`, (b) build `/app/pillars/[slug]/page.tsx` (synergizes with `/for/<persona>/<pillar>` long-tail SEO surface, review §8.5).

**Codex manifest tool blind spots (review §1.6):** `EXCLUDED_DIRS` does NOT include `.history/`, `.lh/`, `.gemini/` — drift signal:noise = 2:13 on this pass. P0 low-cost fix.

**IRF cross-mapping (review §6.4.1):** `xp-ledger.ts` matches existing PRT-038, Character Sheet onboarding matches PRT-039, dead-link is genuinely net-new candidate. No new IRF rows authored from Stream D (Gate territory).

**Memory captures:** 3 new entries in `~/.claude/projects/-Users-4jp-Workspace-4444J99-hokage-chess/memory/` (eval-to-growth artifact, dead-link finding, bounding-contract feedback) + MEMORY.md index updated.

**Tier A user-decisions surfaced (carrying forward):** dead-link fix (option a or b) · manifest `EXCLUDED_DIRS` patch · `seed.yaml` vacuum closure (`produces`/`consumes`/`last_validated`/`dual_purpose`) · GH issue creation for review §9.2 P0 items.

### Stream D 2026-04-30-late (`S-2026-04-30-client-separation-substrate`)

User-pasted Maddie-intent session-export ("Editing flow: vacuum gate, quiz copy, and CTA plan", `ses_21fd26adfffermWYH45QGFy0P4`) into a Hokage-scoped chat triggered articulation of containment topology. Doc-only session, no `src/` perturbation.

**Shipped (commit `27c50f4`, pushed origin/main):**
- `docs/governance/client-separation-substrate.md` (NEW) — v0 substrate: 4 zones, R1 routing, live-paste rule, triage protocol, audit log
- `CLAUDE.md` — `## Client-Separation Substrate` anchor section
- `.claude/plans/2026-04-30-client-separation-substrate.md` (mirror of `~/.claude/plans/upon-submitting-maddie-asks-robust-fern.md`)

**Triage events (off-repo, gitignored, not in commit):**
- `session-ses_21fd.md` (84 KB) → `~/.local/share/hokage-chess/operational/exports/2026-04-30-165616-…-ses_21fd26adfff.md`
- `Untitled-1.md` (2186 B, audit-pass discovery, cross-stream content) → `~/.local/share/workspace/operational/exports/2026-04-28-013516-universe-overlap-cross-stream-untitled-1.md`
- `export-20260427203906.md` (121 KB, audit-pass discovery, Rob CWD Gemini session) → `~/.local/share/hokage-chess/operational/exports/2026-04-28-013516-find-drive-files-domain-gemini-export.md`

**Memory captures:** `feedback_client_separation_substrate.md` + MEMORY.md index updated. Substrate-rule only — no Maddie session content quoted into Hokage auto-memory.

**Vacuums atomized — now triple-referenced (HANDOFF + active-handoff + GH issues, 2026-04-30 evening):**
- V-A → [#47](https://github.com/4444J99/hokage-chess/issues/47) — Phase 2 pre-commit guard (cross-client keyword bleed) · ✓ PR #61 merged 2026-05-02 (`c02797d`)
- V-B → [#48](https://github.com/4444J99/hokage-chess/issues/48) — Phase 3 substrate-doc canonical-home promotion + seed.yaml schema normalization · ⊘ PR #54 merged 2026-05-02 (`ad7ced8`) — partial: anchor + `dual_purpose` only; cross-repo migration deferred
- V-C → [#49](https://github.com/4444J99/hokage-chess/issues/49) — Phase 4 conductor MCP scope-binding (`conductor_session_start` requires `client` param when CWD ∈ client tree)
- V-D → [#50](https://github.com/4444J99/hokage-chess/issues/50) — Maddie-side parallel substrate (tracking proxy on this repo; actual work lands on `organvm/sovereign-systems--elevate-align`)
- V-E → [#51](https://github.com/4444J99/hokage-chess/issues/51) — Cross-scope conventions reconciliation (transcript-routing drift between Maddie convention and this substrate)
- V-F → [#52](https://github.com/4444J99/hokage-chess/issues/52) — Chezmoi mirror of `~/.local/share/hokage-chess/operational/` (P1) · ✓ DONE 

**IRF candidate (NET-NEW, surfaced for Stream-H Gate):** Client-separation substrate row. Domain: META/governance. Priority: P1.

**Verified at session close:** working tree clean · 0:0 origin parity · auto-memory hygiene held (no Maddie content quoted) · live-paste rule self-applied · zero overwrites / zero `--no-verify` / zero IRF-body writes / zero DONE-counter writes / zero cross-repo writes.
