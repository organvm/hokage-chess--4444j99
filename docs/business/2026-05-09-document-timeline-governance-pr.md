# Product Requirements (PR): Document Timeline Governance System

Date: 2026-05-09  
Owner: Strategy/Operations  
Status: Draft for implementation

## 1) Purpose
Create a reproducible, evidence-first system for ingesting, preserving, and interpreting strategy documents over time. The system must support both:
- **Macro timeline slotting** (document-level chronology)
- **Micro timeline slotting** (atomic claim/event chronology)

It must also track prompt interpretation drift, missing data blackholes, and unexplored opportunity paths.

## 2) Problem Statement
Current process is rich in source material but fragmented across raw notes, plans, translations, and mixed-confidence interpretations. We need a standard operating model that:
- Preserves source integrity and provenance.
- Distinguishes event time vs receipt time vs interpretation time.
- Surfaces contradictions, uncertainty, and gaps.
- Scales across this repository and other projects.

## 3) Goals
1. Centralize document intake with immutable raw capture.
2. Standardize metadata for chronology, confidence, and provenance.
3. Atomize high-impact documents into machine-trackable units.
4. Maintain a live gap ledger (past/present/future blackholes).
5. Track prompts as versioned entities (initial input, current interpretation, paths not taken).

## 4) Non-Goals
- Building a full BI dashboard in Phase 1.
- Rewriting existing strategy content.
- Replacing domain-specific planning docs.

## 5) Scope
### In scope (Phase 1)
- Process + templates stored in repo.
- Core data model definitions.
- SOP for implementation and reproduction.
- Weekly governance review ritual.

### Out of scope (Phase 1)
- Automated NLP extraction.
- External integrations (Notion, Airtable, etc.).
- Full access-control subsystem.

## 6) Users
- Primary: Strategic operator / founder.
- Secondary: Collaborators translating raw material into actions.

## 7) Functional Requirements
1. **Document Intake**
   - Assign unique `doc_id`.
   - Record `created_at`, `received_at`, and `source`.
   - Preserve immutable raw payload.

2. **Metadata Baseline**
   - Required fields: type, provenance, confidence, translation status, version.

3. **Atomic Extraction**
   - Store claim/event atoms tied to source and timeline references.
   - Flag assertion type (fact/hypothesis/interpretation/forecast/affect signal).

4. **Prompt Tracking**
   - Each prompt has `prompt_id`, initial text, interpretation revisions, assumptions, and path options.

5. **Gap Mapping**
   - Identify temporal gaps, orphan claims, and future references lacking precursors.

6. **Governance/Auditability**
   - Append-only change log for interpretation updates.
   - Monthly snapshot for preservation.

## 8) Success Metrics
- 100% of new documents receive required metadata within 24 hours.
- ≥ 80% of high-priority documents atomized within 7 days.
- Weekly gap review completed with documented actions.
- Zero untracked interpretation edits for active prompts.

## 9) Risks and Mitigations
- **Risk:** Overhead reduces adoption.  
  **Mitigation:** Start with minimal schema and weekly cadence.
- **Risk:** Ambiguous confidence labels.  
  **Mitigation:** Use constrained vocabulary and examples in SOP.
- **Risk:** Drift into narrative-only mode.  
  **Mitigation:** Enforce evidence links per high-impact claim.

## 10) Milestones
- M1 (Week 1): Intake template + metadata baseline live.
- M2 (Week 2): Atomic extraction for top priority backlog.
- M3 (Week 3): Gap ledger activated with weekly review.
- M4 (Week 4): Governance audit and retention policy ratified.

## 11) Deliverables
- This PR document.
- SOP document with step-by-step reproducible workflow.
- Optional future: SQL schema and scripts for automation.
