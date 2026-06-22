# [FWS-5] Coaching software backend (TrueCoach / Trainerize / Everfit)

**Date:** 2026-06-22
**Status:** COMPLETED
**Related Atoms:** FWS-5

## 1. Decision: Selected Platform

Between the three candidates (TrueCoach, Trainerize, Everfit):

**Decision:** **TrueCoach**
**Why:** TrueCoach is the simplest platform for a solo coach getting started with 1:1 programming. The starter tier is $26/mo for 5 clients, making it extremely cost-effective (sub-2% software cost if charging $300/mo per client). It handles the operational backbone required: programming, check-ins, and payments.

## 2. Implementation Specs

*   **Platform:** TrueCoach (Starter Tier: $26/mo for 5 clients).
*   **Pricing Strategy:** $300/mo per client for 1:1 coaching.
*   **Revenue Projection:** 5 clients = $1,500/mo gross revenue.
*   **Programs Configured:**
    *   Legion Beginner Bulk Protocol (customized for 1:1)
    *   Body Beast (hybrid adaptations)
    *   Custom hypertrophy/strength programming based on Rob's current training

## 3. Integration with the Funnel

*   **Traffic Source:** Upsold from the "Legion Bulk Protocol" (FWS-3) and the Skool/Whop community (FWS-2).
*   **Domain Routing:** `robbonavoglia.com` (FWS-7) routes traffic to the TrueCoach application/intake form.
*   **Content CTA:** YouTube long-form videos (FWS-4) will occasionally point to TrueCoach 1:1 applications for viewers hitting plateaus.
