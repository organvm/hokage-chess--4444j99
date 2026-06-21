# Hokage Chess — Gap Map

**Status:** SKELETON — Phase-1 engagement-start gaps
**Last Updated:** 2026-06-01 (30-day TBD sweep)
**Format mirrors:** docs/substrate/bodi/04-gap-map/bodi-gap-map.md

## Identified Gaps

| Gap | Category | Status | Blocking condition |
| :--- | :--- | :--- | :--- |
| **Lead magnet not built** | Acquisition | `OPEN` | "The 1300 Escape Plan" (7-position PDF, 15–20 pages, Canva) is Phase-1's critical non-video deliverable; no email anchor without it |
| **Email capture not wired** | Acquisition | `OPEN` | Kit (ConvertKit) Hokage chess track not configured inside MP-7 shared subscriber base; ~99 existing subscribers have no welcome sequence |
| **Discord not shipped** | Community | `OPEN` | "The Village" with Genin/Chunin/Jonin role tiers and 3 seed channels unbuilt; community retention layer absent |
| **CTA stack inconsistent** | Retention | `OPEN` | 322 existing videos do not consistently route to canonical CTA (hokagechess.com/free-plan → Discord → subscribe) |
| **Title strategy under-leveraged** | Acquisition | `OPEN` | Top 20 videos lead with "Episode X" not emotion/stakes hook; CTR bleeds at unknown rate; no A/B testing rhythm |
| **No Bridge Content cadence** | Retention | `OPEN` | "Jutsu of the Week" (Tuesday weekly) + "Boss Battle" (monthly) specified but not running |
| **Daily Shorts not running** | Acquisition | `OPEN` | Vertical puzzle format (1/day × 28 days) absent |
| **Premium tier absent** | Revenue | `DEFERRED` | Naruto-stack pricing (Genin $9 / Chunin $29 / Jonin $99) designed but unshipped; Phase-2 deliverable gated on stable Phase-1 audience |
| **Trademark posture undefined** | Legal | `BLOCKED` | Phase-2 merch / physical chess pieces requires $500–$1,500 clearance budget; no HOKAGE CHESS filing in chess-product classes; Phase-1 channel use is LOW risk |

## Structural Diagnosis

Hokage has **premium content depth** (322 videos, multi-year "Road to 1500" documentary climb) with **no capture or retention layer**. BODI has L1→L4 funnel infrastructure but lacks premium content depth. The cross-pollination diagnosis (`docs/business/2026-04-25-cross-pollination-master-diagnosis.md`): transplant BODI's funnel mechanism into Hokage's content-rich domain.

The lead magnet and email list are the critical unlocks — without them, every new YouTube viewer exits permanently. Discord amplifies once the list has ≥50 subscribers; the premium tier ships once Discord is stable.

## Order of Attack (Phase 1, Weeks 1–4)

1. **Lead Magnet:** Build "The 1300 Escape Plan" PDF — mine last 30 games for 7 positions, write breakdown in Canva. Rob selects positions; Anthony writes copy.
2. **Email Capture:** Set up Kit free tier, wire `hokagechess.com` subscribe form (`src/app/api/subscribe/route.ts`), draft 3-email welcome sequence (who-I-am / embarrassing-loss / Village invite).
3. **Title Audit:** Retitle top 20 videos with emotion/stakes hooks; start A/B testing rhythm with CTR <3% red line.
4. **CTA Stack:** Audit all 322 videos for canonical CTA; patch descriptions and pinned comments (see `roles.yaml` cta-stack-enforcer role).
5. **Bridge Content:** Launch "Jutsu of the Week" Tuesday cadence; Echo Boss Battle for Episode 1 (lowest scheduling friction).
6. **Daily Shorts:** 28-day vertical puzzle sprint once title/CTA work stabilizes.
7. **Discord:** Stand up "The Village" once lead magnet is live and email list ≥50 subscribers.

## Gap Closure Tracking

> Update status field above and this table as Phase-1 gaps close.
> Reference cadence: `../../../ROB-FIRST-30-DAYS.md` Week 1–4 actions.

| Gap | Status | Closed Date | Notes |
| :--- | :--- | :--- | :--- |
| Lead magnet not built | `OPEN` | — | Needs: Rob game archive + 7 position selections session |
| Email capture not wired | `OPEN` | — | Needs: Kit account setup, list ID into `CONVERTKIT_API_KEY` env |
| Discord not shipped | `OPEN` | — | Needs: Rob to create Discord server + share invite URL |
| Title strategy under-leveraged | `OPEN` | — | — |
| CTA stack inconsistent | `OPEN` | — | Blocked on Discord invite URL |
| No Bridge Content cadence | `OPEN` | — | — |
| Daily Shorts not running | `OPEN` | — | — |
