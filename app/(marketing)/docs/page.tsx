import Link from "next/link";

export default function DocsPage() {
  return (
    <section className="glass rounded-3xl p-7 md:p-10">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">Docs</p>
      <h1 className="mt-3 font-heading text-3xl font-semibold">Developer Documentation</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        API docs, deployment guides, and integration references can live here as you productize ElevateWeb.
      </p>
      <Link href="/dashboard" className="mt-6 inline-block rounded-xl border border-border bg-background/40 px-5 py-3 text-sm font-semibold">
        Open Dashboard
      </Link>
    </section>
  );
}
