import type { Metadata } from "next";
import { SectionHeading } from "@/components/section";

export const metadata: Metadata = {
  title: "Sermon Publishing Setup Booked",
  robots: { index: false, follow: false }
};

const next = [
  "We'll email you within two business days to schedule the first build session.",
  "On the call, we build it together on your accounts and test it on an old sermon.",
  "Once you're happy with the test, we turn it on and walk your Sunday volunteer through the four steps.",
  "For 30 days after launch, we fix anything that breaks."
];

const ready = [
  "Owner access to your YouTube channel",
  "Admin access to your website",
  "Admin access to your Facebook Page, if you want the posts",
  "A login for your podcast host, if you have one",
  "Where your editor saves the audio (Google Drive, Dropbox or OneDrive)"
];

export default function SermonSetupThanksPage() {
  return (
    <main className="bg-paper">
      <section className="border-b border-ink/10 py-20 md:py-28">
        <div className="container">
          <SectionHeading as="h1" eyebrow="You're booked" title="Thanks. We'll be in touch soon." copy="Your payment went through and your church's details came with it." />
        </div>
      </section>
      <section className="py-16">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="What happens next" title="Four steps." />
            <ol className="mt-8 space-y-4">
              {next.map((step, i) => (
                <li key={step} className="flex gap-4 border-t border-ink/10 pt-4 text-lg leading-8 text-ink/80">
                  <span className="font-display text-2xl font-semibold text-accent">0{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading eyebrow="Have these on the call" title="The people with the keys." />
            <ul className="mt-8 space-y-4">
              {ready.map((item) => (
                <li key={item} className="border-l-2 border-accent pl-4 text-lg leading-8 text-ink/80">{item}</li>
              ))}
            </ul>
            <p className="mt-8 leading-7 text-ink/70">Never email us a password. We'll set up access together on the call. Questions in the meantime? Email hello@kingdomip.org.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
