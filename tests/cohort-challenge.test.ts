import { describe, it, expect } from "vitest";
import {
  ANNUAL_CALENDAR,
  TIERS,
  projectUnitEconomics,
  getChallengeForDate,
} from "../src/lib/cohort-challenge";

describe("ANNUAL_CALENDAR", () => {
  it("should have 4 quarterly challenges defined", () => {
    expect(Object.keys(ANNUAL_CALENDAR)).toHaveLength(4);
    expect(ANNUAL_CALENDAR.Q1.name).toBe("Legion Cut");
    expect(ANNUAL_CALENDAR.Q4.name).toBe("Hokage Bulk");
    expect(ANNUAL_CALENDAR.Q4.is_bridge).toBe(true);
  });
});

describe("TIERS", () => {
  it("should have correct pricing and capacity constraints", () => {
    expect(TIERS.Recruit.price).toBe(0);
    expect(TIERS.Legionnaire.price).toBe(79);
    expect(TIERS.Sensei.price).toBe(249);
    expect(TIERS.Sensei.capacity).toBe(10);
  });
});

describe("projectUnitEconomics", () => {
  it("should calculate conservative model correctly", () => {
    const result = projectUnitEconomics({
      free_signups: 300,
      paid_conversion_rate: 0.133333, // 40 / 300
      premium_seats: 5,
      completion_rate: 0.70,
      community_conversion_rate: 0.25,
    });

    expect(result.free_signups).toBe(300);
    expect(result.paid_signups).toBe(40);
    expect(result.premium_signups).toBe(5);
    
    // 40 * 79 + 5 * 249 = 3160 + 1245 = 4405 (~4400 in the spec)
    expect(result.one_time_revenue).toBe(4405);
    
    expect(result.paid_finishers).toBe(28); // 40 * 0.7
    expect(result.community_conversions).toBe(7); // 28 * 0.25
    expect(result.recurring_mrr_lift).toBe(343); // 7 * 49
  });

  it("should calculate stretch model correctly and cap Sensei seats", () => {
    const result = projectUnitEconomics({
      free_signups: 800,
      paid_conversion_rate: 0.15, // 120 / 800
      premium_seats: 15, // Should be capped at 10
      completion_rate: 0.70,
      community_conversion_rate: 0.25,
    });

    expect(result.free_signups).toBe(800);
    expect(result.paid_signups).toBe(120);
    expect(result.premium_signups).toBe(10); // Capped
    
    // 120 * 79 + 10 * 249 = 9480 + 2490 = 11970
    expect(result.one_time_revenue).toBe(11970);
    
    expect(result.paid_finishers).toBe(84); // 120 * 0.7
    expect(result.community_conversions).toBe(21); // 84 * 0.25
    expect(result.recurring_mrr_lift).toBe(1029); // 21 * 49
  });
});

describe("getChallengeForDate", () => {
  it("should return Q1 for Feb", () => {
    expect(getChallengeForDate(new Date("2026-02-15")).quarter).toBe("Q1");
  });

  it("should return Q2 for May", () => {
    expect(getChallengeForDate(new Date("2026-05-10")).quarter).toBe("Q2");
  });

  it("should return Q3 for Aug", () => {
    expect(getChallengeForDate(new Date("2026-08-20")).quarter).toBe("Q3");
  });

  it("should return Q4 for Nov", () => {
    expect(getChallengeForDate(new Date("2026-11-05")).quarter).toBe("Q4");
  });
});
