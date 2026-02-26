import { getSupabaseAdminClient } from "@/lib/db";

export type PlanType = "free" | "pro";

const PRO_STATUSES = new Set(["active", "trialing", "past_due"]);

export async function getUserPlan(userId: string): Promise<PlanType> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("provider,status,current_period_end")
    .eq("clerk_user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(20);

  if (error) {
    throw new Error(`Failed to resolve user plan: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return "free";
  }

  const now = Date.now();

  const hasActivePlan = data.some((row) => {
    const status = String(row.status);

    if (!PRO_STATUSES.has(status)) {
      return false;
    }

    if (!row.current_period_end) {
      return true;
    }

    return new Date(String(row.current_period_end)).getTime() > now;
  });

  return hasActivePlan ? "pro" : "free";
}
