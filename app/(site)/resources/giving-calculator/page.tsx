import { ButtonLink } from "@/components/button";
import { SectionHeading } from "@/components/section";
import { givingCalculator } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Giving Calculator",
  "A give-page calculator for churches. It teaches the why of generosity, shows the amount per paycheck and sends people to your giving page with the number ready. Code $10, setup $50.",
  "/resources/giving-calculator"
);

const features = [
  "Teaches a short theology of tithes and offerings. Rewrite it in your church's words or leave it out.",
  "Works from weekly, biweekly, monthly or annual income.",
  "Shows the tithe and any offering beyond it, per paycheck.",
  "Copies the amount and opens your giving page so people can set up a recurring gift."
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
  const codeHref = givingCalculator.codeCheckoutUrl || "/contact";
  const setupHref = givingCalculator.setupCheckoutUrl || "/contact";

  return (
    <main className="bg-paper">
      <section className="bg-ink py-20 text-paper dark-grid">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <SectionHeading
            light
            eyebrow="Resource"
            title="Giving Calculator"
            copy="A give-page tool that teaches the why of generosity, shows people their amount per paycheck and sends them to your giving page with the number ready."
          />
          <div className="border border-white/15 bg-white/5 p-5 text-paper/72">
            <p className="font-bold text-paper">See it on a live church site</p>
            <p className="mt-2 leading-7">It's running on a church give page right now. Try it before you buy.</p>
            <a className="mt-4 inline-block text-sm font-black uppercase text-lime hover:text-bone" href={givingCalculator.liveExampleUrl} target="_blank" rel="noopener">
              Open the live example ↗
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
                <li key={item} className="border-l-4 border-cobalt pl-4 text-lg leading-8 text-ink/80">{item}</li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="flex flex-col border border-ink/15 bg-bone p-6">
              <p className="text-xs font-black uppercase text-cobalt">Do it yourself</p>
              <h2 className="mt-4 font-display text-3xl font-black">Get the code</h2>
              <p className="mt-2 font-display text-5xl font-black">{givingCalculator.codePrice}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {["The calculator, one HTML file", "Embed code for website builders", "A setup guide you can drop into ChatGPT or Claude"].map((item) => (
                  <li className="border-t border-ink/15 pt-3 text-sm font-bold" key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-7">
                <ButtonLink href={codeHref} variant="ghost">Buy the code</ButtonLink>
              </div>
            </article>

            <article className="flex flex-col border border-ink bg-lime p-6 text-ink shadow-line">
              <p className="text-xs font-black uppercase text-cobalt">Done for you</p>
              <h2 className="mt-4 font-display text-3xl font-black">Have us set it up</h2>
              <p className="mt-2 font-display text-5xl font-black">{givingCalculator.setupPrice}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {["Matched to your colors and fonts", "Connected to your giving page", "Added to your site, or exact steps for your web person", "One round of tweaks"].map((item) => (
                  <li className="border-t border-ink/20 pt-3 text-sm font-bold" key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-7">
                <ButtonLink href={setupHref} variant="dark">Book setup</ButtonLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-bone py-16">
        <div className="container">
          <SectionHeading eyebrow="Questions" title="Before you buy." />
          <dl className="mt-8 grid gap-5 lg:grid-cols-3">
            {faqs.map((item) => (
              <div key={item.q} className="border border-ink/15 bg-paper p-6">
                <dt className="font-display text-2xl font-black">{item.q}</dt>
                <dd className="mt-3 leading-7 text-ink/72">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
