import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-xs font-semibold uppercase tracking-[0.18em] text-accent", className)}>{children}</p>;
}

// `light` is kept so older pages compile; every section is on a light or
// theme-aware background now, so it no longer changes anything.
export function SectionHeading({ eyebrow, title, copy, as = "h2" }: { eyebrow?: string; title: string; copy?: string; light?: boolean; as?: "h1" | "h2" }) {
  const Heading = as;
  return (
    <div className="max-w-3xl">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading className="mt-3 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-ink md:text-6xl">{title}</Heading>
      {copy ? <p className="mt-5 text-lg leading-8 text-ink/70">{copy}</p> : null}
    </div>
  );
}
