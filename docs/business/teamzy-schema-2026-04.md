# Teamzy CRM Field Schema - RB-9

**Compiled:** 2026-06-22  
**Atom:** RB-9  
**Source:** PRT-043, persona open threads, form 03  
**Status:** Current known field surface documented; Rob-specific custom fields still require UI/export verification.

This register resolves the immediate collision-control problem for Teamzy additions: list the current known field surface first, then list proposed additions. It does not claim to be a full Teamzy admin export. No Rob-supplied screenshot, CSV header export, or custom-field list is present in this repository or in issue comments at compile time.

## Current field list

| Field / object | Type | Current evidence | Collision note |
|---|---:|---|---|
| First name | Text | Teamzy CSV import examples; form 03 standard field | System contact identity. Do not duplicate. |
| Last name | Text | Teamzy CSV import examples; form 03 standard field | System contact identity. Do not duplicate. |
| Email | Text | Teamzy CSV import examples; form 03 standard field | System contact identity. Do not duplicate. |
| Mobile phone / phone | Text | Teamzy CSV import examples; form 03 standard field | System contact identity. Do not duplicate. |
| Address | Text | Form 03 standard field | Verify in Rob UI if address is used operationally. |
| Birthday | Date | Form 03 standard field | Verify in Rob UI before using for nurture automation. |
| Anniversary / join date | Date | Form 03 standard field | Likely business relationship metadata; do not overload for content-pack dates. |
| Last contact date | Date | Form 03 standard field; Teamzy follow-up/activity model | Use for relationship cadence only, not content attribution. |
| Lead source | Text or picklist | Form 03 standard field; Teamzy imports from Facebook, CSV, phone, Instagram, and back-office files | Keep as channel/source class. Do not store individual reel IDs here unless Rob already does. |
| Contact category | Picklist | Teamzy uses prospect, customer, and coach/team categories during import/workflow | Existing funnel state container. Map L2/L3 states to it only if Rob already uses that convention. |
| Rank / label | Picklist or score | Teamzy help-center surface names "Rank & Label" for prioritization | Existing prioritization container. Do not replace with ambassador scoring. |
| Tags | Multi-value labels | Teamzy help-center surface includes tag organization | Use as fallback only if true custom fields are unavailable. |
| Stage | Picklist or workflow state | Teamzy public product copy says contact selection learns from activity, ranking, and stage | Existing pipeline state. Do not encode content-pack booleans here. |
| Follow-up | Date or task | Teamzy public product copy and help center describe follow-ups and reminders | Relationship cadence only. |
| Connect activity | Activity log | Teamzy defines connects as general conversation activity | Activity record, not a custom field. |
| Share activity | Activity log / checkbox inside connect | Teamzy defines shares as product or opportunity conversations | Activity record, not a content-source field. |
| Add activity | Activity count | Teamzy defines adds as new contacts added to the list | Activity metric, not a lead-source field. |
| Conversation history / notes | Activity log | Teamzy public product copy says it tracks conversations across FB, text, email, and more | Store narrative context here, not structured reporting fields. |
| Gmail/email integration | Integration/activity | Teamzy public product copy lists Gmail integration | Do not use as owned-media subscriber source of truth. |
| Rob-specific custom fields | Unknown | No repository artifact or issue comment currently lists them | Must be verified in Teamzy UI/export before creating new fields. |

## Proposed additions

Create these only after checking Rob's Teamzy custom-field screen for same-name or same-semantics fields. Prefer mapping to an existing equivalent field over creating a duplicate.

| Proposed field | Type | Preferred key | Purpose | Collision rule |
|---|---:|---|---|---|
| Source Content ID | Text | `source_content_id` | Stores the specific reel, short, post, or content-pack asset that produced or warmed the lead. | If `Lead source` already stores a specific asset ID, map to that field. Otherwise keep `Lead source` as channel/source class and add this field. |
| Wearable User | Boolean | `wearable_user` | Flags Whoop/Oura/fitness-tracker users for bio-sync plan personalization. | If Rob already tracks wearable ownership in notes or tags, migrate to a structured yes/no field only if Teamzy supports it cleanly. |
| Owned Media Subscriber | Boolean | `owned_media_subscriber` | Marks whether the contact is on Beehiiv/Kit/email owned-media list. | Do not replace the email platform's subscriber record; mirror only the contact-level state needed for Teamzy follow-up. |
| Ambassador Readiness | Number or picklist | `ambassador_readiness` | Scores L4/downline readiness from 1-10. | Do not overload Teamzy rank/label unless Rob already uses rank specifically for ambassador readiness. |
| Content Pack Delivered At | Datetime | `content_pack_delivered_at` | Records when the L2 plan plus five-piece content pack was delivered. | Do not use anniversary/join date; this is a content operation timestamp. |
| Content Pack Engagement | Boolean | `content_pack_engagement` | Marks whether the lead replied, saved, watched, or DM'd about any content-pack piece. | If Teamzy cannot support boolean fields, fallback tag: `content-pack-engaged`. |
| Live QA Attended | Boolean | `live_qa_attended` | Marks whether the lead attended Rob's next live Q&A ritual. | If Teamzy cannot support boolean fields, fallback tag: `live-qa-attended`. |

## Name mapping

The issue names four fields in title case with underscores: `Source_Content_ID`, `Wearable_User`, `Owned_Media_Subscriber`, and `Ambassador_Readiness`. The repository's newer field style is lower snake case, matching `content_pack_delivered_at`, `content_pack_engagement`, and `live_qa_attended` in PRT-043.

Use lower snake case for internal documentation and integrations. If Teamzy's UI stores only display labels, use human labels without underscores:

| Display label | Integration key |
|---|---|
| Source Content ID | `source_content_id` |
| Wearable User | `wearable_user` |
| Owned Media Subscriber | `owned_media_subscriber` |
| Ambassador Readiness | `ambassador_readiness` |
| Content Pack Delivered At | `content_pack_delivered_at` |
| Content Pack Engagement | `content_pack_engagement` |
| Live QA Attended | `live_qa_attended` |

## Verification checklist before Teamzy changes

1. Open Teamzy contact settings or one representative contact record.
2. Screenshot or export visible fields, custom fields, tags, categories, rank/label values, and active automations.
3. Compare against the "Current field list" table above.
4. For each proposed addition, mark one of: `create`, `map_to_existing`, `do_not_use`.
5. Update this file with the Rob-specific custom fields and final Teamzy labels before wiring automation.

## Source trail

- `docs/business/forms/03-teamzy-schema-disclosure.md`
- `docs/business/2026-04-25-bodi-funnel-with-premium-content-architecture.md`
- `docs/substrate/bodi/06-production-stack/bodi-production-stack.md`
- Teamzy public CRM/help pages:
  - `https://teamzy.com/`
  - `https://teamzy.com/help-center/`
  - `https://teamzy.com/tutorial/import-a-csv/`
  - `https://teamzy.com/tutorial/import-contacts-back-office/`
  - `https://teamzy.com/faq/invites-adds-top-dashboard/`
