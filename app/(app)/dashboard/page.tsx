import Link from "next/link";

import { requireUser } from "@/lib/auth";
import { listSitesByUser, type Site } from "@/lib/db/sites";

export default async function DashboardPage() {
  const user = await requireUser();

  let sites: Site[] = [];
  let errorMessage: string | null = null;

  try {
    sites = await listSitesByUser(user.id);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Failed to load sites.";
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Workspace</p>
          <h1 className="mt-2 font-heading text-4xl font-semibold">ElevateWeb Dashboard</h1>
        </div>
        <Link href="/dashboard/new" className="rounded-lg border px-4 py-2 text-sm font-semibold">
          Create New Site
        </Link>
      </div>

      <article className="rounded-2xl border bg-card/40 p-6">
        {errorMessage ? (
          <p className="text-sm text-red-400">{errorMessage}</p>
        ) : sites.length === 0 ? (
          <p className="text-sm text-muted-foreground">No sites yet. Create your first site.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 text-muted-foreground">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Slug</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Updated</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sites.map((site) => (
                  <tr key={site.id} className="border-b border-border/40">
                    <td className="py-3 pr-4">{site.name}</td>
                    <td className="py-3 pr-4">/{site.slug}</td>
                    <td className="py-3 pr-4">{site.status}</td>
                    <td className="py-3 pr-4">{new Date(site.updated_at).toLocaleString()}</td>
                    <td className="py-3">
                      <div className="flex gap-3">
                        <Link href={`/editor/${site.id}`} className="underline">
                          Edit
                        </Link>
                        {site.status === "published" ? (
                          <Link href={`/p/${site.slug}`} className="underline">
                            View
                          </Link>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </section>
  );
}
