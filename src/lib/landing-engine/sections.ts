/**
 * Section type registry + builders — chess-domain instantiation of the
 * primitive shipped in the spiral repo. Same shape, different copy +
 * adjacency rules (chess pillars, not health pillars).
 */

import type { Persona, PillarId } from "./personas";

export type SectionType = "hero" | "problem" | "three-paths" | "cta";

export interface HeroSectionProps {
  type: "hero";
  pillarLabel: string;
  ratingBand: string;
  heading: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ProblemSectionProps {
  type: "problem";
  heading: string;
  painPoints: string[];
}

export interface ThreePathsSectionProps {
  type: "three-paths";
  heading: string;
  paths: Array<{
    label: string;
    description: string;
    href: string;
  }>;
}

export interface CtaSectionProps {
  type: "cta";
  heading: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
}

export type SectionData =
  | HeroSectionProps
  | ProblemSectionProps
  | ThreePathsSectionProps
  | CtaSectionProps;

/**
 * Three-roads adjacency: which two pillars sit alongside each persona's
 * primary stat. Pulled from the v2 Character Sheet stat-coupling logic.
 *
 * Exported because /pillars/[slug] and /for/[persona]/[pillar] routes
 * compose adjacency grids from the same source — no drift, one schema.
 */
export const PILLAR_ADJACENCY: Record<PillarId, [PillarId, PillarId, PillarId]> = {
  tactics: ["tactics", "calculation", "strategy"],
  strategy: ["strategy", "endgame", "tilt-resistance"],
  calculation: ["calculation", "tactics", "endgame"],
  endgame: ["endgame", "calculation", "strategy"],
  "time-management": ["time-management", "tilt-resistance", "tactics"],
  "tilt-resistance": ["tilt-resistance", "time-management", "strategy"],
};

/**
 * One-sentence pillar descriptions keyed by the pillar's mythic label
 * (Forge / Library / Lab / Crucible / Clock / Dojo). Same source feeds
 * adjacency cards on persona pages and hero copy on pillar pages.
 */
export const PILLAR_DESCRIPTIONS: Record<PillarId, string> = {
  tactics: "The Forge — pattern recognition until your eyes see threats before you can name them.",
  strategy: "The Library — long-term plans, pawn structures, when not to grab the material.",
  calculation: "The Lab — concrete lines deeper than your opponent will go.",
  endgame: "The Crucible — winning what should be won, drawing what should be drawn.",
  "time-management": "The Clock — playing your moves and your opponent's clock at the same time.",
  "tilt-resistance": "The Dojo — losing the game without losing the next one.",
};

/**
 * Short label (e.g. "The Forge") extracted from PILLAR_DESCRIPTIONS for
 * use in route titles, hero kickers, and metadata. Falls back to a
 * humanized slug if the description is mis-shaped.
 */
export function getPillarLabel(pillar: PillarId): string {
  const desc = PILLAR_DESCRIPTIONS[pillar];
  const match = desc?.match(/^([^—]+?)\s*—/);
  return match ? match[1].trim() : pillar.replace("-", " ");
}

/**
 * Optional pillar-focus override. When set, hero/three-paths sections
 * pivot adjacency + label to the focus pillar instead of the persona's
 * primary pillar — used by /for/[persona]/[pillar] long-tail routes.
 */
export interface SectionBuildOptions {
  pillarFocus?: PillarId;
}

export const SectionBuilders = {
  hero(persona: Persona, opts: SectionBuildOptions = {}): HeroSectionProps {
    const focus: PillarId = opts.pillarFocus ?? persona.primaryPillar;
    return {
      type: "hero",
      pillarLabel: focus.replace("-", " "),
      ratingBand: persona.ratingBand,
      heading: persona.label,
      subhead: persona.heroHook,
      ctaLabel: persona.ctaCommit,
      ctaHref: "/#email-capture",
    };
  },
  problem(persona: Persona): ProblemSectionProps {
    return {
      type: "problem",
      heading: "The grinding middle.",
      painPoints: persona.pain,
    };
  },
  threePaths(persona: Persona, opts: SectionBuildOptions = {}): ThreePathsSectionProps {
    const root: PillarId = opts.pillarFocus ?? persona.primaryPillar;
    const adj = PILLAR_ADJACENCY[root] ?? PILLAR_ADJACENCY.tactics;
    return {
      type: "three-paths",
      heading: "Three roads in.",
      paths: adj.map((slug) => ({
        label: slug.replace("-", " "),
        description: PILLAR_DESCRIPTIONS[slug] ?? `Enter through ${slug}.`,
        href: `/pillars/${slug}`,
      })),
    };
  },
  cta(persona: Persona): CtaSectionProps {
    return {
      type: "cta",
      heading: persona.desire[0] ?? "Begin the climb.",
      subhead: persona.desire.slice(1).join(" ") || persona.heroHook,
      ctaLabel: persona.ctaCommit,
      ctaHref: "/#email-capture",
    };
  },
} as const;

export type SectionBuilderKey = keyof typeof SectionBuilders;
