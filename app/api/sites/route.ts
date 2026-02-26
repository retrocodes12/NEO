import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth";
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
    const user = await requireUser();
    const sites = await listSitesByUser(user.id);
    return NextResponse.json({ sites });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list sites";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = (await request.json()) as Partial<CreateSiteRequest>;

    if (!body.name || !body.industry || !body.tone || !body.location || !body.goal || !body.contentJson) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const site = await createSite({
      userId: user.id,
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
