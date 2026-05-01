import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  listPillars,
  listPersonas,
  isPillarId,
  type PillarId,
} from "@/lib/landing-engine/personas";
import {
  PILLAR_ADJACENCY,
  PILLAR_DESCRIPTIONS,
  getPillarLabel,
} from "@/lib/landing-engine/sections";
import { ThreePathsSection } from "@/components/landing/ThreePathsSection";

/**
 * Static generation: 6 pillars × 1 page = 6 pre-rendered routes.
 * Closes the §9.2 P0 dead-link finding (`sections.ts:104` was emitting
 * /pillars/<slug> hrefs with no route to land on).
 */
export function generateStaticParams() {
  return listPillars().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isPillarId(slug)) return { title: "Hokage Chess" };
  const label = getPillarLabel(slug);
  const desc = PILLAR_DESCRIPTIONS[slug];
  return {
    title: `Hokage Chess — ${label}`,
    description: desc,
    openGraph: {
      title: `Hokage Chess — ${label}`,
      description: desc,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Hokage Chess — ${label}`,
      description: desc,
    },
  };
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isPillarId(slug)) notFound();
  const pillar: PillarId = slug;
  const label = getPillarLabel(pillar);
  const description = PILLAR_DESCRIPTIONS[pillar];
  const adjacency = PILLAR_ADJACENCY[pillar];
  const personas = listPersonas();

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24 bg-black overflow-hidden">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-hokage-red mb-4">
          Pillar — {pillar.replace("-", " ")}
        </p>
        <h1 className="font-heading text-[clamp(40px,6vw,76px)] font-bold leading-[1.05] tracking-tight text-white uppercase">
          {label}
        </h1>
        <p className="mt-8 text-[17px] font-light leading-relaxed text-white/60 max-w-[640px]">
          {description}
        </p>
      </section>

      {/* Adjacency grid — reuse the same primitive that renders three-roads
          on persona pages. Identical shape, different copy seed. */}
      <ThreePathsSection
        data={{
          type: "three-paths",
          heading: "Three roads in.",
          paths: adjacency.map((adjPillar) => ({
            label: adjPillar.replace("-", " "),
            description: PILLAR_DESCRIPTIONS[adjPillar],
            href: `/pillars/${adjPillar}`,
          })),
        }}
      />

      {/* Persona fork — "If this is you" 3-way CTA */}
      <section
        id="cta"
        className="relative px-6 py-24 max-w-[1080px] mx-auto"
      >
        <h2 className="font-heading text-[clamp(28px,3.5vw,44px)] font-bold uppercase text-white leading-tight text-center">
          If this is you.
        </h2>
        <p className="mt-4 text-center text-[15px] font-light leading-relaxed text-white/50 max-w-[640px] mx-auto">
          Three roads into {label}. Pick the one that names where you stand
          right now.
        </p>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {personas.map((persona) => (
            <Link
              key={persona.id}
              href={`/for/${persona.id}/${pillar}`}
              className="group block p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-hokage-red/40 transition-colors"
            >
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-hokage-red mb-3">
                {persona.ratingBand}
              </p>
              <h3 className="font-heading text-[20px] font-bold uppercase text-white mb-3 leading-tight">
                {persona.label}
              </h3>
              <p className="text-[14px] font-light leading-relaxed text-white/60 group-hover:text-white/80 transition-colors">
                {persona.heroHook}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/#email-capture"
            className="inline-flex items-center px-8 py-4 rounded-full bg-hokage-red text-white text-sm font-semibold uppercase tracking-wide hover:bg-red-600 transition-colors"
          >
            Or join the village
          </Link>
        </div>
      </section>
    </main>
  );
}
