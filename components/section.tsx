import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-xs font-black uppercase tracking-[0.2em] text-cobalt", className)}>{children}</p>;
}

export function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow?: string; title: string; copy?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <Eyebrow className={light ? "text-lime" : undefined}>{eyebrow}</Eyebrow> : null}
      <h2 className={cn("mt-3 font-display text-4xl font-black leading-[0.95] tracking-normal md:text-6xl", light ? "text-paper" : "text-ink")}>{title}</h2>
      {copy ? <p className={cn("mt-5 text-lg leading-8", light ? "text-paper/72" : "text-ink/70")}>{copy}</p> : null}
    </div>
  );
}
