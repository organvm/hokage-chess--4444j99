export interface BridgeIdentity {
  label: string;
  handle: string;
  role: string;
}

export interface BridgeRail {
  label: string;
  discipline: string;
  promise: string;
}

export interface BridgeFormat {
  channel: "youtube" | "carousel" | "newsletter";
  asset: string;
  status: "ready";
}

export interface BridgePieceSection {
  heading: string;
  body: string[];
}

export interface BridgePiece {
  atom: "BR-1";
  slug: string;
  title: string;
  dek: string;
  publishedDate: string;
  status: "published";
  identities: BridgeIdentity[];
  tags: string[];
  hook: string;
  thesis: string;
  cta: string;
  formats: BridgeFormat[];
  sections: BridgePieceSection[];
}

export const IDENTITY_FUSION_PILLAR = {
  atom: "BR-1",
  label: "Hokage x Legion",
  headline: "Chess discipline. Iron discipline. One climb.",
  subhead:
    "Rob's defensible lane is not chess content or fitness content in isolation. It is the transfer of discipline across the board, the bar, faith, and family.",
  rails: [
    {
      label: "Board",
      discipline: "Calculation under pressure",
      promise: "Train the mind to stay concrete when the position gets noisy.",
    },
    {
      label: "Iron",
      discipline: "Progressive overload",
      promise: "Train the body to respect volume, recovery, and repeatable effort.",
    },
    {
      label: "Home",
      discipline: "Faith and family standard",
      promise: "Keep ambition accountable to the people and values it serves.",
    },
  ] satisfies BridgeRail[],
} as const;

export const BRIDGE_PIECES: BridgePiece[] = [
  {
    atom: "BR-1",
    slug: "progressive-overload-on-the-board",
    title: "Progressive Overload on the Board",
    dek: "What lifting teaches chess players about increasing calculation load without ego-lifting their study.",
    publishedDate: "2026-06-22",
    status: "published",
    identities: [
      {
        label: "Hokage Chess",
        handle: "@HokageChess",
        role: "chess climb identity",
      },
      {
        label: "Legion of Fitness",
        handle: "The Legion of Fitness",
        role: "iron discipline identity",
      },
    ],
    tags: [
      "#HokageChess",
      "#LegionOfFitness",
      "#ChessDiscipline",
      "#IronDiscipline",
      "#FaithFamily",
      "#RoadTo1500",
    ],
    hook:
      "You would never max out every lift on the first day back. So why do chess players try to max out their calculation every study session?",
    thesis:
      "The same rule that builds strength builds chess improvement: add stress slowly enough that the system adapts instead of breaks.",
    cta: "Join the Hokage Scroll for the next bridge piece: one discipline lesson from the board, the bar, and the week at home.",
    formats: [
      {
        channel: "youtube",
        asset: "8-12 minute bridge video script",
        status: "ready",
      },
      {
        channel: "carousel",
        asset: "7-slide Instagram/LinkedIn carousel",
        status: "ready",
      },
      {
        channel: "newsletter",
        asset: "Hokage Scroll feature block",
        status: "ready",
      },
    ],
    sections: [
      {
        heading: "The Lift",
        body: [
          "In the gym, progressive overload is not a motivational quote. It is a constraint. Add five pounds, one rep, or one cleaner set. Then recover. Then repeat.",
          "If you skip the constraint and chase a lift you have not earned, the bar exposes you quickly. The cost is not just a missed rep. It is bad form, stalled confidence, and a recovery bill you did not plan to pay.",
        ],
      },
      {
        heading: "The Board",
        body: [
          "Chess players do the same thing with calculation. They jump from easy tactics to engine lines, stare at a position for forty minutes, and call the confusion 'training hard.'",
          "Hard is not the goal. Adaptation is the goal. A 1300 player does not need ten-move fantasies every day. He needs two-move clarity, then three-move clarity, then the stamina to keep that clarity after a bad result.",
        ],
      },
      {
        heading: "The Transfer",
        body: [
          "The bar teaches humility before load. The board teaches humility before complexity. Both punish ego. Both reward repeatable reps.",
          "This week, pick one tactical theme and overload it like a lift: ten clean pins, ten clean forks, ten clean back-rank patterns. When the reps are clean, add difficulty. Do not add chaos to prove you are serious.",
        ],
      },
      {
        heading: "The Standard",
        body: [
          "The point is not to become a person who is always grinding. The point is to become a person whose effort can be trusted by the people around him.",
          "Faith and family make discipline answerable. Chess and iron are the training grounds. The standard is what you bring home after the session ends.",
        ],
      },
    ],
  },
];

export const FIRST_BRIDGE_PIECE = BRIDGE_PIECES[0];

export function listBridgePieces(): BridgePiece[] {
  return [...BRIDGE_PIECES];
}

export function getBridgePiece(slug: string): BridgePiece | undefined {
  return BRIDGE_PIECES.find((piece) => piece.slug === slug);
}
