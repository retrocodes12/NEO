import { notFound } from "next/navigation";

import { requireUser } from "@/lib/auth";
import { getSiteByIdForUser } from "@/lib/db/sites";

import { EditorClient } from "./site-editor";

interface EditorPageProps {
  params: Promise<{ siteId: string }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { siteId } = await params;
  const user = await requireUser();

  const site = await getSiteByIdForUser(siteId, user.id);

  if (!site) {
    notFound();
  }

  return <EditorClient site={site} />;
}
