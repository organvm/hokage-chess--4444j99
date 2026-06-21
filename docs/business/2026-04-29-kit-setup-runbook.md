# Kit (ConvertKit) Setup Runbook

**Date:** 2026-04-29
**Stream:** D (`S-2026-04-29-rob-hokage`)
**Vacuum unblocked when complete:** V7 (email funnel goes live)
**Time required:** ~5 minutes (90 seconds in Kit + ~3 minutes in Vercel)

---

## Why this runbook exists

The form handler is wired (commit `c253df8` — `src/app/api/subscribe/route.ts` + `src/app/page.tsx FinalCTASection`). It will gracefully degrade with a "launching soon" message until two env vars are set:

| Var | Where | Sensitivity |
|---|---|---|
| `KIT_API_KEY` | Server-only (Next.js API route) | **SECRET** — never commit, never expose to client |
| `NEXT_PUBLIC_KIT_FORM_ID` | Public (bundled into client JS) | Safe — form IDs are not secrets |

This runbook converts the user-side blocker from "vague Kit setup" to "execute these exact 7 steps."

---

## Step-by-step

### Step 1 — Create Kit account (if needed)

If `padavano.anthony@gmail.com` already has a Kit account, skip to Step 2.

1. Go to https://kit.com (formerly ConvertKit, rebranded 2024)
2. Sign up — Free tier (up to 10,000 subscribers) is plenty for launch
3. Confirm email

### Step 2 — Create the form for "The 1300 Escape Plan"

1. Kit dashboard → **Grow → Landing Pages & Forms** → **Create New** → **Form**
2. Form type: **Inline** (we're not using Kit's hosted page; we have our own)
3. Template: minimal / blank
4. Name the form: `Hokage Chess — The 1300 Escape Plan`
5. **Save** → URL goes to form editor
6. **Settings → Incentive** → set up the lead-magnet email:
   - Subject: `Your "1300 Escape Plan" — start here`
   - Body: brief welcome + link to the PDF (PDF authoring is Rob homework #1; for first-pass send a placeholder welcome with "the plan is coming this week" copy)
7. **Save**
8. Find the **Form ID** in the URL bar: `https://app.kit.com/forms/<FORM_ID>/edit` — copy that number.

### Step 3 — Get the API key

1. Kit dashboard → **Settings** (gear icon) → **Account** → **API**
2. Copy **API Key** (starts with `your_secret_value_here` — long alphanumeric)
3. Treat as secret. Do NOT paste into Slack, email, or any chat.

### Step 4 — Wire env vars locally (for `npm run dev` testing)

In repo root (`/Users/4jp/Workspace/4444J99/hokage-chess`), create or edit `.env.local`:

```bash
# .env.local — git-ignored (.env* is in .gitignore)
KIT_API_KEY=<paste API key from Step 3>
NEXT_PUBLIC_KIT_FORM_ID=<paste Form ID from Step 2>
```

**Verify:**
```bash
npm run dev
# In another terminal:
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"padavano.anthony@gmail.com"}'
# Expected: {"ok":true}
```

If you see `{"ok":false,"reason":"config_incomplete"}`, the env vars didn't load — check the file name (`.env.local`, not `.env`), restart `npm run dev`.

### Step 5 — Wire env vars in Vercel (for production)

Vercel Project → **Settings → Environment Variables**:

| Name | Value | Environments |
|---|---|---|
| `KIT_API_KEY` | (paste API key) | **Production, Preview** (NOT Development — we use `.env.local` for that) |
| `NEXT_PUBLIC_KIT_FORM_ID` | (paste Form ID) | **Production, Preview, Development** |

Click **Save**. Existing deploys are NOT updated automatically — trigger a new deploy via:
```bash
vercel deploy --prod
```

Or via the Vercel UI: **Deployments → [latest] → Redeploy**.

### Step 6 — Verify production

After the redeploy completes:
1. Open the production URL
2. Scroll to the email-capture section
3. Submit a test email (use a + suffix like `padavano.anthony+kit-test@gmail.com` so you can filter it)
4. Expected: form replaces with "Welcome to the Village" success card
5. Check Kit dashboard → **Subscribers** → confirm the test address appears within 30 seconds

### Step 7 — Set up the welcome sequence (post-launch enhancement)

Kit dashboard → **Send → Sequences** → **Create New**:
- Name: `Hokage Welcome — 3-email`
- Email 1 (immediate): "Welcome to the Village" + link to the PDF
- Email 2 (day 3): "How I climbed from 1100 → 1350 — the breakthrough that mattered most"
- Email 3 (day 7): "Why I publish my losses too" + soft CTA to YouTube subscribe
- **Activate** the sequence
- Connect to the form: form **Settings → Visitor Actions → After subscribe → Add to sequence**

Drafts for these three emails are NOT in scope for Stream D — they're a Phase-2 content task (queue for Rob/Anthony joint authoring).

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Form shows "Email signup is launching soon" in production | env vars not set in Vercel | Step 5 |
| Form shows "Couldn't subscribe right now" | Kit returned non-2xx; check Vercel runtime logs | Likely wrong form ID, expired API key, or Kit outage |
| `curl` returns `{"ok":false,"reason":"config_incomplete"}` locally | `.env.local` missing or env vars typo'd | Step 4 |
| `curl` returns `{"ok":false,"reason":"invalid_email"}` | regex didn't match | Email shape isn't valid; not a Kit issue |
| Subscriber doesn't appear in Kit dashboard | wrong form ID OR subscriber confirmation pending | Check the form's **Settings → Confirmation** — if double opt-in is on, subscribers are "Cancelled" until they click confirm in their email |

---

## Security notes

- `KIT_API_KEY` is server-only by Next.js convention (no `NEXT_PUBLIC_` prefix). It is NEVER bundled into client JS.
- `NEXT_PUBLIC_KIT_FORM_ID` IS bundled into client JS — but form IDs are not secret (they appear in the form's hosted URL anyway).
- The `/api/subscribe` route validates email shape server-side before contacting Kit, so Kit's quota is not burned by junk submissions.
- Rate limiting is NOT yet implemented — if abuse becomes a problem post-launch, add a simple in-memory token bucket or Vercel's [Edge Rate Limiting](https://vercel.com/docs/edge-middleware/rate-limiting) middleware.

---

## CRM unification decision (PRT-047, parking lot)

MP-7 is now resolved in `2026-06-21-email-list-architecture-decision.md`: one subscriber database, two primary tracks, bridge as a segment. That does not fully settle the vendor question. Per memory `project_artifact_rob_trail_2026_04_27.md` L13, there is still an open user-side decision on **Kit standalone vs Teamzy unified across BODI + Hokage**. This runbook treats Kit as the v1 Hokage implementation. If the decision lands on Teamzy unified or Beehiiv later, the API route at `src/app/api/subscribe/route.ts` remains the integration point. Swap the backend, but preserve MP-7 tags: `pillar:chess`, `pillar:fitness`, `pillar:bridge`, source, and stage.

---

## What this runbook does NOT do

- Author the lead-magnet PDF — Rob homework #1
- Author the welcome sequence email copy — Phase-2 content task
- Set up Kit → Teamzy syncing (if CRM unification lands on dual-CRM)
- Add captcha / honeypot anti-spam — defer until abuse signal
- Set up Kit → Discord webhook — Discord is Rob-blocked

---

## Cross-references

- API route: `src/app/api/subscribe/route.ts` (commit `c253df8`)
- Form handler: `src/app/page.tsx` `FinalCTASection` (same commit)
- MP-7 decision: `docs/business/2026-06-21-email-list-architecture-decision.md`
- Vercel preflight: `docs/business/2026-04-29-vercel-deploy-preflight.md`
- IRF candidate: `IRF-PRT-V7`
- GH issue: opened in Phase 4.2
- Memory: `project_artifact_hokage_4level_funnel.md` (V7 gating L2 deploy), `project_artifact_rob_trail_2026_04_27.md` L13 (CRM unification decision)
