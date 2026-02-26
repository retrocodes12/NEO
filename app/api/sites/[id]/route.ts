import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getUserPlan } from "@/lib/billing";
import { countPublishedSitesByUser, getSiteByIdForUser, publishSite, updateSiteContent, type SiteContent } from "@/lib/db/sites";

interface UpdateSiteRequest {
  action?: "publish";
  contentJson?: SiteContent;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as UpdateSiteRequest;

    if (body.action === "publish") {
      const plan = await getUserPlan(userId);
      const existingSite = await getSiteByIdForUser(id, userId);

      if (!existingSite) {
        return NextResponse.json({ error: "Site not found" }, { status: 404 });
      }

      if (plan === "free" && existingSite.status !== "published") {
        const publishedCount = await countPublishedSitesByUser(userId);

        if (publishedCount >= 1) {
          return NextResponse.json(
            { error: "Free plan allows only 1 published site. Upgrade to Pro for unlimited published sites." },
            { status: 403 },
          );
        }
      }

      const site = await publishSite(id, userId);
      return NextResponse.json({ site });
    }

    if (!body.contentJson) {
      return NextResponse.json({ error: "contentJson is required for save." }, { status: 400 });
    }

    const site = await updateSiteContent(id, userId, body.contentJson);
    return NextResponse.json({ site });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update site";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
