import Link from "next/link";
import { ArrowRight, CheckCircle2, SearchCheck, Waypoints } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { DiagnosticVisual } from "@/components/diagnostic-visual";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section";
import { coreServices, faqs, packages } from "@/lib/content";

export default function HomePage() {
  const featured = packages.find((pkg) => pkg.featured) ?? packages[0];

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } }))
        }}
      />
      <section className="dark-grid bg-ink text-paper">
        <div className="container grid min-h-[calc(100vh-80px)] items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-lime">Church audits, strategy, and practical systems</p>
            <h1 className="mt-5 max-w-4xl font-display text-6xl font-black leading-[0.88] tracking-normal text-balance md:text-8xl">
              Find What&apos;s Holding Your Church Back.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-paper/75">
              Kingdom IP gives churches and purpose-driven organizations a clear, honest look at what is working, what is weak, and what to do next.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Start a Project</ButtonLink>
              <ButtonLink href="/services" variant="secondary">Explore Services</ButtonLink>
            </div>
          </div>
          <DiagnosticVisual />
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="container">
          <SectionHeading eyebrow="The process" title="Stop guessing. Start seeing." copy="A useful audit does not pretend to solve everything. It names the friction inside a clear scope, ranks the priorities, and gives your team practical next steps." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Assess", "We review the agreed material: pages, sermons, workflows, follow-up language, channels, and available data."],
              ["Diagnose", "We separate symptoms from causes and show where confusion, drag, or missed opportunity is showing up."],
              ["Prioritize", "You receive a clear roadmap so your team knows what to fix first and what can wait."]
            ].map(([title, copy]) => (
              <div key={title} className="border border-ink/15 bg-bone p-6">
                <SearchCheck className="h-7 w-7 text-cobalt" aria-hidden />
                <h2 className="mt-5 font-display text-2xl font-black">{title}</h2>
                <p className="mt-3 leading-7 text-ink/70">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone py-20">
        <div className="container">
          <SectionHeading eyebrow="Services" title="Choose the lane that fits." copy="Start with a quick inquiry, then answer only the follow-up questions tied to what you select. Kingdom IP can respond with a better scope when the intake matches the work." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {coreServices.map((service) => (
              <Link key={service.title} href={`/services#${service.slug}`} className="group border border-ink/15 bg-paper p-6 transition hover:-translate-y-1 hover:border-cobalt hover:shadow-line">
                <p className="text-xs font-black uppercase text-cobalt">{service.timeline}</p>
                <h3 className="mt-4 font-display text-2xl font-black">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/68">{service.who}</p>
                <ArrowRight className="mt-6 h-5 w-5 transition group-hover:translate-x-1" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-paper">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading light eyebrow="What you get" title="A report your team can actually use." copy="Clear diagnosis inside a believable scope. Practical next steps. No inflated promises. No vague language." />
          <div className="grid gap-4 sm:grid-cols-2">
            {["Scorecards that make weak spots visible", "Priority roadmap with what to fix first", "Specific findings, not generic observations", "Debrief option for leadership alignment", "Implementation-ready next steps", "A clear boundary around what was and was not reviewed"].map((item) => (
              <div key={item} className="flex gap-3 border border-white/12 p-4">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-lime" aria-hidden />
                <p className="font-bold text-paper/82">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
          <SectionHeading eyebrow="Why Kingdom IP" title="Clarity over fluff." copy="Your church does not need a giant menu of theoretical consulting. It needs a clear read on the next right issue." />
            <div className="mt-8 space-y-4">
              {["Honest diagnosis without cynicism.", "Practical recommendations that account for real church capacity.", "A scope small enough to be useful.", "Biblical conviction paired with operational excellence."].map((item) => (
                <p key={item} className="border-l-4 border-cobalt pl-4 text-lg font-bold text-ink/80">{item}</p>
              ))}
            </div>
          </div>
          <div className="border border-ink/15 bg-bone p-8">
            <p className="text-xs font-black uppercase text-cobalt">Example client note</p>
            <blockquote className="mt-6 font-display text-3xl font-black leading-tight">
              “Kingdom IP helped us see the friction we had normalized and gave us a plan our team could act on immediately.”
            </blockquote>
            <p className="mt-5 text-sm font-bold text-ink/60">Sample quote format. Replace with an approved client quote before launch.</p>
          </div>
        </div>
      </section>

      <section className="bg-bone py-20">
        <div className="container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading eyebrow="Featured package" title={featured.name} copy={featured.description} />
          <div className="border-2 border-ink bg-lime p-8 text-ink">
            <p className="text-sm font-black uppercase">{featured.eyebrow}</p>
            <p className="mt-4 text-lg font-bold">{featured.bestFor}</p>
            <div className="mt-6 grid gap-2">
              {featured.includes.map((item) => (
                <p key={item} className="flex gap-2 font-bold"><Waypoints className="h-5 w-5 shrink-0" aria-hidden /> {item}</p>
              ))}
            </div>
            <div className="mt-8">
              <ButtonLink href="/services#packages" variant="dark">Compare Packages</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="container">
          <SectionHeading eyebrow="FAQ" title="A few honest answers." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqs.slice(0, 4).map(([question, answer]) => (
              <div key={question} className="border border-ink/15 p-6">
                <h3 className="font-display text-xl font-black">{question}</h3>
                <p className="mt-3 leading-7 text-ink/70">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cobalt py-16 text-paper">
        <div className="container flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-lime">Ready for a clearer picture?</p>
            <h2 className="mt-3 font-display text-4xl font-black md:text-6xl">Know what to fix first.</h2>
          </div>
          <ButtonLink href="/contact">Start a Project</ButtonLink>
        </div>
      </section>
    </main>
  );
}
