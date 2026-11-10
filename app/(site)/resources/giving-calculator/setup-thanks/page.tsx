import type { Metadata } from "next";
import { SectionHeading } from "@/components/section";

export const metadata: Metadata = {
  title: "Setup Booked",
  robots: { index: false, follow: false }
};

const next = [
  "We'll email you within two business days to get started.",
  "We'll match the calculator to your site and connect it to your giving page.",
  "We'll add it to your give page, or send your web person exact steps if we don't have access.",
  "You review it, and we make one round of tweaks."
];

const ready = [
  "Your give page's web address",
  "A login for your website builder, or your web person's email",
  "Your church's wording on giving, if you want the theology section in your own words"
];

export default function SetupThanksPage() {
  return (
    <main className="bg-paper">
      <section className="bg-ink py-20 text-paper dark-grid">
        <div className="container">
          <SectionHeading light eyebrow="You're booked" title="Thanks. We've got it from here." copy="Your payment went through and your setup details came with it." />
        </div>
      </section>
      <section className="py-16">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="What happens next" title="Four steps." />
            <ol className="mt-8 space-y-4">
              {next.map((step, i) => (
                <li key={step} className="flex gap-4 border-t border-ink/15 pt-4 text-lg leading-8 text-ink/80">
                  <span className="font-display text-2xl font-black text-cobalt">0{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading eyebrow="Have these ready" title="Helpful, not required." />
            <ul className="mt-8 space-y-4">
              {ready.map((item) => (
                <li key={item} className="border-l-4 border-cobalt pl-4 text-lg leading-8 text-ink/80">{item}</li>
              ))}
            </ul>
            <p className="mt-8 leading-7 text-ink/65">Questions in the meantime? Email hello@kingdomip.org.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
