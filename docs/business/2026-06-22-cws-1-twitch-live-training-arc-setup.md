# [CWS-1] Twitch Live Training Arc Setup

**Date:** 2026-06-22
**Atom:** CWS-1
**GitHub issue:** #17
**Status:** Agent-side setup spec complete; external channel provisioning remains a Rob-owned action
**Source:** `docs/business/2026-04-26-rob-chess-world-map.md` section 8.1 in the current file; the issue text references section 7.1.
**Related atoms/docs:** CWS-2 Discord, CWS-3 newsletter, CWS-4 Shorts, BR-1 bridge pillar, MP-1 pillar taxonomy, MP-2 content rhythm, MP-7 email architecture

---

## 1. Decision

Launch one Twitch channel as Rob's live training surface.

The channel is **unified, but chess-first**:

- Primary category: chess training, rating climb, puzzles, game review, viewer games.
- Secondary bridge layer: short fitness/discipline check-ins when they directly support the training-arc thesis.
- Default V1 cadence: one fixed weekly stream for four weeks before adding a second weekly slot.
- Default V1 time slot: Tuesday 8:00-10:00pm ET, immediately after or alongside the Jutsu-of-the-Week content beat.
- Simulcast posture: Twitch is primary; YouTube gets clips/highlights first. Add YouTube simulcast only after Rob can run the stream without production drag.

This closes the design vacuum identified in the chess world map: Rob is absent from the live surface where comparable adult-improver creators turn narrative viewers into named community members.

---

## 2. Channel Positioning

### Channel promise

> Hokage Chess is a live adult-improver training arc: rating climb, tactics missions, rank-up exams, honest losses, and post-game corrections from a 1350 player trying to break through.

### Bio copy

Use this as the Twitch channel bio until Rob has real stream-specific language from the first month:

> Adult improver climbing toward 1500. Live training arcs, tactics missions, rank-up exams, and honest game review. No grandmaster theater - just the work, the losses, the correction, and the Village climbing with me.

### Panel stack

Create these panels in this order:

| Panel | Purpose | Copy |
|---|---|---|
| Start Here | Orient new viewers | "New here? I am Rob, @HokageChess, documenting the climb from the 1300s to 1500 and beyond." |
| Free Plan | L1 -> L2 capture | Link to `hokagechess.com/free-plan` when live; until then, point to the best current YouTube CTA. |
| The Village | Community conversion | Link to Discord when CWS-2 ships. Until then, say "Discord opening soon." |
| Schedule | Habit formation | "Training Arc Tuesday, 8pm ET. Rank-Up Exam stream once per month." |
| Rules | Safety and tone | "Post the game. Respect the player. No engine help during rated games. No harassment. Keep it teachable." |
| YouTube | Long-form archive | Link to Hokage Chess YouTube. |
| Coaching | Future monetization | "Quick reviews and cohort tiers coming after the live cadence stabilizes." |

### Visual guardrails

Use Hokage red, charcoal, white, and small gold accents. The visual language can be shonen-inspired, but it must remain original.

Do not use:

- Naruto character art, symbols, fonts, costumes, screenshots, sound effects, or copied scene compositions.
- Copyrighted music.
- Anime clips as stream bumpers.
- Overlays that make the board hard to read.

---

## 3. Stream Setup Checklist

### Account and security

- Claim the preferred handle if available: `HokageChess`. If unavailable, use `RobHokageChess`, `HokageChessLive`, or `HokageChessTV`.
- Enable two-factor authentication before streaming.
- Store the stream key in a password manager only.
- Do not paste the stream key into repo files, notes, screenshots, OBS scene names, or support chats.
- Create a streaming-only browser profile with no personal bookmarks, logged-in email, bank tabs, CRM tabs, or private messages.

### Creator dashboard

- Set the channel category to Chess when board play begins.
- Use a clear stream title that names the live problem, not just the episode number.
- Enable past broadcast storage so streams can become VOD, clips, Shorts, and YouTube highlights.
- Turn on clips.
- Turn on chat moderation defaults before the first public stream.
- Add at least one trusted moderator before the first promoted stream.

### Chat safety defaults

- Require verified email accounts for chat.
- Keep links blocked by default.
- Add blocked terms for slurs, spam, explicit harassment, and engine-cheating prompts.
- Use follower-only mode only during raids, spam, or stream disruption. Do not start V1 in follower-only mode unless moderation becomes unmanageable.
- Pin the stream rule: "No engine help during rated games. Analysis after the game."

### Chess integrity

Never use engine analysis during live rated games. The stream can have an Analysis Desk scene, but it is for post-game review only.

If chat gives move suggestions during a rated game, Rob should ignore them or switch the segment to unrated/viewer-analysis mode. The content value is the climb and correction, not contaminated rating gain.

---

## 4. OBS Scene Stack

Use OBS or Streamlabs only after testing locally. V1 does not need advanced animation. It needs legibility, audio, and repeatable scene switching.

| Scene | Purpose | Required elements |
|---|---|---|
| Starting Soon | 3-5 minute runway | Stream title, tonight's mission, schedule, CTA to follow |
| Mission Board | Opens the stream | Current ELO, target ELO, tonight's jutsu, tonight's boss |
| Live Board | Main gameplay | Board large enough to read on mobile, Rob cam, small chat, no browser chrome if possible |
| Puzzle Mission | Tactics block | Puzzle board, timer, "find the move" prompt |
| Analysis Desk | Post-game review | Board, Rob cam, move list, engine only after game is complete |
| Bridge Check-In | Optional discipline block | Short fitness/recovery/sleep/study-log check-in tied to chess stamina |
| Be Right Back | Short pause | Return time and CTA |
| End Screen | Close and redirect | Quest assignment, next stream, Discord/free-plan CTA, raid target |

### Layout rule

The board is the product. On the Live Board scene, the board should occupy most of the screen. Rob's camera and chat are supporting elements, not equal columns.

### Audio rule

Run one private recording test before going live:

- Voice peaks below clipping.
- Game audio is low or off.
- Music is off unless rights-cleared.
- Keyboard/mouse noise is acceptable if not louder than voice.

---

## 5. Recurring Stream Formats

### Format A: Training Arc Tuesday

**Cadence:** weekly, 90-120 minutes

**Purpose:** establish the live habit and generate clips.

Run of show:

1. Starting Soon - 3 minutes.
2. Mission Board - name current ELO, target, jutsu, and boss.
3. Warm-up puzzle mission - 10 minutes.
4. Jutsu teaching block - 10-15 minutes.
5. Rated or unrated ladder block - 45-60 minutes.
6. Analysis Desk - review one loss or one critical position.
7. Quest assignment - one drill for chat before next week.
8. Clip prompt and close - ask viewers to clip the key position.

### Format B: Rank-Up Exam

**Cadence:** monthly, 2-3 hours

**Purpose:** turn rating progress into an event.

Use when there is a visible threshold:

- Break 1400 rapid.
- Recover after a rating crash.
- Win a match against a known stronger opponent.
- Complete a seven-day puzzle streak.

Run of show:

1. Mission Board with pass/fail condition.
2. Short warm-up.
3. Focused games or match block.
4. Post-mortem.
5. Next training arc declaration.

### Format C: Viewer Sparring Night

**Cadence:** defer until Twitch plus Discord has active viewers.

**Purpose:** deepen community relationships without pretending Rob is a titled coach.

Rules:

- Unrated games unless the format is explicitly a rated arena.
- One teaching point per game.
- Players post ELO before the game.
- No public shaming; mistakes become lessons.

### Format D: Bridge Training Block

**Cadence:** optional 10-15 minute segment at the start or end of a chess stream.

**Purpose:** integrate MP-1's unified Twitch decision without turning the stream into generic variety.

Good bridge prompts:

- "Sleep down, blunders up: what this week's training log says about calculation."
- "What leg day taught me about not resigning ugly endgames."
- "The 20-minute warm-up I use before rapid games."

Bad bridge prompts:

- Generic fitness Q&A disconnected from tonight's chess mission.
- BODI sales pitch during a chess climb stream.
- Lifestyle talk that does not attach to a measurable training behavior.

---

## 6. First Four Weeks

This is the V1 launch slate. Do not wait for perfect overlays. Run the four streams and let the format learn from contact with chat.

| Week | Stream title | Mission | Repurpose target |
|---|---|---|---|
| 0 | Private Dry Run: Hokage Live Setup | Test scenes, audio, board capture, recording, VOD save, and moderation | No public output |
| 1 | Can I Stop Hanging Move 12? \| Road to 1500 Live | Identify one recurring opening/middlegame mistake from live games | 1 YouTube Short, 1 Discord prompt |
| 2 | Tilt Is the Boss Tonight \| Road to 1500 Live | Play a controlled ladder block and narrate tilt recovery | 1 long-form clip, 2 Shorts |
| 3 | Endgames That Keep 1300s Stuck \| Training Arc | Drill one king-and-pawn or rook-endgame pattern, then play | 1 Loot Drop seed for CWS-2 |
| 4 | Rank-Up Exam: 1350 to 1400 Push \| Hokage Live | Event stream with visible pass/fail condition | 1 recap video, 3 Shorts, 1 Scroll item |

If Rob misses a week, do not "make up" the stream with a double slot. Resume the next Tuesday. The habit matters more than punishing the calendar.

---

## 7. Funnel Integration

Every stream has one CTA stack:

1. Follow the Twitch channel for the next live training arc.
2. Join the free list through `hokagechess.com/free-plan` when the lead magnet is live.
3. Join the Discord Village when CWS-2 ships.
4. Watch the YouTube archive for the full Road to 1500 canon.

### Email tags

When the capture path supports tagging, Twitch-origin leads should receive:

| Tag | Meaning |
|---|---|
| `source:twitch-live` | Entered from Twitch bio, panel, chat command, or live CTA |
| `pillar:chess` | Wants Hokage Chess material |
| `pillar:bridge` | Add only if the viewer opts into cross-domain discipline content |
| `stage:l2_lead` | Free opt-in |

This follows MP-7: one shared subscriber database, pillar tags, bridge as consented segment.

### Discord interlock

Once CWS-2 is live:

- Pin the weekly stream quest in `#quest-log`.
- Turn the best tactic from each stream into a Friday `#loot-drop`.
- Use stream chat questions as next week's Welcome Wednesday prompts.
- Promote viewer games through `#sparring-partners`, not ad hoc Twitch chat chaos.

### Shorts interlock

Each stream must produce at least one vertical clip:

- Hook starts with the board or Rob's strongest reaction.
- Title names the mistake or tactic.
- No intro before the position.
- End card routes to the next live training arc.

---

## 8. Repurposing Workflow

The VOD is raw material, not an archive nobody watches.

Within 24 hours:

- Download or save the VOD.
- Mark three moments: best tactic, worst blunder, most teachable correction.
- Create 1-3 clips.
- Post one Discord prompt from the stream.

Within 72 hours:

- Publish one Short.
- Add one stream lesson to the next Scroll/Hokage email when CWS-3 is live.
- Decide whether the VOD deserves a YouTube highlight or only Shorts.

Naming convention:

```text
YYYY-MM-DD_twitch_training-arc_<theme>_raw
YYYY-MM-DD_twitch_training-arc_<theme>_clip-01_best-tactic
YYYY-MM-DD_twitch_training-arc_<theme>_short-01
```

---

## 9. Measurement

Do not treat Twitch monetization as the Month 1 success metric. Treat it as a later unlock. Month 1 is about proving Rob can hold a live cadence and turn it into owned-audience movement.

### 30-day targets

| Metric | Target | Why |
|---|---|---|
| Public streams completed | 4 | Cadence proof |
| Average stream duration | 90-120 minutes | Sustainable repetition |
| Unique chatters | 3+ by Week 4 | Community signal |
| Followers gained | 25+ by Week 4 | Early surface growth |
| Clips per stream | 1+ | Repurposing discipline |
| Discord joins from Twitch | Track once CWS-2 ships | Community conversion |
| Email opt-ins from Twitch | Track once free-plan CTA ships | Owned-audience conversion |
| Next-day review completed | 4/4 | Feedback loop proof |

### Weekly scorecard

Add one row after every stream:

| Date | Theme | Duration | Avg viewers | Unique chatters | Followers gained | Clips made | Discord joins | Email opt-ins | One correction |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|

### Correction rules

- If average viewers are 0-1 for four streams: keep streaming, but shift expectation to VOD/Shorts extraction and improve titles/announcements.
- If chat is active but no one follows: improve the pinned CTA and end-screen ask.
- If viewers follow but do not join owned surfaces: fix the free-plan/Discord offer, not the stream.
- If Rob is exhausted after every stream: cut to 75-90 minutes before adding production polish.

---

## 10. Pre-Launch Checklist

Rob-owned actions:

- Twitch account created or claimed.
- 2FA enabled.
- Stream key stored securely.
- OBS scenes created.
- Streaming-only browser profile created.
- Board capture tested.
- Microphone tested.
- One moderator assigned.
- Past broadcast storage enabled.
- Panels added.
- Stream schedule posted.
- Private dry run completed.

Agent/system-owned artifacts now complete:

- Channel positioning.
- Panel copy.
- Safety and chess-integrity rules.
- OBS scene stack.
- V1 stream formats.
- Four-week launch slate.
- Funnel hooks.
- Repurposing workflow.
- Measurement scorecard.

---

## Acceptance

This closes CWS-1 / #17 at the strategy-system level when:

1. A canonical Twitch setup runbook exists in the repo.
2. The runbook resolves channel identity, stream cadence, live formats, scene stack, moderation, brand/IP guardrails, funnel hooks, VOD/Shorts workflow, and measurement.
3. The runbook reconciles Twitch with MP-1's unified channel architecture and MP-7's tagged email architecture.
4. Rob has a concrete Week 0 dry-run checklist and four-week public launch slate.

External completion remains:

1. Rob creates or claims the Twitch channel.
2. Rob completes the Week 0 private dry run.
3. Rob completes the first public Training Arc Tuesday stream.

