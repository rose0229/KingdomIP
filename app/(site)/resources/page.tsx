import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section";
import { givingCalculator, sermonPublishing } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Resources", "Practical tools for churches from Kingdom IP. Pay once and put them to work this week.", "/resources");

const resources = [
  {
    href: "/resources/giving-calculator",
    eyebrow: `Code ${givingCalculator.codePrice} · Setup ${givingCalculator.setupPrice}`,
    title: "Giving Calculator",
    copy: "A give-page tool that shows people their giving per paycheck and walks them toward a recurring gift."
  },
  {
    href: "/resources/sermon-publishing",
    eyebrow: `Kit ${sermonPublishing.kitPrice} · Setup ${sermonPublishing.setupPrice}`,
    title: "Sermon Publishing",
    copy: "Publish the sermon on YouTube and the rest happens on its own: website page, transcript, summary, discussion guide, podcast episode and Facebook post."
  }
];

export default function ResourcesPage() {
  return (
    <main className="bg-paper">
      <section className="border-b border-ink/10 py-20 md:py-28">
        <div className="container">
          <SectionHeading as="h1" eyebrow="Resources" title="Tools you can use this week." copy="Built for real church problems and tested on a real church website. Buy it and do it yourself, or have us set it up." />
        </div>
      </section>
      <section className="py-16">
        <div className="container grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((item) => (
            <Link key={item.href} href={item.href} className="group border border-ink/10 bg-bone p-6 transition hover:border-ink">
              <p className="text-xs font-semibold uppercase text-accent">{item.eyebrow}</p>
              <h2 className="mt-4 font-display text-3xl font-semibold">{item.title}</h2>
              <p className="mt-3 leading-7 text-ink/70">{item.copy}</p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase">
                Take a look <ArrowRight aria-hidden className="h-4 w-4 transition group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
