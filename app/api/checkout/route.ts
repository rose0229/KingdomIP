import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { INTEGRATION_ID, automaticTaxEnabled, getStripe, isShopItem, priceFor } from "@/lib/stripe";
import { siteUrl } from "@/lib/utils";

// The checkout panel on /resources/giving-calculator calls this to start an
// embedded Stripe Checkout. It returns the session's client secret, which
// Stripe.js uses to show the payment form on our page.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const item = body?.item;

  if (!isShopItem(item)) {
    return NextResponse.json({ error: "Unknown item." }, { status: 400 });
  }

  const price = priceFor(item);
  if (!price || !process.env.STRIPE_SECRET_KEY) {
    console.error("Checkout is missing Stripe configuration", { item, hasPrice: Boolean(price), hasKey: Boolean(process.env.STRIPE_SECRET_KEY) });
    return NextResponse.json({ error: "Checkout isn't set up yet. Please email hello@kingdomip.org." }, { status: 503 });
  }

  const base = siteUrl.replace(/\/$/, "");
  const params: Stripe.Checkout.SessionCreateParams = {
    ui_mode: "embedded_page",
    mode: "payment",
    line_items: [{ price, quantity: 1 }],
    metadata: { item },
    payment_intent_data: { metadata: { item } },
    customer_creation: "always",
    allow_promotion_codes: true,
    automatic_tax: { enabled: automaticTaxEnabled },
    integration_identifier: INTEGRATION_ID,
    return_url:
      item === "code"
        ? `${base}/resources/giving-calculator/download?session_id={CHECKOUT_SESSION_ID}`
        : `${base}/resources/giving-calculator/setup-thanks?session_id={CHECKOUT_SESSION_ID}`
  };

  if (automaticTaxEnabled) {
    params.billing_address_collection = "required";
  }

  if (item === "setup") {
    params.custom_fields = [
      { key: "churchwebsite", label: { type: "custom", custom: "Church website" }, type: "text" },
      {
        key: "websitebuilder",
        label: { type: "custom", custom: "Website builder" },
        type: "dropdown",
        dropdown: {
          options: [
            { label: "ChurchCo", value: "churchco" },
            { label: "Squarespace", value: "squarespace" },
            { label: "Wix", value: "wix" },
            { label: "WordPress", value: "wordpress" },
            { label: "Other or not sure", value: "other" }
          ]
        }
      },
      { key: "givinglink", label: { type: "custom", custom: "Online giving page link" }, type: "text" }
    ];
  }

  try {
    const session = await getStripe().checkout.sessions.create(params);
    if (!session.client_secret) throw new Error("Stripe returned no client secret");
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("Stripe checkout session failed", error);
    return NextResponse.json({ error: "Checkout didn't open. Please try again, or email hello@kingdomip.org." }, { status: 502 });
  }
}
