import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Kingdom IP home">
      <span aria-hidden className="grid h-9 w-9 place-items-center rounded-sm bg-accent font-display text-lg font-semibold text-on-accent">
        K
      </span>
      <span className="font-display text-xl font-semibold leading-none text-ink">Kingdom IP</span>
    </Link>
  );
}
