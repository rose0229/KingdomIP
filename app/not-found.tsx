import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <main className="bg-paper py-24">
      <div className="container">
        <p className="text-sm font-black uppercase text-cobalt">404</p>
        <h1 className="mt-3 font-display text-5xl font-black">This page is not on the map.</h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-ink/70">Head back to the services overview or start an intake for the audit you need.</p>
        <div className="mt-8">
          <ButtonLink href="/services" variant="dark">
            Explore Services
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
