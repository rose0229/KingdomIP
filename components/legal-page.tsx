import { SectionHeading } from "@/components/section";

export type LegalSection = { heading: string; body: (string | string[])[] };

// Shared layout for the Terms, Privacy and Refund pages.
export function LegalPage({ eyebrow, title, updated, intro, sections }: { eyebrow: string; title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <main className="bg-paper">
      <section className="bg-ink py-16 text-paper dark-grid">
        <div className="container">
          <SectionHeading light eyebrow={eyebrow} title={title} copy={intro} />
          <p className="mt-6 text-sm font-bold text-paper/60">Last updated {updated}</p>
        </div>
      </section>
      <section className="py-14">
        <div className="container max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-2xl font-black">{s.heading}</h2>
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
          <p className="border-t border-ink/15 pt-6 text-ink/70">Questions? Email <a className="font-bold underline" href="mailto:hello@kingdomip.org">hello@kingdomip.org</a>.</p>
        </div>
      </section>
    </main>
  );
}
