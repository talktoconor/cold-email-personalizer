import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { faqSchema, breadcrumbSchema } from "@/lib/structured-data";
import { getPageContent, getAllPageSlugs } from "@/lib/content";
import { slugToTitle, categoryLabel, type Category } from "@/lib/constants";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllPageSlugs().map(({ category, slug }) => ({ category, slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const content = getPageContent(category, slug);
  if (!content) {
    return { title: "Not Found" };
  }
  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: `https://spearfisher.app/cold-email/${category}/${slug}`,
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: `https://spearfisher.app/cold-email/${category}/${slug}`,
    },
  };
}

function FallbackPage({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) {
  const displaySlug = slug.includes("--")
    ? slug
        .split("--")
        .map((s) => slugToTitle(s))
        .join(" + ")
    : slugToTitle(slug);

  const catLabel = categoryLabel(category as Category);

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://spearfisher.app" },
          {
            name: "Cold Email Guides",
            url: "https://spearfisher.app/cold-email",
          },
          {
            name: displaySlug,
            url: `https://spearfisher.app/cold-email/${category}/${slug}`,
          },
        ])}
      />

      <Nav />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Cold Email Guides", href: "/cold-email" },
            {
              label: displaySlug,
              href: `/cold-email/${category}/${slug}`,
            },
          ]}
        />

        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Cold Email Personalization for {displaySlug}
        </h1>

        <div className="prose max-w-none">
          <p className="text-lg text-muted mb-8">
            Learn how to write personalized cold emails for{" "}
            {displaySlug.toLowerCase()} that get replies. This guide covers
            personalization strategies, common mistakes, subject line formulas,
            and email frameworks specific to {catLabel.toLowerCase()} outreach.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Why Personalization Matters for {displaySlug}
          </h2>
          <p className="text-muted leading-relaxed mb-6">
            Generic cold emails average a 1-2% reply rate. Personalized emails
            that reference specific details about the prospect&apos;s company,
            role, and recent activity see 2-3x higher engagement. For{" "}
            {displaySlug.toLowerCase()} outreach, personalization is especially
            critical because your prospects receive dozens of cold emails daily.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Key Data Points to Personalize On
          </h2>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2 text-muted">
              <span className="text-indigo-500 font-bold mt-0.5">-</span>
              Recent company news and press releases
            </li>
            <li className="flex items-start gap-2 text-muted">
              <span className="text-indigo-500 font-bold mt-0.5">-</span>
              Tech stack and tools they use
            </li>
            <li className="flex items-start gap-2 text-muted">
              <span className="text-indigo-500 font-bold mt-0.5">-</span>
              Recent hiring patterns and job postings
            </li>
            <li className="flex items-start gap-2 text-muted">
              <span className="text-indigo-500 font-bold mt-0.5">-</span>
              Funding rounds and growth signals
            </li>
            <li className="flex items-start gap-2 text-muted">
              <span className="text-indigo-500 font-bold mt-0.5">-</span>
              Industry-specific pain points and challenges
            </li>
          </ul>

          {/* Before/After */}
          <h2 className="text-2xl font-bold mt-10 mb-4">
            Generic vs. Personalized: {displaySlug}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8 not-prose">
            <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-5">
              <span className="text-xs font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                Generic
              </span>
              <p className="text-sm text-red-300/80 mt-3 leading-relaxed">
                &quot;Hi, I noticed your company might benefit from our
                solution. Would you be open to a quick call?&quot;
              </p>
            </div>
            <div className="bg-green-500/5 border border-green-500/15 rounded-xl p-5">
              <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                Personalized
              </span>
              <p className="text-sm text-green-300/80 mt-3 leading-relaxed">
                &quot;Saw you just raised a Series B — congrats. Scaling the
                team from 50 to 200 means your current process will break. We
                helped [similar company] navigate that exact transition. Worth
                comparing notes?&quot;
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="gradient-border p-8 text-center not-prose my-10 card-glow">
            <h3 className="text-xl font-bold mb-3">
              Personalize your {displaySlug.toLowerCase()} cold emails with AI
            </h3>
            <p className="text-muted mb-6 max-w-lg mx-auto text-sm">
              Stop guessing. Let AI research your prospects and generate
              personalized emails that get replies.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 btn-primary text-white font-semibold px-6 py-3 rounded-xl"
            >
              Try Free
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ContentPage({ content }: { content: NonNullable<ReturnType<typeof getPageContent>> }) {
  const displaySlug = content.slug.includes("--")
    ? content.slug.split("--").map((s) => slugToTitle(s)).join(" + ")
    : slugToTitle(content.slug);

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://spearfisher.app" },
          { name: "Cold Email Guides", url: "https://spearfisher.app/cold-email" },
          {
            name: displaySlug,
            url: `https://spearfisher.app/cold-email/${content.category}/${content.slug}`,
          },
        ])}
      />
      {content.faqs.length > 0 && <JsonLd data={faqSchema(content.faqs)} />}

      <Nav />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Cold Email Guides", href: "/cold-email" },
            { label: displaySlug, href: `/cold-email/${content.category}/${content.slug}` },
          ]}
        />

        <h1 className="text-4xl font-bold tracking-tight mb-6">{content.h1}</h1>

        <div className="prose max-w-none">
          <p className="text-lg text-muted mb-8">{content.intro}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Why Personalization Matters</h2>
          <div className="text-muted leading-relaxed mb-6 whitespace-pre-line">
            {content.whyPersonalization}
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4">Common Mistakes</h2>
          <div className="text-muted leading-relaxed mb-6 whitespace-pre-line">
            {content.commonMistakes}
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4">Key Data Points to Personalize On</h2>
          <div className="text-muted leading-relaxed mb-6 whitespace-pre-line">
            {content.keyDataPoints}
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4">Subject Line Formulas</h2>
          <div className="text-muted leading-relaxed mb-6 whitespace-pre-line">
            {content.subjectLineFormulas}
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4">Email Structure</h2>
          <div className="text-muted leading-relaxed mb-6 whitespace-pre-line">
            {content.emailStructure}
          </div>

          {/* Before/After */}
          <h2 className="text-2xl font-bold mt-10 mb-4">Generic vs. Personalized</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8 not-prose">
            <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-5">
              <span className="text-xs font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                Generic
              </span>
              <p className="text-sm text-red-300/80 mt-3 leading-relaxed">
                {content.beforeAfter.generic}
              </p>
            </div>
            <div className="bg-green-500/5 border border-green-500/15 rounded-xl p-5">
              <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                Personalized with SpearFisher
              </span>
              <p className="text-sm text-green-300/80 mt-3 leading-relaxed">
                {content.beforeAfter.personalized}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="gradient-border p-8 text-center not-prose my-10 card-glow">
            <h3 className="text-xl font-bold mb-3">{content.cta}</h3>
            <p className="text-muted mb-6 max-w-lg mx-auto text-sm">
              Let AI research your prospects and generate personalized emails
              that get replies. Free to start.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 btn-primary text-white font-semibold px-6 py-3 rounded-xl"
            >
              Try Free
            </Link>
          </div>

          {/* FAQ */}
          {content.faqs.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mt-10 mb-4">FAQ</h2>
              <div className="space-y-4 not-prose mb-10">
                {content.faqs.map((faq) => (
                  <div key={faq.question} className="bg-card rounded-xl border border-border p-5">
                    <h3 className="font-semibold mb-2 text-sm">{faq.question}</h3>
                    <p className="text-muted text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Related Pages */}
          {content.relatedPages.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mt-10 mb-4">Related Guides</h2>
              <div className="grid sm:grid-cols-2 gap-3 not-prose mb-10">
                {content.relatedPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="block px-4 py-3 rounded-xl border border-border bg-card hover:border-indigo-500/30 hover:bg-surface-light transition-all text-sm font-medium"
                  >
                    {page.label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default async function ColdEmailPage({ params }: Props) {
  const { category, slug } = await params;
  const validCategories = ["roles", "industries", "use-cases", "personas", "cross"];
  if (!validCategories.includes(category)) {
    notFound();
  }

  const content = getPageContent(category, slug);
  if (content) {
    return <ContentPage content={content} />;
  }

  return <FallbackPage category={category} slug={slug} />;
}
