"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/content";
import { ButtonLink } from "@/components/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              className={cn("py-2 text-sm font-medium text-ink/70 transition hover:text-ink", pathname.startsWith(item.href) && "text-ink underline decoration-accent decoration-2 underline-offset-8")}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/contact" className="min-h-10 px-5 py-2">
            Start a project
          </ButtonLink>
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-ink/10 bg-paper md:hidden">
          <nav className="container grid gap-1 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="border-b border-ink/10 py-3 text-base font-medium text-ink" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div onClick={() => setOpen(false)}>
              <ButtonLink href="/contact" className="mt-4 w-full">
                Start a project
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
