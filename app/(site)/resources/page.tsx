import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section";
import { givingCalculator } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Resources", "Practical tools for churches from Kingdom IP. Pay once and put them to work this week.", "/resources");

const resources = [
  {
    href: "/resources/giving-calculator",
    eyebrow: `Code ${givingCalculator.codePrice} · Setup ${givingCalculator.setupPrice}`,
    title: "Giving Calculator",
    copy: "A give-page tool that shows people their giving per paycheck and walks them toward a recurring gift."
  }
];

export default function ResourcesPage() {
  return (
    <main className="bg-paper">
      <section className="bg-ink py-20 text-paper dark-grid">
        <div className="container">
          <SectionHeading light eyebrow="Resources" title="Tools you can use this week." copy="Built for real church problems and tested on a real church website. Buy it and do it yourself, or have us set it up." />
        </div>
      </section>
      <section className="py-16">
        <div className="container grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((item) => (
            <Link key={item.href} href={item.href} className="group border border-ink/15 bg-bone p-6 transition hover:border-ink">
              <p className="text-xs font-black uppercase text-cobalt">{item.eyebrow}</p>
              <h2 className="mt-4 font-display text-3xl font-black">{item.title}</h2>
              <p className="mt-3 leading-7 text-ink/72">{item.copy}</p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase">
                Take a look <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
