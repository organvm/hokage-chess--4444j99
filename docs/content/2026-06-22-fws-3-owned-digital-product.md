---
audiences:
  - id: rob
    register: pathos
    surface: storefront
    bridge_to: [fitness]
tldr: "Specification for Rob's first owned digital product (PDF / cohort), transitioning away from a strictly BODI-dependent funnel."
strata: production-stack
client_render_mode: tldr
---

# Owned Digital Product [FWS-3]

**Date:** 2026-06-22
**Subject:** FWS-3 content pillar specification. The asset that makes the funnel point at *his* checkout instead of BODI's.
**Status:** Spec defined
**Reference:** GitHub Issue 4444J99/hokage-chess#26, fitness world map §7.3

---

## 1. The Rationale: Escaping the BODI Checkout

Currently, Rob's fitness funnel relies entirely on BODI. While this works for Level 2/3 conversions, it means he does not own the primary conversion event.

**The Landscape:**
*   **Greg Doucette:** Sells a $111 PDF.
*   **Jesse James West:** Sells $14.99-$59.99 plans.
*   **Rob:** Has nothing with his name on the cover.

Rob needs an asset that makes the funnel point at *his* checkout instead of BODI's. This is the first non-BODI asset (PDF / cohort).

## 2. Candidates for the First Product

We need a productized version of what Rob already coaches informally. It needs a title, a table of contents, and a 30-day delivery timeline.

**Candidate 1: 'Body Beast Companion Guide'**
*   **Concept:** A guide that leverages a program he already runs and knows intimately.
*   **Pros:** High familiarity; immediate utility for his existing network.
*   **Cons:** Still tangentially relies on a BODI property (Body Beast).

**Candidate 2: 'Legion Beginner Bulk Protocol'**
*   **Concept:** A pure, standalone protocol productizing his informal coaching under the Legion of Fitness brand.
*   **Pros:** 100% owned IP; builds the Legion brand independent of BODI.
*   **Cons:** Requires slightly more net-new content creation.

## 3. Execution Path

1.  **Select the Candidate:** Rob must choose between Candidate 1 and Candidate 2 (or propose Candidate 3).
2.  **Draft the Table of Contents:** Outline the 5-7 core chapters/sections.
3.  **Production:** Write the content (PDF) or structure the curriculum (Cohort).
4.  **Checkout Integration:** Set up the payment gateway (e.g., Stripe, Whop) that points to Rob's bank account, not BODI's.

