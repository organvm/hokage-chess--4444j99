# Hokage Chess — 4-Level Funnel Architecture (v1)

**Date:** 2026-04-25
**Subject:** Install BODI's funnel discipline into Hokage Chess
**Source:** `2026-04-25-rob-call-transcript-source.md` (concept IDs `ID-001..ID-009`); mirrors `2026-04-25-bodi-funnel-with-premium-content-architecture.md`
**Synthesis:** `2026-04-25-cross-pollination-master-diagnosis.md`
**Lineage:** `2026-04-25-strategy-v6-master.md` (Naruto stack, pricing tiers, founder-asset position); `2026-04-25-apex-predator-lineage-appendix.md` (parent architecture)
**Status:** v1 architecture, blocked on Kit (ConvertKit) API key for L2 deploy
**IRF:** PRT-044

---

## 1. Master diagnosis (mirror direction, ID-004)

> **Hokage** has all this premium content (322 YouTube videos, 3+ years documented climb) and is not moving people through a funnel.
> **BODI** has no premium content and is moving people through a funnel.
> The fix: install the missing layer in each.

**Implication for Hokage:** Rob's 322 videos + "Road to 1500" series + ~1350 ELO authentic-climb authority constitute massive premium-content reserves — but the conversion path from "found-on-YouTube" to "Genin Squad subscriber" is structurally undefined. BODI's L1-L4 funnel is a working template Rob already knows by muscle memory. We adopt it wholesale, then re-skin to chess.

This document specifies the 4-level adaptation.

---

## 2. The L1-L4 mirror (BODI mechanism → Hokage substrate)

The structural correspondence is exact. Each BODI level has a chess-domain equivalent that re-uses the *same operational pattern*.

| Level | BODI (fitness) | Hokage (chess) | Naruto-stack tier | Pricing |
|---|---|---|---|---|
| **L1** | Cold leads — IG hashtag/follower scrape | Cold leads — chess-content discovery | (pre-tier) | $0 |
| **L2** | Opt-ins — Google Form → free fitness plan + email capture (Teamzy) | Opt-ins — lead magnet → free chess plan + email capture (Kit) | (pre-tier) | $0 |
| **L3** | Customers — VIP private group, paying | Customers — Genin Squad subscriber | **Genin** | $9/mo |
| **L4** | Ambassadors — sell Rob's products (downline) | Ambassadors — student-coaches in Jonin Mentorship | **Jonin** (mid: **Chunin** at $29) | $99/mo (Chunin $29/mo) |

**Why this mirrors cleanly:** BODI's funnel is a **content → email → product → multiplier** cascade. Hokage already has the content (322 videos). The scaffolding need is in the L1→L2 capture and L3→L4 multiplier — exactly the mechanisms BODI has running.

---

## 3. Each level, specified

### 3.1 L1 — Cold leads (chess-content discovery)

**Mechanism:** passive + active discovery of chess-curious viewers who don't know Hokage exists.

**Passive (algorithm-driven):**
- YouTube SEO/recommendation surface — driven by Bridge Content cadence (PRT-040: Jutsu of the Week, Boss Battle), thumbnail/title overhaul, hook-first 8-second openers (existing v6 Channel Health diagnosis).
- Twitter/X chess-community engagement — reply quote-RTs of chess.com / chess24 / lichess accounts; signal-boost with Hokage takes.
- r/chess presence — answer technique questions, link to relevant Hokage video where directly responsive.
- Threads / Bluesky chess corner — earlier-mover advantage on lower-density platforms.

**Active (parallel to BODI's hashtag scrape):**
- Manual outreach to NYC chess parks / clubs (Rob's existing social capital — Washington Square, Union Square, Bryant Park).
- Twitter list of ~200 chess content consumers (1000-1800 ELO range) → engage their content first, then DM the warm subset.
- Comment-mining own YouTube videos for engaged-viewer DM candidates ("hey, saw your comment on episode 35 — want a free opening repertoire to get past 1400?").

**L1 → L2 conversion mechanism:** every L1 surface points to a single CTA: **the free Lead Magnet** (see §3.2).

**Effort comparison to BODI L1:** Hokage L1 should be *less* manual than BODI L1 because the YouTube algorithm carries more weight than IG's — but the engagement-mining work is direct mirror of Rob's hashtag scrape.

### 3.2 L2 — Opt-ins (lead magnet → email capture)

**Mechanism:** chess-domain equivalent of BODI's "free fitness plan via Google Form."

**Lead magnet options (pick one for v1, expand to suite over time):**
1. **"Get to 1400" opening repertoire PDF** — 2 lines vs e4, 2 lines vs d4, 1 vs c4 / Nf3. Tight, opinionated, not a sprawling encyclopedia. Rob's actual repertoire, with annotations.
2. **"Endgame primer for the climbing player"** — 10 essential endgames (K+P vs K, opposition, Lucena, Philidor, etc.) with diagrams. Targets the universal weakness at 1200-1500.
3. **"Hokage Episode 35 study companion"** — annotated PGNs from the Road-to-1500 series, with Rob's verbal analysis transcribed. Ties magnet to existing content gravity.

**Recommended:** start with **#1 opening repertoire** — fastest to produce, most algorithmically search-ranked ("chess opening repertoire 1400" is high-intent).

**Capture mechanism:**
- **Tool:** Kit (ConvertKit) — confirmed Hokage stack choice (per `project_artifact_hokage_v6_refresh.md`).
- **Form:** Single-field email capture, Hokage-branded landing page (already in repo at `src/app/` route — needs `/free-plan` slug or similar).
- **Fulfillment:** Kit triggers immediate email with PDF + a 5-piece **welcome content pack** (top 5 Hokage YouTube videos, sequenced) + invitation to join the Hokage Discord.

**Vacuum (BLOCKED — user action):**
- Kit API key not yet provisioned (PRT-030). Until provisioned, L2 cannot deploy.
- 60s user action: kit.com signup → API Keys → drop into `.env.local` as `KIT_API_KEY`.

**Teamzy-equivalent state schema (Kit tags):**
- `hokage_lead` — captured via lead magnet
- `hokage_lead_source:{repertoire|endgame|episode35|other}` — which magnet pulled them
- `hokage_welcome_pack_engaged` — clicked at least one of the 5 pieces
- `hokage_discord_joined` — joined Discord
- `hokage_genin_eligible` — eligible for L3 ask (warm enough)

### 3.3 L3 — Customers (Genin Squad — $9/mo)

**Mechanism:** Kit warm-up sequence → Genin Squad subscription pitch → paid tier entry → Genin Discord channel access (private from L2 free Discord).

**Genin Squad value (per v6 strategy):**
- Weekly group puzzle with Rob's annotated solutions
- Monthly cohort live stream (study-group format, Q&A)
- Genin-tier Discord access (peer climbing community, 1000-1500 ELO range)
- "Road to X" personal accountability check-ins (light — heavy is Chunin)

**L2 → L3 conversion mechanism:**
- Kit drip: 4 emails over 14 days post-magnet, each tying a free Hokage piece to the Genin Squad value prop ("see how I handle this position when you're working through your repertoire? That's what we go through every Sunday in the Genin Squad — $9 to join us").
- Live Q&A reel (mirrors BODI's L2 retention tactic) — VIP-only Q&A snippets used as L3 ask trigger ("the full Q&A drops in the Genin Squad Sunday — link in bio").

**Genin retention (mirrors BODI L3's "warm-up via Teamzy"):**
- Kit drip continues post-conversion: monthly "Genin progress check-in" email that asks for ELO/rating delta and offers Chunin upsell at the right inflection point.

**Chunin Dojo upsell ($29/mo):** live group sessions, structured weekly homework, position-of-the-week analysis. Not a separate funnel level — **a within-L3 tier upgrade**, parallel to BODI's "VIP-of-VIPs" treatment. The student trades cohort sessions for tighter accountability.

### 3.4 L4 — Ambassadors (Jonin Mentorship — $99/mo + ambassador toolkit)

**Mechanism:** loyal Chunin → invited to Jonin Mentorship → 1:1 with Rob → eventually invited to **coach below them**.

**Jonin value (per v6 strategy):**
- Bi-weekly 1:1 with Rob (45min, video, recorded)
- Custom training plan
- Position-by-position deep dive on student's recent games
- Direct DM access to Rob

**Ambassador layer (the actual L4):** Jonin students who demonstrate teaching capacity are invited to **lead Genin or Chunin cohorts** under a revenue-share model. This is the chess-domain equivalent of BODI's downline structure:
- Jonin student becomes a Genin cohort facilitator → 30% rev share on each Genin sub they bring + retain.
- Hokage gets multiplier-of-coaches; students get monetization path; Rob gets time leverage.

**Ambassador toolkit (mirrors §3.5 of BODI doc):**
- Genin cohort facilitation playbook (cadence, talking points, escalation rules)
- Top 30 Hokage videos with caption + hashtag templates for repost
- "First 30 days as a Hokage Ambassador" one-pager (mirrors `docs/ROB-FIRST-30-DAYS.md`)
- Constellation reading list — chess-domain (Naroditsky, Hikaru, Levy/GothamChess, Daniel Naroditsky, Anna Cramling, etc.)
- Kit drip campaign template ambassadors can adapt for their cohort

---

## 4. CRM choice (vacuum — pick one in v1.1)

BODI runs Teamzy. Hokage needs an equivalent **operational hub** with these capabilities:
- Email list + drip campaigns
- Tag/segment by funnel state (`hokage_lead` → `hokage_genin` → `hokage_chunin` → `hokage_jonin`)
- Webhook integrations (purchase events from Stripe / chess platform)
- Ideally: native Discord integration for role-grant on conversion

**Candidates:**

| Tool | Email | Tags | Webhooks | Discord | Cost (1k subs) | Verdict |
|---|---|---|---|---|---|---|
| **Kit (ConvertKit)** | ★ | ★ | ★ | via Zapier | $29/mo | **Recommended** — already in v6 stack, simplest path. |
| Beehiiv | ★ | ✓ | ✓ | via Zapier | $39/mo | Newsletter-first; built-in referral program is a real edge for L4 |
| Custom (Postmark + tag table) | ✓ | engineer | ★ | engineer | $0 + dev time | Maximum control, real engineering cost. Defer. |
| Teamzy | ★ | ★ | ? | via Zapier | $29/mo | Rob already knows it — could *unify* both businesses on one CRM |

**Recommendation:** **Kit for v1**, evaluate Beehiiv at 500-sub mark for the referral program, evaluate Teamzy if Rob prefers unified-CRM for both BODI + Hokage (significant operational simplification).

**Decision needed:** user/Rob to confirm Kit vs Teamzy unification by v1.1 (1-2 weeks).

---

## 5. Hooks into existing IRF backlog

This funnel architecture explicitly depends on or feeds into:

| IRF | Title | Relation |
|---|---|---|
| **PRT-030** | Kit API key | **BLOCKS L2 deploy.** 60s user action. |
| **PRT-036** | OG image generation per-page | Feeds L1 social shareability — every funnel-relevant page needs an OG image |
| **PRT-037** | Mobile responsiveness QA | 70%+ YouTube traffic is mobile; L1→L2 conversion bottlenecked on mobile UX |
| **PRT-038** | LCC schema port (xp-ledger / quests / achievements) | Feeds Genin/Chunin/Jonin gamification (parent architecture) |
| **PRT-039** | Character Sheet onboarding (6 chess stats) | L2→L3 conversion ritual — onboarding gives Genin Squad immediate texture |
| **PRT-040** | Bridge Content pillar (Jutsu of Week / Boss Battle) | Top-of-funnel L1 attraction surface (this session) |
| **PRT-041** | Discord rituals codification | L2/L3 retention scaffolding (this session) |
| **PRT-043** | BODI funnel architecture | Cross-direction (mirror) |
| **PRT-044** | Hokage funnel architecture | THIS DOCUMENT |
| **PRT-045** | Cross-pollination master diagnosis | Synthesis (this session) |

---

## 6. Implementation sequence

| Phase | Duration | Depends on | Action |
|---|---|---|---|
| **P0 Lead magnet build** | 1 week | nothing (Rob's existing repertoire knowledge) | Author "Get to 1400" opening repertoire PDF; design + layout in Hokage palette |
| **P1 Kit setup + capture page** | 3 days | PRT-030 Kit API key (USER ACTION) | Provision Kit, build `/free-plan` route in Next.js app, wire form → Kit API, test fulfillment email |
| **P2 Welcome pack curation** | 2 days | P0 + P1 | Pick top-5 Hokage YouTube videos for welcome pack; sequence them; write fulfillment email body |
| **P3 L1 traffic activation** | concurrent w/ P0-P2 | PRT-040 Bridge Content launching | Add `/free-plan` CTA to YouTube descriptions, channel about page, episode end-screens |
| **P4 Genin Squad launch** | 2 weeks | P1-P3 stable | Build Stripe → Kit tag webhook; private Discord channel with Genin role gate; launch announcement to email list |
| **P5 Chunin tier** | 1 week | P4 + 10+ Genins acquired | Add Chunin tier in Stripe; upsell drip campaign in Kit |
| **P6 Jonin + ambassador layer** | 1 month | P5 + first cohort of 50+ Genins | Author Jonin sales page; build ambassador toolkit; pilot with 1-2 willing Chunins |

**Earliest revenue impact:** P4 Genin launch (~3 weeks if Kit key arrives Day 1).
**Highest leverage:** P0 lead magnet — cheapest single deliverable, unlocks the entire L2 mechanism.

---

## 7. Open vacuums

### Blocked on user
- **PRT-030 Kit API key** — 60s action, blocks all of L2.
- **CRM unification decision** — Kit vs Teamzy as single source of truth across BODI + Hokage.
- **hokagechess.com domain registration** — blocks public deploy, blocks `/free-plan` URL share-ability.

### Blocked on Rob
- Repertoire content for Lead Magnet PDF (Rob has the lines in his head; needs to record/type them).
- Welcome pack — Rob's pick of his own top-5 videos for new subscribers.

### Open architectural decisions
- **Bridge Content cadence vs L1 surface:** PRT-040 specifies Jutsu/Boss Battle templates. The cadence (weekly Jutsu, monthly Boss Battle) is the L1 algorithmic-attraction layer's heartbeat. If Rob can sustain ≥1 Jutsu/week, L1 stabilizes by Month 2. If not, L1 stays Rob-manual-DM-heavy.
- **Discord ritual ladder vs L2/L3:** PRT-041 specifies Welcome Wednesday / Loot Drop Friday / Quest Log Sunday. The first ritual the new lead encounters (likely Welcome Wednesday) is a major L2 retention moment. Should the magnet fulfillment email *time itself to land Tuesday* so the new lead hits Welcome Wed within 24h?
- **Naruto-stack tier expansion:** v6 has Genin/Chunin/Jonin. Should there be a free-but-credentialed pre-Genin tier? ("Academy Student"?) BODI doesn't have this. Risk: friction-free L2 → L3 may be a feature, not a gap.

---

## 8. Cross-reference graph

```
2026-04-25-rob-call-transcript-source.md         ← canonical source (Gemini-cleaned)
        │
        ├── 2026-04-25-bodi-funnel-with-premium-content-architecture.md   ← mirror direction
        ├── 2026-04-25-hokage-4-level-funnel-architecture.md              ← THIS DOC
        └── 2026-04-25-cross-pollination-master-diagnosis.md              ← synthesis
```

Plus lineage:
- `2026-04-25-strategy-v6-master.md` — pricing tiers, Naruto-stack canonical, founder-asset position
- `2026-04-25-business-plan-v2.md` — Genin/Chunin/Jonin commerce model — DO NOT redefine
- `2026-04-25-pitch-deck-v3.md` — narrative framing
- `2026-04-25-apex-predator-lineage-appendix.md` — parent architecture (Tier 1-4 mapping)
- `docs/ROB-FIRST-30-DAYS.md` — execution playbook (existing, reference for ambassador toolkit)
- `seed.yaml` — repo edge declarations

---

## 9. Reception (acceptance criteria)

This architecture ships as v1 when:
1. ✅ Source transcript mirrored in repo (`605269b`)
2. ✅ This document committed and pushed
3. ⏳ Lead magnet PDF authored (P0)
4. ⏳ Kit API key provisioned (PRT-030, USER ACTION)
5. ⏳ `/free-plan` route built in landing page (P1)
6. ⏳ First lead captured via Kit
7. ⏳ First Genin Squad conversion

v2 trigger: any of (a) Kit replaced by Teamzy or another CRM, (b) Genin/Chunin/Jonin pricing adjusted, (c) ambassador rev-share model formalized differently than 30%.
