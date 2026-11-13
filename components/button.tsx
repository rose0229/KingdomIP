import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
};

export const buttonStyles = {
  base: "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 ease-calm",
  primary: "bg-accent text-on-accent hover:opacity-90",
  secondary: "border border-ink/25 text-ink hover:border-ink",
  ghost: "border border-ink/25 text-ink hover:border-ink",
  dark: "bg-ink text-paper hover:opacity-90"
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(buttonStyles.base, buttonStyles[variant], className)}>
      {children}
      <ArrowRight aria-hidden className="h-4 w-4" />
    </Link>
  );
}
