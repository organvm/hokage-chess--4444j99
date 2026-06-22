import { describe, expect, it } from "vitest";

import {
  FITNESS_LONG_FORM_AUTHORITY,
  getLongFormAuthoritySurface,
  listLongFormAuthoritySurfaces,
} from "../src/lib/long-form-authority";

describe("FWS-4 long-form authority surface", () => {
  it("chooses a separate YouTube long-form companion channel", () => {
    expect(FITNESS_LONG_FORM_AUTHORITY.atom).toBe("FWS-4");
    expect(FITNESS_LONG_FORM_AUTHORITY.chosenPlatform).toBe("youtube-long-form");
    expect(FITNESS_LONG_FORM_AUTHORITY.rejectedPlatform).toBe("podcast");
    expect(FITNESS_LONG_FORM_AUTHORITY.channelArchitecture).toBe(
      "separate-with-bridge",
    );
    expect(FITNESS_LONG_FORM_AUTHORITY.primaryChannel).toBe(
      "Rob Bonavoglia Fitness",
    );
    expect(FITNESS_LONG_FORM_AUTHORITY.companionChannel).toBe("Hokage Chess");
  });

  it("exposes the launch page as a stable static route", () => {
    expect(FITNESS_LONG_FORM_AUTHORITY.slug).toBe("fitness-long-form");
    expect(FITNESS_LONG_FORM_AUTHORITY.route).toBe(
      "/authority/fitness-long-form",
    );
    expect(getLongFormAuthoritySurface("fitness-long-form")).toBe(
      FITNESS_LONG_FORM_AUTHORITY,
    );
  });

  it("defines the weekly DITL episode structure from hook to CTA", () => {
    expect(FITNESS_LONG_FORM_AUTHORITY.cadence).toContain("One");
    expect(
      FITNESS_LONG_FORM_AUTHORITY.episodeStructure.map((block) => block.label),
    ).toEqual(["Hook", "The Work", "The Bridge", "CTA"]);
    expect(FITNESS_LONG_FORM_AUTHORITY.episodeStructure[2].purpose).toContain(
      "discipline",
    );
  });

  it("ships the first three scripted episodes", () => {
    expect(FITNESS_LONG_FORM_AUTHORITY.launchEpisodes).toHaveLength(3);
    expect(
      FITNESS_LONG_FORM_AUTHORITY.launchEpisodes.map(
        (episode) => episode.slug,
      ),
    ).toEqual([
      "foundation-of-discipline",
      "breaking-plateaus",
      "recovery-equation",
    ]);
    expect(
      FITNESS_LONG_FORM_AUTHORITY.launchEpisodes.every(
        (episode) =>
          episode.status === "scripted" &&
          episode.hook &&
          episode.work &&
          episode.bridge &&
          episode.cta,
      ),
    ).toBe(true);
  });
});

describe("long-form authority registry", () => {
  it("returns defensive list copies for route discovery", () => {
    const a = listLongFormAuthoritySurfaces();
    const b = listLongFormAuthoritySurfaces();
    expect(a).toEqual([FITNESS_LONG_FORM_AUTHORITY]);
    expect(a).not.toBe(b);
  });

  it("returns undefined for unknown surfaces", () => {
    expect(getLongFormAuthoritySurface("podcast")).toBeUndefined();
  });
});
