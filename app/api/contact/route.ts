import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().min(2),
  website: z.string().optional(),
  organizationType: z.string().min(2),
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
    return NextResponse.json({ ok: true, warning: "Email delivery is not configured yet." });
  }

  const resend = new Resend(resendKey);
  const data = parsed.data;
  const rows = Object.entries(data)
    .map(([key, value]) => `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:700">${key}</td><td style="padding:8px;border:1px solid #ddd">${value || ""}</td></tr>`)
    .join("");

  await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `New Kingdom IP inquiry from ${data.organization}`,
    html: `<h1>New Kingdom IP inquiry</h1><table style="border-collapse:collapse">${rows}</table>`
  });

  return NextResponse.json({ ok: true });
}
