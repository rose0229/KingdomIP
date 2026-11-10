import Stripe from "stripe";

// One Stripe client per server instance. Use a restricted key (rk_...) in
// STRIPE_SECRET_KEY with only these permissions: Checkout Sessions (write),
// Products and Prices (read), Customers (write).
let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    client = new Stripe(key);
  }
  return client;
}

export type ShopItem = "code" | "setup";

export function priceFor(item: ShopItem): string | undefined {
  return item === "code" ? process.env.STRIPE_PRICE_CODE : process.env.STRIPE_PRICE_SETUP;
}

export function isShopItem(value: unknown): value is ShopItem {
  return value === "code" || value === "setup";
}

// Tags these checkouts in the Stripe Dashboard so they can be tracked apart
// from any future checkout flows.
export const INTEGRATION_ID = "kingdomip-giving-calculator-qvhrtwmk";

// Stripe Tax only collects where you have an active registration. Leave this
// off until a head office address and at least one registration are set up
// in the Stripe Dashboard (Tax > Settings, Tax > Locations).
export const automaticTaxEnabled = process.env.STRIPE_AUTOMATIC_TAX === "true";

// A paid code purchase. Used by the download page, the download route and
// the webhook.
export async function getPaidCodeSession(sessionId: string | null | undefined) {
  if (!sessionId || !sessionId.startsWith("cs_")) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.metadata?.item !== "code") return null;
    if (session.payment_status === "unpaid") return null;
    return session;
  } catch {
    return null;
  }
}
