import { describe, it, expect } from "vitest";
import {
  getTierForElo,
  xpForAction,
  determineLevel,
  applyGain,
  createCharacter,
  TIER_BOUNDARIES,
  XP_THRESHOLDS_PER_PILLAR,
  XP_PER_LEVEL_BASE,
  MAX_LEVEL,
  type XPGain,
  type Action,
} from "../src/lib/xp-ledger";
import type { PillarId } from "../src/lib/landing-engine/personas";

const ALL_PILLARS: PillarId[] = [
  "tactics",
  "strategy",
  "calculation",
  "endgame",
  "time-management",
  "tilt-resistance",
];

const ALL_ACTIONS: Action[] = [
  "puzzle_solved",
  "opening_studied",
  "game_won",
  "game_drawn",
  "game_lost",
  "lesson_completed",
  "boss_battle_won",
];

describe("getTierForElo", () => {
  it("maps 0 to genin", () => {
    expect(getTierForElo(0)).toBe("genin");
  });

  it("maps 1199 (genin upper bound) to genin", () => {
    expect(getTierForElo(1199)).toBe("genin");
  });

  it("maps 1200 (chunin lower bound) to chunin", () => {
    expect(getTierForElo(1200)).toBe("chunin");
  });

  it("maps 1599 (chunin upper bound) to chunin", () => {
    expect(getTierForElo(1599)).toBe("chunin");
  });

  it("maps 1600 (jonin lower bound) to jonin", () => {
    expect(getTierForElo(1600)).toBe("jonin");
  });

  it("maps 2400 (high jonin) to jonin", () => {
    expect(getTierForElo(2400)).toBe("jonin");
  });

  it("clamps negative ELO to genin", () => {
    expect(getTierForElo(-50)).toBe("genin");
  });

  it("throws on non-finite ELO", () => {
    expect(() => getTierForElo(Number.NaN)).toThrow(/finite/);
    expect(() => getTierForElo(Number.POSITIVE_INFINITY)).toThrow(/finite/);
  });
});

describe("TIER_BOUNDARIES", () => {
  it("declares the three canonical bands", () => {
    expect(Object.keys(TIER_BOUNDARIES).sort()).toEqual([
      "chunin",
      "genin",
      "jonin",
    ]);
  });

  it("genin and chunin bands are contiguous", () => {
    const [, geninUpper] = TIER_BOUNDARIES.genin;
    const [chuninLower] = TIER_BOUNDARIES.chunin;
    expect(chuninLower).toBe(geninUpper + 1);
  });

  it("chunin and jonin bands are contiguous", () => {
    const [, chuninUpper] = TIER_BOUNDARIES.chunin;
    const [joninLower] = TIER_BOUNDARIES.jonin;
    expect(joninLower).toBe(chuninUpper + 1);
  });
});

describe("xpForAction", () => {
  it("returns positive XP for every (pillar, action) pair", () => {
    for (const pillar of ALL_PILLARS) {
      for (const action of ALL_ACTIONS) {
        expect(xpForAction(pillar, action)).toBeGreaterThan(0);
      }
    }
  });

  it("yields more XP for puzzle_solved on tactics than on strategy (adjacency)", () => {
    expect(xpForAction("tactics", "puzzle_solved")).toBeGreaterThan(
      xpForAction("strategy", "puzzle_solved"),
    );
  });

  it("yields more XP for opening_studied on strategy than on tactics", () => {
    expect(xpForAction("strategy", "opening_studied")).toBeGreaterThan(
      xpForAction("tactics", "opening_studied"),
    );
  });

  it("boss_battle_won is pillar-flat at 100", () => {
    for (const pillar of ALL_PILLARS) {
      expect(xpForAction(pillar, "boss_battle_won")).toBe(100);
    }
  });

  it("throws on unknown pillar", () => {
    expect(() =>
      xpForAction("ghost" as PillarId, "puzzle_solved"),
    ).toThrow(/unknown pillar/);
  });

  it("throws on unknown action", () => {
    expect(() =>
      xpForAction("tactics", "trash_talked" as Action),
    ).toThrow(/unknown action/);
  });
});

describe("XP_THRESHOLDS_PER_PILLAR", () => {
  it("has an entry for every pillar", () => {
    expect(Object.keys(XP_THRESHOLDS_PER_PILLAR).sort()).toEqual(
      [...ALL_PILLARS].sort(),
    );
  });

  it("each pillar declares all seven actions", () => {
    for (const pillar of ALL_PILLARS) {
      expect(Object.keys(XP_THRESHOLDS_PER_PILLAR[pillar]).sort()).toEqual(
        [...ALL_ACTIONS].sort(),
      );
    }
  });
});

describe("determineLevel", () => {
  it("returns 1 at 0 XP", () => {
    expect(determineLevel(0)).toBe(1);
  });

  it("returns 1 just below the level-2 threshold", () => {
    expect(determineLevel(XP_PER_LEVEL_BASE - 1)).toBe(1);
  });

  it("returns 2 exactly at the level-2 threshold (50 XP)", () => {
    expect(determineLevel(XP_PER_LEVEL_BASE)).toBe(2);
  });

  it("returns 3 at 4 * base XP (200)", () => {
    expect(determineLevel(4 * XP_PER_LEVEL_BASE)).toBe(3);
  });

  it("returns 10 at 81 * base XP (4050)", () => {
    expect(determineLevel(81 * XP_PER_LEVEL_BASE)).toBe(10);
  });

  it("caps at MAX_LEVEL (99) for very large totals", () => {
    expect(determineLevel(10_000_000)).toBe(MAX_LEVEL);
  });

  it("clamps negative XP to level 1", () => {
    expect(determineLevel(-100)).toBe(1);
  });

  it("throws on non-finite totalXP", () => {
    expect(() => determineLevel(Number.NaN)).toThrow(/finite/);
  });
});

describe("createCharacter", () => {
  it("starts at level 1 with zero totalXP", () => {
    const c = createCharacter(800);
    expect(c.level).toBe(1);
    expect(c.totalXP).toBe(0);
  });

  it("derives tier from starting ELO", () => {
    expect(createCharacter(800).tier).toBe("genin");
    expect(createCharacter(1400).tier).toBe("chunin");
    expect(createCharacter(2000).tier).toBe("jonin");
  });

  it("seeds an empty gains ledger", () => {
    expect(createCharacter(1000).gains).toEqual([]);
  });

  it("seeds zero XP for every pillar", () => {
    const c = createCharacter(1000);
    for (const pillar of ALL_PILLARS) {
      expect(c.pillarXP[pillar]).toBe(0);
    }
  });
});

describe("applyGain", () => {
  const baseGain = (overrides: Partial<XPGain> = {}): XPGain => ({
    pillar: "tactics",
    action: "puzzle_solved",
    xp: 10,
    timestamp: "2026-05-01T00:00:00Z",
    ...overrides,
  });

  it("returns a new Character (immutable update)", () => {
    const c0 = createCharacter(1000);
    const c1 = applyGain(c0, baseGain());
    expect(c1).not.toBe(c0);
    expect(c0.totalXP).toBe(0);
    expect(c0.gains).toHaveLength(0);
  });

  it("accumulates totalXP across gains", () => {
    let c = createCharacter(1000);
    c = applyGain(c, baseGain({ xp: 10 }));
    c = applyGain(c, baseGain({ xp: 25 }));
    expect(c.totalXP).toBe(35);
  });

  it("recomputes level from new totalXP", () => {
    const c0 = createCharacter(1000);
    const c1 = applyGain(c0, baseGain({ xp: XP_PER_LEVEL_BASE }));
    expect(c1.level).toBe(2);
  });

  it("attributes XP to the named pillar bucket only", () => {
    const c0 = createCharacter(1000);
    const c1 = applyGain(c0, baseGain({ pillar: "endgame", xp: 18 }));
    expect(c1.pillarXP.endgame).toBe(18);
    expect(c1.pillarXP.tactics).toBe(0);
    expect(c1.pillarXP.strategy).toBe(0);
  });

  it("appends to the gains ledger preserving order", () => {
    let c = createCharacter(1000);
    const g1 = baseGain({ xp: 10, timestamp: "2026-05-01T00:00:00Z" });
    const g2 = baseGain({ xp: 25, timestamp: "2026-05-01T01:00:00Z" });
    c = applyGain(c, g1);
    c = applyGain(c, g2);
    expect(c.gains).toEqual([g1, g2]);
  });

  it("does not mutate the input character's pillarXP or gains", () => {
    const c0 = createCharacter(1000);
    const pillarSnapshot = { ...c0.pillarXP };
    const gainsSnapshot = [...c0.gains];
    applyGain(c0, baseGain({ pillar: "calculation", xp: 50 }));
    expect(c0.pillarXP).toEqual(pillarSnapshot);
    expect(c0.gains).toEqual(gainsSnapshot);
  });

  it("preserves tier (tier follows ELO, not XP)", () => {
    const c0 = createCharacter(800); // genin
    const c1 = applyGain(c0, baseGain({ xp: 10_000 }));
    expect(c1.tier).toBe("genin");
  });

  it("throws on non-finite gain.xp", () => {
    const c = createCharacter(1000);
    expect(() => applyGain(c, baseGain({ xp: Number.NaN }))).toThrow(/finite/);
  });

  it("handles boss_battle_won (100 XP, pillar-flat)", () => {
    const c0 = createCharacter(1200);
    const xp = xpForAction("strategy", "boss_battle_won");
    const c1 = applyGain(
      c0,
      baseGain({ pillar: "strategy", action: "boss_battle_won", xp }),
    );
    expect(c1.totalXP).toBe(100);
    expect(c1.pillarXP.strategy).toBe(100);
  });
});

describe("end-to-end: a chunin grinds tactics for a week", () => {
  it("levels up after sustained practice", () => {
    let c = createCharacter(1400);
    expect(c.tier).toBe("chunin");
    expect(c.level).toBe(1);
    // 20 puzzles on tactics (10 XP each) = 200 XP → level 3
    for (let i = 0; i < 20; i++) {
      c = applyGain(c, {
        pillar: "tactics",
        action: "puzzle_solved",
        xp: xpForAction("tactics", "puzzle_solved"),
        timestamp: `2026-05-${String(i + 1).padStart(2, "0")}T00:00:00Z`,
      });
    }
    expect(c.totalXP).toBe(200);
    expect(c.level).toBe(3);
    expect(c.pillarXP.tactics).toBe(200);
    expect(c.gains).toHaveLength(20);
    expect(c.tier).toBe("chunin");
  });
});
