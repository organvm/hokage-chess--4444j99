# Form R-2: Kit API Key Provisioning

**Purpose:** Get Kit (ConvertKit) API key for email capture
**Owner:** User
**Time:** 1 min
**Unblocks:** Email funnel L2

```
FORM R-2: KIT API KEY PROVISIONING
====================================

Steps:
  1. Go to kit.com (formerly ConvertKit) → sign in or create account
  2. Settings → Account → API Key → Generate new key
  3. Copy the key (starts with `...`)
  4. Create a form in Kit named "Hokage Chess Landing"
  5. Note the form ID from the URL

Return values:
  KIT_API_KEY: ___
  FORM_ID: ___
  TAGS TO CREATE: [ ] hokage-chess  [ ] landing-page

Then:
  - Add KIT_API_KEY to Vercel env vars (Form R-1)
  - The form handler at /api/subscribe will automatically route to Kit

Runbook reference: `docs/business/2026-04-29-kit-setup-runbook.md`
```
