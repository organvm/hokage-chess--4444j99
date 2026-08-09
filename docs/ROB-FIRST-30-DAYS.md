# The First 30 Days
## Rob's playbook — what you do while Anthony ships the site

This is a parallel-track plan. Anthony is building the digital house — landing page, email funnel, domain, deploy. You are doing the part no contractor can do for you: compounding the channel, the audience, and the community. The site catches up to the audience, not the other way around.

Three priorities: tighten what people see (titles, thumbnails), capture what they leave behind (emails), and give them a place to stay (Discord). Everything else is later.

---

### Week 1–2: Foundations

**Title audit — top 20 videos**
- Pull your 20 highest-view videos in YouTube Studio. Most are bleeding clicks because the title is "Road to 1500 | Episode 13" instead of "I FINALLY Beat the Opening That Destroyed Me."
- Push every "Episode X" to the END of the title, not the front. The hook leads.
- Formula: `[EMOTION or STAKES] + [CONTEXT] | Road to 1500 #13`. Keep under 60 characters.
- A/B test 5 of them this week. Change the title only — leave the thumbnail. If CTR jumps, the title was the bottleneck.
- Red line: if a video's CTR is under 3%, it gets a new title within 48 hours.
- This costs nothing, takes one afternoon, and is the single highest-leverage move in the first 30 days.

**Set up Kit (ConvertKit)**
- Sign up for the free tier (up to 1,000 subscribers — you have 99, you're fine).
- Name the list **"The Scroll."** Not "newsletter," not "mailing list." Brand-consistent from day one.
- Build a 3-email welcome sequence template. Email 1: who you are + what The Scroll is. Email 2: your most embarrassing chess loss + what it taught you. Email 3: invite to The Village (Discord).
- Don't write the welcome emails yet. Anthony will draft them once the lead magnet is ready.

**Build "The 1300 Escape Plan" lead magnet**
- This is the asset every email signup gets. It is the single most important non-video deliverable in Phase 1.
- Pull your last 30 games on Chess.com or Lichess. Find 7 positions where you made the move that kept you stuck — not blunders, but the *typical 1300 instinct* that a 1600 wouldn't play.
- For each position: instinct move → why it fails → what a 1600 sees → one-sentence rule.
- 15-20 pages, designed in Canva (template + screenshots). Export as PDF. Host on Google Drive or Gumroad free tier.
- Add the link to every YouTube description, pinned comment, and channel "About" tab. Every video becomes a top-of-funnel.

---

### Week 3–4: Community + Cadence

**Discord — "The Village"**
- Current canonical taxonomy: `docs/content/2026-06-22-cws-2-discord-hidden-leaf-village.md`. The first-30-day launch remains intentionally small; the CWS-2 spec adds the paid Chunin Exams and $150/mo Jonin Mentorship lanes.
- Three role tiers, rating-banded:
  - **Genin** (0–1199 ELO) — newcomers, the largest tier
  - **Chunin** (1200–1599 ELO) — your current tribe, the climb-mates
  - **Jonin** (1600+ ELO) — peers and mentors, smaller and more selective
- Three channels to start:
  - `#jutsu-of-the-week` — discussion of the week's concept video
  - `#sparring-partners` — pairing-up channel for games
  - `#study-hall` — focus rooms, accountability check-ins
- Keep it small for the first 30 days. 50 active members beats 500 ghosts. Curate, don't broadcast.
- **Naming note:** Genin/Chunin/Jonin are DUAL-USE on purpose. In Discord they're free rating-banded roles. Paid access should stack as entitlement roles, not replace rank identity: Chunin Exams for the ChessDojo-style paid training tier, Jonin Mentorship for the planned $150/mo high-touch offer. One brand vocabulary across community + commerce.

**Two recurring named formats — Bridge Content (PRT-040)**
- **Jutsu of the Week** — Tuesday cadence, single chess technique, 8–12 min YouTube + 60–90 s Shorts re-cut. Below in the Shorts section. Anchors the weekly content rhythm.
- **Boss Battle** — Monthly cadence, opponent-encounter format. Four archetypes available: Park Boss (in-person OTB game), Online Boss (titled-player ladder match), Title Boss (rated tournament round), Echo Boss (Rob analyzes his own past game from the climb's perspective). Recommendation for Episode 1: **Echo Boss** — lowest scheduling friction, Rob's footage already exists.
- Both formats end on the same CTA stack: `hokagechess.com/free-plan` (lead magnet) → Discord (Village) → subscribe. Each piece points outward into the funnel.

**"Jutsu of the Week" Shorts**
- 3–5 minutes, one concept you actually learned that week (not a textbook concept you already knew).
- Format the channel can carry weekly without burnout: same intro, same outro, low production overhead.
- This becomes the spine of "Phase 1 content from the student's perspective" — the thing no titled player can replicate.

**Daily YouTube Shorts (1/day)**
- Vertical, dramatic puzzle format. Start with the position on screen — no intro, no face cam in the first 2 seconds.
- Hook: "White to move. Find the win." → reveal at 30 seconds.
- One per day for 28 days = 28 Shorts. Don't aim for perfect. Aim for daily. The algorithm rewards cadence over polish at your subscriber count.

---

### Trademark — read this carefully

This is not a footnote. The IP question is the one thing that can blow the whole brand up later if you don't handle it now.

- **Using "Hokage Chess" for the YouTube channel = LOW risk.** A channel name is not "source branding for goods." Naruto's owner has not historically pursued YouTube creators using the term "Hokage."
- **Putting "Hokage" on merch or physical products = MEDIUM-to-HIGH risk and needs a trademark lawyer first.** Shirts, headbands, and especially physical chess pieces look like product branding in commerce. That's where the lawsuit risk lives.
- **The two existing HOKAGE USPTO filings are abandoned/stalled.** Serial 90341734 was abandoned in 2021. Serial 97007362 hasn't progressed since 2022. The field for "HOKAGE CHESS" in chess-product classes appears to be open. That is an *opportunity* to file your own trademark application before someone else does.
- **Budget $500–$1,500 for proper clearance** before any physical product launch. This is the cost of a clearance search + attorney review in the relevant USPTO classes (chess goods, educational materials, apparel).
- **NEVER use actual Naruto imagery, fonts, or character designs — even fan-made.** NARUTO is a live U.S. trademark (Reg. #3726754). The risk there is "false suggestion of connection," and it's the one thing that takes you from a cease-and-desist to actual damages. Original art only. Inspired-by aesthetic, not derivative.

Phase 1 is 100% safe under this framing. Phase 2 (merch, physical chess pieces) requires a lawyer call. We'll budget for it when Phase 2 is in sight.

---

### What Anthony's doing in parallel (status as of 2026-04-29)

- ✅ **Landing page built** — Next.js, all 9 sections, dark mode + Hokage Red palette. Tests green (56/56). Build green.
- ✅ **OG + Twitter share image** — generated 1200×630 brand-faithful card, file-convention auto-injects meta tags. Previews will show the right card on every share.
- ⏭ **Vercel deploy** — preflight doc shipped (`docs/business/2026-04-29-vercel-deploy-preflight.md`); ~5 min user-driven flow remains. Preview URL incoming.
- ⏭ **hokagechess.com domain** — confirmed available (Verisign whois 2026-04-25); registration pending (financial decision; Vercel Domains or Cloudflare both viable). Fallback `4jp.io/rob/` ready if delayed.
- ✅ **Email capture form wired** — `/api/subscribe` route + Kit v3 endpoint integration; graceful "launching soon" fallback while Kit credentials land.
- ⏭ **Kit setup** — runbook shipped (`docs/business/2026-04-29-kit-setup-runbook.md`); ~5 min user-driven (account → form → API key → Vercel env vars).
- ✅ **Mobile responsive (static review)** — PASS w/ 4 watch-items for live-deploy browser QA (`docs/business/2026-04-29-mobile-qa-notes.md`).

You don't need to think about any of this. It will exist when you need it.

---

### Questions for our next call

- Which 5 videos do you think most under-perform their content? (Your gut, not the analytics. We'll cross-check.)
- Discord — soft-launch this week to 5–10 trusted regulars, or wait until the lead magnet is live so the welcome flow is complete?
- Of the 7 positions for "The 1300 Escape Plan," do you want to pick them yourself, or want me to scan your last 30 games and propose a shortlist?
- Phase 2 merch timing — is "Q4 of this year" realistic, or are we pushing into next year? (Drives when we book the trademark lawyer.)

---

Compound the channel. The site will catch up.
