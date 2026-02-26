import { auth } from "@clerk/nextjs/server";

import { CreateSiteForm } from "./site-form";

export default async function NewSitePage() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">New Site</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold">Create Site With AI</h1>
      </div>
      <CreateSiteForm />
    </section>
  );
}
