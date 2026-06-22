# [MP-9] Cohort Challenge Ritual Design — Quarterly Legion Challenges

| Field | Value |
| :--- | :--- |
| `doc_id` | MP-9-cohort-challenge-ritual |
| `title` | Cohort Challenge Ritual Design (Quarterly Legion Challenges, Paid Entry) |
| `type` | strategy-spec |
| `created_at` | 2026-06-21 |
| `received_at` | 2026-04-26 (atomized from fitness world map §7.8) |
| `source/provenance` | GH issue #42 (MP-9); derives from `2026-04-26-rob-fitness-world-map.md` §7.8 |
| `version` | 1.0 |
| `confidence` | medium (benchmarks web-grounded; Rob-specific numbers are modeled, not measured) |
| `translation_status` | interpreted |
| `status` | PROPOSED |
| `priority` | P1 |
| **Related Atoms** | MP-1 (Pillar Taxonomy), MP-2 (Content Rhythm), FWS-2 (Paid Community platform), BR-1 (Bridge Content), MP-10 (Time Budget) |

> Date prefix `2026-04-26` groups this doc with its parent lineage (the fitness world map it was atomized from). True authorship clock is `created_at` above, per the three-clock model in `2026-05-09-document-timeline-governance-sop.md`.

---

## 1. Executive Summary

The **cohort challenge** is the single highest-leverage *recurring revenue ritual* available to Rob, and the one most directly inherited from his Beachbody/BODI lineage — Beachbody ran on quarterly challenge groups for two decades, and every working Skool fitness operator still runs them. It is the engine that converts free audience into paid community on a predictable calendar.

This spec defines the ritual: a **quarterly cadence** of **6–8 week** challenges, each with a **free entry-level tier** (list growth) and a **paid tier with weekly check-ins** (revenue + transformation production). The strategic payoff is twofold:

1. **Revenue cadence.** Four challenge launches per year give four predictable revenue spikes plus a ~25% conversion of paid participants into the ongoing community at ~$49/mo (CommuniPass benchmark, world map §3.4). The challenge is the *front door*; the community is the *house*.
2. **Content engine.** Each cohort manufactures transformations on a fixed clock. Transformations → Reels → list growth → next cohort. The ritual is self-feeding: the output of challenge N is the marketing fuel for challenge N+1.

The distinctive move — unavailable to any pure-fitness operator — is the **Bridge cohort** (§7): a challenge where participants train body *and* chess concurrently ("Hokage Bulk"), operationalizing the "discipline transfers across domains" thesis from MP-1 Pillar 3 into a single paid product.

**Dependencies.** This ritual runs *on top of* the paid community platform defined in **FWS-2** (the Skool/Discord "Hidden Leaf Legion" hub per MP-1 §4.E) — the challenge is the acquisition ritual, not the platform itself. The Bridge cohort's viability rests on **MP-1**'s pillar architecture (the Overlap audience must exist for "Hokage Bulk" to find buyers).

---

## 2. The Ritual at a Glance

```
        QUARTERLY CHALLENGE RITUAL (one of four per year)

  PRE-LAUNCH (2 wk)      LIVE CHALLENGE (6–8 wk)      POST (2 wk)
  ┌──────────────┐      ┌──────────────────────┐    ┌─────────────┐
  │ Tease + open │      │ Wk1 onboarding         │    │ Results     │
  │ free signups │ ───▶ │ Wk2–7 weekly check-ins │ ──▶│ reels +     │
  │ Upsell paid  │      │ Wk(N) finale + judging │    │ → community │
  │ tier         │      │                        │    │ conversion  │
  └──────────────┘      └──────────────────────┘    └─────────────┘
        │                        │                          │
        ▼                        ▼                          ▼
   LIST GROWTH            TRANSFORMATIONS            ~25% → $49/mo
   (free tier =          (paid tier = weekly         ongoing member
    email capture)        accountability)            (recurring floor)
```

Three nested loops:
- **Per-challenge loop** (one quarter): pre-launch → live → post, above.
- **Annual loop** (four challenges): the seasonal calendar in §3.
- **Content loop** (continuous): each cohort's transformations feed the discovery surface that fills the next cohort (§6).

---

## 3. Cadence — The Quarterly Calendar

Four challenges per year, each themed to the season's natural fitness intent. Naming inherits the "Legion" identity (the Legion of Fitness FB group / "Hidden Leaf Legion" community per MP-1).

| Quarter | Window | Challenge | Theme / Goal | Seasonal logic |
| :--- | :--- | :--- | :--- | :--- |
| **Q1** | Jan–Feb | **Legion Cut** | Fat-loss / recomposition, 8 wk | New-year resolution wave; highest-intent acquisition window of the year |
| **Q2** | Apr–May | **Legion Forge** | Strength / habit-building, 6 wk | "Summer prep" run-up; consistency + base-building framing |
| **Q3** | Jul–Aug | **Legion Bulk** | Muscle / hypertrophy, 8 wk | Off-season mass phase; pairs with Rob's own documented Body Beast bulk (world map §6) |
| **Q4** | Oct–Nov | **Hokage Bulk** (Bridge) | Body **+** chess training arc, 8 wk | Indoor season; the flagship Bridge cohort (§7). Cut off before holidays. |

**Cadence rules:**
- **One challenge live at a time.** Never overlap; the off-weeks between challenges are when the *community* (FWS-2) carries engagement and the content engine processes the prior cohort's results.
- **Q1 is the anchor.** "Legion Cut" lands in the resolution window — it should be the largest cohort and the one most heavily promoted. Treat it as the annual flagship for the pure-fitness pillar.
- **Q4 is the Bridge flagship.** "Hokage Bulk" is the cross-pillar experiment; running it last lets the year's three fitness cohorts season the audience and grow the Overlap group before asking them to also train chess.
- **6 vs 8 weeks:** cut/bulk (body-composition outcomes) need 8 weeks to show visible transformation for reels; the Q2 strength/habit challenge can run 6 weeks because the deliverable is consistency, not a before/after photo.

---

## 4. Structure — One Challenge, Week by Week

Reference structure for an **8-week** challenge (compress middle weeks for the 6-week Q2 variant).

| Phase | Timing | What happens | Owner / surface |
| :--- | :--- | :--- | :--- |
| **Pre-launch** | T–2 wk | Tease on IG/Shorts; open free signups (email capture); "doors close" countdown for the paid tier | Social (MP-2 cadence) → newsletter |
| **Onboarding** | Week 1 | Baseline photos + measurements + starting benchmark; assign program; kickoff live call | Community (FWS-2) |
| **Build** | Weeks 2–4 | Weekly check-in (form, progress, accountability); midpoint live Q&A | TrueCoach / Zoom / community |
| **Push** | Weeks 5–7 | Intensity ramp; leaderboard; spotlight member stories (content seeds) | Community + social |
| **Finale** | Week 8 | Final photos + benchmark; judging; winners announced; transformation reveal | Live call + social |
| **Post** | T+1–2 wk | Edit transformations → reels; testimonial capture; **conversion offer to ongoing community** | Content engine (§6) |

**The weekly check-in is the load-bearing ritual.** It is the thing the paid tier pays for and the thing that produces the accountability that produces the transformation. Each check-in: a member-submitted update (photo / lift number / chess rating delta for Bridge) + a coach response + a public leaderboard nudge. This is the single mechanic Beachbody and every Skool operator share — do not water it down.

---

## 5. Pricing — Free Entry + Paid Tier

A two-tier ladder. The free tier is an **acquisition instrument** (it exists to grow the list, per world map §7.1); the paid tier is the **revenue + transformation instrument**.

| Tier | Price | What's included | Strategic role |
| :--- | :--- | :--- | :--- |
| **Free — "Recruit"** | $0 | Challenge calendar, daily-habit checklist, public leaderboard view, community #challenge channel (read + cheer), the workout schedule | **List growth.** Email capture is the entire point. Low-friction yes; large top-of-funnel. |
| **Paid — "Legionnaire"** | **$79** flat / challenge | Everything in Free **+** weekly check-ins, the structured program (PDF/TrueCoach), kickoff + midpoint + finale live calls, accountability pod, prize eligibility, before/after coaching | **Revenue + transformations.** The accountability gate. This is where results (and reels) are made. |
| **Premium — "Sensei" (cap 10)** | **$249** / challenge | Everything in Legionnaire **+** 1:1 weekly review, custom programming adjustments, direct DM access | **High-margin skim.** Caps Rob's time; converts the most committed into the coaching backend (world map §7.5, TrueCoach). |

**Pricing rationale:**
- **$79 paid entry** sits below the $97/mo niche-coaching ceiling (world map §3.4) but is a *one-time* challenge fee, not a subscription — low enough to be an impulse "yes" off a reel, high enough to create skin-in-the-game (the mechanism that drives completion → transformation).
- **$249 premium**, capped at 10 seats, is the scarcity tier; it both protects Rob's hours and seeds the 1:1 coaching layer.
- **The conversion offer (post-challenge):** Legionnaires who finish are offered the ongoing community (FWS-2) at **~$49/mo**, ideally with a "first month included / discounted" graduation hook. Target **25% conversion** of paid finishers (CommuniPass benchmark). This is where the challenge stops being a one-time spike and becomes a recurring-revenue feeder.

### 5.1 Illustrative unit economics (one Q1 "Legion Cut")

*Modeled, not measured — replace with real numbers after the first live cohort. Assumes Rob's existing Legion of Fitness FB group + IG as the seed audience.*

| Line | Conservative | Stretch |
| :--- | :--- | :--- |
| Free-tier signups | 300 | 800 |
| Paid "Legionnaire" ($79) | 40 (~13% of free) | 120 (~15%) |
| Premium "Sensei" ($249) | 5 | 10 |
| **One-time challenge revenue** | **~$4,400** | **~$11,970** |
| Paid finishers (~70% completion) | 28 | 84 |
| → Community conversions @ 25% ($49/mo) | 7 → $343/mo | 21 → $1,029/mo |
| **Recurring lift added per challenge** | **~$343/mo** | **~$1,029/mo** |

Across four challenges/year the recurring floor compounds — the strategic value is not any single launch but the *accumulating* community MRR each cohort deposits.

---

## 6. Content Engine — Transformations → Reels → List Growth

The challenge is not just a product; it is a **content factory on a fixed clock**. This is the mechanism world map §7.8 names: "content engine that produces transformations (which feed reels which feed list growth)."

```
   COHORT N                          COHORT N+1
   ┌─────────────┐                   ┌─────────────┐
   │ check-ins   │  raw footage      │ pre-launch  │
   │ + before/   │ ───────────────▶  │ tease uses  │
   │ after +     │   transformations │ N's reels   │
   │ testimonials│   → reels/shorts  │ as proof    │
   └─────────────┘   → newsletter    └─────────────┘
                     → free signups ─────────▲
                       (list growth) ────────┘
```

**Production rules:**
- **Capture is built into the ritual, not bolted on.** Baseline + finale photos/benchmarks are *required* fields of onboarding and finale (§4). No transformation capture = no content = broken engine.
- **The finale produces the next launch's ammunition.** Week-8 reveals become the pre-launch teasers for the next quarter's challenge. The calendar (§3) is timed so post-production of cohort N overlaps pre-launch of cohort N+1.
- **Routing into the MP-2 rhythm:** transformation reels slot into the Tuesday/Thursday fitness slots; the challenge recap and member spotlights anchor the Sunday "Quest Log" newsletter. The challenge does not get its own separate cadence — it *fills* the existing one (MP-2).
- **Each cohort feeds the owned list.** Every free signup is an email captured (world map §7.1). The challenge is the single best list-growth event Rob can run, precisely because the "free tier" deliverable justifies the email ask.

---

## 7. Bridge Angle — "Hokage Bulk" (Train Body, Train Chess Concurrently)

This is the strategically distinctive cohort and the reason this ritual matters beyond pure fitness. It operationalizes **MP-1 Pillar 3 (the Bridge / Discipline)** and world map §7.12 ("nobody occupies the chess + iron version") into a *sellable product*.

**The concept:** an 8-week paired training arc where each participant runs **two concurrent progressions** — a hypertrophy/strength block *and* a chess-improvement block — on the same accountability rails. The thesis made tangible: *discipline is one muscle, trained in two domains.*

| Element | Fitness track | Chess track |
| :--- | :--- | :--- |
| **Baseline** | Photos, lifts, bodyweight | Current rating (Chess.com/Lichess), tactic-rating |
| **Weekly check-in** | Training log + progress photo | Games played, puzzle streak, rating delta |
| **Program** | Hypertrophy block (Body Beast lineage) | Structured study plan (openings + tactics + game review) |
| **Finale benchmark** | Before/after + strength PRs | Rating gain + a "boss battle" rated game |
| **The transformation reel** | Physique change | Rating-climb graphic — *two* before/afters in one story |

**Why it's defensible:**
- It is the only cohort in the calendar a competitor *can't copy* without owning both identities — it is Rob's literal moat (chess discipline + iron discipline + the documented willingness to train both).
- It produces a **doubled transformation artifact**: a body change *and* a rating climb in a single member story — more shareable, more distinctive, and natively cross-pillar (it markets both the chess and fitness funnels at once).
- It is the cleanest top-of-funnel into the **unified premium community** (MP-1 §4.E) — Hokage Bulk graduates *are* the Overlap audience by construction.

**Sequencing caveat:** Hokage Bulk is the **Q4 flagship**, run *after* three pure-fitness cohorts have grown the audience and after the chess and fitness audiences have been cross-pollinated by Bridge content (BR-1). Running it too early risks selling a dual-discipline product to an audience that only signed up for one. Validate the Overlap exists (MP-1 §3) before scaling this cohort.

---

## 8. Dependencies & Sequencing

| Dependency | Relationship | Status / note |
| :--- | :--- | :--- |
| **FWS-2 — Paid community** | *Platform.* The challenge runs on top of the Skool/Discord "Hidden Leaf Legion" hub; the $49/mo conversion target *is* the FWS-2 community. | Must exist before the conversion step has anywhere to convert *to*. The challenge can soft-launch on the existing free FB group, but the recurring-revenue payoff needs the gated tier. |
| **MP-1 — Pillar architecture** | *Bridge viability.* "Hokage Bulk" only works if the Overlap audience exists. | CANONICAL. Pillar 3 defines the Bridge; this doc productizes it. |
| **MP-2 — Content rhythm** | *Distribution.* Challenge content fills the existing weekly cadence, not a parallel one. | CANONICAL. Transformation reels fill Tue/Thu fitness slots; recap fills Sunday Quest Log. |
| **BR-1 — Bridge content** | *Audience prep.* Cross-pollinates chess/fitness audiences ahead of Hokage Bulk. | Run continuously; gates the Q4 cohort's readiness. |
| **MP-10 — Time budget** | *Capacity constraint.* Weekly check-ins + live calls are the heaviest recurring time cost in the whole architecture. | The "Sensei" cap (10 seats) and one-challenge-at-a-time rule exist to protect against time blowout. Reconcile cohort size with MP-10 before scaling. |

**Recommended first move:** run a **single small pilot** of "Legion Cut" against the existing free FB group + IG — even before the full FWS-2 gated community is built — to measure real free→paid and paid→completion rates, capture the first transformation reels, and replace the modeled numbers in §5.1 with measured ones. Build the recurring $49/mo gate once the pilot proves the front door converts.

---

## 9. Open Questions / Path-Not-Taken (per timeline-governance SOP §F)

- **Platform commit:** Skool ($99/mo flat) vs. Whop vs. Patreon+Discord for the challenge mechanics and the $49/mo gate — deferred to FWS-2. Pricing in §5 assumes a flat-fee platform (no per-member scaling).
- **Programming source:** does Rob deliver his own program (PDF / Body Beast-adjacent) or lean on BODI's library? Affects margin and "owned product" status (world map §7.3). Recommend an *owned* companion program so the challenge sells something with Rob's name on it.
- **Prize structure:** cash vs. merch vs. free-coaching-month as the finale prize — affects both cost and the conversion hook. Not specified here; decide per-cohort.
- **Cert/credential framing:** whether to surface a coaching credential (world map §7.11) to differentiate the paid tier from "just a Beachbody challenge group." Open.
- **Path not taken — monthly cadence:** rejected. Monthly challenges burn the audience and the creator (MP-10) and dilute each finale's transformation impact. Quarterly preserves scarcity and gives the content engine time to process each cohort.

---

*Companion documents:*
- `2026-04-26-rob-fitness-world-map.md` §7.8 — the white-space slot this doc fills
- `2026-06-21-pillar-architecture-taxonomy.md` (MP-1) — pillar definitions; Bridge = Pillar 3
- `2026-04-26-rob-content-rhythm.md` (MP-2) — the cadence challenge content fills
- `2026-04-25-bodi-funnel-with-premium-content-architecture.md` — the funnel this ritual feeds
