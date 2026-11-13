import { CheckoutButton } from "@/components/checkout-button";
import { SectionHeading } from "@/components/section";
import { givingCalculator } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Giving Calculator",
  "The give-page calculator that nearly doubled recurring giving at Orbit Church in three months. It teaches why we give, shows the amount per paycheck and hands people to your giving page with the number ready. Code $19, setup $99.",
  "/resources/giving-calculator"
);

const features = [
  "Teaches a short theology of tithes and offerings before it asks for a number. Rewrite it in your church's words or leave it out.",
  "Works from weekly, biweekly, monthly or annual income.",
  "Shows the tithe and any offering beyond it per paycheck, the way people actually budget.",
  "Copies the amount and opens your giving page so people set up a recurring gift while they're still deciding."
];

const different = [
  {
    title: "It teaches before it asks.",
    copy: "Most tithe calculators do math. This one starts with why. People who understand the why give on purpose, and people who give on purpose set up a recurring gift."
  },
  {
    title: "It ends on your giving page.",
    copy: "A number on a screen doesn't help anyone. The calculator sends people straight to your giving page with the amount ready. On Planning Center it fills in for them."
  },
  {
    title: "It's yours.",
    copy: "One HTML file on your site. No subscription, no account with us, no app for your people to download."
  }
];

const faqs = [
  {
    q: "Does it set up the recurring gift?",
    a: "Your giving platform does that. The calculator gets people to your giving page with a number in hand. On Planning Center the amount fills in for them. On other platforms it's copied so they can paste it."
  },
  {
    q: "Will it work on our website?",
    a: "If your site can take HTML or an embed code, yes. That covers ChurchCo, Squarespace, Wix, WordPress and most custom sites."
  },
  {
    q: "What happens to what people type?",
    a: "Nothing leaves their browser. The math runs on their device, and nothing they enter is stored or sent to you or to us."
  }
];

export default function GivingCalculatorPage() {
  return (
    <main className="bg-paper">
      <section className="border-b border-ink/10 py-20 md:py-28">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <SectionHeading as="h1"
            eyebrow="Resource"
            title="Giving Calculator"
            copy="A give-page tool that teaches the why of generosity, shows people their amount per paycheck and hands them to your giving page with the number ready."
          />
          <div className="rounded-lg border border-accent/40 bg-bone p-5 text-ink/70">
            <p className="font-display text-5xl font-semibold text-accent">Nearly 2x</p>
            <p className="mt-3 leading-7 text-ink">
              Recurring giving at Orbit Church nearly doubled in the three months after we put this on our give page.
            </p>
            <p className="mt-2 text-sm font-bold text-ink/70">Matt Rose, Orbit Church, Buckeye, Arizona</p>
            <a className="mt-4 inline-block text-sm font-semibold uppercase text-accent hover:opacity-80" href={givingCalculator.liveExampleUrl} target="_blank" rel="noopener">
              Try it on Orbit's give page ↗
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="What it does" title="The next step, made obvious." />
            <ul className="mt-8 space-y-4">
              {features.map((item) => (
                <li key={item} className="border-l-2 border-accent pl-4 text-lg leading-8 text-ink/80">{item}</li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="reveal flex flex-col rounded-lg border border-ink/10 bg-bone p-6">
              <p className="text-xs font-semibold uppercase text-accent">Do it yourself</p>
              <h2 className="mt-4 font-display text-3xl font-semibold">Get the code</h2>
              <p className="mt-2 font-display text-5xl font-semibold">{givingCalculator.codePrice}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {["The calculator, one HTML file", "Embed code for website builders", "A setup guide you can drop into ChatGPT or Claude", "Yours to keep. No subscription"].map((item) => (
                  <li className="border-t border-ink/10 pt-3 text-sm font-bold" key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-7">
                <CheckoutButton item="code" variant="ghost">Buy the code</CheckoutButton>
                <p className="mt-3 text-xs font-bold text-ink/70">Instant download. All sales final. <a className="underline" href="/refunds">Refund policy</a></p>
              </div>
            </article>

            <article className="flex flex-col rounded-lg border-2 border-accent bg-paper p-6 text-ink">
              <p className="text-xs font-semibold uppercase text-accent">Done for you</p>
              <h2 className="mt-4 font-display text-3xl font-semibold">Have us set it up</h2>
              <p className="mt-2 font-display text-5xl font-semibold">{givingCalculator.setupPrice}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {["Matched to your colors and fonts", "Connected to your giving page", "Added to your site, or exact steps for your web person", "One round of tweaks"].map((item) => (
                  <li className="border-t border-ink/20 pt-3 text-sm font-bold" key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-7">
                <CheckoutButton item="setup" variant="dark">Book setup</CheckoutButton>
                <p className="mt-3 text-xs font-bold text-ink/70">Full refund if we can't get it working. <a className="underline" href="/refunds">Refund policy</a></p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-bone py-16">
        <div className="container">
          <SectionHeading eyebrow="Why it works" title="Not another tithe calculator." />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {different.map((item) => (
              <div key={item.title} className="rounded-lg border border-ink/10 bg-paper p-6">
                <h3 className="font-display text-2xl font-semibold text-accent">{item.title}</h3>
                <p className="mt-3 leading-7 text-ink/70">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone py-16">
        <div className="container">
          <SectionHeading eyebrow="Questions" title="Before you buy." />
          <dl className="mt-8 grid gap-5 lg:grid-cols-3">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-lg border border-ink/10 bg-paper p-6">
                <dt className="font-display text-2xl font-semibold">{item.q}</dt>
                <dd className="mt-3 leading-7 text-ink/70">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
