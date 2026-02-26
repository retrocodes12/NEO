import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { getSiteByIdForUser } from "@/lib/db/sites";

import { EditorClient } from "./site-editor";

interface EditorPageProps {
  params: Promise<{ siteId: string }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { siteId } = await params;
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const site = await getSiteByIdForUser(siteId, userId);

  if (!site) {
    notFound();
  }

  return <EditorClient site={site} />;
}
