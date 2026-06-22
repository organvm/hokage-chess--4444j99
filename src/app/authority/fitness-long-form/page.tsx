import type { Metadata } from "next";
import Link from "next/link";

import { FITNESS_LONG_FORM_AUTHORITY } from "@/lib/long-form-authority";

const surface = FITNESS_LONG_FORM_AUTHORITY;

export const metadata: Metadata = {
  title: "Hokage Chess - Fitness Long-Form Authority",
  description:
    "FWS-4 launch surface for Rob Bonavoglia Fitness: weekly YouTube long-form, bridge policy, and first three scripted episodes.",
};

export default function FitnessLongFormAuthorityPage() {
  return (
    <main className="bg-hokage-dark text-hokage-light">
      <section className="relative overflow-hidden border-b border-hokage-red/20 bg-black px-6 py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-hokage-red">
              {surface.atom} - long-form authority
            </p>
            <h1 className="mt-5 font-heading text-[clamp(42px,7vw,88px)] font-bold uppercase leading-[0.98] text-white">
              Rob Bonavoglia Fitness
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-hokage-light/70">
              {surface.thesis}
            </p>
          </div>

          <div className="grid gap-3 border-l border-hokage-red/30 pl-6 font-mono text-xs uppercase tracking-[0.18em] text-hokage-light/55">
            <div>
              <p className="text-hokage-red">Chosen surface</p>
              <p className="mt-1 text-white">{surface.chosenPlatform}</p>
            </div>
            <div>
              <p className="text-hokage-red">Cadence</p>
              <p className="mt-1 text-white">{surface.cadence}</p>
            </div>
            <div>
              <p className="text-hokage-red">Architecture</p>
              <p className="mt-1 text-white">Separate YouTube channels</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-hokage-red">
            Decision
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold uppercase leading-tight text-white">
            Separate channel. Shared discipline thesis.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-hokage-light/65">
            {surface.bridgePolicy}
          </p>
        </div>
        <div className="grid gap-4">
          {surface.why.map((reason) => (
            <div
              key={reason}
              className="rounded-sm border border-hokage-light/10 bg-hokage-gray/35 p-6"
            >
              <p className="text-[16px] leading-relaxed text-hokage-light/75">
                {reason}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-hokage-light/10 bg-hokage-charcoal px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-hokage-red">
              Episode format
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold uppercase leading-tight text-white">
              Weekly DITL training breakdown
            </h2>
            <p className="mt-5 text-base leading-relaxed text-hokage-light/65">
              {surface.aesthetic}
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {surface.episodeStructure.map((block) => (
              <div
                key={block.label}
                className="rounded-sm border border-hokage-red/20 bg-black/35 p-5"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-hokage-red">
                  {block.timebox}
                </p>
                <h3 className="mt-3 font-heading text-2xl font-bold uppercase text-white">
                  {block.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-hokage-light/65">
                  {block.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-hokage-red">
          First three episodes
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {surface.launchEpisodes.map((episode) => (
            <article
              key={episode.slug}
              className="flex flex-col rounded-sm border border-hokage-light/10 bg-hokage-gray/30 p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-hokage-red">
                Episode {episode.episode}
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold uppercase leading-tight text-white">
                {episode.title}
              </h2>
              <p className="mt-3 text-sm font-semibold text-hokage-gold">
                {episode.titleIdea}
              </p>
              <div className="mt-6 space-y-5 text-sm leading-relaxed text-hokage-light/68">
                <p>
                  <span className="font-mono uppercase tracking-[0.18em] text-hokage-red">
                    Hook
                  </span>
                  <br />
                  {episode.hook}
                </p>
                <p>
                  <span className="font-mono uppercase tracking-[0.18em] text-hokage-red">
                    Work
                  </span>
                  <br />
                  {episode.work}
                </p>
                <p>
                  <span className="font-mono uppercase tracking-[0.18em] text-hokage-red">
                    Bridge
                  </span>
                  <br />
                  {episode.bridge}
                </p>
              </div>
              <p className="mt-6 border-t border-hokage-light/10 pt-5 text-sm leading-relaxed text-white/75">
                {episode.cta}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-hokage-red/25 px-6 py-16 text-center">
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-hokage-light/70">
          The chess channel keeps the climb clean. The fitness channel earns its
          own authority. The bridge is the discipline that makes both believable.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={surface.primaryCta.href}
            className="inline-flex items-center justify-center rounded-sm bg-hokage-red px-7 py-4 font-heading text-sm uppercase tracking-wider text-white cta-glow"
          >
            {surface.primaryCta.label}
          </Link>
          <Link
            href="/bridge/progressive-overload-on-the-board"
            className="inline-flex items-center justify-center rounded-sm border border-hokage-light/15 px-7 py-4 font-heading text-sm uppercase tracking-wider text-white hover:border-hokage-red/50"
          >
            Read the Bridge Piece
          </Link>
          <Link
            href={surface.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-sm border border-hokage-light/15 px-7 py-4 font-heading text-sm uppercase tracking-wider text-white hover:border-hokage-red/50"
          >
            {surface.secondaryCta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
