/**
 * Compose a Hokage landing page from a Persona × Narrative.
 *
 * Pure function. Returns ordered SectionData[] consumed by the dynamic
 * routes at src/app/for/[persona]/page.tsx and src/app/for/[persona]/[pillar]/page.tsx.
 */

import type { Persona, PersonaId, PillarId } from "./personas";
import { getPersona } from "./personas";
import type { Narrative, NarrativeId } from "./narratives";
import { getNarrative } from "./narratives";
import type { SectionBuildOptions, SectionData } from "./sections";
import { SectionBuilders } from "./sections";

export interface ComposedLanding {
  persona: Persona;
  narrative: Narrative;
  sections: SectionData[];
  /** Set when the composition was pivoted onto a specific pillar focus. */
  pillarFocus?: PillarId;
}

export function composeLanding(opts: {
  personaId: PersonaId;
  narrativeId?: NarrativeId;
  /**
   * Optional pillar focus. Overrides the persona's primary pillar in
   * hero kicker + three-roads adjacency root. Used by long-tail
   * /for/[persona]/[pillar] routes.
   */
  pillarFocus?: PillarId;
}): ComposedLanding {
  const persona = getPersona(opts.personaId);
  const narrative = getNarrative(opts.narrativeId ?? "ki-sho-ten-ketsu");
  const buildOpts: SectionBuildOptions = { pillarFocus: opts.pillarFocus };
  const sections = narrative.sequence.map((key) =>
    SectionBuilders[key](persona, buildOpts),
  );
  return { persona, narrative, sections, pillarFocus: opts.pillarFocus };
}
