import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  IDENTITY_FUSION_PILLAR,
  getBridgePiece,
  listBridgePieces,
} from "@/lib/bridge-content";

export function generateStaticParams() {
  return listBridgePieces().map((piece) => ({ slug: piece.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const piece = getBridgePiece(slug);
  if (!piece) return { title: "Hokage Chess" };

  return {
    title: `Hokage Chess - ${piece.title}`,
    description: piece.dek,
  };
}

export default async function BridgePiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = getBridgePiece(slug);
  if (!piece) notFound();

  return (
    <main className="bg-hokage-dark text-hokage-light">
      <section className="relative overflow-hidden border-b border-hokage-red/20 bg-black px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-hokage-red">
            {piece.atom} - {IDENTITY_FUSION_PILLAR.label}
          </p>
          <h1 className="mt-5 font-heading text-[clamp(42px,7vw,84px)] font-bold uppercase leading-[0.98] text-white">
            {piece.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-hokage-light/70">
            {piece.dek}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {piece.identities.map((identity) => (
              <span
                key={identity.label}
                className="rounded-sm border border-hokage-red/35 bg-hokage-red/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white"
              >
                {identity.handle}
              </span>
            ))}
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 py-20">
        <div className="grid gap-8 border-b border-hokage-light/10 pb-12 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-hokage-red">
              Published
            </p>
            <p className="mt-2 text-sm text-hokage-light/55">
              {piece.publishedDate}
            </p>
          </div>
          <div className="space-y-6">
            <p className="font-heading text-2xl uppercase leading-tight text-white">
              {piece.hook}
            </p>
            <p className="text-lg leading-relaxed text-hokage-light/70">
              {piece.thesis}
            </p>
          </div>
        </div>

        <div className="space-y-16 py-16">
          {piece.sections.map((section) => (
            <section key={section.heading} className="grid gap-6 md:grid-cols-[180px_1fr]">
              <h2 className="font-heading text-2xl font-bold uppercase leading-tight text-white">
                {section.heading}
              </h2>
              <div className="space-y-5">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[17px] leading-relaxed text-hokage-light/70"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="border-y border-hokage-red/25 py-12">
          <h2 className="font-heading text-3xl font-bold uppercase text-white">
            Cross-post packet
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {piece.formats.map((format) => (
              <div
                key={format.channel}
                className="rounded-sm border border-hokage-light/10 bg-hokage-gray/35 p-5"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-hokage-red">
                  {format.channel}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  {format.asset}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {piece.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-hokage-light/10 px-3 py-2 font-mono text-xs text-hokage-light/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="py-14 text-center">
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-hokage-light/70">
            {piece.cta}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#email-capture"
              className="inline-flex items-center justify-center rounded-sm bg-hokage-red px-7 py-4 font-heading text-sm uppercase tracking-wider text-white cta-glow"
            >
              Join the Scroll
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-sm border border-hokage-light/15 px-7 py-4 font-heading text-sm uppercase tracking-wider text-white hover:border-hokage-red/50"
            >
              Back to Hokage Chess
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
