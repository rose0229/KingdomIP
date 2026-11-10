import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { Resend } from "resend";
import { getStripe } from "@/lib/stripe";
import { siteUrl } from "@/lib/utils";

// Stripe calls this after checkout. Fulfillment happens here, not on the
// success page, because a buyer can pay and close the tab before it loads.
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!secret || !signature) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 400 });
  }

  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    console.error("Stripe webhook signature check failed", error);
    return NextResponse.json({ error: "Bad signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;
        if (session.payment_status !== "unpaid") await fulfill(session);
        break;
      }
      case "checkout.session.async_payment_failed": {
        const session = event.data.object;
        console.warn("Giving calculator payment failed", { session: session.id, item: session.metadata?.item });
        break;
      }
    }
  } catch (error) {
    // A 500 tells Stripe to retry the event later.
    console.error("Stripe webhook fulfillment failed", { event: event.id, error });
    return NextResponse.json({ error: "Fulfillment failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function fulfill(session: Stripe.Checkout.Session) {
  const item = session.metadata?.item;
  const buyer = session.customer_details?.email ?? undefined;
  const name = session.customer_details?.name ?? "";
  const base = siteUrl.replace(/\/$/, "");
  const fields = Object.fromEntries(
    (session.custom_fields ?? []).map((f) => [f.label.custom ?? f.key, f.text?.value ?? f.dropdown?.value ?? ""])
  );

  const resendKey = process.env.RESEND_API_KEY;
  const owner = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Kingdom IP <hello@kingdomip.org>";

  if (!resendKey || !owner) {
    // Stripe still emails the receipt and notifies the account owner.
    console.warn("Order emails skipped: Resend not configured", { session: session.id, item });
    return;
  }
  const resend = new Resend(resendKey);
  const ownerList = owner.split(",").map((e) => e.trim()).filter(Boolean);
  const amount = ((session.amount_total ?? 0) / 100).toLocaleString("en-US", { style: "currency", currency: (session.currency ?? "usd").toUpperCase() });

  if (item === "code") {
    const link = `${base}/resources/giving-calculator/download?session_id=${session.id}`;
    if (buyer) {
      await send(resend, {
        from,
        to: [buyer],
        replyTo: ownerList[0],
        subject: "Your Giving Calculator Kit",
        text: `Thanks for your order.\n\nDownload your kit here:\n${link}\n\nKeep this email. The link works whenever you need it.\n\nStuck? We'll set it up for you for $50: ${base}/resources/giving-calculator\n\nKingdom IP`
      });
    }
    await send(resend, { from, to: ownerList, subject: `Sold: Giving Calculator Code (${amount})`, text: `Buyer: ${name} <${buyer ?? "no email"}>\nSession: ${session.id}` });
  }

  if (item === "setup") {
    const details = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n");
    await send(resend, {
      from,
      to: ownerList,
      replyTo: buyer,
      subject: `New Giving Calculator setup (${amount})`,
      text: `Buyer: ${name} <${buyer ?? "no email"}>\n\n${details}\n\nSession: ${session.id}\n\nReply to this email to reach the buyer.`
    });
    if (buyer) {
      await send(resend, {
        from,
        to: [buyer],
        replyTo: ownerList[0],
        subject: "Your Giving Calculator setup is booked",
        text: `Thanks for booking setup.\n\nWe'll email you within two business days to get started. If you have a login for your website builder, or your web person's email, have it handy.\n\nKingdom IP`
      });
    }
  }
}

async function send(resend: Resend, message: Parameters<Resend["emails"]["send"]>[0]) {
  const result = await resend.emails.send(message);
  if (result.error) throw new Error(`Resend: ${result.error.message}`);
}
