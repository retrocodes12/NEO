import { getSupabaseAdminClient } from "@/lib/db";

export type SiteStatus = "draft" | "published";

export interface SiteSection {
  id: string;
  title: string;
  text: string;
}

export interface SiteContent {
  sections: SiteSection[];
}

export interface Site {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  industry: string;
  tone: string;
  location: string;
  goal: string;
  status: SiteStatus;
  content_json: SiteContent;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface CreateSiteInput {
  userId: string;
  name: string;
  industry: string;
  tone: string;
  location: string;
  goal: string;
  contentJson: SiteContent;
}

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

async function ensureUniqueSlug(baseName: string): Promise<string> {
  const supabase = getSupabaseAdminClient();
  const baseSlug = slugify(baseName) || "site";

  for (let attempt = 0; attempt < 50; attempt += 1) {
    const candidate = attempt === 0 ? baseSlug : `${baseSlug}-${attempt}`;

    const { data, error } = await supabase.from("sites").select("id").eq("slug", candidate).limit(1);

    if (error) {
      throw new Error(`Failed to check slug uniqueness: ${error.message}`);
    }

    if (!data || data.length === 0) {
      return candidate;
    }
  }

  return `${baseSlug}-${Date.now()}`;
}

export async function createSite(input: CreateSiteInput): Promise<Site> {
  const supabase = getSupabaseAdminClient();
  const slug = await ensureUniqueSlug(input.name);

  const { data, error } = await supabase
    .from("sites")
    .insert({
      user_id: input.userId,
      name: input.name,
      slug,
      industry: input.industry,
      tone: input.tone,
      location: input.location,
      goal: input.goal,
      status: "draft",
      content_json: input.contentJson,
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(`Failed to create site: ${error?.message ?? "Unknown error"}`);
  }

  return data as Site;
}

export async function listSitesByUser(userId: string): Promise<Site[]> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to list sites: ${error.message}`);
  }

  return (data ?? []) as Site[];
}

export async function getSiteByIdForUser(siteId: string, userId: string): Promise<Site | null> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("id", siteId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch site: ${error.message}`);
  }

  return (data as Site | null) ?? null;
}

export async function getPublishedSiteBySlug(slug: string): Promise<Site | null> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch published site: ${error.message}`);
  }

  return (data as Site | null) ?? null;
}

export async function updateSiteContent(siteId: string, userId: string, contentJson: SiteContent): Promise<Site> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("sites")
    .update({ content_json: contentJson })
    .eq("id", siteId)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(`Failed to update site content: ${error?.message ?? "Unknown error"}`);
  }

  return data as Site;
}

export async function publishSite(siteId: string, userId: string): Promise<Site> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("sites")
    .update({ status: "published", published_at: new Date().toISOString() })
    .eq("id", siteId)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(`Failed to publish site: ${error?.message ?? "Unknown error"}`);
  }

  return data as Site;
}

export async function countPublishedSitesByUser(userId: string): Promise<number> {
  const supabase = getSupabaseAdminClient();

  const { count, error } = await supabase
    .from("sites")
    .select("id", { head: true, count: "exact" })
    .eq("user_id", userId)
    .eq("status", "published");

  if (error) {
    throw new Error(`Failed to count published sites: ${error.message}`);
  }

  return count ?? 0;
}
