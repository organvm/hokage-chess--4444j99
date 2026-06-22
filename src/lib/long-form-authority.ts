export type AuthorityAtom = "FWS-4";
export type AuthorityPlatform = "youtube-long-form" | "podcast";
export type ChannelArchitecture = "separate-with-bridge";
export type EpisodeStatus = "scripted";

export interface EpisodeBlock {
  label: string;
  timebox: string;
  purpose: string;
}

export interface LaunchEpisode {
  episode: number;
  slug: string;
  title: string;
  titleIdea: string;
  hook: string;
  work: string;
  bridge: string;
  cta: string;
  status: EpisodeStatus;
}

export interface LongFormAuthoritySurface {
  atom: AuthorityAtom;
  slug: string;
  route: string;
  title: string;
  status: "launch-ready";
  chosenPlatform: AuthorityPlatform;
  rejectedPlatform: AuthorityPlatform;
  channelArchitecture: ChannelArchitecture;
  primaryChannel: string;
  companionChannel: string;
  thesis: string;
  why: string[];
  cadence: string;
  format: string;
  aesthetic: string;
  episodeStructure: EpisodeBlock[];
  launchEpisodes: LaunchEpisode[];
  bridgePolicy: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

export const FITNESS_LONG_FORM_AUTHORITY: LongFormAuthoritySurface = {
  atom: "FWS-4",
  slug: "fitness-long-form",
  route: "/authority/fitness-long-form",
  title: "Rob Bonavoglia Fitness Long-Form Authority Surface",
  status: "launch-ready",
  chosenPlatform: "youtube-long-form",
  rejectedPlatform: "podcast",
  channelArchitecture: "separate-with-bridge",
  primaryChannel: "Rob Bonavoglia Fitness",
  companionChannel: "Hokage Chess",
  thesis:
    "Build the fitness authority surface as a separate YouTube long-form channel, then cross-pollinate with Hokage Chess through discipline-first bridge episodes.",
  why: [
    "YouTube rewards tight audience expectation, so gym DITL videos should not dilute the chess subscriber feed.",
    "The existing Hokage production muscle transfers directly to filming, titling, thumbnails, retention review, and weekly publishing.",
    "Fitness needs a trust-compounding depth surface before coaching, PDF products, and sponsorships can carry meaningful weight.",
  ],
  cadence: "One 12-13 minute episode per week",
  format: "DITL training vlog plus training breakdown",
  aesthetic: "Gritty gym documentation, physical plateaus, repeatable discipline, and earned recovery.",
  episodeStructure: [
    {
      label: "Hook",
      timebox: "0:00-1:00",
      purpose: "Name the training problem and make the day's physical lesson immediate.",
    },
    {
      label: "The Work",
      timebox: "1:00-8:00",
      purpose: "Show raw training footage, set-by-set decisions, and short talking-head context.",
    },
    {
      label: "The Bridge",
      timebox: "8:00-12:00",
      purpose: "Transfer the lesson into focus, discipline, recovery, or chess-adjacent mental stamina.",
    },
    {
      label: "CTA",
      timebox: "12:00-13:00",
      purpose: "Point viewers toward Legion community, coaching, or the unified list.",
    },
  ],
  launchEpisodes: [
    {
      episode: 1,
      slug: "foundation-of-discipline",
      title: "The Foundation of Discipline",
      titleIdea: "Why I Started Lifting And Why I Will Never Stop",
      hook:
        "People ask how Rob can sit at a chess board for hours without losing focus. The answer starts in the gym.",
      work:
        "Run the Legion Beginner Bulk Protocol push day with form cues, consistency notes, and the mental fight inside the last two reps.",
      bridge:
        "Physical endurance becomes cognitive stamina when the game, lift, or week starts asking for patience.",
      cta: "Join the Legion of Fitness community for the exact push day routine.",
      status: "scripted",
    },
    {
      episode: 2,
      slug: "breaking-plateaus",
      title: "Breaking Plateaus",
      titleIdea: "What To Do When You Stop Getting Stronger",
      hook:
        "Rob has been stuck at the same bench weight for three weeks. The episode shows the exact adjustment protocol.",
      work:
        "Walk through progressive overload, micro-loading, tracked sets, and how the session changes when the numbers stop moving.",
      bridge:
        "Chess rating plateaus and lifting plateaus both require evidence review instead of ego-driven volume.",
      cta: "Apply for 1:1 TrueCoach programming to get past the sticking point.",
      status: "scripted",
    },
    {
      episode: 3,
      slug: "recovery-equation",
      title: "The Recovery Equation",
      titleIdea: "If You Do Not Do This Your Workouts Do Not Matter",
      hook:
        "A recovery-first morning opens the episode: readiness data, sleep, hydration, and the discipline not to force junk volume.",
      work:
        "Document active recovery, meal prep, macros, and the unglamorous systems that make hard training repeatable.",
      bridge:
        "Burnout looks similar on the board and under the bar: output drops when recovery is treated as optional.",
      cta: "Subscribe to the Quest Log for the weekly grocery list and macro split.",
      status: "scripted",
    },
  ],
  bridgePolicy:
    "Hokage Chess stays chess-native. Rob Bonavoglia Fitness stays fitness-native. Bridge content appears when the framing is discipline, focus, recovery, or training transfer.",
  primaryCta: {
    label: "Join the Quest Log",
    href: "/#email-capture",
  },
  secondaryCta: {
    label: "Watch Hokage Chess",
    href: "https://www.youtube.com/@HokageChess",
  },
};

export const LONG_FORM_AUTHORITY_SURFACES = [
  FITNESS_LONG_FORM_AUTHORITY,
] as const satisfies readonly LongFormAuthoritySurface[];

export function listLongFormAuthoritySurfaces(): LongFormAuthoritySurface[] {
  return [...LONG_FORM_AUTHORITY_SURFACES];
}

export function getLongFormAuthoritySurface(
  slug: string,
): LongFormAuthoritySurface | undefined {
  return LONG_FORM_AUTHORITY_SURFACES.find((surface) => surface.slug === slug);
}
