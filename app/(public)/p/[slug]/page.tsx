import { notFound } from "next/navigation";

import { getPublishedSiteBySlug } from "@/lib/db/sites";

interface PublicPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublishedPage({ params }: PublicPageProps) {
  const { slug } = await params;

  const site = await getPublishedSiteBySlug(slug);

  if (!site) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <article className="space-y-8 rounded-2xl border bg-card/40 p-8">
        <header>
          <h1 className="font-heading text-4xl font-semibold">{site.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {site.industry} · {site.location}
          </p>
        </header>

        {site.content_json.sections.map((section) => (
          <section key={section.id} className="space-y-2">
            <h2 className="font-heading text-2xl font-semibold">{section.title}</h2>
            <p className="text-muted-foreground">{section.text}</p>
          </section>
        ))}
      </article>
    </main>
  );
}
