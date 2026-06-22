# Hokage Scroll Beehiiv Runbook

**Date:** 2026-06-22
**Atom:** CWS-3
**GitHub issue:** #19
**Status:** Implementation wired; external account and first send require operator action
**Newsletter:** Hokage Scroll
**Cadence:** Weekly, Sunday Quest Log

---

## Decision

Use Beehiiv as the newsletter-native surface for the chess track, branded as
**Hokage Scroll**. The public Hokage site keeps its existing `/api/subscribe`
contract, but the server route now forwards subscribers to Beehiiv.

This preserves the MP-7 architecture: one owned subscriber ledger, chess as the
default track, fitness as a separate track, and bridge content only by explicit
interest or engagement.

---

## Beehiiv setup

1. Create or open the Beehiiv workspace.
2. Create the publication: `Hokage Scroll`.
3. Set the default send cadence internally as `Weekly - Sunday Quest Log`.
4. Create these custom fields before testing the site form:

| Field | Value from site |
|---|---|
| `pillar` | `chess` |
| `source` | `hokage-site-email-capture` |
| `stage` | `l2_lead` |
| `newsletter` | `hokage_scroll` |
| `cadence` | `weekly_sunday_quest_log` |

5. Optional but recommended: create one newsletter list named `Hokage Scroll`.
6. Optional but recommended: create an automation with an **Add by API** trigger
   that sends the 1300 Escape Plan welcome email.
7. Copy the publication ID. It should look like
   `pub_00000000-0000-0000-0000-000000000000`.
8. Create an API key in Beehiiv workspace settings. The key needs
   `subscriptions:write`; add `automations:write` only if the automation field
   is used.

Beehiiv's API docs confirm that create-subscription calls use:

```text
POST https://api.beehiiv.com/v2/publications/:publicationId/subscriptions
Authorization: Bearer <token>
```

The route sends `send_welcome_email: true`, `reactivate_existing: true`,
Hokage Scroll UTM values, the custom fields above, and optional automation/list
IDs.

---

## Environment variables

Set these locally in `.env.local` and in Vercel production/preview env.

```bash
BEEHIIV_API_KEY=<paste Beehiiv API key> # allow-secret
BEEHIIV_PUBLICATION_ID=<paste pub_... ID>
```

Optional:

```bash
BEEHIIV_AUTOMATION_ID=<paste automation ID>
BEEHIIV_NEWSLETTER_LIST_ID=<paste nl_list_... ID>
```

Local smoke test:

```bash
npm run dev
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test+hokage-scroll@example.com"}'
```

Expected success:

```json
{"ok":true}
```

If the response is `config_incomplete`, the required env vars are missing or the
dev server was not restarted after editing `.env.local`.

---

## Public signup links

Use the site anchor as the canonical signup URL:

```text
https://hokagechess.com/#email-capture
```

Apply it to:

| Surface | Placement |
|---|---|
| YouTube | Channel links + default description footer |
| Twitch | About panel and chat command |
| Chess.com | Profile website/about link |
| Discord | Welcome channel pinned resource |
| Beehiiv | Publication subscribe button and referral landing page |

Recommended YouTube/Twitch/Chess.com line:

> Join Hokage Scroll - the Sunday Quest Log for adult improvers climbing with
> the Village: https://hokagechess.com/#email-capture

---

## First issue draft

**Subject:** Hokage Scroll #001 - The Climb Starts Here

**Preview text:** This week's training arc, one featured game, one village
shout-out, and the first jutsu of the week.

**Body:**

Welcome to Hokage Scroll.

This is the weekly Sunday Quest Log for the climb: what I trained, what broke,
what finally clicked, and what the Village should study next.

### Training arc

This week is about one problem: converting decent positions without drifting.
The target is simple:

- play fewer autopilot moves after the opening,
- write down the first moment the plan became unclear,
- review that moment before starting the next game.

The rating goal stays the same: Road to 1500, one honest game at a time.

### Featured game

Pick the most instructive game from the week, not the cleanest win. The rule for
Hokage Scroll is that the featured game must teach something a 1200-1500 player
can use immediately.

Suggested frame:

- position where the plan became unclear,
- candidate moves considered,
- move played,
- better move after review,
- one sentence to carry into the next game.

### Village shout-out

Shout out one subscriber, Discord member, YouTube commenter, or sparring partner
who posted a game, asked a useful question, hit a rating milestone, or showed up
for the climb.

### Jutsu of the week

**Name:** Stop the second blunder.

After you make a mistake, spend one full breath asking: "What changed?" Do not
move until you can name the threat, the loose piece, or the new weakness.

Most games at our level are not lost by the first mistake. They are lost by the
panic move after it.

### Next quest

Before next Sunday:

- play three rapid games,
- annotate the first unclear middlegame moment in each,
- bring one position back to the Village.

See you on the climb.

- Rob

---

## Weekly format

Every Sunday issue should keep this shape:

1. Training arc recap
2. Featured game
3. Village shout-out
4. Jutsu of the week
5. Next quest

The newsletter is a recurring owned-distribution ritual, not a random tips
blast. If there was no useful game that week, send a shorter Quest Log rather
than skipping the cadence.

---

## Acceptance tracker

| Acceptance item from #19 | Repo state |
|---|---|
| Beehiiv configured | Route and env contract wired; account setup is operator action |
| First issue shipped | Draft above is ready to paste/send after Beehiiv publication exists |
| Signup form linked from YouTube/Twitch/Chess.com | Canonical URL and placement copy defined above |
| Weekly cadence | Homepage copy and draft format now commit to Sunday Quest Log |

