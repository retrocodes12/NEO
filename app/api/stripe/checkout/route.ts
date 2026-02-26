import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getAppUrl, getProPriceId, getStripeClient } from "@/lib/stripe";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const stripe = getStripeClient();
    const appUrl = getAppUrl();
    const priceId = getProPriceId();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/billing/success`,
      cancel_url: `${appUrl}/pricing`,
      metadata: {
        clerk_user_id: userId,
        plan: "pro",
      },
      subscription_data: {
        metadata: {
          clerk_user_id: userId,
          plan: "pro",
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
