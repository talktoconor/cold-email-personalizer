import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getAllBlogSlugs, getBlogPost } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Cold Email Tips, Strategies & Benchmarks",
  description:
    "Expert articles on cold email personalization, outreach strategy, deliverability, and sales prospecting. Data-driven guides for SDRs and sales teams.",
  alternates: { canonical: "https://spearfisher.app/blog" },
};

export default function BlogIndex() {
  const slugs = getAllBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogPost(slug))
    .filter(Boolean)
    .sort((a, b) => (b!.date > a!.date ? 1 : -1));

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
          ]}
        />

        <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-lg text-muted mb-12">
          Expert guides on cold email, sales outreach, and personalization
          strategy.
        </p>

        {posts.length === 0 && (
          <div className="text-center py-20 text-muted">
            <p>Blog posts coming soon. Check back!</p>
          </div>
        )}

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post!.slug}
              href={`/blog/${post!.slug}`}
              className="block gradient-border p-6 hover:border-indigo-500/30 transition-all"
            >
              <h2 className="font-semibold text-lg mb-2">{post!.title}</h2>
              <p className="text-muted text-sm leading-relaxed mb-3">
                {post!.description}
              </p>
              <span className="text-xs text-indigo-400 font-medium">
                Read article →
              </span>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
