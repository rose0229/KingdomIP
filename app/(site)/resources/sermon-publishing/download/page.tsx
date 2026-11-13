import type { Metadata } from "next";
import { Download } from "lucide-react";
import { SectionHeading } from "@/components/section";
import { CheckoutButton } from "@/components/checkout-button";
import { sermonPublishing } from "@/lib/content";
import { getPaidDownloadSession } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Your Sermon Publishing Kit",
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

const steps = [
  "Download the kit and unzip it.",
  "Open Claude Code or Codex in an empty folder. Drop in Sermon-Publishing-for-Churches.md and type: \"Set this up for our church.\"",
  "Answer its questions. It tests everything on an old sermon first, and nothing goes public until you say so."
];

export default async function SermonPublishingDownloadPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const order = await getPaidDownloadSession(session_id, "sermon-kit");

  if (!order) {
    return (
      <main className="bg-paper">
        <section className="bg-ink py-20 text-paper dark-grid">
          <div className="container">
            <SectionHeading
              light
              eyebrow="Download"
              title="We couldn't find that order."
              copy="This link needs a paid order to work. If you just paid, check your email for your download link, or email hello@kingdomip.org and we'll sort it out."
            />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-paper">
      <section className="bg-ink py-20 text-paper dark-grid">
        <div className="container">
          <SectionHeading light eyebrow="Thank you" title="Here's your kit." copy="We also emailed you this link, so you can come back and download it again." />
          <a
            href={`/api/download?session_id=${encodeURIComponent(order.session.id)}`}
            className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-lime px-5 py-3 text-sm font-black uppercase tracking-wide text-ink transition hover:bg-bone"
          >
            Download the kit <Download aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </section>
      <section className="py-16">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeading eyebrow="Three steps" title="Getting it built." />
            <ol className="mt-8 space-y-4">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-4 border-t border-ink/15 pt-4 text-lg leading-8 text-ink/80">
                  <span className="font-display text-2xl font-black text-cobalt">0{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 leading-7 text-ink/65">
              Rather fill in a form? Open sermon-publishing-kit.html in a browser. It writes the prompt with your answers already in it and prints a card for your Sunday volunteer.
            </p>
            <p className="mt-4 leading-7 text-ink/65">
              Have your admins nearby for the first session: YouTube channel owner, website admin, Facebook Page admin and whoever runs your podcast host.
            </p>
          </div>
          <aside className="border border-ink bg-lime p-6 text-ink shadow-line">
            <p className="text-xs font-black uppercase text-cobalt">Rather not do it yourself?</p>
            <h2 className="mt-4 font-display text-3xl font-black">We'll build it with you for {sermonPublishing.setupPrice}.</h2>
            <p className="mt-3 leading-7">Live sessions on your accounts, tested on an old sermon first, with fixes for 30 days after launch.</p>
            <div className="mt-6">
              <CheckoutButton item="sermon-setup" variant="dark">Book setup</CheckoutButton>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
