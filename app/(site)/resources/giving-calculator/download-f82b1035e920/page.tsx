import type { Metadata } from "next";
import { Download } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { SectionHeading } from "@/components/section";
import { givingCalculator } from "@/lib/content";

export const metadata: Metadata = {
  title: "Your Giving Calculator Kit",
  robots: { index: false, follow: false }
};

const steps = [
  "Download the kit and unzip it.",
  "Drop the setup guide into ChatGPT, Claude or whatever AI you use and type: \"Set this up for our church.\"",
  "Answer its questions. It hands back your finished calculator and steps for your web person."
];

export default function GivingCalculatorDownloadPage() {
  return (
    <main className="bg-paper">
      <section className="bg-ink py-20 text-paper dark-grid">
        <div className="container">
          <SectionHeading light eyebrow="Thank you" title="Here's your kit." copy="Bookmark this page. You can come back to download it again." />
          <a
            href={givingCalculator.kitFile}
            download
            className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-lime px-5 py-3 text-sm font-black uppercase tracking-wide text-ink transition hover:bg-bone"
          >
            Download the kit <Download aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </section>
      <section className="py-16">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeading eyebrow="Three steps" title="Getting it on your site." />
            <ol className="mt-8 space-y-4">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-4 border-t border-ink/15 pt-4 text-lg leading-8 text-ink/80">
                  <span className="font-display text-2xl font-black text-cobalt">0{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 leading-7 text-ink/65">
              Test it in Chrome or Safari, or on your live site. Some previews in email and chat apps show the page without running it, so the buttons look dead there.
            </p>
          </div>
          <aside className="border border-ink bg-lime p-6 text-ink shadow-line">
            <p className="text-xs font-black uppercase text-cobalt">Rather not do it yourself?</p>
            <h2 className="mt-4 font-display text-3xl font-black">We'll set it up for {givingCalculator.setupPrice}.</h2>
            <p className="mt-3 leading-7">Matched to your brand, connected to your giving page and added to your site.</p>
            <div className="mt-6">
              <ButtonLink href={givingCalculator.setupCheckoutUrl || "/contact"} variant="dark">Book setup</ButtonLink>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
