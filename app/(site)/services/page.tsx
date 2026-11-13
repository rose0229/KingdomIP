import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { SectionHeading } from "@/components/section";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/content";

export const metadata = pageMetadata(
  "Services",
  "Custom help for churches: website and communication, sermon review, ministry strategy and AI systems.",
  "/services"
);

export default function ServicesPage() {
  return (
    <main className="bg-paper">
      <section className="border-b border-ink/10 py-20 md:py-28">
        <div className="container">
          <SectionHeading as="h1"
            eyebrow="Services"
            title="Custom help for your church."
            copy="Every project starts with a short conversation. You tell us what's stuck, and we send back a clear scope and price before any work starts."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article id={service.slug} key={service.slug} className="reveal flex flex-col rounded-2xl border border-ink/10 bg-bone p-6 sm:p-8">
              <h2 className="font-display text-3xl font-semibold">{service.title}</h2>
              <p className="mt-3 flex-1 text-lg leading-8 text-ink/70">{service.copy}</p>
              <div className="mt-6">
                <ButtonLink href={`/contact?service=${service.slug}`} variant="ghost">Ask about this</ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-bone py-16">
        <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Rather start with a tool?</h2>
            <p className="mt-2 leading-7 text-ink/70">The Giving Calculator and Sermon Publishing kit are ready now.</p>
          </div>
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-semibold uppercase hover:text-accent">
            See the resources <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
