"use client";

import { useEffect, useState } from "react";

/* ─── SVG Icons (inline to avoid dependencies) ─── */

function ChessKnight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 22H5v-2h14v2M13 2c-1.25 0-2.42.62-3.11 1.66L7 8l2 2 2.06-2.06C11.28 8.54 12 9.46 12 10.5V17h2V10.5c0-.63-.07-1.24-.2-1.83L17 6l-2-2-1.28 1.28C13.79 4.06 14 3.06 14 2h-1Z" />
    </svg>
  );
}

function Clock({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function Lightning({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function Flame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 23c-3.87 0-7-3.13-7-7 0-2.38 1.19-4.47 3-5.74V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v6.26c1.81 1.27 3 3.36 3 5.74 0 3.87-3.13 7-7 7zm-1-9.87c-1.83.97-3 2.88-3 5.04C8 20.31 9.69 22 12 22s4-1.69 4-3.83c0-2.16-1.17-4.07-3-5.04V4h-2v9.13z" />
    </svg>
  );
}

function Mountain({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z" />
    </svg>
  );
}

function Mail({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22,4 12,13 2,4" />
    </svg>
  );
}

function YouTube({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.87.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

function Discord({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51.07.07 0 0 0-.08.04c-.21.38-.45.87-.61 1.26a18.27 18.27 0 0 0-5.4 0 12.64 12.64 0 0 0-.62-1.26.08.08 0 0 0-.08-.04 19.74 19.74 0 0 0-4.93 1.51.07.07 0 0 0-.03.03C1.07 8.93.32 13.35.79 17.72a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.3 1.22-2a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1 0-.13c.13-.09.25-.19.37-.29a.08.08 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.07 0a.08.08 0 0 1 .08.01c.12.1.25.2.37.29a.08.08 0 0 1 0 .13c-.6.35-1.22.65-1.87.9a.08.08 0 0 0-.04.1c.36.7.77 1.37 1.22 2a.08.08 0 0 0 .08.03 19.84 19.84 0 0 0 6-3.03.08.08 0 0 0 .04-.05c.56-5.06-.87-9.44-3.65-13.32a.06.06 0 0 0-.04-.03zM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42z" />
    </svg>
  );
}

/* ─── Ascent Meter Component ─── */

function AscentMeter() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(pct, 100));
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div className="ascent-meter" style={{ height: `${progress}%` }} />;
}

/* ─── Section Components ─── */

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-hokage-dark via-hokage-charcoal to-hokage-dark" />

      {/* Subtle mountain silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-10">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
          <path
            fill="#C41E3A"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Trust bar */}
        <div className="flex items-center justify-center gap-4 mb-8 text-sm font-mono text-hokage-red/80 tracking-wider uppercase">
          <span>322 Videos</span>
          <span className="w-1 h-1 rounded-full bg-hokage-red" />
          <span>Road to 1500</span>
          <span className="w-1 h-1 rounded-full bg-hokage-red" />
          <span>NYC</span>
        </div>

        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-none mb-6">
          <span className="text-white">You&apos;re Not a</span>
          <br />
          <span className="text-white">Beginner Anymore.</span>
          <br />
          <span className="text-hokage-red">You&apos;re Not a</span>
          <br />
          <span className="text-hokage-red">Master Yet.</span>
        </h1>

        <p className="text-lg sm:text-xl text-hokage-light/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Hokage Chess is the road from low-advanced to grandmaster — told from
          inside the climb, not from the summit. No titles. No shortcuts. Just
          the grind, the breakthroughs, and a community ascending together.
        </p>

        <a
          href="#offer"
          className="inline-flex items-center gap-3 bg-hokage-red text-white font-heading text-lg uppercase tracking-wider px-10 py-4 rounded-sm cta-glow"
        >
          <Mountain className="w-5 h-5" />
          Join the Climb
        </a>

        {/* Current ELO badge */}
        <div className="mt-12 inline-flex items-center gap-3 bg-hokage-gray/60 border border-hokage-red/30 rounded-sm px-5 py-3">
          <div className="w-3 h-3 rounded-full bg-hokage-red pulse-dot" />
          <span className="font-mono text-sm text-hokage-light/60">Current ELO</span>
          <span className="font-mono text-2xl font-bold text-hokage-red">1350</span>
          <span className="font-mono text-xs text-hokage-light/40">Updated Apr 2026</span>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-hokage-charcoal">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-12 text-center">
          You Know Enough to Know
          <br />
          <span className="text-hokage-red">You Don&apos;t Know Enough.</span>
        </h2>

        <div className="space-y-8 text-lg text-hokage-light/70 leading-relaxed">
          <div className="flex gap-4">
            <div className="shrink-0 w-1 bg-hokage-red/40 rounded-full" />
            <p>
              You&apos;ve moved past the one-move blunders. You know basic
              openings. You can spot a fork sometimes. But your rating
              won&apos;t move. You beat 1100s and lose to 1400s and you
              can&apos;t figure out what changed between the two games.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 w-1 bg-hokage-red/60 rounded-full" />
            <p>
              Every chess course is taught by a titled player looking{" "}
              <span className="text-white font-semibold">down</span> at you.
              They say &ldquo;just improve your calculation&rdquo; like telling
              someone who&apos;s drowning to &ldquo;just swim better.&rdquo;
              They forgot what it&apos;s like to be{" "}
              <span className="text-hokage-red font-semibold">here</span>.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="shrink-0 w-1 bg-hokage-red rounded-full" />
            <p>
              You&apos;re grinding alone. Your friends don&apos;t play chess.
              The subreddit tells you to &ldquo;just do puzzles.&rdquo;
              You&apos;re stuck between casual and serious, and{" "}
              <span className="text-white font-semibold">
                nobody is speaking to your level
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function IdentitySection() {
  return (
    <section className="relative py-24 sm:py-32 bg-hokage-dark">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Identity statement */}
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6 leading-tight">
              I&apos;m Rob.
              <br />
              I&apos;m <span className="text-hokage-red font-mono">1350</span>.
              <br />
              And I&apos;m Going
              <br />
              to Be a Grandmaster.
            </h2>

            <p className="text-lg text-hokage-light/70 leading-relaxed mb-8">
              Most chess teachers introduce themselves with their title. I
              introduce myself with my rating — because that&apos;s where the
              story is. I&apos;m a chess player in New York City. I&apos;ve
              published 322 videos documenting every breakthrough, every
              plateau, every humbling loss on the road from casual player to
              wherever this ends.
            </p>

            <p className="text-lg text-hokage-light/70 leading-relaxed">
              <span className="text-hokage-red font-semibold">Hokage</span>{" "}
              means village leader — but you don&apos;t get the title by being
              born with it. You earn it by refusing to quit when everyone says
              you can&apos;t. That&apos;s the energy. That&apos;s the brand.
              That&apos;s the invite.
            </p>
          </div>

          {/* Right: Differentiator callouts */}
          <div className="space-y-6">
            {[
              {
                icon: <ChessKnight className="w-6 h-6" />,
                text: "Not a master teaching down. A player climbing up.",
              },
              {
                icon: <Flame className="w-6 h-6" />,
                text: "322 videos of documented growth. Every win. Every loss.",
              },
              {
                icon: <Mountain className="w-6 h-6" />,
                text: "NYC chess culture. Anime energy. Zero pretension.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-hokage-gray/50 border border-hokage-red/20 rounded-sm p-5"
              >
                <div className="shrink-0 text-hokage-red">{item.icon}</div>
                <p className="text-white font-medium text-lg">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ThreeRoadsSection() {
  const roads = [
    {
      name: "Classical",
      subtitle: "The Forge",
      icon: <Flame className="w-10 h-10" />,
      description:
        "Where you build deep understanding. Long thinks. Real plans. The foundation everything else rests on.",
      color: "from-hokage-crimson/30 to-hokage-crimson/5",
      borderColor: "border-hokage-crimson/40",
    },
    {
      name: "Rapid",
      subtitle: "The Arena",
      icon: <Clock className="w-10 h-10" />,
      description:
        "Where theory meets time pressure. 10-15 minute games that force you to apply what you learned in classical.",
      color: "from-hokage-red/30 to-hokage-red/5",
      borderColor: "border-hokage-red/40",
    },
    {
      name: "Blitz / Bullet",
      subtitle: "The Battlefield",
      icon: <Lightning className="w-10 h-10" />,
      description:
        "Pattern recognition at speed. Instinct chess. Where your preparation meets chaos.",
      color: "from-hokage-gold/20 to-hokage-gold/5",
      borderColor: "border-hokage-gold/30",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-hokage-charcoal">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4 text-center">
          Master One Clock.{" "}
          <span className="text-hokage-red">Then the Next.</span>
        </h2>
        <p className="text-lg text-hokage-light/60 text-center max-w-2xl mx-auto mb-16">
          A 1400 in rapid and a 1400 in blitz are playing different games. We
          organize improvement the way games actually work — by the clock on
          your table.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {roads.map((road) => (
            <div
              key={road.name}
              className={`relative bg-gradient-to-b ${road.color} border ${road.borderColor} rounded-sm p-8 text-center group hover:scale-[1.02] transition-transform duration-300`}
            >
              <div className="text-hokage-red mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {road.icon}
              </div>
              <h3 className="font-heading text-2xl font-bold uppercase text-white mb-1">
                {road.name}
              </h3>
              <p className="font-mono text-sm text-hokage-red/80 mb-4 uppercase tracking-wider">
                {road.subtitle}
              </p>
              <p className="text-hokage-light/70 leading-relaxed">
                {road.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProofSection() {
  const testimonials = [
    {
      text: "Bro your content is literally what I needed. Finally someone at my level explaining things in a way that makes sense.",
      author: "YouTube comment",
    },
    {
      text: "Just hit 1200 watching your Road to 1500 series. The way you break down your own mistakes is way more helpful than GM analysis.",
      author: "YouTube comment",
    },
    {
      text: "This channel is underrated. Real games, real struggles, real improvement. Keep climbing man 🔥",
      author: "YouTube comment",
    },
    {
      text: "I love that you show the losses too. Most chess YouTubers only show their wins. This is way more relatable.",
      author: "YouTube comment",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-hokage-dark">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-16 text-center">
          From <span className="text-hokage-red">the Village</span>
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card bg-hokage-gray/50 border border-hokage-red/15 rounded-sm p-6"
            >
              <p className="text-hokage-light/80 text-lg leading-relaxed mb-4 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-sm font-mono text-hokage-red/60">
                — {t.author}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-8 mt-12 text-sm font-mono text-hokage-light/40">
          <div className="text-center">
            <span className="block text-2xl font-bold text-hokage-red">99+</span>
            subscribers climbing
          </div>
          <div className="w-px h-10 bg-hokage-light/10" />
          <div className="text-center">
            <span className="block text-2xl font-bold text-hokage-red">322</span>
            documented games
          </div>
          <div className="w-px h-10 bg-hokage-light/10" />
          <div className="text-center">
            <span className="block text-2xl font-bold text-hokage-red">35+</span>
            episodes & counting
          </div>
        </div>
      </div>
    </section>
  );
}

function OfferSection() {
  return (
    <section id="offer" className="relative py-24 sm:py-32 bg-hokage-charcoal">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4 text-center">
          Start Climbing <span className="text-hokage-red">Today</span>
        </h2>
        <p className="text-lg text-hokage-light/60 text-center max-w-xl mx-auto mb-16">
          Three paths into the Village. All free. Pick the one that fits.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Lead Magnet CTA */}
          <div className="bg-gradient-to-b from-hokage-red/20 to-hokage-red/5 border border-hokage-red/40 rounded-sm p-8 text-center flex flex-col">
            <Mail className="w-10 h-10 text-hokage-red mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold uppercase text-white mb-2">
              Hokage Scroll
            </h3>
            <p className="text-hokage-light/60 text-sm mb-6 flex-1">
              The weekly Sunday Quest Log: training-arc recap, featured game,
              community shout-outs, and the jutsu of the week. Starts with the
              1300 Escape Plan.
            </p>
            <a
              href="#email-capture"
              className="inline-flex items-center justify-center gap-2 bg-hokage-red text-white font-heading text-sm uppercase tracking-wider px-6 py-3 rounded-sm cta-glow w-full"
            >
              <Mail className="w-4 h-4" />
              Join the Scroll
            </a>
          </div>

          {/* YouTube CTA */}
          <div className="bg-gradient-to-b from-hokage-gray/60 to-hokage-gray/20 border border-hokage-light/10 rounded-sm p-8 text-center flex flex-col">
            <YouTube className="w-10 h-10 text-hokage-red mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold uppercase text-white mb-2">
              The Chunin Exams
            </h3>
            <p className="text-hokage-light/60 text-sm mb-6 flex-1">
              Watch the full Road to 1500 journey — every game, every blunder,
              every breakthrough. Start from Episode 1 or jump in anywhere.
            </p>
            <a
              href="https://www.youtube.com/@HokageChess"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-hokage-gray border border-hokage-light/20 text-white font-heading text-sm uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-hokage-light/10 transition-colors w-full"
            >
              <YouTube className="w-4 h-4" />
              Start Episode 1
            </a>
          </div>

          {/* Discord CTA */}
          <div className="bg-gradient-to-b from-hokage-gray/60 to-hokage-gray/20 border border-hokage-light/10 rounded-sm p-8 text-center flex flex-col">
            <Discord className="w-10 h-10 text-hokage-red mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold uppercase text-white mb-2">
              The Village
            </h3>
            <p className="text-hokage-light/60 text-sm mb-6 flex-1">
              Join fellow climbers in the Discord. Share games, ask questions,
              find training partners, and hold each other accountable.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-hokage-gray border border-hokage-light/20 text-white font-heading text-sm uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-hokage-light/10 transition-colors w-full"
            >
              <Discord className="w-4 h-4" />
              Enter the Village
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyMapSection() {
  const milestones = [
    { elo: "1000", label: "The Beginning", passed: true },
    { elo: "1200", label: "Escaped the Basics", passed: true },
    { elo: "1350", label: "YOU ARE HERE", current: true },
    { elo: "1500", label: "The Chunin Exams — Season 1", passed: false },
    { elo: "1800", label: "The Intermediate Wall", passed: false },
    { elo: "2000", label: "Candidate Master Territory", passed: false },
    { elo: "2200", label: "National Master", passed: false },
    { elo: "2500+", label: "Grandmaster — Hokage", passed: false },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-hokage-dark">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4 text-center">
          Where We&apos;re <span className="text-hokage-red">Going</span>
        </h2>
        <p className="text-lg text-hokage-light/60 text-center max-w-xl mx-auto mb-16">
          This isn&apos;t a finished product. It&apos;s a documented journey.
          Every milestone unlocks new content — and you&apos;ll have been here
          since the beginning.
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-hokage-light/20 via-hokage-red to-hokage-red/20" />

          <div className="space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className="relative flex items-center gap-6 pl-12">
                {/* Dot */}
                <div
                  className={`absolute left-4 w-5 h-5 rounded-full border-2 ${
                    m.current
                      ? "bg-hokage-red border-hokage-red pulse-dot"
                      : m.passed
                        ? "bg-hokage-light/30 border-hokage-light/30"
                        : "bg-hokage-gray border-hokage-light/10"
                  }`}
                />

                {/* Content */}
                <div
                  className={`flex-1 flex items-center justify-between py-3 px-5 rounded-sm ${
                    m.current
                      ? "bg-hokage-red/15 border border-hokage-red/40"
                      : m.passed
                        ? "opacity-50"
                        : "opacity-60"
                  }`}
                >
                  <div>
                    <span
                      className={`font-mono text-xl font-bold ${
                        m.current ? "text-hokage-red" : "text-white"
                      }`}
                    >
                      {m.elo}
                    </span>
                    <span className="text-hokage-light/60 text-sm ml-3">
                      {m.label}
                    </span>
                  </div>
                  {m.passed && (
                    <span className="text-hokage-light/30 text-sm">✓</span>
                  )}
                  {m.current && (
                    <span className="font-mono text-xs text-hokage-red uppercase tracking-wider">
                      Live
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Why would I learn from someone who's only 1350?",
      a: "Because I'm solving the same problems you are, RIGHT NOW. I'm not remembering what it was like to be 1300 from the comfort of 2400. I'm documenting each breakthrough as it happens — the techniques, the mindset shifts, the specific moments where rating jumps occur. You're not learning from a teacher. You're climbing with a guide who's one pitch ahead of you on the same wall.",
    },
    {
      q: "What makes this different from GothamChess or ChessVibes?",
      a: "Levy and Nelson are brilliant — I watch their content too. But they're 2000+ players explaining concepts they mastered years ago. Hokage Chess is a STORY — a real-time documentary of what it takes to climb, with a community climbing together. Different purpose entirely.",
    },
    {
      q: "Is there a paid course?",
      a: "Not yet. Right now everything is free — YouTube content, Discord community, and the resources on this site. When paid products come, the community shapes what they are. Join Hokage Scroll to be part of that process.",
    },
    {
      q: "What's with the Naruto stuff?",
      a: "Hokage means village leader — someone who earns the title through grit, not birthright. Chess is the same. Nobody is born a grandmaster. The anime reference is intentional: this brand is for people who think chess should feel more like a shonen arc than a lecture hall.",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-hokage-charcoal">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-16 text-center">
          Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-hokage-gray/30 border border-hokage-light/10 rounded-sm">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-white font-medium text-lg list-none">
                {faq.q}
                <span className="shrink-0 ml-4 text-hokage-red text-2xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-hokage-light/70 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; reason: string };

function FinalCTASection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reason?: string;
        detail?: string;
      };
      if (res.ok && data.ok) {
        setState({ kind: "success" });
        setEmail("");
        return;
      }
      const reason =
        data.reason === "config_incomplete"
          ? "Email signup is launching soon — check back shortly."
          : data.reason === "invalid_email"
            ? "That email looks off — double-check?"
            : "Couldn't subscribe right now. Try again in a minute.";
      setState({ kind: "error", reason });
    } catch {
      setState({
        kind: "error",
        reason: "Network hiccup — try again in a minute.",
      });
    }
  }

  return (
    <section
      id="email-capture"
      className="relative py-24 sm:py-32 bg-hokage-dark"
    >
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6">
          Every Grandmaster
          <br />
          Started at{" "}
          <span className="font-mono text-hokage-red">0</span>.
          <br />
          <span className="text-hokage-red">Read the Scroll.</span>
        </h2>

        <p className="text-lg text-hokage-light/60 mb-10">
          Get &ldquo;The 1300 Escape Plan&rdquo; free, then one Hokage Scroll
          every Sunday: recap, featured game, village shout-outs, and jutsu of
          the week.
        </p>

        {state.kind === "success" ? (
          <div
            role="status"
            className="max-w-md mx-auto bg-hokage-red/15 border border-hokage-red/40 rounded-sm px-6 py-5 text-white"
          >
            <p className="font-heading text-lg uppercase tracking-wider">
              You&apos;re on the Hokage Scroll.
            </p>
            <p className="text-sm text-hokage-light/70 mt-2">
              Check your inbox — &ldquo;The 1300 Escape Plan&rdquo; and the next
              Sunday Quest Log are on their way.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            aria-busy={state.kind === "submitting"}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              disabled={state.kind === "submitting"}
              className="flex-1 bg-hokage-gray border border-hokage-light/20 text-white px-5 py-4 rounded-sm font-mono text-sm placeholder:text-hokage-light/30 focus:outline-none focus:border-hokage-red/60 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={state.kind === "submitting"}
              className="bg-hokage-red text-white font-heading text-sm uppercase tracking-wider px-8 py-4 rounded-sm cta-glow shrink-0 disabled:opacity-60"
            >
              {state.kind === "submitting" ? "Joining…" : "Join the Scroll"}
            </button>
          </form>
        )}

        {state.kind === "error" && (
          <p
            role="alert"
            className="text-sm text-hokage-red/90 mt-4 max-w-md mx-auto"
          >
            {state.reason}
          </p>
        )}

        <p className="text-xs text-hokage-light/30 mt-4">
          Weekly. Chess-only by default. No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-hokage-dark border-t border-hokage-light/5 py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-hokage-light/30">
        <div className="flex items-center gap-2">
          <span className="font-heading text-lg uppercase text-hokage-red">
            Hokage Chess
          </span>
          <span className="text-hokage-light/20">|</span>
          <span>NYC</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://www.youtube.com/@HokageChess"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-hokage-red transition-colors"
            aria-label="YouTube"
          >
            <YouTube className="w-5 h-5" />
          </a>
          <a
            href="#email-capture"
            className="hover:text-hokage-red transition-colors"
            aria-label="Hokage Scroll newsletter"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="hover:text-hokage-red transition-colors"
            aria-label="Discord"
          >
            <Discord className="w-5 h-5" />
          </a>
        </div>

        <p>&copy; {new Date().getFullYear()} Hokage Chess</p>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */

export default function Home() {
  return (
    <>
      <AscentMeter />
      <HeroSection />
      <ProblemSection />
      <IdentitySection />
      <ThreeRoadsSection />
      <SocialProofSection />
      <OfferSection />
      <JourneyMapSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </>
  );
}
