"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { cn } from "@/lib/utils";

type Item = "code" | "setup";

let stripePromise: Promise<Stripe | null> | null = null;
function getStripeJs() {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) return null;
  stripePromise ??= loadStripe(key);
  return stripePromise;
}

// Opens Stripe's payment form in a panel on this page. Buyers never leave
// kingdomip.org; Stripe sends them to the download or setup page when done.
export function CheckoutButton({
  item,
  children,
  variant = "primary",
  className
}: {
  item: Item;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stripe = getStripeJs();

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.clientSecret) {
      setError(data.error ?? "Checkout didn't open. Please try again, or email hello@kingdomip.org.");
      throw new Error("checkout failed");
    }
    return data.clientSecret as string;
  }, [item]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError(stripe ? null : "Checkout isn't set up yet. Please email hello@kingdomip.org.");
          setOpen(true);
        }}
        className={cn(
          "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-black uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime",
          variant === "primary" && "bg-lime text-ink hover:bg-bone",
          variant === "ghost" && "border border-ink/15 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
          variant === "dark" && "bg-ink text-paper hover:bg-cobalt",
          className
        )}
      >
        {children}
        <ArrowRight aria-hidden className="h-4 w-4" />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item === "code" ? "Buy the Giving Calculator code" : "Book Giving Calculator setup"}
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/70 p-4 sm:p-8"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="relative w-full max-w-xl rounded-sm bg-white p-4 shadow-2xl sm:p-6">
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center text-ink hover:bg-ink/5"
              aria-label="Close checkout"
            >
              <X aria-hidden className="h-5 w-5" />
            </button>
            <p className="pr-10 text-xs leading-5 text-ink/60">
              By paying you agree to our <a className="underline" href="/terms" target="_blank" rel="noopener">Terms</a> and <a className="underline" href="/refunds" target="_blank" rel="noopener">Refund Policy</a>.
            </p>
            <div className="pt-4">
              {error ? (
                <p className="p-4 font-bold text-ink">{error}</p>
              ) : stripe ? (
                <EmbeddedCheckoutProvider stripe={stripe} options={{ fetchClientSecret }}>
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
