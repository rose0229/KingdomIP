import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { givingCalculator, sermonPublishing, services } from "@/lib/content";

export default function HomePage() {
  return (
    <main>
      <section className="home-hero bg-ink text-paper">
        <div className="container relative grid min-h-[690px] items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div className="relative z-10">
            <p className="mb-7 flex items-center gap-3 text-sm font-bold text-lime"><span className="h-px w-10 bg-lime" />Built by a pastor. Used every week.</p>
            <h1 className="max-w-4xl font-display text-6xl font-black leading-[0.91] tracking-[-0.055em] text-balance md:text-8xl xl:text-[6.7rem]">Church work should move people, not paperwork.</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-paper/75 md:text-xl">I build practical tools and systems for churches. They run at Orbit Church in Buckeye, Arizona. You can put them to work in yours.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#choose">Find your starting point</ButtonLink>
              <ButtonLink href="/services" variant="secondary">Talk through a project</ButtonLink>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
            <div className="portrait-slot relative aspect-[4/5] overflow-hidden border border-white/20 bg-[#202326]">
              <div className="absolute inset-0 grid-lines opacity-30" />
              <div className="absolute left-6 top-6 text-xs font-bold uppercase tracking-[0.16em] text-paper/60">A note from Matt</div>
              <div className="absolute inset-x-7 bottom-8 border-l-2 border-lime pl-5">
                <p className="font-display text-3xl font-black leading-tight">“I built these because our church needed them.”</p>
                <p className="mt-3 text-sm text-paper/60">Matt Rose · Pastor, Orbit Church</p>
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 font-display text-[8rem] font-black leading-none text-lime/15" aria-hidden="true">K</div>
            </div>
            <p className="mt-3 text-xs text-paper/45">Matt’s photo goes here. No stock photo stand-in.</p>
          </div>
        </div>
        <div className="border-y border-white/15">
          <div className="container grid grid-cols-2 divide-x divide-white/15 md:grid-cols-4">
            {[["01", "Giving, made practical"], ["02", "Sermons, published"], ["03", "Systems that run"], ["04", "Pastor to pastor"]].map(([n, label]) => <div className="flex min-h-16 items-center gap-3 px-3 text-xs font-bold text-paper/70 md:px-5 md:text-sm" key={n}><span className="text-lime">{n}</span>{label}</div>)}
          </div>
        </div>
      </section>

      <section id="choose" className="bg-paper py-20 md:py-28">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div><p className="mb-4 text-sm font-bold text-cobalt">Choose your starting point</p><h2 className="max-w-md font-display text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">What would help your church right now?</h2></div>
            <p className="max-w-lg text-lg leading-8 text-ink/65 md:justify-self-end">Start with a working tool, see exactly how it works, and decide if it fits your church.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Link href="/resources/giving-calculator" className="path-card group relative flex min-h-[340px] flex-col justify-between overflow-hidden border border-ink/15 bg-white p-7 transition-colors hover:bg-[#f2f5fa] md:p-10">
              <div className="absolute -right-6 -top-10 font-display text-[18rem] font-black leading-none text-cobalt/10" aria-hidden="true">%</div>
              <div className="relative"><p className="text-sm font-bold text-cobalt">01 / Giving Calculator</p><h3 className="mt-8 max-w-md font-display text-4xl font-black leading-[0.98] tracking-[-0.04em] md:text-5xl">I want more people giving regularly.</h3><p className="mt-5 max-w-md leading-7 text-ink/70">Let people explore a giving amount, then carry it straight to your giving page.</p></div>
              <span className="relative mt-8 inline-flex items-center gap-3 text-sm font-black">Explore the calculator <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
            </Link>
            <Link href="/resources/sermon-publishing" className="path-card group relative flex min-h-[340px] flex-col justify-between overflow-hidden border border-ink/15 bg-white p-7 transition-colors hover:bg-[#f3f7ed] md:p-10">
              <div className="absolute -right-5 -top-8 font-display text-[18rem] font-black leading-none text-[#315cff]/10" aria-hidden="true">▶</div>
              <div className="relative"><p className="text-sm font-bold text-[#315cff]">02 / Sermon Publishing</p><h3 className="mt-8 max-w-md font-display text-4xl font-black leading-[0.98] tracking-[-0.04em] md:text-5xl">I want Sunday’s sermon everywhere by lunch.</h3><p className="mt-5 max-w-md leading-7 text-ink/70">One volunteer takes four steps. The sermon and its companion pieces publish automatically.</p></div>
              <span className="relative mt-8 inline-flex items-center gap-3 text-sm font-black">Follow Sunday’s timeline <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-paper md:py-24">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="mb-4 text-sm font-bold text-lime">When the problem is different</p><h2 className="font-display text-4xl font-black tracking-[-0.04em] md:text-6xl">Let’s work on the thing in front of you.</h2><p className="mt-6 max-w-md leading-7 text-paper/65">Four kinds of custom help. Start with a conversation and get a clear scope before work begins.</p><div className="mt-8"><ButtonLink href="/services" variant="secondary">Explore custom work</ButtonLink></div></div>
          <div className="divide-y divide-white/20 border-y border-white/20">
            {services.map((service, i) => <Link href={`/contact?service=${service.slug}`} key={service.slug} className="group flex items-start justify-between gap-5 py-5 transition-colors hover:text-lime"><div className="flex gap-5"><span className="pt-1 text-xs font-bold text-lime/70">0{i + 1}</span><div><h3 className="font-display text-2xl font-black">{service.title}</h3><p className="mt-2 max-w-lg leading-7 text-paper/60">{service.copy}</p></div></div><ArrowDownRight aria-hidden className="mt-1 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></Link>)}
          </div>
        </div>
      </section>

      <section className="bg-lime py-10 text-ink">
        <div className="container flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><p className="max-w-2xl font-display text-3xl font-black tracking-[-0.03em] md:text-4xl">Built in Buckeye, Arizona. Made to work at your church.</p><span className="text-sm font-bold">Giving code {givingCalculator.codePrice} · Sermon kit {sermonPublishing.kitPrice}</span></div>
      </section>
    </main>
  );
}
