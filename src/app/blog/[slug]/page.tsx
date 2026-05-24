import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";
import { getBlogPost, getAllBlogSlugs } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://spearfisher.app/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `https://spearfisher.app/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://spearfisher.app" },
          { name: "Blog", url: "https://spearfisher.app/blog" },
          { name: post.title, url: `https://spearfisher.app/blog/${slug}` },
        ])}
      />

      <Nav />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${slug}` },
          ]}
        />

        <article>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {post.title}
          </h1>
          <p className="text-sm text-muted mb-8">{post.date}</p>

          {/* Quick Answer */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-5 mb-8">
            <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
              Quick Answer
            </p>
            <p className="text-sm leading-relaxed">{post.quickAnswer}</p>
          </div>

          {/* Table of Contents */}
          {post.toc.length > 0 && (
            <nav className="bg-surface border border-border rounded-xl p-5 mb-8">
              <p className="font-semibold text-sm mb-3">Table of Contents</p>
              <ol className="space-y-1.5">
                {post.toc.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-muted hover:text-indigo-400 transition-colors"
                    >
                      {i + 1}. {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Article Content */}
          <div
            className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted prose-p:leading-relaxed prose-li:text-muted prose-blockquote:border-indigo-500/30 prose-blockquote:text-slate-400 prose-a:text-indigo-400 prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div className="gradient-border p-8 text-center mt-12 card-glow">
            <h3 className="text-xl font-bold mb-3 text-foreground">
              Ready to personalize your cold emails?
            </h3>
            <p className="text-muted mb-6 text-sm">
              SpearFisher uses AI to research your prospects and generate
              personalized emails that get replies. Free to try.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 btn-primary text-white font-semibold px-6 py-3 rounded-xl"
            >
              Try SpearFisher Free
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
