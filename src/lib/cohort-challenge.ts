/**
 * Cohort Challenge Ritual — Quarterly Legion Challenges
 *
 * Implements the data models and unit economics logic for the MP-9 spec.
 * The challenge is the highest-leverage recurring revenue ritual, designed
 * as a content engine that produces transformations, feeding reels and list growth.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Quarter = "Q1" | "Q2" | "Q3" | "Q4";

export interface CohortChallenge {
  quarter: Quarter;
  window: string;
  name: string;
  theme: string;
  duration_weeks: number;
  is_bridge: boolean;
}

export type TierName = "Recruit" | "Legionnaire" | "Sensei";

export interface TierConfig {
  name: TierName;
  price: number;
  capacity?: number;
  strategic_role: string;
}

export interface UnitEconomicsInput {
  free_signups: number;
  paid_conversion_rate: number; // e.g., 0.13 for 13%
  premium_seats: number;
  completion_rate: number; // e.g., 0.70 for 70%
  community_conversion_rate: number; // e.g., 0.25 for 25%
}

export interface UnitEconomicsOutput {
  free_signups: number;
  paid_signups: number;
  premium_signups: number;
  one_time_revenue: number;
  paid_finishers: number;
  community_conversions: number;
  recurring_mrr_lift: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const ANNUAL_CALENDAR: Record<Quarter, CohortChallenge> = {
  Q1: {
    quarter: "Q1",
    window: "Jan–Feb",
    name: "Legion Cut",
    theme: "Fat-loss / recomposition",
    duration_weeks: 8,
    is_bridge: false,
  },
  Q2: {
    quarter: "Q2",
    window: "Apr–May",
    name: "Legion Forge",
    theme: "Strength / habit-building",
    duration_weeks: 6,
    is_bridge: false,
  },
  Q3: {
    quarter: "Q3",
    window: "Jul–Aug",
    name: "Legion Bulk",
    theme: "Muscle / hypertrophy",
    duration_weeks: 8,
    is_bridge: false,
  },
  Q4: {
    quarter: "Q4",
    window: "Oct–Nov",
    name: "Hokage Bulk",
    theme: "Body + chess training arc",
    duration_weeks: 8,
    is_bridge: true,
  },
};

export const TIERS: Record<TierName, TierConfig> = {
  Recruit: {
    name: "Recruit",
    price: 0,
    strategic_role: "List growth",
  },
  Legionnaire: {
    name: "Legionnaire",
    price: 79,
    strategic_role: "Revenue + transformations",
  },
  Sensei: {
    name: "Sensei",
    price: 249,
    capacity: 10,
    strategic_role: "High-margin skim",
  },
};

export const COMMUNITY_MRR_PRICE = 49;

// ---------------------------------------------------------------------------
// Pure functions
// ---------------------------------------------------------------------------

/**
 * Projects unit economics for a cohort challenge based on input assumptions.
 */
export function projectUnitEconomics(input: UnitEconomicsInput): UnitEconomicsOutput {
  const paid_signups = Math.round(input.free_signups * input.paid_conversion_rate);
  const premium_signups = Math.min(
    input.premium_seats,
    TIERS.Sensei.capacity ?? input.premium_seats
  );

  const one_time_revenue =
    paid_signups * TIERS.Legionnaire.price + premium_signups * TIERS.Sensei.price;

  const paid_finishers = Math.round(paid_signups * input.completion_rate);
  const community_conversions = Math.round(paid_finishers * input.community_conversion_rate);
  const recurring_mrr_lift = community_conversions * COMMUNITY_MRR_PRICE;

  return {
    free_signups: input.free_signups,
    paid_signups,
    premium_signups,
    one_time_revenue,
    paid_finishers,
    community_conversions,
    recurring_mrr_lift,
  };
}

/**
 * Gets the current or next challenge based on a given date.
 * Very simple logic, based solely on month.
 */
export function getChallengeForDate(date: Date): CohortChallenge {
  const month = date.getMonth() + 1; // 1-12
  if (month <= 3) return ANNUAL_CALENDAR.Q1;
  if (month <= 6) return ANNUAL_CALENDAR.Q2;
  if (month <= 9) return ANNUAL_CALENDAR.Q3;
  return ANNUAL_CALENDAR.Q4;
}
