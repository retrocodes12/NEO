interface EditorPageProps {
  params: Promise<{ siteId: string }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { siteId } = await params;

  return (
    <section className="glass rounded-3xl p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">Site Builder</p>
      <h1 className="mt-2 font-heading text-4xl font-semibold">Editor</h1>
      <p className="mt-2 text-muted-foreground">
        Editing site <span className="font-semibold text-foreground">{siteId}</span>
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-[0.7fr_1.3fr]">
        <aside className="rounded-2xl border border-border/70 bg-background/30 p-4">
          <p className="text-sm font-semibold">Sections</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Hero</li>
            <li>Features</li>
            <li>Testimonials</li>
            <li>Call To Action</li>
          </ul>
        </aside>
        <article className="rounded-2xl border border-border/70 bg-background/30 p-4">
          <p className="text-sm font-semibold">Live Preview</p>
          <div className="mt-4 flex h-56 items-center justify-center rounded-xl border border-border/60 panel-grid text-muted-foreground">
            Canvas Preview
          </div>
        </article>
      </div>
    </section>
  );
}
