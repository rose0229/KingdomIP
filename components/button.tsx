import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-black uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime",
        variant === "primary" && "bg-lime text-ink hover:bg-bone",
        variant === "secondary" && "border border-lime/60 text-lime hover:bg-lime hover:text-ink",
        variant === "ghost" && "border border-ink/15 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
        variant === "dark" && "bg-ink text-paper hover:bg-cobalt",
        className
      )}
    >
      {children}
      <ArrowRight aria-hidden className="h-4 w-4" />
    </Link>
  );
}
