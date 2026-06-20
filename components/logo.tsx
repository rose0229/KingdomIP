import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Kingdom IP home">
      <span className="grid h-10 w-10 place-items-center border border-lime bg-ink text-sm font-black text-lime">
        K<span className="sr-only">ingdom</span>
      </span>
      <span className="font-display text-xl font-black uppercase leading-none tracking-normal text-paper">
        Kingdom <span className="text-lime">IP</span>
      </span>
    </Link>
  );
}
