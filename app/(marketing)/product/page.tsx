export default function ProductPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <article className="glass rounded-3xl p-7">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Business Input</p>
        <h1 className="mt-3 font-heading text-3xl font-semibold">Tell us what you do</h1>
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
  );
}
