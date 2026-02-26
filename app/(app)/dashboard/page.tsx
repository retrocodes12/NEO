const sessions = [
  { time: "09:00", topic: "Opening Keynote", speaker: "Joshua Henry" },
  { time: "11:00", topic: "Agentic Systems", speaker: "Leila Zhang" },
  { time: "14:30", topic: "AI Ops at Scale", speaker: "Carlos Rivera" },
];

export default function DashboardPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="glass rounded-3xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Control Room</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold">Dashboard</h1>
        <p className="mt-3 text-muted-foreground">Track registrations, sessions, and sponsor performance from a single neon glass workspace.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border/70 bg-background/30 p-4">
            <p className="text-2xl font-semibold">1,248</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tickets Sold</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-background/30 p-4">
            <p className="text-2xl font-semibold">92%</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Seat Fill</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-background/30 p-4">
            <p className="text-2xl font-semibold">25</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Sponsors</p>
          </div>
        </div>
      </article>

      <article className="glass rounded-3xl p-6 md:p-8">
        <h2 className="font-heading text-2xl font-semibold">Today Sessions</h2>
        <div className="mt-5 space-y-3">
          {sessions.map((session) => (
            <div key={session.time} className="rounded-xl border border-border/70 bg-background/30 p-4">
              <p className="text-sm text-accent">{session.time}</p>
              <p className="mt-1 font-semibold">{session.topic}</p>
              <p className="text-sm text-muted-foreground">{session.speaker}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
