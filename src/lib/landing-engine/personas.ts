/**
 * Audience archetypes for Hokage Chess — chess-domain instantiation of
 * the same Persona × Narrative × Section primitive shipped in the spiral
 * repo (sovereign-systems--elevate-align@3d8cabd).
 *
 * Three seed personas matching the business-plan v2 audience taxonomy.
 * Add a persona here, it appears at /for/<id> automatically via
 * generateStaticParams in src/app/for/[persona]/page.tsx.
 */

export type PersonaId =
  | "stuck-beginner"
  | "climbing-intermediate"
  | "returning-adult-improver";

/**
 * Chess "stat" pillars — six axes from the v2 Character Sheet design (B9).
 * The primary pillar drives the hero's pillar label and the three-paths fork.
 */
export type PillarId =
  | "tactics"
  | "strategy"
  | "calculation"
  | "endgame"
  | "time-management"
  | "tilt-resistance";

export interface Persona {
  id: PersonaId;
  label: string;
  /** ELO band the persona maps to. */
  ratingBand: string;
  /** Which of the six chess stats this persona most needs to grind. */
  primaryPillar: PillarId;
  /** 3–5 verbatim pain phrases. */
  pain: string[];
  /** 3–5 desired outcomes. */
  desire: string[];
  /** Hero subhead — speaks the persona's situation back to them. */
  heroHook: string;
  /** Final-CTA commit line. */
  ctaCommit: string;
}

export const PERSONAS: Record<PersonaId, Persona> = {
  "stuck-beginner": {
    id: "stuck-beginner",
    label: "The Stuck Beginner",
    ratingBand: "1000–1400 ELO",
    primaryPillar: "tactics",
    pain: [
      "I beat 1100s and lose to 1400s and the line in between is moving away from me.",
      "Every titled coach says 'just improve your calculation' like that's a thing I can buy.",
      "I do puzzles every day and my rating won't move.",
      "I know enough to know I don't know enough.",
    ],
    desire: [
      "A roadmap that doesn't assume I'm already 1600.",
      "Someone climbing alongside me — not handing the answers down from the summit.",
      "Visible progress in months, not years.",
    ],
    heroHook:
      "You're not a beginner anymore. You're not a master yet. This is where the real game starts — and where most chess content abandons you.",
    ctaCommit: "Send me the 1300 Escape Plan.",
  },
  "climbing-intermediate": {
    id: "climbing-intermediate",
    label: "The Climbing Intermediate",
    ratingBand: "1400–1800 ELO",
    primaryPillar: "strategy",
    pain: [
      "I see the tactics but I don't see the position.",
      "My openings are solid for 12 moves and then I'm guessing.",
      "I'm tilting more than I'm playing.",
      "Every Naroditsky video makes me feel worse, not better.",
    ],
    desire: [
      "A way to convert tactical sight into positional understanding.",
      "Cohort climbs where the group makes the discipline easier than going alone.",
      "Tilt recovery as a trained skill, not a personality trait.",
    ],
    heroHook:
      "You see the tactics. The next mountain is seeing the position around them. Climb it with people, not alone.",
    ctaCommit: "Enter the Chunin Exams.",
  },
  "returning-adult-improver": {
    id: "returning-adult-improver",
    label: "The Returning Adult Improver",
    ratingBand: "Variable — coming back",
    primaryPillar: "tilt-resistance",
    pain: [
      "I used to be better. I think.",
      "Every chess app reset my profile and I don't know if I'm climbing or just remembering.",
      "I have 45 minutes a day, not 4 hours.",
      "I want chess to be fun again. It mostly isn't.",
    ],
    desire: [
      "A way back in that respects how much I've forgotten without rubbing my nose in it.",
      "A schedule that fits a real life with real obligations.",
      "Community that knows the comeback arc personally.",
    ],
    heroHook:
      "You're not starting over. You're picking up a thread you put down. Here's the loom.",
    ctaCommit: "Show me the comeback path.",
  },
};

export function listPersonas(): Persona[] {
  return Object.values(PERSONAS);
}

export function getPersona(id: PersonaId): Persona {
  const p = PERSONAS[id];
  if (!p) throw new Error(`unknown persona: ${id}`);
  return p;
}

/**
 * Canonical six-pillar enumeration. Drives generateStaticParams for both
 * /pillars/[slug] and /for/[persona]/[pillar] routes — and any future
 * pillar-keyed surface that needs to know "what are the pillars?"
 */
export const PILLAR_IDS: readonly PillarId[] = [
  "tactics",
  "strategy",
  "calculation",
  "endgame",
  "time-management",
  "tilt-resistance",
] as const;

export function listPillars(): PillarId[] {
  return [...PILLAR_IDS];
}

export function isPillarId(value: string): value is PillarId {
  return (PILLAR_IDS as readonly string[]).includes(value);
}
