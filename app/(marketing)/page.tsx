import Link from "next/link";

import { NeonOrb } from "@/components/shared/neon-orb";

const stats = [
  { label: "Websites Generated", value: "0" },
  { label: "Avg. Time To First Draft", value: "0" },
  { label: "Templates + Blocks", value: "0" },
  { label: "Monthly Visitors Hosted", value: "0" },
];

export default function MarketingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-10 md:px-10">
      <div className="pointer-events-none absolute -left-28 top-8 h-72 w-72 orb opacity-90" />
      <div className="pointer-events-none absolute -right-28 top-28 h-80 w-80 orb opacity-70" />
      <div className="pointer-events-none absolute inset-0 hex-overlay" />

      <div className="relative mx-auto max-w-6xl space-y-8">
        <header className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/35 px-5 py-4 backdrop-blur-xl">
          <p className="font-heading text-2xl font-semibold neon-text">ElevateWeb</p>
          <nav className="hidden gap-5 text-sm text-muted-foreground md:flex">
            <span>Product</span>
            <span>How It Works</span>
            <span>Pricing</span>
            <span>Docs</span>
          </nav>
          <Link href="/dashboard" className="neon-ring rounded-lg bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground">
            Start Building
          </Link>
        </header>

        <section className="glass panel-grid relative overflow-hidden rounded-3xl p-7 md:p-10">
          <p className="text-sm uppercase tracking-[0.24em] text-accent">AI Website Builder SaaS</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold neon-text md:text-6xl">
            Describe your business.
            <br />
            ElevateWeb builds your website in seconds.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Turn a plain-language prompt into a complete, production-ready site with pages, copy, visuals, and conversion sections.
            Edit with a visual builder, publish instantly, and connect custom domains on paid plans.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/dashboard" className="neon-ring rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              Generate My Site
            </Link>
            <Link href="/p/demo-business-site" className="rounded-xl border border-border bg-card/60 px-5 py-3 text-sm font-semibold">
              View Sample Output
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
            <p className="text-xs uppercase tracking-[0.2em] text-accent">How ElevateWeb Works</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold">Prompt. Refine. Publish. Grow.</h2>
            <p className="mt-4 text-muted-foreground">
              Built for small businesses, creators, and agencies that need launch speed without sacrificing quality. Generate first draft with AI,
              tune layout and content in the editor, then publish with one click.
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
