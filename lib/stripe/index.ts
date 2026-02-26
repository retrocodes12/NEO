import Stripe from "stripe";

let cachedStripe: Stripe | null = null;

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getStripeClient(): Stripe {
  if (cachedStripe) {
    return cachedStripe;
  }

  const secretKey = requireEnv("STRIPE_SECRET_KEY");
  cachedStripe = new Stripe(secretKey);

  return cachedStripe;
}

export function getStripeWebhookSecret(): string {
  return requireEnv("STRIPE_WEBHOOK_SECRET");
}

export function getProPriceId(): string {
  return requireEnv("PRO_PRICE_ID");
}

export function getAppUrl(): string {
  return requireEnv("NEXT_PUBLIC_APP_URL");
}
