# SOP: Reproducible Document Timeline Governance

Date: 2026-05-09  
Version: 1.0  
Applies to: This repository and external projects adopting the same method.

## A. Operating Principles
1. Preserve originals before interpretation.
2. Separate three clocks:
   - Event clock (when it happened)
   - Receipt clock (when we got it)
   - Interpretation clock (when meaning changed)
3. Track uncertainty as data, not failure.
4. Keep path-not-taken decisions as first-class records.

## B. Folder and Record Conventions
- Store strategic artifacts under `docs/business/` (or equivalent in other repos).
- Keep source-heavy references under `reference/`.
- Name files with ISO date prefixes: `YYYY-MM-DD-topic.md`.

## C. Required Metadata (per document)
- `doc_id`
- `title`
- `type`
- `created_at`
- `received_at`
- `source/provenance`
- `version`
- `confidence` (low/medium/high)
- `translation_status` (raw/clean/interpreted)

## D. Intake Procedure (Daily)
1. Capture raw input unchanged.
2. Assign `doc_id` and metadata.
3. Register document in timeline index.
4. Mark priority level: P0, P1, P2.

Definition:
- P0 = execution-critical this week.
- P1 = planning-critical this month.
- P2 = archival/background.

## E. Atomic Extraction (for P0/P1)
For each high-priority document:
1. Split into atomic claims/events.
2. For each atom, capture:
   - `atom_id`
   - source `doc_id`
   - claim text
   - referenced time
   - assertion type
   - certainty score (0.0–1.0)
   - evidence link(s)
3. Record contradictions between atoms.

## F. Prompt Tracking Workflow
When a new prompt is received:
1. Create `prompt_id`.
2. Save exact prompt text (immutable snapshot).
3. Add current interpretation.
4. Add alternate interpretations.
5. Record:
   - assumptions
   - opportunities
   - paths not taken
   - uncertainty/avoidance/dissociation flags

## G. Gap and Blackhole Review (Weekly)
Run a weekly review with three checks:
1. **Temporal blackholes**: missing windows of critical data.
2. **Epistemic blackholes**: high confidence with weak evidence.
3. **Path-network gaps**: unexplored but high-potential branches.

Output:
- One-page weekly gap memo with owners + due dates.

## H. Governance and Preservation
- Keep immutable raw copies.
- Append-only interpretation change log.
- Monthly snapshot and checksum validation.
- Record rationale for any reclassification of confidence.

## I. Reproduction in Other Environments
To apply elsewhere:
1. Replicate folder conventions and metadata schema.
2. Keep the same three-clock model.
3. Start manual first; automate only after 2 stable cycles.
4. Run weekly gap review unchanged for 30 days before customizing.

Minimum viable stack elsewhere:
- Markdown + git + spreadsheet/database index.
- Optional: SQLite for atoms/prompts/gaps.

## J. Application Here (Immediate)
1. Use this SOP for all new strategic docs from 2026-05-09 onward.
2. Backfill last 14 days of P0/P1 docs into atomic format.
3. Start weekly Friday governance review.
4. Add automation proposal after first 2 reviews.
