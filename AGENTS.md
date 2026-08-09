<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

```bash
npm run dev          # Next.js dev server → http://localhost:3000
npm run build        # Production build (verify before deploy)
npm run lint        # ESLint
npm run test         # Vitest run-mode (~56 tests baseline)
npm run test:watch  # Vitest watch-mode
npx vitest run tests/content-strategy.test.ts   # Single suite
node scripts/generate-og-image.mjs             # Regenerate OG images
```

## Architecture

- **`src/lib/content-strategy.ts`** — Universal title/thumbnail scoring. Brand-agnostic. Do NOT bake "chess" or "Hokage" terms into the core.
- **`src/lib/landing-engine/`** — Persona × Narrative × Section primitives. Adding to `personas.ts` auto-generates `/for/<id>` routes.
- **`src/app/api/subscribe/route.ts`** — Beehiiv email handler for Hokage Scroll. Requires `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID` env vars.
- **`src/app/for/[persona]/page.tsx`** — Dynamic persona routes via `generateStaticParams`.

## Next.js 16 specifics

- Uses file-convention OG images (`src/app/opengraph-image.png`, `twitter-image.png`) — do NOT add a `metadata` export for OG when the file convention is in play.
- App Router: server vs. client components, `generateStaticParams`, route handlers.
- Heed deprecation notices in build output.

## Pre-commit

Gitleaks is aggressive on credential-keyword substrings. If false positive:
- Rephrase text to avoid literal patterns, or
- Add `// allow-secret` / `# allow-secret` to the line

## Tests

~56 tests across 4 suites, ~10 build routes. Re-check via `npm test` and `npm run build` — don't trust the numbers.

## What NOT to do

- Do NOT re-bake brand-specific vocabulary into `content-strategy.ts` — keep it parametric.
- Do NOT add Next.js `metadata` export for OG when file convention is wired.
