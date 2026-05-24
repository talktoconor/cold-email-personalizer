"use client";

import { useState } from "react";
import Link from "next/link";

type PricingButtonProps = {
  planName: string;
  priceId?: string;
  planId: string;
  ctaText: string;
  highlighted?: boolean;
};

const PRICE_IDS: Record<string, string | undefined> = {
  pro: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
  team: process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM,
  agency: process.env.NEXT_PUBLIC_STRIPE_PRICE_AGENCY,
};

export function PricingButton({
  planName,
  planId,
  ctaText,
  highlighted = false,
}: PricingButtonProps) {
  const [loading, setLoading] = useState(false);

  const priceId = PRICE_IDS[planId];
  const stripeConfigured = !!priceId;

  const baseClasses = `block w-full text-center py-2.5 rounded-lg font-medium transition-all`;
  const highlightedClasses = highlighted
    ? "btn-primary text-white"
    : "border border-border hover:border-border-light hover:bg-surface-light text-foreground";

  // Free plan always links to /app
  if (planId === "free") {
    return (
      <Link href="/app" className={`${baseClasses} ${highlightedClasses}`}>
        {ctaText}
      </Link>
    );
  }

  // If Stripe is not configured, fall back to linking to /app
  if (!stripeConfigured) {
    return (
      <Link href="/app" className={`${baseClasses} ${highlightedClasses}`}>
        {ctaText}
      </Link>
    );
  }

  async function handleCheckout() {
    if (loading || !priceId) return;
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, planId }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Checkout error:", data.error);
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`${baseClasses} ${highlightedClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        ctaText
      )}
    </button>
  );
}
