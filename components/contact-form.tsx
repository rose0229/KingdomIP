"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const field = "mt-2 w-full rounded-sm border border-ink/20 bg-white px-4 py-3 text-base text-ink focus:border-cobalt focus:outline-none";
const label = "block text-sm font-black uppercase tracking-wide text-ink";

export function ContactForm({ services, preset }: { services: string[]; preset: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).catch(() => null);
    const body = await res?.json().catch(() => ({}));
    if (res?.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setError(body?.error ?? "That didn't send. Please try again, or email hello@kingdomip.org.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-ink bg-lime p-8 text-ink">
        <CheckCircle2 aria-hidden className="h-8 w-8" />
        <h2 className="mt-4 font-display text-3xl font-black">Got it. Thanks.</h2>
        <p className="mt-2 leading-7">We'll reply within two business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className={label}>
          Name
          <input className={field} name="name" required minLength={2} autoComplete="name" />
        </label>
        <label className={label}>
          Email
          <input className={field} name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label className={label}>
        Church or organization <span className="font-bold normal-case text-ink/50">(optional)</span>
        <input className={field} name="organization" autoComplete="organization" />
      </label>
      <label className={label}>
        What can we help with?
        <select className={field} name="topic" defaultValue={preset}>
          <option value="">Not sure yet</option>
          {services.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
          <option value="Giving Calculator">Giving Calculator</option>
          <option value="Sermon Publishing">Sermon Publishing</option>
        </select>
      </label>
      <label className={label}>
        What's going on?
        <textarea className={`${field} min-h-40`} name="message" required minLength={5} placeholder="A few sentences is plenty. Links help." />
      </label>
      <input type="text" name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {status === "error" ? <p className="font-bold text-orange-700" role="alert">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-ink px-6 py-3 text-sm font-black uppercase tracking-wide text-paper transition hover:bg-cobalt disabled:opacity-60"
      >
        {status === "loading" ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : null}
        Send
      </button>
    </form>
  );
}
