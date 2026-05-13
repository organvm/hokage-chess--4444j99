# Form R-1: Vercel Deploy Preflight

**Purpose:** Ship hokage-chess to Vercel
**Owner:** User (Rob or Anthony)
**Time:** 5 min
**Unblocks:** Live URL, OG previews, public sharing

```
FORM R-1: VERCEL DEPLOY PREFLIGHT
===================================

Pre-flight checklist (mark each):
  [ ] GitHub repo connected to Vercel
  [ ] Custom domain `hokagechess.com` configured (or skip for now)
  [ ] Environment variables set:
      [ ] KIT_API_KEY (from Form R-2)
      [ ] Any others: ___
  [ ] Build command: `npm run build`
  [ ] Output directory: `.next`
  [ ] Node.js version: 20.x or later

Deploy steps:
  1. Go to vercel.com → New Project → Import hokage-chess repo
  2. Configure settings above
  3. Deploy
  4. Copy the preview URL: ___
  5. Share with Rob for mobile QA

Post-deploy verification:
  [ ] Homepage loads
  [ ] OG image renders in iMessage/Twitter preview
  [ ] Email capture form submits without error
  [ ] Mobile layout passes (check on phone)

Runbook reference: `docs/business/2026-04-29-vercel-deploy-preflight.md`
```
