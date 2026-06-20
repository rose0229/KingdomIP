import { ButtonLink } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section";
import { pageMetadata } from "@/lib/seo";
import { packages, serviceCategories } from "@/lib/content";
import { siteUrl } from "@/lib/utils";

export const metadata = pageMetadata("Services", "Kingdom IP project lanes for audits, strategy, communication, AI workflows, sermon review, and ministry consulting.", "/services");

export default function ServicesPage() {
  return (
    <main className="bg-paper">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: serviceCategories.flatMap((category) => category.services).map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: { "@type": "Service", name: service.title, description: service.description, provider: { "@type": "Organization", name: "Kingdom IP", url: siteUrl } }
          }))
        }}
      />
      <section className="bg-ink py-20 text-paper dark-grid">
        <div className="container">
          <SectionHeading light eyebrow="Services" title="Start with the right lane." copy="Choose the project area that best matches what you need. The intake keeps the first step quick, then asks follow-up questions only for the services you select." />
        </div>
      </section>
      <section className="border-b border-ink/10 bg-lime py-8">
        <div className="container">
          <p className="max-w-4xl text-lg font-bold leading-8 text-ink">
            The first step is intentionally short. Service-specific questions come later only when they help Kingdom IP respond faster, understand the work, and recommend the right scope.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container space-y-14">
          {serviceCategories.map((category) => (
            <div key={category.title}>
              <div className="mb-6 max-w-3xl">
                <p className="text-xs font-black uppercase text-cobalt">{category.title}</p>
                <p className="mt-2 text-lg leading-8 text-ink/70">{category.description}</p>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                {category.services.map((service) => (
                  <article id={service.slug} key={service.title} className="border border-ink/15 bg-bone p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="font-display text-3xl font-black">{service.title}</h2>
                        <p className="mt-2 text-sm font-black uppercase text-cobalt">{service.price} · {service.timeline}</p>
                      </div>
                      <ButtonLink href={`/contact?service=${service.slug}`} variant="ghost" className="sm:shrink-0">Inquire</ButtonLink>
                    </div>
                    <dl className="mt-6 grid gap-4">
                      <div><dt className="text-xs font-black uppercase text-ink/45">Who it is for</dt><dd className="mt-1 leading-7 text-ink/72">{service.who}</dd></div>
                      <div><dt className="text-xs font-black uppercase text-ink/45">What is evaluated</dt><dd className="mt-1 leading-7 text-ink/72">{service.evaluated}</dd></div>
                      <div><dt className="text-xs font-black uppercase text-ink/45">What you receive</dt><dd className="mt-1 leading-7 text-ink/72">{service.receives}</dd></div>
                    </dl>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="packages" className="bg-bone py-16">
        <div className="container">
          <SectionHeading eyebrow="Packages" title="Start small. Go deeper when it makes sense." copy="Use these as pricing and scope anchors. The intake form captures the details needed to confirm the right fit." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((pkg) => (
              <article key={pkg.name} className={`border p-6 ${pkg.featured ? "border-ink bg-lime text-ink shadow-line" : "border-ink/15 bg-paper"}`}>
                <p className="text-xs font-black uppercase text-cobalt">{pkg.eyebrow}</p>
                <h2 className="mt-4 font-display text-3xl font-black">{pkg.name}</h2>
                <p className="mt-4 text-4xl font-black">{pkg.price}</p>
                <p className="mt-5 font-bold leading-7">{pkg.description}</p>
                <ul className="mt-6 space-y-3">
                  {pkg.includes.slice(0, 4).map((item) => <li className="border-t border-ink/15 pt-3 text-sm font-bold" key={item}>{item}</li>)}
                </ul>
                <div className="mt-7">
                  <ButtonLink href={`/contact?package=${pkg.name.toLowerCase().replaceAll(" ", "-")}`} variant={pkg.featured ? "dark" : "ghost"}>Start Intake</ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
