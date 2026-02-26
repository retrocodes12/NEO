import Link from "next/link";

const checklist = ["AI-generated copy", "Instant publish", "Custom domains", "SEO optimized"];

export default function MarketingPage() {
  return (
    <>
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
          <Link href="/product" className="rounded-xl border border-border bg-card/60 px-5 py-3 text-sm font-semibold">
            Explore Product
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {checklist.map((item) => (
            <div key={item} className="rounded-xl border border-border/70 bg-background/30 px-4 py-3 backdrop-blur-lg">
              <p className="text-sm font-medium">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link href="/product" className="glass rounded-2xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Product Preview</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold">Input To Website Mock</h2>
          <p className="mt-3 text-sm text-muted-foreground">See how business prompts become polished websites instantly.</p>
        </Link>

        <Link href="/how-it-works" className="glass rounded-2xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">How It Works</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold">3-Step Workflow</h2>
          <p className="mt-3 text-sm text-muted-foreground">Prompt, refine, and publish with a fast visual editing loop.</p>
        </Link>

        <Link href="/pricing" className="glass rounded-2xl p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Pricing</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold">Plans For Every Team</h2>
          <p className="mt-3 text-sm text-muted-foreground">Compare Starter, Pro, and Agency plans on a dedicated page.</p>
        </Link>
      </section>
    </>
  );
}
