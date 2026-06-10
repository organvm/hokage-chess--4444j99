# Product Surface Strategy Analysis (Manifest-Driven)

## Scope framing
- **$WHAT_EXISTS:** One active repository (`hokage-chess`) that combines a Next.js 16 app, a reusable content-scoring engine, persona landing generation, analytics/growth utility modules, and a large documentation/research corpus with manifest indexing. 
- **$WHAT_IS_IMPLIED:** Product surfaces beyond the app: strategy playbooks, audit services, templates/forms, governance substrate, and data products from manifest tooling.
- **$WHAT_IS_MISSING:** Unified product docs, packaging boundaries, monetization lanes, contribution guide, and validation plans per surface.

---

$REPOSITORY_ID:
  R-001
$REPOSITORY_NAME:
  hokage-chess
$MANIFEST_SOURCE:
  docs/manifests/2026-05-01-project-manifest-annotated-bibliography.md + .jsonl
$CORE_FUNCTION:
  A hybrid system: (1) domain landing-site engine and growth UX, (2) universal content-strategy scoring logic, (3) operational knowledge/governance substrate for multi-domain creator business development.
$IMPLIED_PRODUCTS:
  - Universal Content Strategy Scoring Engine
  - Persona Landing Engine Generator
  - Subscription Capture API pattern (ConvertKit integration)
  - Growth/analytics scoring micro-library
  - Project Manifest Intelligence pipeline (catalog + bibliography)
  - BODI/Hokage strategy docs as packaged advisory IP
  - Structured forms/checklists as operational templates
  - Domain research corpus and educational publication stream
$SURFACE_INVENTORY:
  - S1: `src/lib/content-strategy.ts` universal lexicon + scoring engine
  - S2: `src/lib/landing-engine/*` persona/narrative/section composition system
  - S3: `src/app/for/[persona]/*` static persona route generation UX
  - S4: `src/app/api/subscribe/route.ts` subscription endpoint blueprint
  - S5: `src/lib/analytics.ts`, `growth.ts`, `xp-ledger.ts` internal growth logic
  - S6: `tools/project_manifest.py` + `tools/manifest_drift.py` manifest automation
  - S7: `docs/manifests/*` annotated bibliography outputs (knowledge index product)
  - S8: `docs/business/forms/*` reusable client/operator worksheets
  - S9: `docs/governance/*` client-separation/governance protocol
  - S10: `research/*` + `docs/content/*` publication-ready research/content assets
  - S11: QA credibility surface via tests (`tests/*`) + build/lint scripts
$AUDIENCE_LENS_MAPPING:
  $ME_CLIENT:
    - S1, S2, S5, S6, S8, S9 (operator leverage and decision support)
  $CLIENT_PUBLIC:
    - S2, S3, S4, S10 (user-facing pages, content, lead capture)
  $ME_PUBLIC:
    - S1, S7, S10, S11 (open-source authority + research credibility)
  $CLIENT_INTERNAL:
    - S5, S6, S8, S9, S11 (ops, governance, tracking, QA)
  $DOMAIN_CONTRIBUTION:
    - S1, S6, S7, S10 (methods, metadata, and strategic frameworks)
$CLASSIFICATION:
  - S1: $PRODUCT, $DOMAIN, $RESEARCH, $PUBLIC_PORTFOLIO, $EDUCATIONAL_RESOURCE
  - S2: $PRODUCT, $CLIENT_SERVICE, $AUTOMATION_PIPELINE
  - S3: $PRODUCT, $CLIENT_PUBLIC, $PUBLIC_PORTFOLIO
  - S4: $CLIENT_SERVICE, $INTERNAL_TOOLING, $AUTOMATION_PIPELINE
  - S5: $INTERNAL_TOOLING, $RESEARCH, $AUTOMATION_PIPELINE
  - S6: $INTERNAL_TOOLING, $DOMAIN, $AUTOMATION_PIPELINE
  - S7: $RESEARCH, $EDUCATIONAL_RESOURCE, $PUBLIC_PORTFOLIO
  - S8: $CLIENT_SERVICE, $EDUCATIONAL_RESOURCE, $INTERNAL_TOOLING
  - S9: $GOVERNANCE_SYSTEM, $CLIENT_SERVICE, $DOMAIN
  - S10: $RESEARCH, $COMMUNITY, $CREATIVE_ARTIFACT, $PUBLIC_PORTFOLIO
  - S11: $INTERNAL_TOOLING, $PUBLIC_PORTFOLIO
$PRODUCTIZATION_METHOD:
  - S1: Publish as npm package + hosted playground + scoring API endpoint.
  - S2/S3: Offer as “Persona Landing Accelerator” starter kit (template + config-driven personas).
  - S4: Productize as “Creator CRM Bridge” integration module.
  - S5: Bundle into creator KPI mini-dashboard.
  - S6/S7: Ship as “Repository Intelligence CLI” + managed reporting service.
  - S8/S9: Convert forms/governance docs into template packs + facilitated workshop.
  - S10: Atomize into newsletter series, PDF playbooks, and micro-courses.
$RESEARCH_METHOD:
  - Build evidence map from manifest thread taxonomy.
  - Run comparative analysis across chess/fitness/coaching vocab+funnel artifacts.
  - Validate scoring engine portability with blinded title datasets from multiple domains.
$COMMUNITY_METHOD:
  - Open selected framework docs (non-sensitive) and invite issue-driven contributions.
  - Publish “how we built this manifest pipeline” write-up with reproducibility steps.
  - Add contributor pathways for new personas/lexicons.
$CLIENT_SERVICE_METHOD:
  - Offer 4 products: Funnel Audit Sprint, Lexicon Build Sprint, Persona Landing Sprint, Governance Hardening Sprint.
  - Use forms as intake artifacts; use manifest tooling for baseline audits.
$PUBLICATION_METHOD:
  - Public artifacts: case study repo README overhaul, strategy essays, benchmark reports.
  - Semi-public artifacts: gated playbooks, workshop decks.
  - Internal-only artifacts: sensitive governance and client-identifying research.
$TECHNICAL_REQUIREMENTS:
  - Packaging boundary for lib modules (TypeScript exports, semantic versioning).
  - CI gates for `npm test`, `npm run build`, lint, and manifest drift checks.
  - Environment documentation for ConvertKit API integration.
$DOCUMENTATION_GAPS:
  - README still generic Next.js template (no product narrative).
  - No explicit architecture map linking app, libs, docs, and tools.
  - No public contribution guide/roadmap for external collaborators.
  - No SKU-level pricing/offer docs.
$VALIDATION_TESTS:
  - S1: Precision/recall benchmark against human-rated hooks.
  - S2/S3: Route generation correctness and conversion A/B tests.
  - S4: Integration tests for subscription success/failure and spam handling.
  - S6/S7: Determinism tests for manifest IDs and extraction coverage.
  - Business-layer: client pilot outcomes (conversion lift, content throughput, cycle-time reduction).
$RISK_FACTORS:
  - Strategy-doc sprawl without canonical source-of-truth curation.
  - Potential branding confusion between chess and fitness assets.
  - Overfitting score heuristics to one domain voice.
  - Compliance/privacy concerns if manifest tooling is run across sensitive client files.
$STRATEGIC_SCORE:
  - S1: 9/10
  - S2/S3: 9/10
  - S6/S7: 8/10
  - S8/S9: 8/10
  - S4/S5: 7/10
  - S10: 7/10
$REVENUE_SCORE:
  - S2/S3 client landing accelerator: 9/10
  - S8/S9 strategy+governance services: 9/10
  - S1 package/API: 8/10
  - S6 managed intelligence reporting: 7/10
  - S10 publications: 6/10 (long-tail authority revenue)
$PUBLIC_VALUE_SCORE:
  - S1, S7, S10 highest (8-9/10) if openly documented and reproducible.
$NEXT_ACTION:
  1) Rewrite README as product/research system map.
  2) Extract S1 into isolated package boundary.
  3) Publish first client offer page from S2/S8/S9 bundle.
  4) Add deterministic manifest CI check.

---

## $PRODUCT_SURFACE_MAP
1. **Scoring Engine Product** (S1): reusable title/thumbnail scoring core.
2. **Landing Engine Product** (S2/S3): persona-led route and narrative generation.
3. **Lead Capture Integration Product** (S4): API adapter for email systems.
4. **Growth Ops Toolkit** (S5): analytics + XP + growth scoring internals.
5. **Manifest Intelligence Product** (S6/S7): repository ingest, bibliography, drift control.
6. **Strategic Ops Template Suite** (S8): forms/checklists for client execution.
7. **Governance Protocol Product** (S9): client-separation and operational policy package.
8. **Research Publication Stream** (S10): domain studies and content pillars.
9. **Proof-of-Execution QA Surface** (S11): tests/build as trust artifact.

## $AUDIENCE_LENS_MATRIX
| Surface | Me Client | Client Public | Me Public | Client Internal | Domain Contribution |
|---|---:|---:|---:|---:|---:|
| S1 Scoring Engine | ✅ | ⚪ | ✅ | ✅ | ✅ |
| S2/S3 Landing Engine | ✅ | ✅ | ✅ | ⚪ | ✅ |
| S4 Subscribe API | ✅ | ✅ | ⚪ | ✅ | ⚪ |
| S5 Growth libs | ✅ | ⚪ | ⚪ | ✅ | ✅ |
| S6/S7 Manifest tooling/index | ✅ | ⚪ | ✅ | ✅ | ✅ |
| S8 Forms/templates | ✅ | ⚪ | ✅ | ✅ | ✅ |
| S9 Governance | ✅ | ⚪ | ⚪ | ✅ | ✅ |
| S10 Research/content corpus | ✅ | ✅ | ✅ | ⚪ | ✅ |
| S11 Tests/quality signals | ✅ | ⚪ | ✅ | ✅ | ⚪ |

## $DOMAIN_CONTRIBUTION_REGISTER
- Open heuristic scoring methodology (S1).
- Reproducible repository bibliography pipeline (S6/S7).
- Cross-domain funnel and strategy documentation patterns (S8/S10).
- Governance substrate patterns for multi-client AI operations (S9).

## $CLIENT_OFFER_REGISTER
- Offer 1: **Persona Landing Sprint** (S2/S3) — 2-week build.
- Offer 2: **Hook & Thumbnail Performance Audit** (S1 + S5).
- Offer 3: **Manifest Intelligence Audit** (S6/S7) for content/ops clarity.
- Offer 4: **Governance Hardening & Client Separation Setup** (S9).
- Offer 5: **Strategy System Installation Workshop** (S8/S10).

## $PUBLIC_PORTFOLIO_REGISTER
- Public demo of scoring engine with sample datasets (S1).
- Case study: persona route generation and conversion architecture (S2/S3).
- Technical essay: manifest ingestion and annotated bibliography system (S6/S7).
- Selected research essays and visual artifacts from `docs/content` and `research` (S10).

## $PRIORITIZED_BUILD_SEQUENCE
1. **Low friction / high value:** README + offer framing + publish S8 templates.
2. **Low-medium:** Package S1 and expose CLI/API.
3. **Medium:** Externalize S2/S3 as configurable starter.
4. **Medium:** Add CI + deterministic manifest drift checks.
5. **Medium-high:** Dashboardize S5 metrics.
6. **High / strategic:** Full manifest intelligence SaaS and governance platformization.

## $NEXT_30_DAY_EXECUTION_PLAN
- **Week 1:** Repo narrative reset (README, architecture map, contribution pathways).
- **Week 2:** Package S1 + docs + benchmark harness draft.
- **Week 3:** Build one client-ready offer bundle (Persona Landing + Governance kit) with pricing and scope.
- **Week 4:** Publish 2 authority artifacts (technical write-up + strategy case study), run one pilot client validation cycle, and gather conversion/throughput metrics.
