"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/content";
import { ButtonLink } from "@/components/button";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-ink/96 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-paper/82 transition hover:border-lime/50 hover:bg-lime/10 hover:text-lime"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <ButtonLink href="/contact" className="min-h-10 px-4 py-2 text-xs">
            Start a Project
          </ButtonLink>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-paper lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-ink lg:hidden">
          <nav className="container grid gap-1 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="border-b border-white/10 py-3 text-base font-bold text-paper" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div onClick={() => setOpen(false)}>
              <ButtonLink href="/contact" className="mt-3">
                Start a Project
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
