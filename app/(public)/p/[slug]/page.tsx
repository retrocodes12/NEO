interface PublicPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublishedPage({ params }: PublicPageProps) {
  const { slug } = await params;

  return (
    <main className="relative mx-auto min-h-screen max-w-5xl px-6 py-12">
      <div className="pointer-events-none absolute right-0 top-14 h-56 w-56 orb opacity-65" />

      <article className="glass panel-grid relative rounded-3xl p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Published Site</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold neon-text md:text-6xl">{slug.replaceAll("-", " ")}</h1>
        <p className="mt-5 max-w-3xl text-muted-foreground md:text-lg">
          Public endpoint for an ElevateWeb-generated website. Connect your CMS data and deploy to your custom domain.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/70 bg-background/30 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Theme</p>
            <p className="mt-1 font-semibold">ElevateWeb Glass Dark</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-background/30 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Published Revisions</p>
            <p className="mt-1 font-semibold">0</p>
          </div>
        </div>
      </article>
    </main>
  );
}
