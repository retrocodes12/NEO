import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { createSite, listSitesByUser, type SiteContent } from "@/lib/db/sites";

interface CreateSiteRequest {
  name: string;
  industry: string;
  tone: string;
  location: string;
  goal: string;
  contentJson: SiteContent;
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sites = await listSitesByUser(userId);
    return NextResponse.json({ sites });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list sites";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as Partial<CreateSiteRequest>;

    if (!body.name || !body.industry || !body.tone || !body.location || !body.goal || !body.contentJson) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const site = await createSite({
      userId,
      name: String(body.name),
      industry: String(body.industry),
      tone: String(body.tone),
      location: String(body.location),
      goal: String(body.goal),
      contentJson: body.contentJson,
    });

    return NextResponse.json({ site }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create site";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
