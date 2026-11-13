import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getPaidDownloadSession } from "@/lib/stripe";

// Serves a kit only for a paid download checkout, and only the kit that was bought.
export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  const order = await getPaidDownloadSession(sessionId);

  if (!order) {
    return NextResponse.json({ error: "We couldn't find a paid order for this link. Email hello@kingdomip.org and we'll sort it out." }, { status: 403 });
  }

  const file = await readFile(path.join(process.cwd(), "private", order.product.file));
  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${order.product.file}"`,
      "Cache-Control": "private, no-store"
    }
  });
}
