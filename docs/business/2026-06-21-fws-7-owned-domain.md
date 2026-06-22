# [FWS-7] Owned domain at fitness identity

**Date:** 2026-06-21
**Status:** COMPLETED
**Related Atoms:** FWS-7

## 1. Decision: Selected Domain

Between the two candidates:
- **Candidate A:** `robbonavoglia.com` (personal identity)
- **Candidate B:** `legionoffitness.com` (group identity, if migrating)

**Decision:** **`robbonavoglia.com`**
**Why:** Choosing `robbonavoglia.com` centers the fitness business around Rob's personal brand, ensuring maximum flexibility. If the "Legion of Fitness" group branding changes or if he decides to pivot his offering, the personal domain will remain relevant. It builds his personal SEO authority directly and acts as a central hub for all his coaching, products, and community access independently of any specific group name.

## 2. Implementation Specs

*   **Primary Domain:** `robbonavoglia.com`
*   **Registrar:** Cloudflare (or equivalent, consistent with `hokagechess.com`)
*   **Purpose:** 
    *   Serve as the main link-in-bio destination (replacing Linktree/Linkinbio).
    *   Host the sales page for the "Legion Bulk Protocol" (FWS-3).
    *   Route traffic to TrueCoach for 1:1 coaching (FWS-5).
    *   Act as the gateway to the paid Skool/Whop community (FWS-2).
*   **Integration:** Can be developed as a separate Next.js surface or an additional route within the existing infrastructure.

## 3. Next Steps

1.  **Registration:** Register `robbonavoglia.com` via Cloudflare.
2.  **DNS Configuration:** Point the domain to the Vercel deployment hosting the fitness storefront.
3.  **Social Audit:** Update Instagram and all other fitness-facing social profiles to use the new domain in their bios.
