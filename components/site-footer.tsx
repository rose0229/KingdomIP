import Link from "next/link";
import { navItems } from "@/lib/content";
import { ButtonLink } from "@/components/button";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink text-paper">
      <div className="container grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-md text-base leading-7 text-paper/70">
            Clear diagnosis. Practical next steps. Project strategy for churches, ministries, and purpose-driven organizations.
          </p>
          <ButtonLink href="/contact" variant="secondary">
            Start the Intake
          </ButtonLink>
        </div>
        <div>
          <h2 className="text-sm font-black uppercase text-lime">Navigate</h2>
          <div className="mt-4 grid gap-2">
            {navItems.map((item) => (
              <Link className="text-sm text-paper/72 hover:text-lime" key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-black uppercase text-lime">Contact</h2>
          <div className="mt-4 space-y-2 text-sm text-paper/72">
            <p>hello@kingdomip.org</p>
            <p>kingdomip.org</p>
            <p>Start with a quick intake and Kingdom IP will recommend the right next step.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container flex flex-col gap-2 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kingdom IP. All rights reserved.</p>
          <p>Built for diagnosis, clarity, and action.</p>
        </div>
      </div>
    </footer>
  );
}
