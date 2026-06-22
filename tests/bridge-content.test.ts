import { describe, expect, it } from "vitest";

import {
  BRIDGE_PIECES,
  FIRST_BRIDGE_PIECE,
  IDENTITY_FUSION_PILLAR,
  getBridgePiece,
  listBridgePieces,
} from "../src/lib/bridge-content";

describe("BR-1 identity-fusion pillar", () => {
  it("declares the three identity rails without touching content-strategy", () => {
    expect(IDENTITY_FUSION_PILLAR.atom).toBe("BR-1");
    expect(IDENTITY_FUSION_PILLAR.rails.map((rail) => rail.label)).toEqual([
      "Board",
      "Iron",
      "Home",
    ]);
    expect(IDENTITY_FUSION_PILLAR.subhead).toContain("faith");
    expect(IDENTITY_FUSION_PILLAR.subhead).toContain("family");
  });
});

describe("BR-1 first bridge piece", () => {
  it("publishes Progressive Overload on the Board at a stable route slug", () => {
    expect(FIRST_BRIDGE_PIECE.status).toBe("published");
    expect(FIRST_BRIDGE_PIECE.atom).toBe("BR-1");
    expect(FIRST_BRIDGE_PIECE.slug).toBe("progressive-overload-on-the-board");
    expect(getBridgePiece(FIRST_BRIDGE_PIECE.slug)).toBe(FIRST_BRIDGE_PIECE);
  });

  it("carries both Hokage and Legion identity anchors", () => {
    expect(FIRST_BRIDGE_PIECE.identities.map((identity) => identity.label)).toEqual([
      "Hokage Chess",
      "Legion of Fitness",
    ]);
    expect(FIRST_BRIDGE_PIECE.tags).toEqual(
      expect.arrayContaining([
        "#HokageChess",
        "#LegionOfFitness",
        "#ChessDiscipline",
        "#IronDiscipline",
        "#FaithFamily",
      ]),
    );
  });

  it("has ready cuts for the three BR-1 distribution formats", () => {
    expect(FIRST_BRIDGE_PIECE.formats.map((format) => format.channel)).toEqual([
      "youtube",
      "carousel",
      "newsletter",
    ]);
    expect(FIRST_BRIDGE_PIECE.formats.every((format) => format.status === "ready")).toBe(
      true,
    );
  });
});

describe("bridge piece registry", () => {
  it("returns defensive list copies for route generation", () => {
    const a = listBridgePieces();
    const b = listBridgePieces();
    expect(a).toEqual(BRIDGE_PIECES);
    expect(a).not.toBe(b);
  });
});
