# Vercel Deploy Preflight — Hokage Chess Landing

**Date:** 2026-04-29
**Stream:** D (`S-2026-04-29-rob-hokage`)
**Vacuum:** V8 (Landing page not deployed)
**Status:** Preflight ready · deploy itself gated on user authorization (Vercel auth + DNS purchase)

---

## What this document does

Stages every artifact, env var, and click required to take `4444J99/hokage-chess` from local-build-green to public URL Rob can share. Captures the work that does NOT require the user's hands so the manual steps shrink to ~5 minutes of Vercel UI clicks.

---

## Pre-deploy verified state (this session, commits `deb23b1`–`4fdbc19`)

| Check | Status | Evidence |
|---|---|---|
| `npm run test` | 56/56 ✓ | 4 vitest suites green (Phase 0 baseline) |
| `npm run build` | ✓ | 9 routes prerender (`/`, `/_not-found`, `/for/[persona]` × 3, `/opengraph-image.png`, `/twitter-image.png`) |
| TypeScript | ✓ | `next build` runs typecheck; no errors |
| OG metadata | ✓ | File-convention via `src/app/opengraph-image.png` + `twitter-image.png` (Phase 3.1, commit `b0e3a9f`) |
| Mobile responsive | ✓ static | `docs/business/2026-04-29-mobile-qa-notes.md` — 4 watch-items for live QA, no blockers |
| Brand consistency | ✓ | `globals.css` confirms #111111 / #E5E5E5 / #C41E3A / #FFD700 palette aligned across page + OG |
| Dependencies | ✓ | Next 16.2.4, React 19.2.4 (matches Vercel's supported framework presets) |

---

## Vercel project configuration

### Framework preset
- **Framework:** Next.js (auto-detected from `next.config.ts` + `package.json`)
- **Build command:** `npm run build` (default; no override needed)
- **Output directory:** `.next` (default)
- **Install command:** `npm install` (default)
- **Node version:** 20.x or 22.x (Next 16 requires ≥18.18)
- **Root directory:** `.` (repo root)

### `vercel.json`
**Not needed.** Next.js 16 + Vercel auto-detection covers static prerendering, image optimization, OG image routes, and the dynamic `/for/[persona]` route. Adding `vercel.json` would be premature — only add when a specific override is required (custom headers, rewrites for legacy URLs, function regions for ISR).

### Environment variables (Vercel project → Settings → Environment Variables)

Stage these AHEAD of first deploy, scoped to **Production** + **Preview**:

| Name | Value source | Required for | Notes |
|---|---|---|---|
| `BEEHIIV_API_KEY` | Beehiiv workspace → Settings → API | CWS-3 Hokage Scroll form handler | Server-side only; do NOT prefix `NEXT_PUBLIC_`. See `docs/business/2026-06-22-hokage-scroll-beehiiv-runbook.md`. |
| `BEEHIIV_PUBLICATION_ID` | Beehiiv publication settings/API response | CWS-3 Hokage Scroll form handler | Server-side route config. Should look like `pub_...`. |
| `BEEHIIV_AUTOMATION_ID` | Beehiiv automation with Add by API trigger | Optional welcome delivery | Optional. Use only after automation is active. |
| `BEEHIIV_NEWSLETTER_LIST_ID` | Beehiiv newsletter list | Optional Hokage Scroll list membership | Optional. Use only if the publication has lists enabled. |
| `NEXT_PUBLIC_SITE_URL` | `https://hokagechess.com` (or fallback) | OG canonical URLs | Already hardcoded in `layout.tsx metadataBase`; env var optional. |

**Currently no env vars are required for a successful build** — the form handler returns `config_incomplete` at runtime if Beehiiv credentials are absent. The deploy can ship with form-capture as visual-only until Beehiiv credentials land.

---

## DNS configuration (`hokagechess.com`)

Per `storefront.config.yaml`:
- **Primary target:** `hokagechess.com` (and `www.hokagechess.com`)
- **Fallback target:** `4jp.io/rob/` (path-prefixed under personal domain — useful if the .com is delayed)

### When `hokagechess.com` is registered (Cloudflare or Vercel Domains)

**Vercel-managed DNS (simplest):**
1. Vercel project → Settings → Domains → Add `hokagechess.com`
2. Vercel emits the DNS records to set at the registrar:
   - **A record** `@` → `76.76.21.21`
   - **CNAME** `www` → `cname.vercel-dns.com`
3. Set those at the registrar (Cloudflare, Namecheap, etc.)
4. Wait for propagation (5–30 min usually)
5. Vercel auto-provisions LetsEncrypt SSL

**Cloudflare-proxied DNS (if user wants Cloudflare features):**
- Vercel domain config: same as above
- Cloudflare proxy: orange-cloud DISABLED for the apex `@` and `www` records during initial provisioning, then can be enabled after SSL handshake stabilizes
- Alternative: use Vercel's "DNS verification" mode and let Cloudflare Pages handle the static assets — but this complicates the Next.js dynamic routing

### Fallback `4jp.io/rob/` (no domain blocker)

If `hokagechess.com` purchase is delayed:
1. Configure Vercel project domain as `4jp.io` (assuming user already owns this)
2. Add path rewrite via `vercel.json` (only here would `vercel.json` become necessary):
   ```json
   { "rewrites": [{ "source": "/rob/:path*", "destination": "/:path*" }] }
   ```
3. Update `metadataBase` in `src/app/layout.tsx` to `https://4jp.io/rob` temporarily.
4. Migrate to `hokagechess.com` once registered — revert the rewrite + restore metadataBase.

**Recommendation:** ship to Vercel preview URL FIRST (no domain needed), share that URL with Rob for review/mobile-QA, register `hokagechess.com` in parallel.

---

## Manual deploy steps (user-facing, ~5 minutes)

1. **`vercel login`** in terminal (one-time; OAuth via GitHub `4444jPPP`)
2. From repo root: `vercel link` → select scope `4444jPPP` (or team) → confirm "create new project? Yes" → name `hokage-chess` → directory `.`
3. **`vercel deploy`** (preview deploy; gives you a `https://hokage-chess-<hash>.vercel.app` URL)
4. Open the URL → smoke test the page → run mobile QA per `docs/business/2026-04-29-mobile-qa-notes.md`
5. **`vercel deploy --prod`** when satisfied (promotes to production deployment alias)
6. Once `hokagechess.com` is registered: Vercel UI → Settings → Domains → Add → follow Vercel's DNS instructions

**What the user controls (must NOT be auto-executed):**
- Vercel account auth (financial relationship)
- Domain registration (financial transaction; WHOIS info; 1-year minimum commitment)
- DNS record changes at registrar (irreversible without TTL wait)
- Promoting preview → production (publishes publicly)

---

## Post-deploy validation

Once a preview URL is live:

| Check | How | Pass criteria |
|---|---|---|
| Static prerender | Open URL in browser | All 9 routes render |
| OG card | https://www.opengraph.xyz/url/<preview-url> | OG image preview shows the brand card; alt text present |
| Twitter card | https://cards-dev.twitter.com/validator (deprecated; use opengraph.xyz) | Twitter image preview shows brand card |
| Mobile responsive | DevTools device-toolbar at 375×667 | All 4 watch-items from mobile QA notes look acceptable |
| Lighthouse (mobile) | Chrome DevTools → Lighthouse → Mobile | Performance >85, A11y >95, SEO >95 (perfect not required) |
| Form submission | Fill email field → submit | Success card appears when Beehiiv env vars are set; otherwise the UI shows the "launching soon" config fallback |
| Persona routes | `/for/stuck-beginner`, `/for/climbing-intermediate`, `/for/returning-adult-improver` | Each renders without 404 |
| favicon | Tab icon in browser | Favicon visible |
| Discord link | Click Discord icon in footer | Currently `href="#"` — placeholder until Discord provisioned (Rob blocker) |

---

## What this preflight does NOT cover (out of scope for Stream D)

- **Beehiiv account setup itself** — see `docs/business/2026-06-22-hokage-scroll-beehiiv-runbook.md` (CWS-3)
- **Domain purchase** — user financial decision; Cloudflare or Vercel both viable
- **Discord server provisioning** — Rob blocker per memory `project_artifact_rob_trail_2026_04_27.md`
- **Analytics setup** — Plausible / Vercel Analytics / GA4 — separate decision; ship without first, add post-launch
- **Trademark validation for "Hokage Chess"** — already addressed in `docs/ROB-FIRST-30-DAYS.md` (channel use = LOW risk; merch = needs lawyer)

---

## IRF candidate

`IRF-PRT-V8` — Stream H Reconciliation Gate to verify and promote at session close-out.

## Lineage

- Vacuum source: `HANDOFF.md` Group 1 V8
- Storefront config: `storefront.config.yaml`
- Brand: `src/app/globals.css`
- OG asset: `src/app/opengraph-image.png` + generator `scripts/generate-og-image.mjs` (commit `b0e3a9f`)
- Mobile QA: `docs/business/2026-04-29-mobile-qa-notes.md` (commit `4fdbc19`)
- Memory: `project_hokage_chess_client.md` ("P0: Vercel deploy, hokagechess.com registration")
