import { describe, it, expect } from "vitest";
import {
  determinePhase,
  getTarget,
  calculateProgress,
  totalRevenue,
  projectAnnualRevenue,
  checkYPPEligibility,
  QUARTERLY_TARGETS,
} from "../src/lib/growth";
import type { GrowthSnapshot, RevenueStream } from "../src/lib/growth";

describe("determinePhase", () => {
  it("should return q1_setup for low subscribers", () => {
    expect(determinePhase(33)).toBe("q1_setup");
    expect(determinePhase(249)).toBe("q1_setup");
  });

  it("should return q2_rivals for 250+", () => {
    expect(determinePhase(250)).toBe("q2_rivals");
    expect(determinePhase(999)).toBe("q2_rivals");
  });

  it("should return q3_redemption for 1000+", () => {
    expect(determinePhase(1000)).toBe("q3_redemption");
  });

  it("should return q4_authority for 3500+", () => {
    expect(determinePhase(3500)).toBe("q4_authority");
    expect(determinePhase(10000)).toBe("q4_authority");
  });
});

describe("getTarget", () => {
  it("should return target for valid phase", () => {
    const target = getTarget("q1_setup");
    expect(target.subscriber_start).toBe(33);
    expect(target.subscriber_target).toBe(250);
  });

  it("should throw for unknown phase", () => {
    expect(() => getTarget("q5_unknown" as GrowthPhase)).toThrow("Unknown phase");
  });
});

describe("QUARTERLY_TARGETS", () => {
  it("should have 4 phases", () => {
    expect(QUARTERLY_TARGETS).toHaveLength(4);
  });

  it("should have increasing subscriber targets", () => {
    for (let i = 1; i < QUARTERLY_TARGETS.length; i++) {
      expect(QUARTERLY_TARGETS[i].subscriber_target).toBeGreaterThan(
        QUARTERLY_TARGETS[i - 1].subscriber_target
      );
    }
  });
});

describe("calculateProgress", () => {
  it("should calculate progress percentages", () => {
    const snapshot: GrowthSnapshot = {
      date: new Date(),
      subscribers: 140,
      monthly_views: 250,
      avg_ctr: 5,
      revenue_streams: [
        { source: "kofi", monthly_amount: 25, active: true },
      ],
      current_phase: "q1_setup",
    };

    const progress = calculateProgress(snapshot);
    expect(progress.subscriber_progress).toBeGreaterThan(0);
    expect(progress.subscriber_progress).toBeLessThanOrEqual(100);
    expect(progress.views_progress).toBe(50); // 250/500
    expect(progress.overall).toBeGreaterThan(0);
  });

  it("should cap at 100%", () => {
    const snapshot: GrowthSnapshot = {
      date: new Date(),
      subscribers: 500,
      monthly_views: 1000,
      avg_ctr: 8,
      revenue_streams: [
        { source: "kofi", monthly_amount: 100, active: true },
      ],
      current_phase: "q1_setup",
    };

    const progress = calculateProgress(snapshot);
    expect(progress.subscriber_progress).toBe(100);
    expect(progress.views_progress).toBe(100);
    expect(progress.revenue_progress).toBe(100);
  });
});

describe("totalRevenue", () => {
  it("should sum active streams only", () => {
    const streams: RevenueStream[] = [
      { source: "kofi", monthly_amount: 50, active: true },
      { source: "coaching", monthly_amount: 300, active: true },
      { source: "sponsorship", monthly_amount: 200, active: false },
    ];

    expect(totalRevenue(streams)).toBe(350);
  });

  it("should return 0 for empty streams", () => {
    expect(totalRevenue([])).toBe(0);
  });
});

describe("projectAnnualRevenue", () => {
  it("should multiply monthly by 12", () => {
    const streams: RevenueStream[] = [
      { source: "ads", monthly_amount: 100, active: true },
    ];
    expect(projectAnnualRevenue(streams)).toBe(1200);
  });
});

describe("checkYPPEligibility", () => {
  it("should return eligible when both criteria met", () => {
    const result = checkYPPEligibility(1500, 5000);
    expect(result.eligible).toBe(true);
    expect(result.subscribers_ok).toBe(true);
    expect(result.watch_hours_ok).toBe(true);
  });

  it("should return ineligible when subscribers too low", () => {
    const result = checkYPPEligibility(500, 5000);
    expect(result.eligible).toBe(false);
    expect(result.subscribers_ok).toBe(false);
    expect(result.watch_hours_ok).toBe(true);
  });

  it("should return ineligible when watch hours too low", () => {
    const result = checkYPPEligibility(1500, 2000);
    expect(result.eligible).toBe(false);
    expect(result.watch_hours_ok).toBe(false);
  });
});
