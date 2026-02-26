import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedAdminClient: SupabaseClient | null = null;

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getSupabaseAdminClient(): SupabaseClient {
  if (cachedAdminClient) {
    return cachedAdminClient;
  }

  const url = requireEnv("SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  cachedAdminClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cachedAdminClient;
}
