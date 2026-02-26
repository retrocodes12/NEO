import Link from "next/link";

import { NeonOrb } from "@/components/shared/neon-orb";

const stats = [
  { label: "Days", value: "5" },
  { label: "Speakers", value: "40" },
  { label: "Tracks", value: "8" },
  { label: "Sponsors", value: "25" },
];

export default function MarketingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-10 md:px-10">
      <div className="pointer-events-none absolute -left-28 top-8 h-72 w-72 orb opacity-90" />
      <div className="pointer-events-none absolute -right-28 top-28 h-80 w-80 orb opacity-70" />
      <div className="pointer-events-none absolute inset-0 hex-overlay" />

      <div className="relative mx-auto max-w-6xl space-y-8">
        <header className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/35 px-5 py-4 backdrop-blur-xl">
          <p className="font-heading text-2xl font-semibold neon-text">Alvent</p>
          <nav className="hidden gap-5 text-sm text-muted-foreground md:flex">
            <span>Home</span>
            <span>Speakers</span>
            <span>Schedule</span>
            <span>Tickets</span>
          </nav>
          <Link href="/dashboard" className="neon-ring rounded-lg bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground">
            Buy Tickets
          </Link>
        </header>

        <section className="glass panel-grid relative overflow-hidden rounded-3xl p-7 md:p-10">
          <p className="text-sm uppercase tracking-[0.24em] text-accent">AI Event, Conference and Meetup Website Template</p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold neon-text md:text-6xl">AI Summit 2026</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            A futuristic launchpad for AI conferences with ticketing, session tracks, and sponsor-ready layouts.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/dashboard" className="neon-ring rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              Get Tickets
            </Link>
            <Link href="/p/ai-summit-2026" className="rounded-xl border border-border bg-card/60 px-5 py-3 text-sm font-semibold">
              View Schedule
            </Link>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {stats.map((item) => (
              <article key={item.label} className="rounded-xl border border-border/70 bg-background/30 px-4 py-3 backdrop-blur-lg">
                <p className="text-2xl font-semibold">{item.value}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <article className="glass rounded-3xl p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">About Event</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold">A Global Gathering of AI Innovators</h2>
            <p className="mt-4 text-muted-foreground">
              Join founders, engineers, and researchers to explore real-world AI systems, safety, product strategy, and enterprise deployment.
            </p>
          </article>
          <div className="glass relative flex items-center justify-center rounded-3xl p-7">
            <NeonOrb className="orb-shell h-56 w-56" />
          </div>
        </section>
      </div>
    </main>
  );
}
