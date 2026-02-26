"use client";

import { useState } from "react";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

async function loadRazorpayScript(): Promise<boolean> {
  if (window.Razorpay) {
    return true;
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function PaymentButtons() {
  const [loading, setLoading] = useState<"stripe" | "razorpay" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function payWithStripe() {
    setLoading("stripe");
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", { method: "POST" });
      const json = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !json.url) {
        throw new Error(json.error ?? "Failed to start Stripe checkout");
      }

      window.location.href = json.url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Stripe checkout failed");
      setLoading(null);
    }
  }

  async function payWithRazorpay() {
    setLoading("razorpay");
    setError(null);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded || !window.Razorpay) {
        throw new Error("Failed to load Razorpay checkout");
      }

      const response = await fetch("/api/razorpay/order", { method: "POST" });
      const json = (await response.json()) as {
        keyId?: string;
        orderId?: string;
        amount?: number;
        currency?: string;
        error?: string;
      };

      if (!response.ok || !json.keyId || !json.orderId || !json.amount || !json.currency) {
        throw new Error(json.error ?? "Failed to create Razorpay order");
      }

      const razorpay = new window.Razorpay({
        key: json.keyId,
        order_id: json.orderId,
        amount: json.amount,
        currency: json.currency,
        name: "ElevateWeb Pro",
        description: "UPI payment for 30-day Pro unlock",
        config: {
          display: {
            blocks: {
              upi_only: {
                name: "Pay using UPI",
                instruments: [{ method: "upi" }],
              },
            },
            sequence: ["block.upi_only"],
            preferences: { show_default_blocks: false },
          },
        },
        theme: { color: "#7C5CFF" },
      });

      razorpay.open();
      setLoading(null);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Razorpay checkout failed");
      setLoading(null);
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={payWithStripe}
          disabled={loading !== null}
          className="rounded-xl border border-border bg-background/40 px-4 py-2 text-sm font-semibold disabled:opacity-60"
        >
          {loading === "stripe" ? "Starting..." : "Pay with Card (Stripe)"}
        </button>
        <button
          onClick={payWithRazorpay}
          disabled={loading !== null}
          className="rounded-xl border border-border bg-background/40 px-4 py-2 text-sm font-semibold disabled:opacity-60"
        >
          {loading === "razorpay" ? "Starting..." : "Pay with UPI (Razorpay)"}
        </button>
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  );
}
