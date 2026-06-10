# Repository World Analysis — hokage-chess

## Scope
Single repository audit using existing manifests, docs, routes, libraries, scripts, and tests.

## 1) Executive Thesis
This repository is a **content-operating system** for creator growth that pairs a deterministic backend scoring/assembly layer with multiple frontend manifestations: a branded landing experience, dynamic persona pages, and email capture workflow. The deeper documentation corpus expands the repo into a research and governance substrate.

## 2) Repository World Map
- **Purpose**: Publish and optimize creator growth narratives and conversion flows.
- **Backend physics**:
  - Content scoring heuristics + anti-pattern penalties (`src/lib/content-strategy.ts`).
  - Persona × narrative composition engine (`src/lib/landing-engine/compose.ts`).
  - Subscription API with validation + env-gated external dependency (`src/app/api/subscribe/route.ts`).
- **Frontend manifestations**:
  - Main landing page with clear trust/status indicators and CTA (`src/app/page.tsx`).
  - Dynamic persona and persona+pillar routes (`src/app/for/[persona]/page.tsx`, `src/app/for/[persona]/[pillar]/page.tsx`).
- **Documentation surfaces**:
  - Business and strategy docs under `docs/business/`.
  - Governance and substrate maps under `docs/governance/` and `docs/substrate/`.
- **Automation/workflow surfaces**:
  - OG image generator (`scripts/generate-og-image.mjs`).
  - Manifest drift tooling (`tools/manifest_drift.py`).
  - CI-like regression assurance via Vitest suites (`tests/`).
- **Risks/constraints**:
  - Runtime reliance on external Kit API and environment variables.
  - Heuristic scoring transparency/interpretability risk if exposed publicly without explanation.
  - Documentation breadth may outpace implementation parity.

## 3) Backend→Frontend Manifestation Matrix (condensed)
1. **Law**: Title formula scoring with anti-pattern penalties.
   - **Manifestation**: Editorial checklist UI/report is implied but not first-class in app routes.
   - **Status**: Partially manifested.
2. **Law**: Persona+narrative composition pipeline.
   - **Manifestation**: Dynamic `/for/[persona]` and `/for/[persona]/[pillar]` pages.
   - **Status**: Manifested.
3. **Law**: Email validation + config gate + upstream error relay.
   - **Manifestation**: Subscribe form states (success/error/config-incomplete) required.
   - **Status**: Backend complete; explicit UX state inventory should be documented.

## 4) Candidate Value Units
- **VU-01: Content Strategy Scoring Engine as productized diagnostic**
  - Classes: tool product, audit product, knowledge product, API product.
  - Action: `PROTOTYPE` then `CLIENTIZE`.
- **VU-02: Persona Landing Composer as multi-tenant template system**
  - Classes: service product, design system product, client deliverable.
  - Action: `BUILD_NOW`.
- **VU-03: Subscribe Reliability + Compliance Surface**
  - Classes: governance product, provenance product, infrastructure product.
  - Action: `DOCUMENT_FIRST`.
- **VU-04: Repository Manifest/Drift Auditor**
  - Classes: agent-operability product, benchmark product, governance product.
  - Action: `PUBLISH_AS_PUBLIC_ARTIFACT`.

## 5) Productization Gaps (high-priority)
- Missing explicit operator dashboard for scoring outputs and drift trends.
- Missing public-facing provenance panel for heuristics, evidence, and confidence.
- Missing structured threat model/security notes for subscription route misuse.
- Missing consolidated contributor+agent playbook that links docs substrate to executable workflows.

## 6) Roadmap (staged)
- **Phase 0 Inventory**: Lock canonical manifest of code/docs/scripts/tests.
- **Phase 1 Manifestation Map**: Map each backend law to explicit UI/docs state.
- **Phase 2 Documentation Repair**: Fill missing UX/error/provenance/security docs.
- **Phase 3 Public Proof**: Publish demo pages + case evidence from testable outputs.
- **Phase 4 Client Packaging**: Turn scoring+landing+subscribe into repeatable delivery package.
- **Phase 5 Commercialization**: Metered diagnostics/API/template offers.
- **Phase 6 Research Publication**: Formalize taxonomy/method from substrate docs.
- **Phase 7 Community Release**: OSS starter kit + contributor model.
- **Phase 8 Agent Operability**: Machine-readable boundaries, validation rules, safe-edit protocol.
- **Phase 9 Lifecycle Governance**: Maintenance cadence, deprecation archive, provenance logs.

## 7) Evidence Index
- Core app entry and UX manifestations: `src/app/page.tsx`.
- Dynamic persona routes: `src/app/for/[persona]/page.tsx`, `src/app/for/[persona]/[pillar]/page.tsx`.
- Content scoring engine: `src/lib/content-strategy.ts`.
- Landing composition engine: `src/lib/landing-engine/compose.ts`.
- Subscription API and constraints: `src/app/api/subscribe/route.ts`.
- Scripts/tooling: `scripts/generate-og-image.mjs`, `tools/manifest_drift.py`, `tools/project_manifest.py`.
- Test coverage signals: `tests/*.test.ts` and component snapshots.
