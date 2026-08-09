---
audiences:
  - id: rob
    register: pathos
    surface: community
    bridge_to: [chess]
tldr: "CWS-2 Discord server taxonomy for the Hidden Leaf Village: free rating roles, a ChessDojo-style paid Chunin Exams tier, and a $150/mo Jonin Mentorship lane."
strata: production-stack
client_render_mode: tldr
---

# Hidden Leaf Village Discord Structure [CWS-2]

**Date:** 2026-06-22
**Atom:** CWS-2
**GitHub issue:** #18
**Source:** `docs/business/2026-04-26-rob-chess-world-map.md` section 8.1, item #2
**Ties into:** RB-6 Discord server provisioning
**Status:** Accepted taxonomy, ready for server build

---

## 1. Decision

Launch one Hokage Chess Discord called **The Village**. Internally, its structure is the Hidden Leaf Village: a free public commons for adult improvers plus a paid training layer that can grow into mentorship.

The core design is:

1. **Free identity roles:** Genin, Chunin, and Jonin are rating-banded community identities.
2. **Paid entitlement roles:** Chunin Exams and Jonin Mentorship unlock gated channels.
3. **Low-ticket paid model:** Chunin Exams follows the ChessDojo reference architecture: paid Discord plus structured training, priced near **$15/mo or $100/yr** when launched.
4. **Premium service lane:** Jonin Mentorship is reserved for the planned **$150/mo** offer. It is not just "more Discord"; it is the scheduling, review, and accountability layer for direct coaching.

This keeps the server legible. Free members get belonging and rhythm. Paid members get structure. Mentorship clients get attention.

---

## 2. Role Taxonomy

| Role | Type | Who gets it | Access rule | Notes |
|---|---|---|---|---|
| `@Academy Student` | Default identity | New members before rating disclosure | Public channels | Temporary state until rank assignment |
| `@Genin` | Free rating identity | 0-1199 rapid/classical or self-reported equivalent | Public channels | Newcomers and early climbers |
| `@Chunin` | Free rating identity | 1200-1599 | Public channels | Rob's current tribe and the core peer band |
| `@Jonin` | Free rating identity | 1600+ | Public channels plus opt-in mentor pings | Peers, stronger players, future mod candidates |
| `@Chunin Exams` | Paid entitlement | Paid group-training members | Chunin Exams channels | ChessDojo-style paid training tier |
| `@Jonin Mentorship` | Paid entitlement | $150/mo mentorship clients | Mentorship channels | Private review, scheduling, and accountability |
| `@Village Mod` | Staff | Rob or trusted helpers | Staff channels | Moderation, onboarding, event support |

Rules:

- Rating identity roles are mutually exclusive: a member is Genin, Chunin, or Jonin.
- Paid entitlement roles stack on top of rating identity roles.
- Do not use paid roles as social status badges in public channels. The public identity remains the climb rank.
- Jonin is not automatically a mentor. A Jonin can be strong without being responsible for coaching.

---

## 3. Channel Taxonomy

### Village Gates

| Channel | Access | Purpose |
|---|---|---|
| `#welcome-read-first` | Public, read-only | Server promise, rules, links, next steps |
| `#rank-assignment` | Public | Members post rating, platform, goal; Rob/mod assigns Genin/Chunin/Jonin |
| `#introductions` | Public | Name, ELO, format, current chess problem |
| `#announcements` | Public, read-only | Jutsu drops, stream notices, Chunin Exams dates |

### Training Grounds

| Channel | Access | Purpose |
|---|---|---|
| `#general` | Public | Light community conversation |
| `#jutsu-of-the-week` | Public | Discussion for the weekly YouTube lesson |
| `#sparring-partners` | Public | Pair members for games by rating and time control |
| `#study-hall` | Public | Accountability posts and quiet study blocks |
| `#loot-drops` | Public | Free Friday resources from the ritual spec |

### Mission Board

| Channel | Access | Purpose |
|---|---|---|
| `#quest-log` | Public | Weekly goals and post-mortems |
| `#rank-promotions` | Public, mod-posted | Celebrate ELO milestones and completed exams |
| `#village-tournaments` | Public | Casual arenas, Chunin Exam announcements, event brackets |

### Paid Dojo

| Channel | Access | Purpose |
|---|---|---|
| `#chunin-exams` | `@Chunin Exams` | Weekly study plan, training-room thread, exam prompts |
| `#exam-submissions` | `@Chunin Exams` | Member games, puzzle answers, homework check-ins |
| `#position-of-the-week` | `@Chunin Exams` | The structured analysis prompt that creates the paid-tier loop |
| `#live-class-recordings` | `@Chunin Exams` | Replays and notes from group sessions |
| `#jonin-mentorship` | `@Jonin Mentorship` | Private client updates, direct prompts, session prep |
| `#jonin-scheduling` | `@Jonin Mentorship` | Call scheduling and review queue |

### Staff

| Channel | Access | Purpose |
|---|---|---|
| `#mod-room` | `@Village Mod` | Moderation notes, onboarding exceptions |
| `#content-pipeline` | `@Village Mod` | Pull questions, game submissions, and community moments into future videos |

For RB-6 provisioning, create every category, but launch with the paid channels hidden until the first offer is ready. Empty locked channels create confusion.

---

## 4. Free Versus Paid Boundary

Free Village members should receive:

- belonging,
- rank identity,
- weekly public rituals,
- discussion around public YouTube content,
- sparring partners,
- lightweight accountability.

Paid Chunin Exams members should receive:

- a weekly training prompt,
- an answer/submission queue,
- structured post-mortems,
- access to live group sessions or recordings,
- a persistent study lane that feels more serious than the public commons.

Jonin Mentorship clients should receive:

- private review intake,
- scheduling,
- custom goals,
- direct follow-up,
- session notes and recordings where appropriate.

The public channels sell the rhythm. The Chunin Exams sell structure. Jonin Mentorship sells Rob's focused attention.

---

## 5. YouTube To Discord Flow

1. Viewer sees a YouTube CTA: "Join The Village and post your current ELO."
2. Viewer lands in `#welcome-read-first`.
3. Viewer posts rating and goal in `#rank-assignment`.
4. Rob/mod assigns Genin, Chunin, or Jonin.
5. Member posts an intro and a first weekly quest.
6. After two quest posts or fourteen days of visible activity, they receive the Chunin Exams invitation.
7. After repeated paid-tier participation, direct coaching need, or explicit application, they can be offered Jonin Mentorship at $150/mo.

This is the relationship engine the chess world map calls for: YouTube creates the encounter; Discord names the person; the paid layer deepens the relationship.

---

## 6. RB-6 Provisioning Checklist

Rob can provision v1 manually before any automation exists:

- Create server name: `The Village | Hokage Chess`.
- Create roles from section 2.
- Create categories and public channels from section 3.
- Leave Paid Dojo channels hidden until payment flow exists.
- Pin `#welcome-read-first` with the server promise and rank instructions.
- Soft-launch to 5-10 trusted viewers before posting the public invite.
- Add Discord invite to YouTube description, pinned comments, channel About, and Kit welcome email.
- Run the existing ritual cadence from `docs/content/2026-04-25-discord-rituals.md`: Welcome Wednesday, Loot Drop Friday, Quest Log Sunday.
- Review the first 30 days before adding bots beyond basic moderation and welcome automation.

Automation can wait. The first version needs rank assignment, visible replies, and predictable weekly presence.

---

## 7. Launch Thresholds

| Threshold | Action |
|---|---|
| 25 free members | Start Welcome Wednesday and Quest Log Sunday publicly |
| 50 free members and 10 weekly active members | Announce Chunin Exams waitlist |
| 10 paid waitlist members | Launch Chunin Exams at $15/mo or $100/yr |
| 3 qualified mentorship applicants | Open capped Jonin Mentorship slots at $150/mo |
| 3 consecutive weeks above 20 quest posts | Recruit one `@Village Mod` from active Jonin/Chunin members |

Do not launch the paid layer before the free room has visible pulse. ChessDojo is the model because the subscription is anchored in structured training, not because a locked Discord channel is valuable by itself.

---

## 8. Acceptance

CWS-2 is complete when:

1. The role taxonomy is canonicalized as free rating identities plus paid entitlement roles.
2. The channel taxonomy is defined for free, paid, mentorship, and staff areas.
3. The $150/mo Jonin Mentorship lane has a clear Discord home without replacing the low-ticket training tier.
4. RB-6 has a concrete provisioning checklist.
5. The older Discord ritual spec remains valid for cadence, while this document supersedes it for current server taxonomy and pricing.
