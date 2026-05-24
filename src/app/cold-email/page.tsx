import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import {
  ROLES,
  INDUSTRIES,
  USE_CASES,
  PERSONAS,
  slugToTitle,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cold Email Guides — Personalization by Role, Industry & Use Case",
  description:
    "Comprehensive cold email guides for every role, industry, and use case. Learn how to personalize outreach for SDRs, recruiters, founders, and more.",
  alternates: { canonical: "https://spearfisher.app/cold-email" },
};

function SectionGrid({
  title,
  description,
  items,
  basePath,
}: {
  title: string;
  description: string;
  items: readonly string[];
  basePath: string;
}) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted text-sm mb-6">{description}</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((slug) => (
          <Link
            key={slug}
            href={`/cold-email/${basePath}/${slug}`}
            className="block px-4 py-3 rounded-xl border border-border bg-card hover:border-indigo-500/30 hover:bg-surface-light transition-all text-sm font-medium text-foreground"
          >
            Cold Email for {slugToTitle(slug)}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ColdEmailIndex() {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://spearfisher.app" },
          { name: "Cold Email Guides", url: "https://spearfisher.app/cold-email" },
        ])}
      />

      <Nav />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Cold Email Guides", href: "/cold-email" },
          ]}
        />

        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Cold Email Personalization Guides
        </h1>
        <p className="text-lg text-muted mb-12 max-w-2xl">
          Expert guides on cold email personalization for every role, industry,
          use case, and target persona. Learn what works and generate
          personalized emails with AI.
        </p>

        <SectionGrid
          title="By Role"
          description="Cold email strategies tailored to your specific sales role."
          items={ROLES}
          basePath="roles"
        />

        <SectionGrid
          title="By Industry"
          description="Industry-specific personalization tactics and talking points."
          items={INDUSTRIES}
          basePath="industries"
        />

        <SectionGrid
          title="By Use Case"
          description="Guides for every cold email scenario from prospecting to win-back."
          items={USE_CASES}
          basePath="use-cases"
        />

        <SectionGrid
          title="By Target Persona"
          description="How to personalize when reaching out to specific executive titles."
          items={PERSONAS}
          basePath="personas"
        />

        {/* CTA */}
        <section className="mt-8 gradient-border p-8 text-center card-glow">
          <h2 className="text-2xl font-bold mb-3 text-foreground">
            Skip the research. Let AI personalize for you.
          </h2>
          <p className="text-muted mb-6 max-w-lg mx-auto">
            SpearFisher analyzes your prospects and generates personalized cold
            emails in seconds. Free to try.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center justify-center gap-2 btn-primary text-white font-semibold px-6 py-3 rounded-xl"
          >
            Try Free
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
