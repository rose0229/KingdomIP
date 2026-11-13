import { SectionHeading } from "@/components/section";

export type LegalSection = { heading: string; body: (string | string[])[] };

// Shared layout for the Terms, Privacy and Refund pages.
export function LegalPage({ eyebrow, title, updated, intro, sections }: { eyebrow: string; title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <main className="bg-paper">
      <section className="border-b border-ink/10 py-16 md:py-20">
        <div className="container">
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} copy={intro} />
          <p className="mt-6 text-sm font-bold text-ink/70">Last updated {updated}</p>
        </div>
      </section>
      <section className="py-14">
        <div className="container max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-2xl font-semibold">{s.heading}</h2>
              <div className="mt-3 space-y-3 text-lg leading-8 text-ink/80">
                {s.body.map((b, i) =>
                  Array.isArray(b) ? (
                    <ul key={i} className="list-disc space-y-2 pl-6">
                      {b.map((li) => <li key={li}>{li}</li>)}
                    </ul>
                  ) : (
                    <p key={i}>{b}</p>
                  )
                )}
              </div>
            </div>
          ))}
          <p className="border-t border-ink/10 pt-6 text-ink/70">Questions? Email <a className="font-bold underline" href="mailto:hello@kingdomip.org">hello@kingdomip.org</a>.</p>
        </div>
      </section>
    </main>
  );
}
