import { InquiryForm } from "@/components/inquiry-form";
import { SectionHeading } from "@/components/section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Get Started", "Start a Kingdom IP audit or consulting inquiry with a polished multi-step intake form.", "/contact");

export default function ContactPage() {
  return (
    <main className="bg-paper">
      <section className="bg-ink py-20 text-paper dark-grid">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading light eyebrow="Get started" title="Tell us what needs clarity." copy="Share the basic shape of the organization, the pressure point, and the services you are considering. The next step is a scoped recommendation." />
          <div className="border border-white/15 bg-white/5 p-5 text-paper/72">
            <p className="font-bold">Response expectation</p>
            <p className="mt-2 leading-7">Most inquiries receive a reply within two business days. Replace this line in Sanity if the operating rhythm changes.</p>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="space-y-5">
            {["Get a clearer picture.", "Find the friction.", "Know what to fix first."].map((line) => (
              <p key={line} className="border-l-4 border-cobalt pl-4 font-display text-3xl font-black">{line}</p>
            ))}
          </aside>
          <InquiryForm />
        </div>
      </section>
    </main>
  );
}
