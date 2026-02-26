"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface SiteContent {
  sections: Array<{ id: string; title: string; text: string }>;
}

export function CreateSiteForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    industry: "",
    tone: "",
    location: "",
    goal: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const generateRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const generateJson = (await generateRes.json()) as { content?: SiteContent; error?: string };

      if (!generateRes.ok || !generateJson.content) {
        throw new Error(generateJson.error ?? "Failed to generate site content");
      }

      const createRes = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, contentJson: generateJson.content }),
      });

      const createJson = (await createRes.json()) as { site?: { id: string }; error?: string };

      if (!createRes.ok || !createJson.site) {
        throw new Error(createJson.error ?? "Failed to create site");
      }

      router.push(`/editor/${createJson.site.id}`);
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border bg-card/40 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">
          Name
          <input
            required
            className="mt-1 w-full rounded-md border bg-background/30 px-3 py-2"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
        </label>
        <label className="text-sm">
          Industry
          <input
            required
            className="mt-1 w-full rounded-md border bg-background/30 px-3 py-2"
            value={form.industry}
            onChange={(event) => setForm((prev) => ({ ...prev, industry: event.target.value }))}
          />
        </label>
        <label className="text-sm">
          Tone
          <input
            required
            className="mt-1 w-full rounded-md border bg-background/30 px-3 py-2"
            value={form.tone}
            onChange={(event) => setForm((prev) => ({ ...prev, tone: event.target.value }))}
          />
        </label>
        <label className="text-sm">
          Location
          <input
            required
            className="mt-1 w-full rounded-md border bg-background/30 px-3 py-2"
            value={form.location}
            onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
          />
        </label>
      </div>

      <label className="block text-sm">
        Goal
        <textarea
          required
          className="mt-1 w-full rounded-md border bg-background/30 px-3 py-2"
          rows={4}
          value={form.goal}
          onChange={(event) => setForm((prev) => ({ ...prev, goal: event.target.value }))}
        />
      </label>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <button disabled={loading} className="rounded-md border px-4 py-2 text-sm font-semibold disabled:opacity-70">
        {loading ? "Generating..." : "Generate and Create"}
      </button>
    </form>
  );
}
