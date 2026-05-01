/**
 * XP / Level / Tier primitive — pure-functional gamification ledger for the
 * Hokage Chess Character Sheet. Ports the gamification primitives from the
 * sister codebase (Legion Command Center @ a-organvm/gamified-coach-interface);
 * see research/apex-predator-parent-architecture/ for upstream lineage.
 *
 * Deterministic, side-effect-free, no I/O. Callers own timestamps and
 * persistence. Pillars use the canonical 6-axis taxonomy from
 * landing-engine/personas (PillarId).
 */

import type { PillarId } from "./landing-engine/personas";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Naruto-coded ELO bands. Boundaries from chess.com online-rapid + USCF. */
export type Tier = "genin" | "chunin" | "jonin";

/** 1..99 (capped). Quadratic curve — see determineLevel. */
export type Level = number;

/** Discrete XP-yielding events. Extend by amending XP_THRESHOLDS_PER_PILLAR. */
export type Action =
  | "puzzle_solved"
  | "opening_studied"
  | "game_won"
  | "game_drawn"
  | "game_lost"
  | "lesson_completed"
  | "boss_battle_won";

/** A single ledger entry. Caller mints `timestamp` (ISO-8601). */
export interface XPGain {
  pillar: PillarId;
  action: Action;
  xp: number;
  timestamp: string;
}

/** Immutable character snapshot. `applyGain` returns a new value. */
export interface Character {
  totalXP: number;
  level: Level;
  tier: Tier;
  pillarXP: Record<PillarId, number>;
  gains: XPGain[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** ELO band → tier. Inclusive lower bound, inclusive upper bound. */
export const TIER_BOUNDARIES: Record<Tier, [number, number]> = {
  genin: [0, 1199],
  chunin: [1200, 1599],
  jonin: [1600, Number.POSITIVE_INFINITY],
};

/** Hard cap on Level. */
export const MAX_LEVEL: Level = 99;

/** Quadratic curve coefficient: level = floor(sqrt(totalXP / XP_PER_LEVEL_BASE)) + 1. */
export const XP_PER_LEVEL_BASE = 50;

/**
 * Per-pillar / per-action XP yield. Adjacency-aware: an action on a pillar's
 * "home" axis (e.g. puzzle_solved on tactics) outweighs the same action on a
 * tangential axis (puzzle_solved on strategy). Boss battles are pillar-flat.
 */
export const XP_THRESHOLDS_PER_PILLAR: Record<
  PillarId,
  Record<Action, number>
> = {
  tactics: {
    puzzle_solved: 10,
    opening_studied: 4,
    game_won: 25,
    game_drawn: 10,
    game_lost: 5,
    lesson_completed: 15,
    boss_battle_won: 100,
  },
  strategy: {
    puzzle_solved: 5,
    opening_studied: 12,
    game_won: 25,
    game_drawn: 10,
    game_lost: 5,
    lesson_completed: 15,
    boss_battle_won: 100,
  },
  calculation: {
    puzzle_solved: 8,
    opening_studied: 6,
    game_won: 25,
    game_drawn: 10,
    game_lost: 5,
    lesson_completed: 15,
    boss_battle_won: 100,
  },
  endgame: {
    puzzle_solved: 6,
    opening_studied: 4,
    game_won: 25,
    game_drawn: 10,
    game_lost: 5,
    lesson_completed: 18,
    boss_battle_won: 100,
  },
  "time-management": {
    puzzle_solved: 4,
    opening_studied: 3,
    game_won: 30,
    game_drawn: 12,
    game_lost: 8,
    lesson_completed: 12,
    boss_battle_won: 100,
  },
  "tilt-resistance": {
    puzzle_solved: 3,
    opening_studied: 3,
    game_won: 20,
    game_drawn: 15,
    game_lost: 12,
    lesson_completed: 14,
    boss_battle_won: 100,
  },
};

// ---------------------------------------------------------------------------
// Pure functions
// ---------------------------------------------------------------------------

/**
 * Map an ELO rating to a Naruto tier. Negative ELOs clamp to genin; the upper
 * end of jonin is unbounded.
 */
export function getTierForElo(elo: number): Tier {
  if (!Number.isFinite(elo)) {
    throw new Error(`getTierForElo: elo must be finite, got ${elo}`);
  }
  if (elo < TIER_BOUNDARIES.chunin[0]) return "genin";
  if (elo < TIER_BOUNDARIES.jonin[0]) return "chunin";
  return "jonin";
}

/** Look up the XP yield for an (action, pillar) pair. */
export function xpForAction(pillar: PillarId, action: Action): number {
  const row = XP_THRESHOLDS_PER_PILLAR[pillar];
  if (!row) throw new Error(`xpForAction: unknown pillar: ${pillar}`);
  const xp = row[action];
  if (xp === undefined) {
    throw new Error(`xpForAction: unknown action: ${action}`);
  }
  return xp;
}

/**
 * Quadratic level curve. Level 1 starts at 0 XP; level N requires
 * `(N-1)^2 * XP_PER_LEVEL_BASE` total XP. Capped at MAX_LEVEL.
 */
export function determineLevel(totalXP: number): Level {
  if (!Number.isFinite(totalXP)) {
    throw new Error(`determineLevel: totalXP must be finite, got ${totalXP}`);
  }
  if (totalXP < 0) return 1;
  const raw = Math.floor(Math.sqrt(totalXP / XP_PER_LEVEL_BASE)) + 1;
  return Math.min(raw, MAX_LEVEL);
}

function emptyPillarXP(): Record<PillarId, number> {
  const acc = {} as Record<PillarId, number>;
  for (const p of Object.keys(XP_THRESHOLDS_PER_PILLAR) as PillarId[]) {
    acc[p] = 0;
  }
  return acc;
}

/**
 * Build an initial Character for a given starting ELO. Tier is derived; level
 * is 1; all pillar XP buckets start at zero.
 */
export function createCharacter(elo: number): Character {
  return {
    totalXP: 0,
    level: 1,
    tier: getTierForElo(elo),
    pillarXP: emptyPillarXP(),
    gains: [],
  };
}

/**
 * Immutable update: apply an XPGain to a Character. Recomputes totalXP, level,
 * and the affected pillar bucket. Tier is NOT mutated by gains — it follows
 * ELO, which is a separate signal owned by the caller.
 */
export function applyGain(char: Character, gain: XPGain): Character {
  if (!Number.isFinite(gain.xp)) {
    throw new Error(`applyGain: gain.xp must be finite, got ${gain.xp}`);
  }
  const nextTotal = char.totalXP + gain.xp;
  const nextPillarXP: Record<PillarId, number> = {
    ...char.pillarXP,
    [gain.pillar]: (char.pillarXP[gain.pillar] ?? 0) + gain.xp,
  };
  return {
    totalXP: nextTotal,
    level: determineLevel(nextTotal),
    tier: char.tier,
    pillarXP: nextPillarXP,
    gains: [...char.gains, gain],
  };
}
