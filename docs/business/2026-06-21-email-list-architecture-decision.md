# Email List Architecture Decision (MP-7)

**Date:** 2026-06-21
**Atom:** MP-7
**GitHub issue:** #40
**Status:** Accepted
**Scope:** Rob's Hokage Chess + fitness/BODI owned-audience layer

---

## Decision

Use **one unified subscriber database** with **two primary editorial tracks**:

1. **Chess track:** `Hokage Scroll` / `The Scroll`
2. **Fitness track:** `Legion Dispatch`

Do **not** launch a third standalone bridge newsletter. Treat the bridge thesis as a tagged series, tentatively `Discipline Stack`, that can be sent to subscribers who opt into cross-domain material or who explicitly engage with bridge content.

In short: **one base, two tracks, bridge as a segment.**

This resolves the MP-7 ambiguity between:
- one fully unified chess + fitness newsletter,
- two pillar-separate newsletters with shared subscribers,
- three separate chess + fitness + bridge newsletters.

The chosen architecture is the second option, with the bridge handled as a consented segment rather than as its own publication.

---

## Why this wins

### 1. MP-3 is still unknown

The audience-overlap question has not been measured. A single weekly "chess + fitness + bridge" newsletter would assume that chess viewers want fitness content and that fitness leads want chess content. That may be true for Rob's strongest identity-fit followers, but it is not safe as the default.

Until MP-3 returns data, the list should preserve optionality:
- chess leads receive chess by default,
- fitness leads receive fitness by default,
- bridge content is opt-in or behavior-triggered.

### 2. The buying contexts are different

Chess subscribers are likely entering through:
- `Get to 1400` / `1300 Escape Plan` lead magnet,
- YouTube,
- Discord,
- Genin / Chunin / Jonin offers.

Fitness subscribers are likely entering through:
- Facebook / Instagram,
- free fitness-plan intake,
- Teamzy follow-up,
- BODI / Legion / challenge offers.

Those are different promises. Mixing them too early makes the subscription less legible.

### 3. The founder identity is shared

Rob is the common asset. The database should recognize one person can care about more than one Rob surface. Separate databases would lose that signal, duplicate contacts, complicate unsubscribe compliance, and hide the cross-pollination measurement MP-3 needs.

### 4. Three newsletters overfits before cadence exists

The bridge pillar is strategically distinctive, but it does not yet have enough recurring output to justify its own newsletter. Making it a third publication creates calendar pressure before the content rhythm exists. The bridge should first prove itself as a series inside the shared base.

### 5. The repo already ships a Kit path

The current app has a Kit/ConvertKit subscribe route and setup runbook. Beehiiv remains a valid future newsletter-growth layer, especially for recommendations and boosts, but MP-7 should not force a replatform before the capture loop is live.

The architectural primitive is **portable tags and segments**, not the vendor.

---

## Operating model

### Subscriber record

Every subscriber belongs to one shared database and carries tags/fields for source and interest:

| Tag / field | Meaning |
|---|---|
| `pillar:chess` | Wants Hokage Chess emails |
| `pillar:fitness` | Wants Legion / fitness emails |
| `pillar:bridge` | Wants cross-domain discipline-transfer content |
| `source:hokage-free-plan` | Entered through Hokage lead magnet |
| `source:fitness-free-plan` | Entered through fitness-plan intake |
| `source:discipline-stack` | Entered through bridge thesis content |
| `stage:l2_lead` | Free opt-in / nurture lead |
| `stage:l3_customer` | Paying customer / member |
| `stage:l4_ambassador` | Ambassador / facilitator candidate |

Vendor-specific names can differ, but the semantics above are canonical.

### Default subscriptions

| Entry point | Default track | Optional checkbox / follow-up |
|---|---|---|
| Hokage lead magnet | `pillar:chess` | `pillar:bridge` |
| Fitness-plan intake | `pillar:fitness` | `pillar:bridge` |
| Bridge essay / event | `pillar:bridge` | choose chess, fitness, or both |
| Manual import from Teamzy | `pillar:fitness` unless explicitly known otherwise | ask preference before sending chess |
| Discord / community import | match the community context | offer bridge after engagement |

Do not silently add a chess subscriber to fitness sends, or a fitness subscriber to chess sends, just because both live in one database.

### Cadence

| Track | Launch cadence | Mature cadence |
|---|---|---|
| Chess | Welcome sequence + launch notices until list has a real content rhythm | Weekly, tied to Jutsu / Boss Battle output |
| Fitness | Monthly or biweekly until L0 reel cadence stabilizes | Weekly if Rob is publishing enough fitness material |
| Bridge | Monthly max, only when there is a real thesis artifact | Monthly or every fourth send, based on engagement |

Bridge sends should be measured as experiments, not treated as guaranteed universal-interest emails.

---

## Measurement plan for MP-3

MP-7 should generate the data MP-3 needs rather than wait passively for MP-3 to exist.

Track these for 90 days after both pillar capture paths exist:

| Signal | Interpretation |
|---|---|
| `% chess subscribers opting into bridge` | Chess-to-discipline appetite |
| `% fitness subscribers opting into bridge` | Fitness-to-discipline appetite |
| `% bridge subscribers choosing both tracks` | Real unified-list potential |
| Cross-track click rate | Whether one pillar can introduce the other |
| Unsubscribe rate on bridge sends | Whether bridge is causing expectation mismatch |
| Replies / qualitative objections | Whether the mixed identity is confusing or compelling |

### Review thresholds

Keep the two-track architecture if:
- bridge opt-in is below 10% on either pillar, or
- bridge-send unsubscribe rate exceeds normal pillar-send unsubscribe by more than 2x, or
- replies show confusion about why the subscriber received the email.

Trial a unified `Discipline Stack Digest` if:
- at least 25% of both pillar audiences opt into bridge, and
- bridge sends do not increase unsubscribe rate, and
- cross-track clicks convert to real downstream actions.

Split into separate publications only if:
- one pillar exceeds roughly 1,000 subscribers with independent revenue/cadence, and
- operating it separately improves growth or sponsorship economics, and
- the shared database still remains the master contact ledger.

---

## Platform rule

### V1

Use the existing Kit/ConvertKit path for Hokage capture because it is already wired in this repo:
- `src/app/api/subscribe/route.ts`
- `docs/business/2026-04-29-kit-setup-runbook.md`

Fitness can keep Teamzy as the operational CRM while mirroring owned-media subscription state into the shared email database when Rob is ready.

### Beehiiv

Beehiiv remains the preferred evaluation candidate if newsletter-native growth becomes the bottleneck:
- referral program,
- recommendations / boosts,
- newsletter-first analytics,
- sponsorship surface.

Do not migrate to Beehiiv merely because the world maps mention it. Migrate only when the list has enough cadence and volume for Beehiiv's growth mechanics to matter.

### Non-negotiable abstraction

Whatever vendor is used, preserve:
- one contact ledger,
- pillar tags,
- source tags,
- stage tags,
- a preference-management path,
- universal unsubscribe compliance.

---

## Consequences

### Positive

- Protects chess and fitness subscribers from irrelevant default sends.
- Keeps Rob's founder graph unified.
- Creates measurable evidence for MP-3.
- Avoids launching a third newsletter before the bridge has cadence.
- Lets the existing Kit implementation ship without waiting on Beehiiv.

### Negative

- Requires tag hygiene from day one.
- Needs clear opt-in copy so subscribers know what they asked for.
- Does not fully exploit Beehiiv's publication-native model until a later threshold.
- Creates two editorial promises Rob must eventually sustain.

---

## Implementation notes

1. Keep the Hokage site capture path focused on chess by default.
2. Add source and pillar tagging before importing any fitness leads.
3. When a fitness capture page exists, default it to `pillar:fitness`.
4. Add bridge opt-in language only after the first real `Discipline Stack` artifact exists.
5. Update future Beehiiv/Kit/Teamzy docs to reference this architecture before choosing vendor-specific fields.

---

## Acceptance

This closes MP-7 / #40 when:

1. The canonical architecture is recorded as **one database, two primary tracks, bridge segment**.
2. CWS-3 and FWS-1 are reconciled as track-level work, not separate databases.
3. The Kit vs Beehiiv question is scoped as a platform/vendor choice, not the list-architecture choice.
4. MP-3 has a 90-day measurement plan tied to tags and bridge-send behavior.
