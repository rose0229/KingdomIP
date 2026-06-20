import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().min(2),
  website: z.string().optional(),
  organizationType: z.string().optional(),
  size: z.string().optional(),
  improve: z.string().min(10),
  services: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  details: z.string().optional(),
  supportingLinks: z.string().optional()
}).passthrough();

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = inquirySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Kingdom IP <hello@kingdomip.org>";

  if (!resendKey || !to) {
    console.error("Kingdom IP contact form missing email configuration", {
      hasResendKey: Boolean(resendKey),
      hasContactToEmail: Boolean(to)
    });
    return NextResponse.json({ error: "Email delivery is not configured yet. Please email hello@kingdomip.org." }, { status: 503 });
  }

  const resend = new Resend(resendKey);
  const data = parsed.data;
  const recipients = to.split(",").map((email) => email.trim()).filter(Boolean);
  const entries = Object.entries(data);
  const rows = entries
    .map(([key, value]) => `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:700;vertical-align:top">${escapeHtml(labelize(key))}</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(String(value || ""))}</td></tr>`)
    .join("");
  const text = entries.map(([key, value]) => `${labelize(key)}:\n${String(value || "")}`).join("\n\n");

  try {
    const result = await resend.emails.send({
      from,
      to: recipients,
      replyTo: data.email,
      subject: `New Kingdom IP inquiry from ${data.organization}`,
      text: `New Kingdom IP inquiry\n\n${text}`,
      html: `<h1>New Kingdom IP inquiry</h1><p><strong>Reply to:</strong> ${escapeHtml(data.email)}</p><table style="border-collapse:collapse">${rows}</table>`
    });

    if (result.error) {
      console.error("Kingdom IP contact form Resend error", result.error);
      return NextResponse.json({ error: "The inquiry could not be sent. Please email hello@kingdomip.org." }, { status: 502 });
    }
  } catch (error) {
    console.error("Kingdom IP contact form send exception", error);
    return NextResponse.json({ error: "The inquiry could not be sent. Please email hello@kingdomip.org." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function labelize(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase())
    .trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
