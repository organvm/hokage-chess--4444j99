# BODI — Funnel With Premium Content (Architecture v1)

**Date:** 2026-04-25
**Subject:** Rob Bonavoglia's BODI/Beachbody MLM fitness business
**Source:** `2026-04-25-rob-call-transcript-source.md` (this directory) — atomized concept IDs `ID-001..ID-009`
**Cross-reference:** `2026-04-25-hokage-4-level-funnel-architecture.md` (mirror direction); `2026-04-25-cross-pollination-master-diagnosis.md` (synthesis)
**Status:** v1 architecture, awaiting Rob premium-content links to populate `Premium Content Library` section
**IRF:** PRT-043

---

## 1. Master diagnosis (verbatim, ID-004)

> **Hokage** has all this premium content and is not moving people through a funnel.
> **BODI** has no premium content and is moving people through a funnel.
> The fix: install the missing layer in each.

**Implication for BODI:** Rob is burning his highest-effort hours at L1 cold-scraping because there is no passive-attraction surface above the funnel. The solution is not to cold-scrape harder — it is to install a **premium content layer** that converts Rob's existing reels and inspirational shorts into a top-of-funnel pulling force, so leads arrive pre-warmed instead of pre-cold.

This document specifies the architecture of that injection.

---

## 2. Existing BODI funnel (ID-001, preserved verbatim)

| Level | Status | Mechanism | Tool / Outcome |
|---|---|---|---|
| **L1** | Cold leads | IG hashtag/follower scraping of fitness influencers; manual prospecting (`ID-002` lead scraping) | Hand prospecting |
| **L2** | Opt-ins | DM → "join my free fitness group" → personalized free plan via Google Form → email capture (`ID-003` ecosystem transition: rented → owned data) | **Teamzy** CRM + email list |
| **L3** | Customers | Warm L2s in Teamzy → filter dead leads → convert to paying VIP → enter private group chat | Teamzy + product purchase |
| **L4** | Ambassadors | Recruit loyal VIPs to sell the products themselves (downline) | MLM-style scaling |

**Key infrastructure:** **Teamzy** is the operational hub from L2 onward. All warmth tracking, drip cadence, and conversion state live in Teamzy.

**Rob's stated friction:** *"That's the top, yeah, that's where I spend the most time doing."* L1 manual scrape is the rate-limiter on the entire funnel.

---

## 3. Premium content injection (the new layer)

The architecture below adds **content surfaces at every level** without restructuring the existing L1-L4 mechanism. Rob's existing tools (Teamzy, Google Form, private group chat, downline) remain canonical. Content sits *above* and *alongside* — not *instead of*.

### 3.1 L0 — Passive attraction (NEW — replaces L1 manual burn)

**Surface:** Rob's reels + inspirational shorts as a public broadcast layer.
**Platform priority:** Facebook (Rob's primary, has existing Page) → Instagram Reels → YouTube Shorts (re-cuts).
**Cadence:** ≥3 reels/week minimum to maintain algorithm warmth. Daily preferred.
**Format constraint:** *every post must carry unique information* (per call: "every post needs to be unique information"). No motivational platitudes — actionable fitness intelligence per piece.

**Content pillars (proposed — to validate against Rob's incoming reel links):**
1. **Form check** — 30-60s technique correction (deadlift, squat, push-up, etc.)
2. **Mindset short** — Rob's signature "free move" inspirational format
3. **Plan teaser** — preview of what the free Google Form plan delivers (gates curiosity → drives L1→L2)
4. **Constellation post** — citation/credit to one of the 75 inspirations (Adler, Negreanu, Spencer, Mitro, Freeman, etc.). Builds in public, signals research depth, expands reach via tag/mention.

**Mechanism:** L0 content is the magnet. Cold prospects find Rob via algorithm/discovery instead of Rob hand-DMing them. **L1 cold-scrape time drops as L0 content depth increases.**

> **Premium Content Library — pending Rob links** (Rob homework hook):
> - [ ] Inspirational short example #1 (Rob: send link)
> - [ ] Form-check reel example #1 (Rob: send link)
> - [ ] Facebook Page direct URL (Rob: confirm canonical handle)
> - [ ] Instagram handle for cross-post (Rob: confirm)
> - [ ] Existing reel inventory count + topic distribution (Rob: send list)

### 3.2 L1 — Targeted outreach (REDUCED in volume, IMPROVED in quality)

**Old L1:** ~100% of prospect volume came from manual hashtag/follower scraping.
**New L1:** Only the high-friction edge cases that L0 doesn't reach naturally. Rob still scrapes, but **only the niches L0 cannot capture passively**.

**Filter rule:** *if a prospect has engaged with a Rob reel in the last 30 days, escalate to L2 directly.* Skip the cold-DM step for warm prospects.

**Workflow change:**
- Old: hashtag → follower list → blanket DM "what's up?" → hope for response.
- New: pull engagement list from Rob's L0 reels (likes, saves, comments) → DM the warm subset first ("saw you saved my last form check — want a free plan?"). Cold DM only the residual.

**Effort allocation target:** L1 manual time should drop from "where I spend the most time" to ≤25% of weekly funnel hours within 60 days of L0 content cadence stabilizing.

### 3.3 L2 — Opt-in (UNCHANGED mechanism, ENHANCED retention)

**Mechanism remains:** DM → "join free fitness group" → Google Form → personalized plan → Teamzy capture.

**Premium content addition:** the personalized plan delivery now ships **with** a content drop:
- Plan PDF + a 5-piece **Rob-curated content pack** (best-of reels, niche-relevant)
- Calendar invite to Rob's next live Q&A reel (ritualizes follow-up)

**Why:** L2 is where leads die. Per Rob: *"some people just stay level 2 and they fizzle, I delete them."* The content drop is a **second touchpoint beyond the plan**, raising retention probability before the L3 warm-up call.

**Teamzy fields to add:**
- `content_pack_delivered_at` (timestamp)
- `content_pack_engagement` (boolean — did they DM Rob about any of the 5 pieces?)
- `live_qa_attended` (boolean — first ritual attendance is a strong L3 conversion signal)

### 3.4 L3 — VIP / Customer (UNCHANGED commerce, ADDED premium series)

**Mechanism remains:** L2 warmth → product purchase → private group chat (VIP).

**Premium content addition:** VIP-only series:
- **Weekly Rob deep-dive** — 5-10min long-form content gated to VIP group only. Mix of plan recap, training science, mindset.
- **Monthly Q&A reel** — VIPs submit questions, Rob compiles into a short. Social proof + retention.
- **Constellation case study** — VIP-only writeup of one constellation profile each month (Adler / Negreanu / Spencer / Mitro / Freeman / etc.). Signals Rob's market-research discipline and gives VIPs proprietary insight.

**Why:** VIP retention is the rate-limiter on L4 ambassador recruitment. A VIP who feels they're getting *more than the product* — a curated curriculum, a research community — is materially more likely to want to become an ambassador.

### 3.5 L4 — Ambassador / Downline (UNCHANGED model, ADDED toolkit)

**Mechanism remains:** loyal VIPs invited to sell BODI products under Rob's downline.

**Premium content addition:** **Ambassador Toolkit** — a starter library that new ambassadors inherit on day one:
- Top 20 of Rob's L0 reels, with caption + hashtag templates ambassadors can repost
- A "first-30-days as a Rob downline" one-pager (mirrors Hokage's `docs/ROB-FIRST-30-DAYS.md` structure)
- Constellation reading list (Adler's *Beach Money*, Spencer's website, etc.)
- Onboarding call script (Rob's L1 → L2 conversation, codified)

**Why:** ambassadors who inherit Rob's content discipline + research framework convert downline-of-downline more effectively. Each successful ambassador becomes a multiplier, not just a duplicator.

---

## 4. Implementation sequence

| Phase | Duration | Depends on | Action |
|---|---|---|---|
| **P0 Audit** | 1 week | Rob homework | Inventory existing reels (count, topics, dates); flag content gaps; identify top 5 reels by engagement as L0 seed |
| **P1 L0 stabilize** | 4 weeks | P0 | Daily reel cadence; institute 4-pillar topic distribution; track follower delta + DM-inbound rate weekly |
| **P2 L1 filter rule** | concurrent w/ P1 | L0 reaching ≥1k weekly views | Add "engaged-in-30d" filter to Rob's prospect spreadsheet; route warm DMs first |
| **P3 L2 content pack** | 2 weeks | P1 stable | Build 5-piece content pack template; add Teamzy fields; ship with next 10 plan deliveries to test |
| **P4 L3 deep-dive series** | 1 week launch + ongoing | P3 | Pick 8-week deep-dive curriculum; record first 4 episodes; gate to VIP group |
| **P5 L4 toolkit** | 2 weeks | P4 | Compile top-20 reels + one-pager + constellation reading list; deliver to existing ambassadors first as test |

**Earliest revenue impact:** P3 (L2 retention lift) — the cheapest wins are in the part of the funnel that's already live.
**Highest leverage:** P1 (L0 cadence) — drops L1 manual hours, the binding constraint on Rob's weekly capacity.

---

## 5. Open vacuums (Rob's homework + user compile work)

### Rob's homework
- Send all premium reel links (FB Page reels, IG reels, inspirational shorts) — populates §3.1 inventory
- Send 70 more constellation profiles (current 5: Adler, Negreanu, Freeman, Spencer, Mitro)
- Confirm Facebook Page handle + Instagram handle as canonical L0 surfaces
- Disclose Teamzy field schema (existing fields) so §3.3 additions can be specified, not duplicated

### User/system work (next session, on receipt of Rob materials)
- Compile incoming reel links into a master file (recommend: `docs/business/2026-04-2X-rob-premium-content-inventory.md`)
- Topic-classify reels into 4-pillar distribution (form-check / mindset / plan-teaser / constellation)
- Build `2026-04-2X-bodi-l4-ambassador-toolkit.md` from this doc's §3.5 spec
- Decide repo split: stay Hybrid-C (BODI strategy in `hokage-chess/docs/business/`) until BODI gets its own deployable surface; revisit when Rob asks for a public BODI landing page

### Cross-cutting
- **Constellation file** — separate doc tracking all 75 profiles. Each profile gets: name, domain, why-Rob-cares, link-to-asset, system-extracted-from-them. This is the canonical research output of the constellation methodology (`ID-005`).
- **Cross-Demographic Systems Modeling defense** (`ID-006`) — when Rob resists a profile (e.g. Mitro), default position is *include and study*. The principle: study mechanics, not affinity.

---

## 6. Cross-reference graph

This document is one of three forming the Rob master architecture set:

```
2026-04-25-rob-call-transcript-source.md         ← canonical source (Gemini-cleaned)
        │
        ├── 2026-04-25-bodi-funnel-with-premium-content-architecture.md   ← THIS DOC
        ├── 2026-04-25-hokage-4-level-funnel-architecture.md              ← mirror direction
        └── 2026-04-25-cross-pollination-master-diagnosis.md              ← synthesis
```

Plus lineage:
- `2026-04-25-strategy-v6-master.md` — Hokage v6 strategy (cross-pollination must align with v6 framing)
- `2026-04-25-apex-predator-lineage-appendix.md` — voice/tone reference for content templates
- `2026-04-25-business-plan-v2.md` — Hokage commerce model (parallels BODI L3-L4)
- `2026-04-25-pitch-deck-v3.md` — narrative framing (cross-business synthesis is a deck-level story)

---

## 7. Reception (acceptance criteria)

This architecture ships as v1 when:
1. ✅ Source transcript mirrored in repo (`605269b`)
2. ✅ This document committed and pushed
3. ⏳ Rob receives + acknowledges (pending review)
4. ⏳ Premium Content Library populated from Rob's link delivery
5. ⏳ Teamzy field additions (§3.3) negotiated with Rob's existing CRM schema
6. ⏳ P0 audit week scheduled (calendar action — pending Rob review)

v2 trigger: any of (a) Rob disputes a level definition, (b) reel inventory shows topic distribution incompatible with 4-pillar split, (c) Teamzy schema collision forces a different state model.
