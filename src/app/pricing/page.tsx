import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { productSchema, breadcrumbSchema, faqSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "SpearFisher pricing plans. Free tier with 5 emails/month. Pro at $49/mo for 200 emails. Team at $99/seat. Agency at $299/mo with white-label and API.",
  alternates: { canonical: "https://spearfisher.app/pricing" },
  openGraph: {
    title: "SpearFisher Pricing — Plans for Every Sales Team",
    description:
      "Start free with 5 personalized emails/month. Upgrade to Pro for 200/mo. Team and Agency plans available.",
    url: "https://spearfisher.app/pricing",
  },
};

function CheckIcon({ className = "text-indigo-400" }: { className?: string }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

const pricingFaqs = [
  {
    question: "Can I try SpearFisher for free?",
    answer:
      "Yes. The free tier gives you 5 personalized emails per month with basic personalization. No credit card required.",
  },
  {
    question: "What happens when I hit my email limit?",
    answer:
      "You'll see a prompt to upgrade. Your generated emails are saved, and you can continue where you left off after upgrading or waiting for the next billing cycle.",
  },
  {
    question: "Do you offer annual billing?",
    answer:
      "Yes. Annual billing saves you 20% — that's 2 months free. Available on Pro, Team, and Agency plans.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. No contracts, no cancellation fees. Cancel from your dashboard and you'll retain access through the end of your billing period.",
  },
  {
    question: "What's included in the 14-day Pro trial?",
    answer:
      "Full access to all Pro features: 200 emails/month, advanced personalization with company news, tech stack detection, hiring signals, and funding data. No credit card required.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "Try it out",
    features: [
      "5 personalized emails/month",
      "3 variants per generation",
      "Basic personalization",
      "Copy to clipboard",
    ],
    cta: "Get Started Free",
    ctaHref: "/app",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For serious SDRs",
    annualPrice: "$39",
    features: [
      "200 personalized emails/month",
      "Advanced personalization",
      "Company news & funding data",
      "Tech stack detection",
      "Hiring signal analysis",
      "No watermark",
      "Email templates library",
      "Performance analytics",
    ],
    cta: "Start 14-Day Free Trial",
    ctaHref: "/app",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Team",
    price: "$99",
    period: "/seat/mo",
    description: "For sales teams",
    annualPrice: "$79",
    features: [
      "Unlimited emails",
      "Everything in Pro",
      "Team workspace",
      "Shared templates",
      "CRM integration (CSV)",
      "A/B subject line testing",
      "Analytics dashboard",
      "Priority support",
    ],
    cta: "Start Team Trial",
    ctaHref: "/app",
    highlighted: false,
  },
  {
    name: "Agency",
    price: "$299",
    period: "/mo",
    description: "For agencies & power users",
    annualPrice: "$239",
    features: [
      "5 seats included",
      "Everything in Team",
      "White-label option",
      "Client workspaces",
      "Bulk CSV personalization",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    ctaHref: "/app",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={productSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://spearfisher.app" },
          { name: "Pricing", url: "https://spearfisher.app/pricing" },
        ])}
      />
      <JsonLd data={faqSchema(pricingFaqs)} />

      <Nav />

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-muted max-w-xl mx-auto">
              Start free. Upgrade when you need more. Save 20% with annual
              billing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`gradient-border p-6 relative flex flex-col ${
                  plan.highlighted
                    ? "border border-indigo-500/50 shadow-lg shadow-indigo-500/10"
                    : ""
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 btn-primary text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-1 text-foreground">{plan.name}</h3>
                  <p className="text-muted text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted text-sm">{plan.period}</span>
                  </div>
                  {plan.annualPrice && (
                    <p className="text-xs text-indigo-400 mt-1">
                      {plan.annualPrice}/mo billed annually (save 20%)
                    </p>
                  )}
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckIcon
                        className={
                          plan.highlighted ? "text-indigo-400" : "text-slate-500"
                        }
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaHref}
                  className={`block w-full text-center py-2.5 rounded-lg font-medium transition-all ${
                    plan.highlighted
                      ? "btn-primary text-white"
                      : "border border-border hover:border-border-light hover:bg-surface-light text-foreground"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-surface border-y border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pricing FAQ
          </h2>
          <div className="space-y-4">
            {pricingFaqs.map((faq) => (
              <div
                key={faq.question}
                className="gradient-border p-6"
              >
                <h3 className="font-semibold mb-2 text-foreground">{faq.question}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start personalizing for free
          </h2>
          <p className="text-muted mb-8">
            5 free emails/month. No credit card required. Upgrade anytime.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center justify-center gap-2 btn-primary text-white font-semibold px-8 py-3.5 rounded-xl text-lg"
          >
            Try SpearFisher Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
