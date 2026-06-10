# Delivery Packet — Rob Bonavoglia (@HokageChess)
**Date:** 2026-06-10
**Stream:** Ship-queue Day-3
**Branch:** `ship/delivery-packet-rob`
**Status:** Drafted locally — NOT sent. Awaiting your sign-off before any outbound.

---

## 1. Live link

**Production URL:** https://a-organvm.github.io/hokage-chess/

If/when the custom domain `hokagechess.com` is registered and pointed, the same site lives at that domain. The GitHub Pages URL above is the canonical, always-on link in the meantime — share this one on the YouTube "About" tab, in the lead-magnet download page, and in the Discord `#welcome` channel.

What's live today:
- 9-section landing page (Hero → Problem → Identity → Three Roads → Social Proof → Offer → Journey Map → FAQ → Final CTA)
- 3 dynamic persona routes (`/for/stuck-beginner`, `/for/climbing-intermediate`, `/for/returning-adult-improver`)
- Email-capture form wired to `/api/subscribe` (degrades gracefully to "launching soon" until Kit env vars are set)
- OG + Twitter share image (file-convention auto-injected, no manual metadata needed)
- 80/80 tests passing, `next build` green, mobile-responsive

---

## 2. Kit (ConvertKit) Setup Runbook

**Time required:** ~5 minutes (90 seconds in Kit + ~3 minutes in Vercel)
**What this unblocks:** the email-capture form on the landing page goes from "launching soon" placeholder to live.

### What you need from Kit (fill these in yourself — do not paste into chat)

| Item | Where to find it | Marked |
|---|---|---|
| `KIT_API_KEY` | Kit dashboard → **Settings** (gear) → **Account** → **API** → copy the long alphanumeric string starting with `your_secret_value_here`. **Treat as a password — never paste into Slack/email/Discord.** | **HUMAN** — you paste it directly into Vercel env vars in Step 4. Anthony does not need to see it. |
| `NEXT_PUBLIC_KIT_FORM_ID` | After creating the form in Step 2, the Form ID is the number in the form editor URL: `https://app.kit.com/forms/<FORM_ID>/edit`. Safe to share — form IDs are not secret. | **HUMAN** — you paste it into Vercel env vars in Step 4 and into `.env.local` for local testing. |

### Step 1 — Create your Kit account
1. Go to https://kit.com (formerly ConvertKit, rebranded 2024)
2. Sign up — Free tier supports up to 10,000 subscribers, you're at 99
3. Confirm email

### Step 2 — Create the form for "The 1300 Escape Plan"
1. Kit dashboard → **Grow → Landing Pages & Forms** → **Create New** → **Form**
2. Form type: **Inline** (we're not using Kit's hosted page — our landing page hosts the form)
3. Template: minimal / blank
4. Name the form exactly: `Hokage Chess — The 1300 Escape Plan`
5. **Save** — you'll land in the form editor
6. **Settings → Incentive** → set up the lead-magnet delivery email:
   - Subject: `Your "1300 Escape Plan" — start here`
   - Body: brief welcome + link to the PDF (PDF itself is your homework — for first pass, send a placeholder welcome with "the plan is coming this week" copy)
7. **Save** the form
8. Copy the **Form ID** from the URL bar — this is your `NEXT_PUBLIC_KIT_FORM_ID` value (HUMAN)

### Step 3 — Get the API key
1. Kit dashboard → **Settings** (gear icon) → **Account** → **API**
2. Click **Show API Key** → copy the full string
3. This is your `KIT_API_KEY` value (HUMAN) — do not share, do not commit, do not paste anywhere except Vercel + your local `.env.local`

### Step 4 — Wire env vars in Vercel (production)
Vercel Project → **Settings → Environment Variables** → add two rows:

| Name | Value | Environments |
|---|---|---|
| `KIT_API_KEY` | *(paste from Step 3)* **HUMAN** | **Production, Preview** (NOT Development — use `.env.local` for that) |
| `NEXT_PUBLIC_KIT_FORM_ID` | *(paste from Step 2)* **HUMAN** | **Production, Preview, Development** |

Click **Save**. Existing deploys are NOT auto-updated — trigger a new deploy:
```bash
vercel deploy --prod
```
Or in the Vercel UI: **Deployments → [latest] → Redeploy**.

### Step 5 — (Optional) Wire env vars locally for `npm run dev` testing
In the repo root create `.env.local` (gitignored):
```bash
KIT_API_KEY=<paste from Step 3>          # HUMAN
NEXT_PUBLIC_KIT_FORM_ID=<paste from Step 2>  # HUMAN
```
Test locally:
```bash
npm run dev
# In another terminal:
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"you+kit-test@gmail.com"}'
# Expected: {"ok":true}
```

### Step 6 — Verify in production
1. Open the live site (link in §1)
2. Scroll to the email-capture section (Final CTA)
3. Submit a test email — use a `+suffix` (e.g. `you+kit-test@gmail.com`) so you can filter it
4. Expected: form replaces with "Welcome to the Village" success card
5. Confirm in Kit: **Subscribers** tab → your test address appears within 30 seconds

### Step 7 — (Post-launch, optional) Welcome sequence
Kit → **Send → Sequences → Create New**:
- Name: `Hokage Welcome — 3-email`
- Email 1 (immediate): "Welcome to the Village" + PDF link
- Email 2 (day 3): "How I climbed from 1100 → 1350 — the breakthrough that mattered"
- Email 3 (day 7): "Why I publish my losses too" + soft YouTube subscribe CTA
- Activate, then connect: form **Settings → Visitor Actions → After subscribe → Add to sequence**

### Troubleshooting
| Symptom | Likely cause | Fix |
|---|---|---|
| Form shows "Email signup is launching soon" in production | env vars not set in Vercel | Re-run Step 4 + redeploy |
| Form shows "Couldn't subscribe right now" | Kit returned non-2xx | Check Vercel runtime logs; likely wrong form ID or expired API key |
| Test subscriber doesn't appear in Kit | Double opt-in is on | Form **Settings → Confirmation** — switch to single opt-in for launch, or check your email for the confirmation link |
| `curl` returns `{"ok":false,"reason":"config_incomplete"}` | `.env.local` typo or wrong filename | Verify file is `.env.local` (not `.env`), restart `npm run dev` |

### Security note
`KIT_API_KEY` is server-only by Next.js convention (no `NEXT_PUBLIC_` prefix) and never leaves the API route. `NEXT_PUBLIC_KIT_FORM_ID` IS bundled into client JS but form IDs aren't secret.

---

## 3. Week-1 Operations One-Pager

**Parallel tracks:** you compound the channel/audience/community while the site catches up. Three priorities — tighten titles, capture emails, give them a place to stay. Everything else is later.

### Day 1–2: Title audit (your highest-leverage move)
- YouTube Studio → pull your top 20 highest-view videos
- Rewrite titles: `[EMOTION or STAKES] + [CONTEXT] | Road to 1500 #13` (under 60 chars)
- Push every "Episode X" to the END of the title, never the front
- A/B test 5 of them this week (change title only, leave thumbnail)
- Red line: CTR under 3% → new title within 48 hours
- **Time cost:** one afternoon. **Leverage:** the single highest-ROI move in the first 30 days.

### Day 1–2: Kit setup
- Run the runbook in §2 above
- Total time: ~5 minutes
- Form name: `Hokage Chess — The 1300 Escape Plan`
- Don't write the welcome sequence emails yet — Anthony drafts those once the lead magnet is ready

### Day 3–5: Build "The 1300 Escape Plan" lead magnet
- The most important non-video deliverable in Phase 1
- Pull your last 30 games on Chess.com or Lichess
- Find 7 positions where you made the move that kept you stuck (not blunders — the *typical 1300 instinct* a 1600 wouldn't play)
- For each: instinct move → why it fails → what a 1600 sees → one-sentence rule
- Format: 15–20 pages, Canva template + screenshots, export PDF
- Host: Google Drive or Gumroad free tier
- Deploy: link in every YouTube description, pinned comment, channel "About" tab

### Day 6–7: Discord soft-launch ("The Village")
- Three rating-banded roles: **Genin** (0–1199), **Chunin** (1200–1599), **Jonin** (1600+)
- Three starter channels: `#jutsu-of-the-week`, `#sparring-partners`, `#study-hall`
- Soft-launch to 5–10 trusted regulars — 50 active members beats 500 ghosts
- Same names become product tiers in Phase 2 (Genin Squad $9/mo, Chunin Dojo $29/mo, Jonin Mentorship $99/mo) — one brand vocabulary across community + commerce

### Daily cadence starting Day 1
- **1 YouTube Short per day** — vertical, dramatic puzzle format. "White to move. Find the win." → reveal at 30 seconds. 28 Shorts in 28 days. Cadence over polish at your subscriber count.
- **Jutsu of the Week** (Tuesday) — 8–12 min YouTube + 60–90s Shorts re-cut. One concept you actually learned that week, not a textbook concept.

### Trademark — read this carefully
- **YouTube channel name "Hokage Chess" = LOW risk.** Not source-branding for goods.
- **"Hokage" on merch or physical products = MEDIUM-to-HIGH risk, needs a trademark lawyer first.** Shirts, headbands, chess pieces all look like product branding in commerce.
- **Both existing HOKAGE USPTO filings are abandoned/stalled** (Serial 90341734 abandoned 2021; Serial 97007362 stalled since 2022). Field is open — opportunity to file your own.
- **Budget $500–$1,500 for proper clearance** before any physical product launch (clearance search + attorney review in chess goods, educational materials, apparel classes).
- **NEVER use Naruto imagery, fonts, or character designs — even fan-made.** NARUTO is a live U.S. trademark (Reg. #3726754). Original art only. Inspired-by aesthetic, not derivative.

Phase 1 (now) is 100% safe under this framing. Phase 2 (merch, physical pieces) requires a lawyer call — we'll budget for it when Phase 2 is in sight.

### Questions for our next call
- Which 5 videos do you think most under-perform their content? (Gut, not analytics — we'll cross-check.)
- Discord: soft-launch this week to 5–10 trusted regulars, or wait until the lead magnet is live so the welcome flow is complete?
- Of the 7 positions for "The 1300 Escape Plan," do you want to pick them yourself, or want me to scan your last 30 games and propose a shortlist?
- Phase 2 merch timing — is "Q4 of this year" realistic, or are we pushing into next year? (Drives when we book the trademark lawyer.)

### What Anthony's done (status as of 2026-06-10)
- ✅ Landing page live at the link in §1
- ✅ OG + Twitter share image wired (file-convention)
- ✅ `/api/subscribe` route handler shipped — graceful "launching soon" fallback until Kit env vars land
- ✅ 80/80 tests passing, build green
- ✅ Mobile-responsive (static review pass; live browser QA is your call)
- ⏭ Kit setup — waiting on you (~5 min, runbook in §2)
- ⏭ `hokagechess.com` domain — registration pending (financial decision; Vercel Domains or Cloudflare both viable). Fallback `4jp.io/rob/` ready if delayed.

---

## 4. What is NOT in this packet

- Welcome sequence email copy (Phase-2 content task, drafted after the lead-magnet PDF ships)
- Lead-magnet PDF itself (your homework)
- Phase 2 product tier pricing page (gated on Discord traction + trademark clearance)
- Any CRM-unification work (Kit standalone for now; if Teamzy unification lands later, the `/api/subscribe` route becomes the swap point — wiring is decision-neutral)

---

**Next action for you:** when you're ready, run the Kit runbook in §2 (~5 min) and email/text me when the form is live on production. I'll verify end-to-end and we can sync on the questions in §3.
