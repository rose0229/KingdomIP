import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getPaidCodeSession } from "@/lib/stripe";

// Serves the kit only for a paid Giving Calculator Code checkout.
export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  const session = await getPaidCodeSession(sessionId);

  if (!session) {
    return NextResponse.json({ error: "We couldn't find a paid order for this link. Email hello@kingdomip.org and we'll sort it out." }, { status: 403 });
  }

  const file = await readFile(path.join(process.cwd(), "private", "giving-calculator-kit.zip"));
  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="giving-calculator-kit.zip"',
      "Cache-Control": "private, no-store"
    }
  });
}
