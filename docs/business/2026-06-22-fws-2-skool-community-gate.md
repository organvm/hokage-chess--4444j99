# [FWS-2] Skool Paid Community Gate Runbook

**Date:** 2026-06-22
**Atom:** FWS-2
**GitHub issue:** #25
**Status:** Agent-side setup spec complete; external channel provisioning remains a Rob-owned action.
**Source:** `docs/business/2026-04-26-rob-fitness-world-map.md` section 7.2.
**Related atoms/docs:** MP-1 pillar taxonomy, MP-6 Legion FB migration, CWS-2 Discord, CWS-3 newsletter.

---

## 1. Decision

Migrate the "Legion of Fitness" audience (currently a free Facebook group) to a unified paid community gate on **Skool**.

The community represents the **unified monetization engine** for the Bridge overlap audience, consolidating fitness and discipline into a premium offering.

- Platform choice: **Skool** ($99/mo flat tier).
- Target Pricing: **~$49/mo** (fits the $27–$97/mo niche coaching benchmark).
- Primary acquisition hook: Quarterly cohort challenges (converting 25% of paid-challenge finishers to ongoing members).
- Gamification: Skool's native XP leaderboards, continuing the gamified lineage of the Legion Command Center.

This represents the highest-leverage architectural move for Rob's business model, creating a recurring revenue floor independent of BODI commissions while supporting the "Hidden Leaf Legion" bridge thesis.

---

## 2. Community Structure

### Naming & Identity
- **Community Name:** Hidden Leaf Legion (or "The Overlap" / "Legion of Fitness" depending on the Bridge thesis timeline).
- **Core Promise:** "The accountability layer where discipline transfers across domains."

### Tiered Architecture
The Skool community will act as the unified hub for the Overlap audience (MP-1):

1. **Free Tier (Acquisition):**
   - Access: General chat, public leaderboards, high-level announcements.
   - Purpose: Lead capture and FOMO generation.

2. **Paid Tier ("Legionnaire" / "Chunin Dojo"):**
   - Price: $49/mo (or $249/yr).
   - Access: Complete structured programming, weekly check-ins, form-check reviews, and premium cohort challenge access.
   - Purpose: Recurring revenue and transformation accountability.

3. **Premium Skim ("Sensei" cap 10):**
   - Price: $249 per challenge block or $200+/mo high-ticket.
   - Access: 1:1 weekly reviews, custom trueCoach programming, direct DMs.
   - Purpose: High-margin MRR while protecting Rob's capacity.

---

## 3. Migration Playbook (FB to Skool)

### Phase 1: Soft Launch (Pilot)
Before launching the $49/mo recurring tier, run a **single small pilot cohort** (e.g., "Legion Cut") utilizing the existing free Facebook group as the lead gen.
- **Goal:** Validate the 25% paid-to-recurring conversion target, capture transformation reels, and measure real unit economics.
- **Action:** Pitch the pilot to the most active FB group members. Offer them "Founding Member" access to the new Skool community.

### Phase 2: The Migration Event
1. **The Announcement:** Rob posts a comprehensive video in the FB Group explaining *why* the group is moving. Focus on the benefits: better tech, structured courses, XP/gamification, and less distraction than Facebook.
2. **The "Doors Closing" Countdown:** Set a hard date (e.g., 2 weeks out) when the FB group will be archived/muted.
3. **The Incentive:** Offer an aggressive launch discount (e.g., "first month free" or "locked-in $29/mo lifetime rate") to migrate immediately.

### Phase 3: Steady-State Operations
- Run 4 challenges a year (Q1 Cut, Q2 Forge, Q3 Bulk, Q4 Bridge).
- Off-weeks are carried by the FWS-2 community's core engagement and gamification rituals.
- Integrate the Beehiiv newsletter (CWS-3) to regularly funnel free subscribers into the paid Skool gate.

---

## 4. Acceptance Tracker

This closes FWS-2 / #25 at the strategy-system level when:

1. A canonical Skool community runbook exists in the repo.
2. The runbook resolves platform choice, pricing tiers, gamification mechanics, and the FB migration strategy.
3. The runbook reconciles the paid community gate with MP-1's unified pillar architecture.

External completion remains:
1. Rob creates and provisions the Skool community instance.
2. Rob executes the Phase 1 pilot and Phase 2 migration event.
