# BODI Production Stack

**Status:** REGENERATED (Research-Augmented)
**Last Updated:** 2026-06-21

## Current Confirmed Stack

| Layer | Tool | Role | Status |
| :--- | :--- | :--- | :--- |
| **Acquisition** | Instagram / FB | Niche prospecting and reels | `ACTIVE` |
| **Opt-in** | Google Form | Personalized plan intake | `ACTIVE` |
| **Relationship** | **Teamzy** | Canonical CRM for warmth/follow-up | `CENTRAL` |
| **Community** | Private Group Chat | VIP retention surface | `ACTIVE` |
| **Conversion** | BODi / Beachbody | Paid conversion objects (Affiliate) | `ACTIVE` |

## Proposed & Provisional Stack (2026 Shift)

| Layer | Tool | Role | Source |
| :--- | :--- | :--- | :--- |
| **Owned Land** | **Shared email database** (Kit v1; Beehiiv-portable) | Fitness track inside MP-7 one-base/two-track architecture | `PROVISIONAL` |
| **Operations** | **ChatGPT/Gemini** | AI Lead Screener and comment triage | `PROVISIONAL` |
| **Value** | **Whoop / Oura** | Wearable data for bio-syncing plans | `PROVISIONAL` |
| **Monetization** | **Whop** | Digital product marketplace (Trading/Chess) | `PROVISIONAL` |
| **Community** | **Skool / Circle** | Gamified education portal | `PROVISIONAL` |

## Performance Rhythms (KPIs)

- **Manual L1 Hours:** Target < 5 hrs/week (Currently ~20).
- **L0 Inbound Ratio:** % of leads from content vs. scraping.
- **Owned Conversion:** % of leads moving from IG to the shared database with `pillar:fitness`.
- **VIP LTV:** Retention duration in months.
- **Ambassador Velocity:** Number of new duplication-ready partners/month.

## Provisional Teamzy Field Spec (Blocked-Awaiting-Collaborator)
The following fields are proposed for Teamzy to track content effectiveness:
- `Source_Content_ID` (which reel brought them in)
- `Wearable_User` (Boolean: Yes/No)
- `Owned_Media_Subscriber` (Boolean: Yes/No)
- `Ambassador_Readiness` (Scale 1-10)

## MP-7 Email Architecture Note

Per `../../../business/2026-06-21-email-list-architecture-decision.md`, BODI should not create an isolated newsletter database by default. Fitness subscribers belong to the shared Rob subscriber base with `pillar:fitness`; Hokage subscribers use `pillar:chess`; cross-domain material uses `pillar:bridge`. Beehiiv remains a later newsletter-growth candidate, not the canonical data model.
