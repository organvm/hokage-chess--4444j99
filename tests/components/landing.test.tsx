/**
 * Render-and-snapshot tests for the four landing section components.
 *
 * Purpose: lock the prop contract between section components and the
 * `SectionData` types in `src/lib/landing-engine/sections.ts`. Today a
 * typo in any section component (renaming a prop, dropping a field) ships
 * silently; the unit tests in `tests/landing-engine.test.ts` exercise the
 * engine but never render a component.
 *
 * Props are hand-crafted literals — NOT derived from
 * `SectionBuilders.X(getPersona(...))` — so the snapshots stay stable when
 * persona copy evolves. The engine is covered separately.
 */
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ThreePathsSection } from "@/components/landing/ThreePathsSection";
import { CtaSection } from "@/components/landing/CtaSection";
import type {
  HeroSectionProps,
  ProblemSectionProps,
  ThreePathsSectionProps,
  CtaSectionProps,
} from "@/lib/landing-engine/sections";

describe("HeroSection", () => {
  it("renders hero with the full prop contract", () => {
    const data: HeroSectionProps = {
      type: "hero",
      pillarLabel: "the forge",
      ratingBand: "1000–1400",
      heading: "The Stuck Beginner",
      subhead: "Patterns over panic.",
      ctaLabel: "Start the climb",
      ctaHref: "#cta",
    };
    const { asFragment } = render(<HeroSection data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("ProblemSection", () => {
  it("renders pain points as an enumerated list", () => {
    const data: ProblemSectionProps = {
      type: "problem",
      heading: "The grinding middle.",
      painPoints: [
        "You blunder pieces in the middlegame.",
        "Openings dissolve once theory ends.",
        "Tilt eats the second game.",
      ],
    };
    const { asFragment } = render(<ProblemSection data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("ThreePathsSection", () => {
  it("renders the three-path adjacency grid", () => {
    const data: ThreePathsSectionProps = {
      type: "three-paths",
      heading: "Three roads in.",
      paths: [
        {
          label: "tactics",
          description:
            "The Forge — pattern recognition until your eyes see threats before you can name them.",
          href: "/pillars/tactics",
        },
        {
          label: "calculation",
          description:
            "The Lab — concrete lines deeper than your opponent will go.",
          href: "/pillars/calculation",
        },
        {
          label: "strategy",
          description:
            "The Library — long-term plans, pawn structures, when not to grab the material.",
          href: "/pillars/strategy",
        },
      ],
    };
    const { asFragment } = render(<ThreePathsSection data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("CtaSection", () => {
  it("renders the closing CTA panel", () => {
    const data: CtaSectionProps = {
      type: "cta",
      heading: "Climb the rating ladder.",
      subhead: "Win drawn games. Stop losing won ones.",
      ctaLabel: "Start the climb",
      ctaHref: "/#email-capture",
    };
    const { asFragment } = render(<CtaSection data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
