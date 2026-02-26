export interface SiteInput {
  name: string;
  slug: string;
}

export function validateSiteInput(input: SiteInput): SiteInput {
  const name = input.name.trim();
  const slug = input.slug.trim().toLowerCase();

  if (name.length < 2) {
    throw new Error("Site name must be at least 2 characters.");
  }

  if (!/^[a-z0-9-]{3,64}$/.test(slug)) {
    throw new Error("Slug must be 3-64 chars and contain only lowercase letters, numbers, and hyphens.");
  }

  return { name, slug };
}
