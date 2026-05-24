import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LiveDemo } from "@/components/live-demo";

type Props = {
  params: Promise<{ variant: string }>;
};

const VARIANTS: Record<
  string,
  {
    headline: string;
    subheadline: string;
    stats: { value: string; label: string }[];
    cta: string;
    metaTitle: string;
    metaDescription: string;
  }
> = {
  "cold-email": {
    headline: "AI-Powered Cold Email Personalization",
    subheadline:
      "Stop sending generic cold emails. AI researches your prospects and writes personalized emails that get 3x more replies. Free to try.",
    stats: [
      { value: "3.2x", label: "higher reply rates" },
      { value: "47s", label: "per email" },
      { value: "2hr+", label: "saved daily" },
    ],
    cta: "Start Personalizing Free",
    metaTitle: "AI Cold Email Personalization Tool | SpearFisher",
    metaDescription:
      "AI-powered cold email personalization. Paste prospect info, get personalized emails in seconds. 3x higher reply rates. Free to start.",
  },
  sdr: {
    headline: "SDRs: 3x Your Reply Rate with AI",
    subheadline:
      "Your prospects get 100+ cold emails a week. Stand out with AI-powered personalization that references their specific company, role, and pain points.",
    stats: [
      { value: "3.2x", label: "reply rate increase" },
      { value: "200+", label: "emails/month on Pro" },
      { value: "6min→47s", label: "per personalized email" },
    ],
    cta: "Try Free — No Credit Card",
    metaTitle: "AI Cold Email Tool for SDRs | SpearFisher",
    metaDescription:
      "SDRs: personalize cold emails in seconds instead of minutes. AI researches prospects and generates emails that get replies. Free tier available.",
  },
  recruiter: {
    headline: "Recruiter Cold Emails That Get Responses",
    subheadline:
      "Top talent ignores generic InMails. Use AI to personalize every outreach — reference their projects, skills, and career trajectory.",
    stats: [
      { value: "2.8x", label: "response rate" },
      { value: "< 1min", label: "per outreach" },
      { value: "85%", label: "time saved" },
    ],
    cta: "Start Personalizing Free",
    metaTitle: "AI Recruiter Email Personalization | SpearFisher",
    metaDescription:
      "Write personalized recruiter cold emails in seconds. AI analyzes candidate profiles and generates outreach that gets responses.",
  },
  agency: {
    headline: "Agency Cold Email at Scale — White Label",
    subheadline:
      "Personalize cold emails for every client, every prospect. White-label the output. Bulk CSV upload. API access. Built for agency workflows.",
    stats: [
      { value: "5 seats", label: "included" },
      { value: "Unlimited", label: "emails" },
      { value: "API + CSV", label: "bulk workflows" },
    ],
    cta: "Start Agency Trial",
    metaTitle: "White-Label Cold Email Personalization for Agencies | SpearFisher",
    metaDescription:
      "Agency-grade cold email personalization. White-label, bulk CSV processing, API access, client workspaces. Built for agency scale.",
  },
  "sales-team": {
    headline: "Give Your Sales Team Superpowers",
    subheadline:
      "Every rep sends personalized emails in seconds. Shared templates, analytics dashboard, CRM integration. Scale quality outreach across the team.",
    stats: [
      { value: "3.2x", label: "reply rates" },
      { value: "Unlimited", label: "emails per seat" },
      { value: "22%", label: "more meetings booked" },
    ],
    cta: "Start Team Trial",
    metaTitle: "AI Cold Email for Sales Teams | SpearFisher",
    metaDescription:
      "Equip your sales team with AI-powered email personalization. Shared templates, analytics, CRM integration. Free trial.",
  },
};

export async function generateStaticParams() {
  return Object.keys(VARIANTS).map((variant) => ({ variant }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { variant } = await params;
  const data = VARIANTS[variant];
  if (!data) return { title: "Not Found" };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    robots: { index: false, follow: false },
  };
}

export default async function LandingPage({ params }: Props) {
  const { variant } = await params;
  const data = VARIANTS[variant];
  if (!data) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Minimal nav */}
      <nav className="flex items-center justify-center px-6 py-4 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-sm">SF</span>
          </div>
          <span className="font-semibold text-lg tracking-tight text-foreground">
            SpearFisher
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground">
          {data.headline}
        </h1>
        <p className="text-lg text-muted max-w-xl mb-10 leading-relaxed">
          {data.subheadline}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {data.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Live Demo */}
        <div className="w-full max-w-3xl">
          <LiveDemo />
        </div>

        {/* Primary CTA */}
        <Link
          href="/app"
          className="mt-8 inline-flex items-center justify-center gap-2 btn-primary text-white font-semibold px-10 py-4 rounded-xl text-lg"
        >
          {data.cta}
        </Link>
        <p className="mt-3 text-sm text-muted">
          Free tier available. No credit card required.
        </p>
      </section>

      {/* Social proof */}
      <section className="py-12 px-6 bg-surface border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted text-sm mb-6">
            Trusted by 2,500+ sales teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              "Used by SDRs at YC-backed startups",
              "Featured on Product Hunt",
              "4.8/5 average rating",
            ].map((proof) => (
              <span
                key={proof}
                className="text-xs font-medium bg-card text-foreground px-3 py-1.5 rounded-full border border-border"
              >
                {proof}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
