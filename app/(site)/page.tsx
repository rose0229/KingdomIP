import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { Eyebrow } from "@/components/section";
import { givingCalculator, sermonPublishing, services } from "@/lib/content";

const resources = [
  {
    href: "/resources/giving-calculator",
    title: "Giving Calculator",
    proof: "Nearly 2x",
    proofCopy: "recurring giving at Orbit Church in the three months after we added it.",
    copy: "A give-page tool that teaches why we give, shows the amount per paycheck and hands people to your giving page with the number ready.",
    prices: `Code ${givingCalculator.codePrice} · Setup ${givingCalculator.setupPrice}`
  },
  {
    href: "/resources/sermon-publishing",
    title: "Sermon Publishing",
    proof: "4 steps",
    proofCopy: "from one volunteer on Sunday. Everything else happens on its own.",
    copy: "The sermon goes up on your website with a transcript, summary, discussion guide, podcast episode and Facebook post. No monthly fee to us.",
    prices: `Kit ${sermonPublishing.kitPrice} · Setup ${sermonPublishing.setupPrice}`
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-ink/10">
        <div className="container py-20 md:py-32">
          <Eyebrow>Tools and help for churches</Eyebrow>
          <h1 className="mt-6 max-w-5xl font-display text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
            Built at a real church. <span className="italic text-accent">Ready for yours.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-ink/70">
            Every tool here runs at Orbit Church in Buckeye, Arizona. Buy it and set it up yourself, or have us do it with you.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/resources">See the resources</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">Start a project</ButtonLink>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <Eyebrow>Resources</Eyebrow>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">Pay once. Put it to work this week.</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {resources.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="reveal group flex flex-col rounded-2xl border border-ink/10 bg-bone p-8 transition duration-300 ease-calm hover:-translate-y-1 hover:border-ink/30 md:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/70">{item.prices}</p>
                <h3 className="mt-4 font-display text-4xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-8 font-display text-6xl font-semibold tracking-tight text-accent md:text-7xl">{item.proof}</p>
                <p className="mt-2 max-w-sm leading-7 text-ink/80">{item.proofCopy}</p>
                <p className="mt-8 flex-1 leading-7 text-ink/70">{item.copy}</p>
                <p className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                  Take a look <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-bone py-20 md:py-28">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Custom work</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">Need something else?</h2>
            <p className="mt-5 text-lg leading-8 text-ink/70">Tell us what's stuck. We'll tell you whether we can help and what it would take.</p>
            <div className="mt-8">
              <ButtonLink href="/contact">Start a project</ButtonLink>
            </div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {services.map((service) => (
              <Link key={service.slug} href={`/services#${service.slug}`} className="reveal group bg-paper p-6 transition hover:bg-bone md:p-8">
                <h3 className="font-display text-2xl font-semibold tracking-tight group-hover:text-accent">{service.title}</h3>
                <p className="mt-3 leading-7 text-ink/70">{service.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
