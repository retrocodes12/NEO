"use client";

import { useState } from "react";

import type { Site } from "@/lib/db/sites";

interface EditorClientProps {
  site: Site;
}

export function EditorClient({ site }: EditorClientProps) {
  const [sections, setSections] = useState(site.content_json.sections ?? []);
  const [status, setStatus] = useState(site.status);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/sites/${site.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentJson: { sections } }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to save");
      }

      setMessage("Saved");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function publish() {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/sites/${site.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "publish" }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to publish");
      }

      setStatus("published");
      setMessage("Published");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Publish failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Editor</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold">{site.name}</h1>
          <p className="text-sm text-muted-foreground">Status: {status}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={save} disabled={saving} className="rounded-md border px-4 py-2 text-sm font-semibold disabled:opacity-60">
            Save
          </button>
          <button onClick={publish} disabled={saving || status === "published"} className="rounded-md border px-4 py-2 text-sm font-semibold disabled:opacity-60">
            Publish
          </button>
        </div>
      </div>

      <article className="space-y-4 rounded-2xl border bg-card/40 p-6">
        {sections.map((section, index) => (
          <div key={section.id} className="space-y-2 rounded-xl border border-border/60 bg-background/30 p-4">
            <label className="block text-sm">
              Section Title
              <input
                className="mt-1 w-full rounded-md border bg-background/30 px-3 py-2"
                value={section.title}
                onChange={(event) => {
                  const next = [...sections];
                  next[index] = { ...next[index], title: event.target.value };
                  setSections(next);
                }}
              />
            </label>
            <label className="block text-sm">
              Section Text
              <textarea
                rows={4}
                className="mt-1 w-full rounded-md border bg-background/30 px-3 py-2"
                value={section.text}
                onChange={(event) => {
                  const next = [...sections];
                  next[index] = { ...next[index], text: event.target.value };
                  setSections(next);
                }}
              />
            </label>
          </div>
        ))}
      </article>

      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </section>
  );
}
