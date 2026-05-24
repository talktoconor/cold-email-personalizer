import Stripe from "stripe";

function getStripeClient(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    typescript: true,
  });
}

// Lazily initialized — won't crash if STRIPE_SECRET_KEY is missing
let _stripe: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (_stripe === undefined) {
    _stripe = getStripeClient();
  }
  return _stripe;
}

export const PLANS = {
  free: { name: "Free", emailsPerMonth: 5, price: 0 },
  pro: { name: "Pro", emailsPerMonth: 200, price: 4900 },
  team: { name: "Team", emailsPerMonth: -1, price: 9900 },
  agency: { name: "Agency", emailsPerMonth: -1, price: 29900 },
} as const;

export type PlanId = keyof typeof PLANS;
