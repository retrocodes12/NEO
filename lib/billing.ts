import { getSupabaseAdminClient } from "@/lib/db";

export type PlanType = "free" | "pro";

const PRO_STATUSES = new Set(["active", "trialing", "past_due"]);

export async function getUserPlan(userId: string): Promise<PlanType> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("provider", "stripe")
    .eq("clerk_user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to resolve user plan: ${error.message}`);
  }

  if (!data) {
    return "free";
  }

  return PRO_STATUSES.has(String(data.status)) ? "pro" : "free";
}
