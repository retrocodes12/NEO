import crypto from "crypto";

import { NextResponse } from "next/server";

import { getSupabaseAdminClient } from "@/lib/db";

function verifyRazorpayWebhookSignature(body: string, signature: string | null): boolean {
  if (!signature) {
    return false;
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret) {
    throw new Error("Missing required environment variable: RAZORPAY_KEY_SECRET");
  }

  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

function getClerkUserIdFromPayload(payload: Record<string, unknown>): string | null {
  const paymentEntity = ((payload.payload as Record<string, unknown> | undefined)?.payment as Record<string, unknown> | undefined)
    ?.entity as Record<string, unknown> | undefined;
  const notes = paymentEntity?.notes as Record<string, unknown> | undefined;
  const clerkUserId = notes?.clerk_user_id;

  return typeof clerkUserId === "string" ? clerkUserId : null;
}

function getPaymentId(payload: Record<string, unknown>): string | null {
  const paymentEntity = ((payload.payload as Record<string, unknown> | undefined)?.payment as Record<string, unknown> | undefined)
    ?.entity as Record<string, unknown> | undefined;
  const paymentId = paymentEntity?.id;

  return typeof paymentId === "string" ? paymentId : null;
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!verifyRazorpayWebhookSignature(body, signature)) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    const payload = JSON.parse(body) as Record<string, unknown>;
    const event = payload.event;

    if (event === "payment.captured") {
      const userId = getClerkUserIdFromPayload(payload);
      const paymentId = getPaymentId(payload);

      if (!userId || !paymentId) {
        return NextResponse.json({ error: "Missing required payment metadata" }, { status: 400 });
      }

      const supabase = getSupabaseAdminClient();
      const currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

      const { error } = await supabase.from("subscriptions").upsert(
        {
          provider: "razorpay",
          clerk_user_id: userId,
          plan: "pro",
          status: "active",
          provider_customer_id: null,
          provider_subscription_id: paymentId,
          current_period_end: currentPeriodEnd,
          cancel_at_period_end: false,
          raw: payload,
        },
        { onConflict: "provider,provider_subscription_id" },
      );

      if (error) {
        throw new Error(`Failed to upsert Razorpay subscription: ${error.message}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Razorpay webhook failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
