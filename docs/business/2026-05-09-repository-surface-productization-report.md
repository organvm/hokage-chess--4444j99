# $REPOSITORY_SURFACE_PRODUCTIZATION_REPORT

## 1) $REPOSITORY_IDENTITY
- **Repository name:** `hokage-chess`.
- **Apparent purpose:** Next.js 16 web system for persona-driven chess landing pages, pillar SEO pages, email capture, and reusable content/growth decision engines.
- **Primary domain:** Creator growth ops + chess education positioning.
- **Maturity level:** Early production prototype with strong internal logic and test coverage (multiple Vitest suites and static route generation).
- **Implied audience:** chess improvers (1000–1800 + returning adults), creator/operator, and potential consulting clients wanting reusable growth frameworks.
- **Current artifact type:** hybrid of (a) branded landing site and (b) reusable domain logic library for content strategy, narrative planning, analytics, XP/progression, and growth checkpoints.
- **Strongest latent direction:** productized “creator operating system” with persona-to-landing automation + measurable conversion and retention workflows.

## 2) $BACKEND_PHYSICS_MAP

| Backend element | System law | Entity affected | State affected | User relevance | Business relevance | Evidence path |
|---|---|---|---|---|---|---|
| `scoreTitleFormula` + lexicon rules | Title score = emotion + stakes + length − anti-pattern penalties (0–3 floor) | `VideoIdea` title candidate | title quality score + feedback list | clearer title decisions | higher CTR probability | `src/lib/content-strategy.ts` |
| `scoreThumbnail` + checklist gates | Thumbnail readiness determined by 4 boolean criteria; upload readiness is gate-based | asset checklist | ready/not-ready release state | clear publish criteria | fewer weak uploads | `src/lib/content-strategy.ts` |
| Weekly scorecard generator | Aggregates metrics into health status (`on_track`/`watch`/`needs_fix`) | weekly performance cohort | KPI status + best/worst video | performance visibility | operational cadence | `src/lib/analytics.ts` |
| Phase gate evaluator | Go / adjust / pause verdict from pass count | growth phase checkpoint | decision state | transparent progression | reduces random publishing | `src/lib/analytics.ts` |
| Red-flag detector | Deterministic alerts on poor CTR, retention, stagnation | scorecard history | intervention queue | “what to fix next” | protects channel growth | `src/lib/analytics.ts` |
| Growth phase engine | Subscriber bands map to quarterly phase (`q1`..`q4`) | channel lifecycle | phase progression | contextual targets | roadmap coherence | `src/lib/growth.ts` |
| Progress + revenue projections | Current snapshot normalized to target percentages | growth snapshot | progress scores + annual projection | motivation + planning | monetization forecasting | `src/lib/growth.ts` |
| YPP eligibility check | 1000 subscribers + 4000 hours hard gate | channel monetization status | eligible/not eligible | milestone clarity | monetization timing | `src/lib/growth.ts` |
| Narrative constructor/validator | 4-act structure with timing and strict ordering validation | video narrative plan | valid/invalid + errors | script structure confidence | consistent storytelling | `src/lib/narrative.ts` |
| Persona registry | Persona IDs are canonical and drive route generation | persona entities | available audience segments | relevant messaging | segmentation asset | `src/lib/landing-engine/personas.ts` |
| Pillar registry + adjacency graph | 6 pillars and triads define navigation and semantic graph | pillar entities | graph traversal options | discoverability of paths | scalable topical SEO | `src/lib/landing-engine/personas.ts`, `src/lib/landing-engine/sections.ts` |
| Section builders and composition | Persona + narrative (+ optional pillar focus) deterministically produce page sections | landing page model | section sequence/render payload | coherent UX narrative | templatized page factory | `src/lib/landing-engine/sections.ts`, `src/lib/landing-engine/compose.ts`, `src/lib/landing-engine/narratives.ts` |
| Subscribe API route | Input validation → env guard → ConvertKit forwarder → normalized error taxonomy | email subscriber lead | subscribed/error states (`invalid_json`, `invalid_email`, `config_incomplete`, `kit_error`) | dependable form behavior | lead capture integrity | `src/app/api/subscribe/route.ts`, `tests/api-subscribe.test.ts` |

## 3) $FRONTEND_MANIFESTATION_MAP
- **Title/thumbnail scoring physics → required UI:** creator score workspace with explanation chips, anti-pattern warnings, and “ready to publish” badge (currently mostly latent; only lib exists).
- **Weekly scorecard/red-flag physics → required UI:** trend dashboard with KPI cards, week-over-week spark lines, red-flag banner, and intervention checklist.
- **Growth phase/progress physics → required UI:** phase timeline, target-vs-actual bars, monetization milestone tracker (incl. YPP).
- **Narrative validation physics → required UI:** act timeline editor + validation panel with line-specific errors.
- **Persona/pillar composition physics → actual UI present:** `/for/[persona]`, `/for/[persona]/[pillar]`, and `/pillars/[slug]` render persona and pillar-specific storytelling surfaces.
- **Subscription route physics → required/partial UI:** email capture form should visibly map backend states (`invalid_email`, `config_incomplete`, `kit_error`, success).

## 4) $MANIFESTATION_GAPS
1. **Analytics/growth engines lack a first-class dashboard.**
   - Why: backend decisions exist but remain invisible.
   - Confusion: users can’t see status/verdict/red flags.
   - Value: turns hidden logic into a client-facing decision cockpit.
   - Smallest implementation: `/dashboard` page rendering sample/store-fed scorecards and phase gate widgets.
2. **Narrative validator lacks authoring interface.**
   - Smallest implementation: `/studio/narrative` with duration input, auto-generated acts, and validation report.
3. **Content strategy scoring lacks interactive tool.**
   - Smallest implementation: `/studio/title-lab` with title input and feedback list.
4. **Error taxonomy from subscribe API is not explicitly mirrored in all public microcopy (inferred; requires verification in component tree).**
   - Smallest implementation: typed front-end error mapper component.
5. **No explicit admin/ops observability for ConvertKit health.**
   - Smallest implementation: internal status card showing env readiness + last API response status.

## 5) $UNGROUNDED_INTERFACE_ELEMENTS
- **Potential ungrounded element (inferred):** static trust claims (e.g., current ELO/update badges) appear hardcoded in homepage sections and may not be backed by a live data source.
  - Risk: stale credibility signals.
  - Required backend: data feed/log for profile stats.
  - Correction: move trust metrics to JSON/content source with update timestamp governance.
- **SEO metadata claims are grounded** for persona/pillar routes because metadata is generated from compose + pillar descriptors.

## 6) $SURFACE_EXTRACTION
1. **Persona Landing Factory** — PRODUCT/SERVICE/CLIENT/PUBLIC surface.
2. **Creator Growth Scorecard Console** — PRODUCT/CLIENT/INFRASTRUCTURE/DATA surface.
3. **Title & Thumbnail Heuristic Lab** — PRODUCT/PUBLIC/COMMUNITY/PEDAGOGICAL surface.
4. **Narrative Act Planner (Ki–Sho–Ten–Ketsu)** — PRODUCT/RESEARCH/PEDAGOGICAL/CONTENT surface.
5. **Lead Capture Reliability Module (ConvertKit adapter + tests)** — SERVICE/INFRASTRUCTURE/GOVERNANCE surface.
6. **Pillar Taxonomy SEO Router** — PRODUCT/PUBLIC/CONTENT/DOMAIN surface.
7. **Ontology-driven strategy docs corpus** — RESEARCH/COMMUNITY/PUBLIC surface.

## 7) $AUDIENCE_LENS_MATRIX (0–5)

| Surface | $ME_CLIENT | $CLIENT_PUBLIC | $ME_PUBLIC | $DOMAIN_RESEARCH | $COMMUNITY_USE | $PRODUCT_MARKET |
|---|---:|---:|---:|---:|---:|---:|
| Persona Landing Factory | 5 | 5 | 4 | 2 | 4 | 5 |
| Growth Scorecard Console | 5 | 4 | 4 | 3 | 3 | 5 |
| Title/Thumbnail Lab | 4 | 4 | 5 | 3 | 5 | 4 |
| Narrative Act Planner | 4 | 3 | 4 | 5 | 4 | 4 |
| Lead Capture Reliability Module | 5 | 3 | 3 | 2 | 3 | 4 |
| Pillar Taxonomy SEO Router | 4 | 5 | 4 | 3 | 4 | 4 |
| Strategy docs corpus | 3 | 3 | 5 | 5 | 4 | 2 |

**Justification shorthand:** high scores where existing deterministic logic + tests already reduce implementation risk and speed client delivery.

## 8) $PRODUCT_CANDIDATES
1. **Product:** Creator Persona Landing OS
   - Target user/buyer: solo creators, coaching brands.
   - Pain: generic landing pages that don’t segment intent.
   - Value: auto-generated persona × pillar pages with narrative sequence.
   - MVP: managed config UI for personas, pillars, copy; static page build/deploy.
   - Backend: compose/registry engines; subscribe API.
   - Frontend: persona/pillar route templates and CMS-like form.
   - Monetization: setup fee + monthly iteration retainer.
2. **Product:** Creator KPI Decision Console
   - Pain: no operational interpretation of YouTube metrics.
   - MVP: upload metrics CSV/API → scorecard + red flags + phase-gate verdicts.
   - Monetization: SaaS tier by channel count.
3. **Product:** Title/Thumbnail Readiness Copilot
   - MVP: scoring tool + anti-pattern detector + publish checklist.
   - Monetization: freemium scoring, paid team/workspace/history.
4. **Product:** Narrative Timing Studio
   - MVP: script duration planner + act validation + chapter export.
   - Monetization: paid pro templates/exports.

## 9) $SERVICE_CANDIDATES
1. **Persona Surface Architecture Sprint** (2 weeks): persona research → route map → copy matrix → deployed landing stack.
2. **Growth Signal Audit** (1 week): ingest metrics, run red-flag diagnostics, deliver intervention plan.
3. **Conversion Reliability Hardening** (3–5 days): API error mapping, env readiness checks, QA matrix.
4. **Narrative Operations Coaching** (weekly): script reviews using act validator + chapter quality checks.
5. **SEO Pillar Mesh Buildout** (1–2 weeks): pillar taxonomy to long-tail route deployment.

## 10) $RESEARCH_CONTRIBUTIONS
1. **Claim:** Persona × Pillar × Narrative composition is a reusable ontology for creator funnels.
2. **Claim:** Deterministic “backend physics → frontend manifestation” mapping reduces UX drift.
3. **Claim:** Rule-based red-flag engines can operationalize creator growth decisions without ML.
4. **Claim:** Story-act validation improves consistency in educational content production.
5. **Claim:** Taxonomy-driven static routing enables explainable SEO architecture.

## 11) $COMMUNITY_ASSETS
- Open persona/pillar schema starter kit.
- Narrative template library (Ki–Sho–Ten–Ketsu and alternatives).
- Growth checkpoint checklist pack.
- Subscribe endpoint reliability test harness.
- “Manifestation gap” audit template for web products.

## 12) $PUBLIC_ARTIFACTS
- Public interactive demo: “Build your persona landing in 60 seconds.”
- Technical case study: deterministic landing composition architecture.
- Essay: backend physics vs frontend manifestation design law.
- OSS package: `landing-compose-engine` primitives.
- Webinar/workshop deck on creator operations ontology.

## 13) $CLIENT_PUBLIC_TRANSLATIONS
- Internal client scoring model → public-facing “content readiness calculator.”
- Internal persona engine → public segmented campaign landing hub.
- Internal KPI dashboard → public transparency/progress page (select metrics).
- Internal narrative protocol → public educational framework page.

## 14) $PRIORITIZATION

| Candidate | Type | Score (composite) | Fastest path | Strongest lens | Required lift | Next action |
|---|---|---:|---|---|---|---|
| Persona Landing OS | Product | 9.2 | productize current routes | ME_CLIENT / PRODUCT_MARKET | Medium | externalize persona config |
| KPI Decision Console | Product | 8.9 | expose existing analytics libs | ME_CLIENT / PRODUCT_MARKET | Medium | build `/dashboard` v1 |
| Title/Thumbnail Lab | Product | 8.7 | wrap scorer in UI | ME_PUBLIC / COMMUNITY_USE | Low | build `/studio/title-lab` |
| SEO Pillar Mesh Service | Service | 8.4 | reuse pillar route system | CLIENT_PUBLIC | Low | add intake template |
| Narrative Timing Studio | Product | 8.1 | UI on narrative validator | DOMAIN_RESEARCH | Medium | build act timeline editor |

## 15) $EXECUTION_PLAN
- **$PHASE_0_DISCOVERY:** inventory manifests, libs, routes, tests, docs.
- **$PHASE_1_MAPPING:** formalize backend-laws ↔ UI-surface map as a versioned spec.
- **$PHASE_2_GAP_ANALYSIS:** implement gap register (missing manifestations + ungrounded claims).
- **$PHASE_3_PRODUCTIZATION:** spin top 3 surfaces into deployable modules (Landing OS, KPI Console, Title Lab).
- **$PHASE_4_PACKAGING:** create landing pages, README kits, demo scripts, and client deliverable templates.
- **$PHASE_5_PUBLICATION:** ship public demo + case study + OSS subset.
- **$PHASE_6_MONETIZATION:** launch service packages first, then SaaS pilots with design partners.

## 16) $FINAL_OUTPUT
### Top 5 repository-derived opportunities
1. Persona Landing OS.
2. KPI Decision Console.
3. Title/Thumbnail Readiness Copilot.
4. Narrative Timing Studio.
5. SEO Pillar Mesh Service.

### Top 5 missing frontend manifestations
1. KPI/red-flag dashboard.
2. Growth phase & monetization tracker UI.
3. Narrative validation editor.
4. Interactive title/thumbnail lab.
5. ConvertKit config/health observability panel.

### Top 5 client-service candidates
1. Persona Surface Architecture Sprint.
2. Growth Signal Audit.
3. Conversion Reliability Hardening.
4. SEO Pillar Mesh Buildout.
5. Narrative Operations Coaching.

### Top 5 public artifacts
1. Interactive persona landing demo.
2. Technical architecture case study.
3. Backend physics ↔ frontend manifestation essay.
4. Open-source landing composition package.
5. Workshop/webinar deck.

### Top 5 research contributions
1. Composition ontology for creator funnels.
2. Deterministic law-to-interface mapping model.
3. Rule-based creator diagnostics framework.
4. Narrative-act validation protocol.
5. Explainable SEO routing taxonomy model.

### Top 5 community assets
1. Persona/pillar schema starter.
2. Narrative template library.
3. KPI checkpoint checklist.
4. Subscribe API reliability test pack.
5. Manifestation-gap audit template.

### Single best next action
Ship **`/studio/title-lab`** first: it has the lowest build lift, strongest demonstrability, and directly operationalizes existing backend physics into a public proof-of-capability artifact.
