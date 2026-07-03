# FWS-5: Coaching Software Backend (TrueCoach Setup Spec)

**Date:** 2026-06-21
**Atom ID:** FWS-5
**Source:** Fitness World Map §7.5
**Status:** Implementation Spec

## Objective
Establish the backend coaching software for Rob's 1:1 and hybrid fitness coaching using TrueCoach, transitioning his service delivery off informal channels into a professional, scalable system.

## 1. Platform Selection: TrueCoach
**Why TrueCoach:**
- **Simplicity:** The simplest interface for solo coaches just starting with dedicated software.
- **Cost:** Starts at $26/mo for up to 5 active clients, providing a highly profitable margin.
- **Features:** Native programming, video libraries, automated check-ins, direct client messaging, and Stripe-integrated payments.

*Alternative considerations dismissed for now: Trainerize (more complex, better for larger teams/gyms), Everfit (great modern UI but TrueCoach is more established for solo programming).*

## 2. Program Configuration (What Rob Already Runs)
To minimize friction, we are digitizing the protocols Rob is already comfortable coaching manually (e.g., his own "Body Beast" lineage and "Legion of Fitness" beginner tracks).

**Program Templates to Build in TrueCoach:**
1. **The Legion Cut (8-Week Fat Loss):** 
   - 4-day resistance training split.
   - Integrated macro targets + daily step goals.
2. **The Legion Bulk (12-Week Hypertrophy):**
   - 5-day bodybuilding split (Sagi Kalev / Body Beast influenced).
   - Progressive overload tracking + higher calorie macro assignments.
3. **Beginner On-Ramp (4-Week Foundation):**
   - 3-day full-body split.
   - Focus on movement mechanics, habit building, and consistency.

## 3. Pricing Strategy
Based on the TrueCoach starter tier economics ($26/mo / 5 clients) and fitness world map benchmarks:

| Tier | Price | Deliverables | Capacity Limit |
|---|---|---|---|
| **Tier 1: 1:1 VIP Coaching** | **$300/mo** | Highly individualized programming, weekly video check-ins, daily text access, custom macro adjustments. | Cap at 5 initially (TrueCoach Starter) |
| **Tier 2: Hybrid Coaching** | **$150/mo** | Templated program with minor individual tweaks, bi-weekly form check, group chat access. | Future scaling (Requires TrueCoach Pro) |
| **Tier 3: PDF / Program Only**| **$50 (One-time)** | Delivered via external PDF or app without active 1:1 check-ins. | Infinite |

**Economics of 5 VIP Clients:**
- Revenue: 5 x $300 = $1,500/mo
- Software Cost: $26/mo (TrueCoach)
- **Net Margin:** ~98%

## 4. Next Actions
- [ ] **Action 1:** Register for TrueCoach 14-day free trial.
- [ ] **Action 2:** Connect Stripe account via TrueCoach settings for payment processing.
- [ ] **Action 3:** Build out the first "Legion Bulk" 7-day microcycle in the program builder.
- [ ] **Action 4:** Onboard 1 beta client (free or discounted) to test the check-in and workout logging flow.
