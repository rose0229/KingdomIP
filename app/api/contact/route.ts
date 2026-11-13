import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(200),
  organization: z.string().trim().max(200).optional(),
  topic: z.string().trim().max(200).optional(),
  message: z.string().trim().min(5).max(5000)
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);

  // Spam trap: real people never fill in this hidden field.
  if (json?.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill in your name, email and a short message." }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Kingdom IP <hello@kingdomip.org>";

  if (!resendKey || !to) {
    console.error("Contact form missing email configuration", { hasResendKey: Boolean(resendKey), hasContactToEmail: Boolean(to) });
    return NextResponse.json({ error: "The form isn't connected yet. Please email hello@kingdomip.org." }, { status: 503 });
  }

  const { name, email, organization, topic, message } = parsed.data;
  const text = [
    `From: ${name} <${email}>`,
    organization ? `Church or organization: ${organization}` : null,
    `Help with: ${topic || "Not sure yet"}`,
    "",
    message
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const result = await new Resend(resendKey).emails.send({
      from,
      to: to.split(",").map((address) => address.trim()).filter(Boolean),
      replyTo: email,
      subject: `Kingdom IP: ${topic || "New message"} from ${organization || name}`,
      text
    });
    if (result.error) {
      console.error("Contact form Resend error", result.error);
      return NextResponse.json({ error: "That didn't send. Please email hello@kingdomip.org." }, { status: 502 });
    }
  } catch (error) {
    console.error("Contact form send failed", error);
    return NextResponse.json({ error: "That didn't send. Please email hello@kingdomip.org." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
