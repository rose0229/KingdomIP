import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section";
import { services } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Start a Project", "Tell Kingdom IP what you need. One short form, and a reply within two business days.", "/contact");

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const preset = services.find((item) => item.slug === service)?.title ?? "";

  return (
    <main className="bg-paper">
      <section className="border-b border-ink/10 py-20 md:py-28">
        <div className="container">
          <SectionHeading as="h1" eyebrow="Start a project" title="Tell us what's stuck." copy="One short form. We reply within two business days." />
        </div>
      </section>
      <section className="py-16">
        <div className="container max-w-2xl">
          <ContactForm services={services.map((item) => item.title)} preset={preset} />
        </div>
      </section>
    </main>
  );
}
