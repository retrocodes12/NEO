import Link from "next/link";

import { NeonOrb } from "@/components/shared/neon-orb";

const checklist = ["AI-generated copy", "Instant publish", "Custom domains", "SEO optimized"];

const steps = [
  {
    id: "01",
    title: "Describe Your Business",
    description: "Tell ElevateWeb what you do, who you serve, and the style you want in a single prompt.",
  },
  {
    id: "02",
    title: "Refine With Visual Editor",
    description: "Adjust sections, rewrite copy, swap visuals, and tune layout blocks without touching code.",
  },
  {
    id: "03",
    title: "Publish And Connect Domain",
    description: "Ship instantly on a hosted URL, then attach your custom domain when you are ready to go live.",
  },
];

const pricing = [
  {
    tier: "Starter",
    price: "$0",
    summary: "For first launch and experiments.",
    points: ["1 website", "AI generation credits", "ElevateWeb subdomain"],
    cta: "Start Free",
  },
  {
    tier: "Pro",
    price: "$29",
    summary: "For creators and small businesses.",
    points: ["10 websites", "Custom domains", "SEO settings + analytics"],
    cta: "Choose Pro",
  },
  {
    tier: "Agency",
    price: "$99",
    summary: "For teams managing multiple clients.",
    points: ["Unlimited websites", "Client workspaces", "Priority support"],
    cta: "Contact Sales",
  },
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

          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {checklist.map((item) => (
              <div key={item} className="rounded-xl border border-border/70 bg-background/30 px-4 py-3 backdrop-blur-lg">
                <p className="text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <article className="glass rounded-3xl p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Business Input</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold">Tell us what you do</h2>
            <p className="mt-3 text-sm text-muted-foreground">Example prompt</p>
            <div className="mt-3 rounded-2xl border border-border/70 bg-background/30 p-4 text-sm leading-7 text-muted-foreground">
              Build a modern website for a local dental clinic in Austin. Tone should be trustworthy and friendly. Include home,
              services, pricing, testimonials, and booking CTA. Optimize for local SEO.
            </div>
            <div className="mt-4 rounded-xl border border-border/70 bg-background/40 px-4 py-3 text-sm text-muted-foreground">
              AI Model: ElevateWeb Composer v1
            </div>
          </article>

          <article className="glass rounded-3xl p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Generated Preview</p>
            <div className="mt-3 rounded-2xl border border-border/70 bg-background/35 p-4">
              <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/35 px-3 py-2 text-xs text-muted-foreground">
                <span>www.brightsmileclinic.com</span>
                <span>Published Draft</span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-border/60 bg-background/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">Hero</p>
                  <p className="mt-2 font-heading text-2xl">Care You Can Trust, Smiles You Will Love</p>
                  <p className="mt-2 text-sm text-muted-foreground">Family and cosmetic dentistry with same-day appointments.</p>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-border/60 bg-background/30 p-3 text-sm">Teeth Whitening</div>
                  <div className="rounded-xl border border-border/60 bg-background/30 p-3 text-sm">Dental Implants</div>
                  <div className="rounded-xl border border-border/60 bg-background/30 p-3 text-sm">Emergency Care</div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/30 p-3">
                  <p className="text-sm text-muted-foreground">Ready to launch</p>
                  <button className="neon-ring rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">Publish</button>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">How ElevateWeb Works</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold">From idea to live website in 3 steps</h2>
            </div>
            <NeonOrb className="orb-shell hidden h-28 w-28 md:block" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.id} className="glass rounded-2xl p-6">
                <p className="text-sm font-semibold text-accent">{step.id}</p>
                <h3 className="mt-2 font-heading text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Pricing Preview</p>
            <h2 className="mt-2 font-heading text-3xl font-semibold">Plans that scale with your growth</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {pricing.map((plan) => (
              <article key={plan.tier} className="glass rounded-2xl p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-accent">{plan.tier}</p>
                <p className="mt-2 font-heading text-4xl font-semibold">{plan.price}</p>
                <p className="text-xs text-muted-foreground">/month</p>
                <p className="mt-3 text-sm text-muted-foreground">{plan.summary}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {plan.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <button className="mt-6 w-full rounded-xl border border-border bg-background/40 px-4 py-2 text-sm font-semibold">
                  {plan.cta}
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
