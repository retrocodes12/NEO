import Stripe from "stripe";
import { NextResponse } from "next/server";

import { getSupabaseAdminClient } from "@/lib/db";
import { getStripeClient, getStripeWebhookSecret } from "@/lib/stripe";

function toIsoOrNull(unixSeconds?: number | null): string | null {
  if (!unixSeconds) {
    return null;
  }

  return new Date(unixSeconds * 1000).toISOString();
}

function getCurrentPeriodEnd(subscription: Stripe.Subscription): number | null {
  const subscriptionLike = subscription as unknown as { current_period_end?: number };
  return subscriptionLike.current_period_end ?? null;
}

async function upsertFromSubscription(subscription: Stripe.Subscription) {
  const supabase = getSupabaseAdminClient();

  const payload = {
    provider: "stripe",
    clerk_user_id: subscription.metadata?.clerk_user_id || null,
    plan: subscription.metadata?.plan || "pro",
    status: subscription.status,
    provider_customer_id: typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id,
    provider_subscription_id: subscription.id,
    current_period_end: toIsoOrNull(getCurrentPeriodEnd(subscription)),
    cancel_at_period_end: Boolean(subscription.cancel_at_period_end),
    raw: subscription,
  };

  const { error } = await supabase.from("subscriptions").upsert(payload, { onConflict: "provider,provider_subscription_id" });

  if (error) {
    throw new Error(`Failed to upsert subscription: ${error.message}`);
  }
}

async function upsertFromCheckoutSession(session: Stripe.Checkout.Session) {
  if (!session.subscription) {
    return;
  }

  const stripe = getStripeClient();
  const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  if (!subscription.metadata?.clerk_user_id && session.metadata?.clerk_user_id) {
    const updated = await stripe.subscriptions.update(subscriptionId, {
      metadata: {
        ...subscription.metadata,
        clerk_user_id: session.metadata.clerk_user_id,
        plan: session.metadata.plan || "pro",
      },
    });

    await upsertFromSubscription(updated);
    return;
  }

  await upsertFromSubscription(subscription);
}

export async function POST(request: Request) {
  try {
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing stripe signature" }, { status: 400 });
    }

    const body = await request.text();
    const stripe = getStripeClient();
    const webhookSecret = getStripeWebhookSecret();

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed":
        await upsertFromCheckoutSession(event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await upsertFromSubscription(event.data.object as Stripe.Subscription);
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook handling failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
