import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getProUnlockPriceInInr, getRazorpayClient, getRazorpayKeyId } from "@/lib/razorpay";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const razorpay = getRazorpayClient();
    const priceInInr = getProUnlockPriceInInr();
    const amount = Math.round(priceInInr * 100);

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `pro_unlock_${Date.now()}`,
      notes: {
        clerk_user_id: userId,
        plan: "pro",
        duration_days: "30",
      },
    });

    return NextResponse.json({
      keyId: getRazorpayKeyId(),
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create Razorpay order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
