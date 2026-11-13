import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { SectionHeading } from "@/components/section";
import { givingCalculator, sermonPublishing, services } from "@/lib/content";

const resources = [
  {
    href: "/resources/giving-calculator",
    title: "Giving Calculator",
    proof: "Nearly 2x",
    proofCopy: "Recurring giving at Orbit Church nearly doubled in the three months after we added it.",
    copy: "A give-page tool that teaches why we give, shows the amount per paycheck and hands people to your giving page with the number ready.",
    prices: `Code ${givingCalculator.codePrice} · Setup ${givingCalculator.setupPrice}`
  },
  {
    href: "/resources/sermon-publishing",
    title: "Sermon Publishing",
    proof: "4 steps",
    proofCopy: "One volunteer does four things on Sunday. Everything else happens on its own.",
    copy: "The sermon goes up on your website with a transcript, summary, discussion guide, podcast episode and Facebook post. No monthly fee to us.",
    prices: `Kit ${sermonPublishing.kitPrice} · Setup ${sermonPublishing.setupPrice}`
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="dark-grid bg-ink text-paper">
        <div className="container py-20 md:py-28">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-lime">Tools and help for churches</p>
          <h1 className="mt-5 max-w-4xl font-display text-6xl font-black leading-[0.9] tracking-normal text-balance md:text-8xl">
            Built at a real church. Ready for yours.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-paper/75">
            Every tool here runs at Orbit Church in Buckeye, Arizona. Buy it and set it up yourself, or have us do it with you.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/resources">See the resources</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">Start a project</ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="container">
          <SectionHeading eyebrow="Resources" title="Pay once. Put it to work this week." />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {resources.map((item) => (
              <Link key={item.href} href={item.href} className="group flex flex-col border border-ink/15 bg-bone p-6 transition hover:border-ink sm:p-8">
                <p className="text-xs font-black uppercase text-cobalt">{item.prices}</p>
                <h2 className="mt-4 font-display text-4xl font-black">{item.title}</h2>
                <div className="mt-5 border-l-4 border-lime bg-ink p-4 text-paper">
                  <p className="font-display text-3xl font-black text-lime">{item.proof}</p>
                  <p className="mt-1 leading-7 text-paper/80">{item.proofCopy}</p>
                </div>
                <p className="mt-5 flex-1 leading-7 text-ink/70">{item.copy}</p>
                <p className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase">
                  Take a look <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-paper">
        <div className="container">
          <SectionHeading light eyebrow="Custom work" title="Need something else?" copy="Tell us what's stuck. We'll tell you whether we can help and what it would take." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <div key={service.slug} className="border border-white/15 bg-white/5 p-6">
                <h3 className="font-display text-2xl font-black text-lime">{service.title}</h3>
                <p className="mt-3 leading-7 text-paper/70">{service.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="/contact">Start a project</ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
