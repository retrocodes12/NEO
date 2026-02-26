import { NeonOrb } from "@/components/shared/neon-orb";

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

export default function HowItWorksPage() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">How ElevateWeb Works</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold">From idea to live website in 3 steps</h1>
        </div>
        <NeonOrb className="orb-shell hidden h-28 w-28 md:block" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <article key={step.id} className="glass rounded-2xl p-6">
            <p className="text-sm font-semibold text-accent">{step.id}</p>
            <h2 className="mt-2 font-heading text-xl font-semibold">{step.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
