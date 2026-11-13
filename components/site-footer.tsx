import Link from "next/link";
import { navItems } from "@/lib/content";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-bone">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm leading-7 text-ink/70">Tools and help for churches, built at Orbit Church in Buckeye, Arizona.</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/70">Site</h2>
          <div className="mt-4 grid gap-2">
            {navItems.map((item) => (
              <Link className="text-sm text-ink/80 hover:text-accent" key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/70">Contact</h2>
          <a className="mt-4 inline-block text-sm text-ink/80 hover:text-accent" href="mailto:hello@kingdomip.org">hello@kingdomip.org</a>
        </div>
      </div>
      <div className="border-t border-ink/10 py-5">
        <div className="container flex flex-col gap-2 text-xs text-ink/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kingdom IP</p>
          <p className="flex gap-4">
            <Link className="hover:text-accent" href="/terms">Terms</Link>
            <Link className="hover:text-accent" href="/privacy">Privacy</Link>
            <Link className="hover:text-accent" href="/refunds">Refunds</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
