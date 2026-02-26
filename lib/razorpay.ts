import Razorpay from "razorpay";

let cachedRazorpay: Razorpay | null = null;

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getRazorpayClient(): Razorpay {
  if (cachedRazorpay) {
    return cachedRazorpay;
  }

  const keyId = requireEnv("RAZORPAY_KEY_ID");
  const keySecret = requireEnv("RAZORPAY_KEY_SECRET");

  cachedRazorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  return cachedRazorpay;
}

export function getRazorpayKeyId(): string {
  return requireEnv("NEXT_PUBLIC_RAZORPAY_KEY_ID");
}

export function getProUnlockPriceInInr(): number {
  const raw = process.env.PRO_UNLOCK_PRICE;

  if (!raw) {
    throw new Error("Missing required environment variable: PRO_UNLOCK_PRICE");
  }

  const value = Number(raw);

  if (!Number.isFinite(value) || value <= 0) {
    throw new Error("PRO_UNLOCK_PRICE must be a positive number (in INR)");
  }

  return value;
}
