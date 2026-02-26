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

export default function PricingPage() {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Pricing Preview</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold">Plans that scale with your growth</h1>
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
            <button className="mt-6 w-full rounded-xl border border-border bg-background/40 px-4 py-2 text-sm font-semibold">{plan.cta}</button>
          </article>
        ))}
      </div>
    </section>
  );
}
