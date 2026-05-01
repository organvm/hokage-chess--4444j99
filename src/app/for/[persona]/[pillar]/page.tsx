import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  listPersonas,
  listPillars,
  isPillarId,
  type PersonaId,
  type PillarId,
} from "@/lib/landing-engine/personas";
import { composeLanding } from "@/lib/landing-engine/compose";
import {
  PILLAR_DESCRIPTIONS,
  getPillarLabel,
} from "@/lib/landing-engine/sections";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ThreePathsSection } from "@/components/landing/ThreePathsSection";
import { CtaSection } from "@/components/landing/CtaSection";

/**
 * Long-tail SEO surface: 3 personas × 6 pillars = 18 pre-rendered pages.
 * Each page is a persona-filtered view of a specific pillar — hero
 * combines persona pain copy with pillar focus, three-roads pivots
 * adjacency around the pillar (not the persona's primary pillar), CTA
 * funnels to /api/subscribe via the root email-capture anchor.
 */
export function generateStaticParams() {
  const params: Array<{ persona: string; pillar: string }> = [];
  for (const persona of listPersonas()) {
    for (const pillar of listPillars()) {
      params.push({ persona: persona.id, pillar });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ persona: string; pillar: string }>;
}): Promise<Metadata> {
  const { persona, pillar } = await params;
  if (!isPillarId(pillar)) return { title: "Hokage Chess" };
  try {
    const composed = composeLanding({
      personaId: persona as PersonaId,
      pillarFocus: pillar,
    });
    const pillarLabel = getPillarLabel(pillar);
    const title = `Hokage Chess — ${composed.persona.label} × ${pillarLabel}`;
    const description = `${PILLAR_DESCRIPTIONS[pillar]} ${composed.persona.heroHook}`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return { title: "Hokage Chess" };
  }
}

export default async function PersonaPillarPage({
  params,
}: {
  params: Promise<{ persona: string; pillar: string }>;
}) {
  const { persona, pillar } = await params;
  if (!isPillarId(pillar)) notFound();
  const pillarFocus: PillarId = pillar;

  let composed;
  try {
    composed = composeLanding({
      personaId: persona as PersonaId,
      pillarFocus,
    });
  } catch {
    notFound();
  }

  const pillarLabel = getPillarLabel(pillarFocus);

  return (
    <main>
      {/* Pillar-context kicker — orients the visitor before the persona hero */}
      <section className="relative px-6 pt-12 pb-4 max-w-[860px] mx-auto text-center">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-hokage-red mb-3">
          {pillarLabel} for {composed.persona.label}
        </p>
        <p className="text-[15px] font-light leading-relaxed text-white/50 max-w-[640px] mx-auto">
          {PILLAR_DESCRIPTIONS[pillarFocus]}
        </p>
      </section>

      {composed.sections.map((section, i) => {
        if (section.type === "hero") return <HeroSection key={i} data={section} />;
        if (section.type === "problem") return <ProblemSection key={i} data={section} />;
        if (section.type === "three-paths")
          return <ThreePathsSection key={i} data={section} />;
        if (section.type === "cta") return <CtaSection key={i} data={section} />;
        return null;
      })}
    </main>
  );
}
