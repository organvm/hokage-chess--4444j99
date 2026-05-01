import { describe, it, expect } from "vitest";
import {
  listPillars,
  listPersonas,
  getPersona,
  isPillarId,
  PILLAR_IDS,
  type PillarId,
  type PersonaId,
} from "../src/lib/landing-engine/personas";
import {
  PILLAR_ADJACENCY,
  PILLAR_DESCRIPTIONS,
  SectionBuilders,
  getPillarLabel,
} from "../src/lib/landing-engine/sections";
import { composeLanding } from "../src/lib/landing-engine/compose";

const ALL_PILLAR_IDS: PillarId[] = [
  "tactics",
  "strategy",
  "calculation",
  "endgame",
  "time-management",
  "tilt-resistance",
];

const ALL_PERSONA_IDS: PersonaId[] = [
  "stuck-beginner",
  "climbing-intermediate",
  "returning-adult-improver",
];

describe("PILLAR_IDS canonical enumeration", () => {
  it("exposes the six pillar slugs as a frozen-shape array", () => {
    expect([...PILLAR_IDS].sort()).toEqual([...ALL_PILLAR_IDS].sort());
  });

  it("listPillars() returns a defensive copy of all six pillars", () => {
    const a = listPillars();
    const b = listPillars();
    expect(a).toEqual(ALL_PILLAR_IDS);
    expect(a).not.toBe(b);
  });

  it("isPillarId() narrows valid slugs and rejects invalid ones", () => {
    for (const id of ALL_PILLAR_IDS) {
      expect(isPillarId(id)).toBe(true);
    }
    expect(isPillarId("not-a-pillar")).toBe(false);
    expect(isPillarId("")).toBe(false);
    expect(isPillarId("Tactics")).toBe(false); // case-sensitive
  });
});

describe("/pillars/[slug] generateStaticParams (semantic)", () => {
  // The lib helper drives the route's generateStaticParams. Asserting on
  // the helper avoids importing server components into node-env vitest.
  it("emits exactly six pre-rendered routes — one per pillar", () => {
    const params = listPillars().map((slug) => ({ slug }));
    expect(params).toHaveLength(6);
    expect(params.map((p) => p.slug).sort()).toEqual([...ALL_PILLAR_IDS].sort());
  });
});

describe("/for/[persona]/[pillar] generateStaticParams (semantic)", () => {
  it("emits exactly 18 pre-rendered routes — 3 personas × 6 pillars", () => {
    const params: Array<{ persona: string; pillar: string }> = [];
    for (const persona of listPersonas()) {
      for (const pillar of listPillars()) {
        params.push({ persona: persona.id, pillar });
      }
    }
    expect(params).toHaveLength(18);
    const byPersona = new Map<string, string[]>();
    for (const { persona, pillar } of params) {
      const arr = byPersona.get(persona) ?? [];
      arr.push(pillar);
      byPersona.set(persona, arr);
    }
    expect([...byPersona.keys()].sort()).toEqual([...ALL_PERSONA_IDS].sort());
    for (const pillars of byPersona.values()) {
      expect(pillars.sort()).toEqual([...ALL_PILLAR_IDS].sort());
    }
  });
});

describe("PILLAR_ADJACENCY exported schema", () => {
  it("has an adjacency entry for every pillar", () => {
    for (const id of ALL_PILLAR_IDS) {
      expect(PILLAR_ADJACENCY[id]).toBeTruthy();
    }
  });

  it("each adjacency triple is the focus pillar plus two distinct neighbors", () => {
    for (const id of ALL_PILLAR_IDS) {
      const triple = PILLAR_ADJACENCY[id];
      expect(triple).toHaveLength(3);
      expect(triple[0]).toBe(id); // focus pillar leads
      expect(new Set(triple).size).toBe(3); // all distinct
      for (const adj of triple) {
        expect(ALL_PILLAR_IDS).toContain(adj);
      }
    }
  });
});

describe("PILLAR_DESCRIPTIONS exported schema", () => {
  it("has a non-empty description for every pillar", () => {
    for (const id of ALL_PILLAR_IDS) {
      expect(PILLAR_DESCRIPTIONS[id]).toBeTruthy();
      expect(PILLAR_DESCRIPTIONS[id].length).toBeGreaterThan(0);
    }
  });

  it("getPillarLabel extracts the mythic name from each description", () => {
    expect(getPillarLabel("tactics")).toBe("The Forge");
    expect(getPillarLabel("strategy")).toBe("The Library");
    expect(getPillarLabel("calculation")).toBe("The Lab");
    expect(getPillarLabel("endgame")).toBe("The Crucible");
    expect(getPillarLabel("time-management")).toBe("The Clock");
    expect(getPillarLabel("tilt-resistance")).toBe("The Dojo");
  });
});

describe("§9.2 P0 dead-link closure (sections.ts:104)", () => {
  // Original finding: sections.ts emits href: `/pillars/${slug}` for all
  // 3 path links across all 3 personas (= 9 dead links). After this
  // change, every emitted href must resolve to a real generateStaticParams
  // entry on the /pillars/[slug] route.
  it("every threePaths href resolves to a built /pillars/<slug>", () => {
    const params = new Set(listPillars().map((slug) => `/pillars/${slug}`));
    for (const id of ALL_PERSONA_IDS) {
      const persona = getPersona(id);
      const paths = SectionBuilders.threePaths(persona);
      for (const path of paths.paths) {
        expect(params.has(path.href)).toBe(true);
      }
    }
  });

  it("yields 9 emitted hrefs (3 personas × 3 paths) with zero dead links", () => {
    const allHrefs: string[] = [];
    const built = new Set(listPillars().map((slug) => `/pillars/${slug}`));
    for (const id of ALL_PERSONA_IDS) {
      const persona = getPersona(id);
      const paths = SectionBuilders.threePaths(persona);
      for (const path of paths.paths) allHrefs.push(path.href);
    }
    expect(allHrefs).toHaveLength(9);
    for (const href of allHrefs) {
      expect(built.has(href)).toBe(true);
    }
  });
});

describe("composeLanding pillar-focus override", () => {
  it("threads pillarFocus into hero pillarLabel", () => {
    const composed = composeLanding({
      personaId: "stuck-beginner",
      pillarFocus: "endgame",
    });
    expect(composed.pillarFocus).toBe("endgame");
    const hero = composed.sections.find((s) => s.type === "hero");
    expect(hero).toBeTruthy();
    if (hero?.type === "hero") {
      expect(hero.pillarLabel).toBe("endgame");
    }
  });

  it("pivots three-paths adjacency around the focus pillar", () => {
    const composed = composeLanding({
      personaId: "stuck-beginner",
      pillarFocus: "tilt-resistance",
    });
    const threePaths = composed.sections.find((s) => s.type === "three-paths");
    expect(threePaths).toBeTruthy();
    if (threePaths?.type === "three-paths") {
      expect(threePaths.paths[0].label.replace(" ", "-")).toBe("tilt-resistance");
      expect(threePaths.paths).toHaveLength(3);
    }
  });

  it("default composition (no pillarFocus) preserves persona.primaryPillar root", () => {
    const composed = composeLanding({ personaId: "stuck-beginner" });
    expect(composed.pillarFocus).toBeUndefined();
    const threePaths = composed.sections.find((s) => s.type === "three-paths");
    if (threePaths?.type === "three-paths") {
      // stuck-beginner.primaryPillar is "tactics"
      expect(threePaths.paths[0].label.replace(" ", "-")).toBe("tactics");
    }
  });

  it("composes a complete 4-section landing for every persona × pillar pair", () => {
    for (const id of ALL_PERSONA_IDS) {
      for (const pillar of ALL_PILLAR_IDS) {
        const composed = composeLanding({ personaId: id, pillarFocus: pillar });
        expect(composed.sections).toHaveLength(4);
        expect(composed.persona.id).toBe(id);
        expect(composed.pillarFocus).toBe(pillar);
      }
    }
  });
});

describe("SectionBuilders accept SectionBuildOptions", () => {
  it("hero falls back to persona.primaryPillar when pillarFocus omitted", () => {
    const persona = getPersona("stuck-beginner");
    const hero = SectionBuilders.hero(persona);
    expect(hero.pillarLabel).toBe("tactics"); // persona.primaryPillar
  });

  it("hero honors pillarFocus override", () => {
    const persona = getPersona("stuck-beginner");
    const hero = SectionBuilders.hero(persona, { pillarFocus: "endgame" });
    expect(hero.pillarLabel).toBe("endgame");
  });

  it("threePaths honors pillarFocus override", () => {
    const persona = getPersona("stuck-beginner");
    const paths = SectionBuilders.threePaths(persona, { pillarFocus: "endgame" });
    expect(paths.paths[0].label.replace(" ", "-")).toBe("endgame");
  });
});
