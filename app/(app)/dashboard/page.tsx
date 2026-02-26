const pipeline = [
  { label: "Drafts Generated", value: "0", detail: "AI outputs waiting for edits" },
  { label: "Sites Published", value: "0", detail: "Live sites connected to hosting" },
  { label: "Custom Domains", value: "0", detail: "Paid plans with domain mapping" },
];

const activity = [
  { title: "New prompt runs", value: "0" },
  { title: "Editor revisions", value: "0" },
  { title: "Publish actions", value: "0" },
];

export default function DashboardPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="glass rounded-3xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Workspace</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold">ElevateWeb Dashboard</h1>
        <p className="mt-3 text-muted-foreground">
          Monitor your AI website generation funnel from prompt to publish in one place.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {pipeline.map((item) => (
            <div key={item.label} className="rounded-xl border border-border/70 bg-background/30 p-4">
              <p className="text-2xl font-semibold">{item.value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
              <p className="mt-2 text-xs text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="glass rounded-3xl p-6 md:p-8">
        <h2 className="font-heading text-2xl font-semibold">Today Activity</h2>
        <div className="mt-5 space-y-3">
          {activity.map((item) => (
            <div key={item.title} className="rounded-xl border border-border/70 bg-background/30 p-4">
              <p className="font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">Count: {item.value}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
