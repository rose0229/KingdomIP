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

// Everything kingdomip.org sells. The item key is stored in each checkout's
// metadata, so never rename an existing key ("code" and "setup" are the
// Giving Calculator and have live orders under those names).
type DownloadProduct = {
  kind: "download";
  name: string;
  lookupKey: string;
  priceEnv: string;
  pagePath: string;
  file: string;
  setupPrice: string;
};

type SetupProduct = {
  kind: "setup";
  name: string;
  lookupKey: string;
  priceEnv: string;
  pagePath: string;
  customFields: Stripe.Checkout.SessionCreateParams.CustomField[];
  buyerEmail: string;
};

export const products = {
  code: {
    kind: "download",
    name: "Giving Calculator Kit",
    lookupKey: "giving_calculator_code",
    priceEnv: "STRIPE_PRICE_CODE",
    pagePath: "/resources/giving-calculator",
    file: "giving-calculator-kit.zip",
    setupPrice: "$99"
  },
  setup: {
    kind: "setup",
    name: "Giving Calculator setup",
    lookupKey: "giving_calculator_setup",
    priceEnv: "STRIPE_PRICE_SETUP",
    pagePath: "/resources/giving-calculator",
    customFields: [
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
    ],
    buyerEmail:
      "Thanks for booking setup.\n\nWe'll email you within two business days to get started. If you have a login for your website builder, or your web person's email, have it handy."
  },
  "sermon-kit": {
    kind: "download",
    name: "Sermon Publishing Kit",
    lookupKey: "sermon_publishing_kit",
    priceEnv: "STRIPE_PRICE_SERMON_KIT",
    pagePath: "/resources/sermon-publishing",
    file: "sermon-publishing-kit.zip",
    setupPrice: "$750"
  },
  "sermon-setup": {
    kind: "setup",
    name: "Sermon Publishing setup",
    lookupKey: "sermon_publishing_setup",
    priceEnv: "STRIPE_PRICE_SERMON_SETUP",
    pagePath: "/resources/sermon-publishing",
    customFields: [
      { key: "churchwebsite", label: { type: "custom", custom: "Church website" }, type: "text" },
      {
        key: "websiteplatform",
        label: { type: "custom", custom: "Website platform" },
        type: "dropdown",
        dropdown: {
          options: [
            { label: "WordPress", value: "wordpress" },
            { label: "Squarespace", value: "squarespace" },
            { label: "Wix or Webflow", value: "wixwebflow" },
            { label: "Church platform (Subsplash, Church Center)", value: "churchplatform" },
            { label: "Custom site in a Git repo", value: "git" },
            { label: "Other or not sure", value: "other" }
          ]
        }
      },
      { key: "youtubechannel", label: { type: "custom", custom: "YouTube channel link" }, type: "text" }
    ],
    buyerEmail:
      "Thanks for booking Sermon Publishing setup.\n\nWe'll email you within two business days to schedule the first build session. Before then, find out who holds admin access to your YouTube channel, website, Facebook Page and podcast host. Those people, or their logins, need to be on the call."
  }
} satisfies Record<string, DownloadProduct | SetupProduct>;

export type ShopItem = keyof typeof products;

export function isShopItem(value: unknown): value is ShopItem {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(products, value);
}

// Prices are found by their Stripe lookup key, so a price change happens in
// Stripe alone: create the new price with the same lookup key and "transfer
// lookup key" checked. The STRIPE_PRICE_* variable is only a fallback.
export async function priceFor(item: ShopItem): Promise<string | undefined> {
  const product = products[item];
  try {
    const found = await getStripe().prices.list({ lookup_keys: [product.lookupKey], active: true, limit: 1 });
    if (found.data[0]) return found.data[0].id;
  } catch (error) {
    console.error("Price lookup failed", { item, error });
  }
  return process.env[product.priceEnv];
}

// Where Stripe sends the buyer after paying.
export function returnPathFor(item: ShopItem): string {
  const product = products[item];
  return product.kind === "download" ? `${product.pagePath}/download` : `${product.pagePath}/setup-thanks`;
}

// Tags these checkouts in the Stripe Dashboard so they can be tracked apart
// from any future checkout flows.
export const INTEGRATION_ID = "kingdomip-giving-calculator-qvhrtwmk";

// Stripe Tax only collects where you have an active registration. Leave this
// off until a head office address and at least one registration are set up
// in the Stripe Dashboard (Tax > Settings, Tax > Locations).
export const automaticTaxEnabled = process.env.STRIPE_AUTOMATIC_TAX === "true";

// A paid checkout for a download. Pass the item to require a specific product
// (the download pages do); leave it out to accept any download (the shared
// /api/download route does, and serves that product's file).
export async function getPaidDownloadSession(sessionId: string | null | undefined, item?: ShopItem) {
  if (!sessionId || !sessionId.startsWith("cs_")) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    const bought = session.metadata?.item;
    if (!isShopItem(bought)) return null;
    const product = products[bought];
    if (product.kind !== "download") return null;
    if (item && bought !== item) return null;
    if (session.payment_status === "unpaid") return null;
    return { session, item: bought, product };
  } catch {
    return null;
  }
}
