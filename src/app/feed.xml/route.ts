import { getAllBlogSlugs, getBlogPost } from "@/lib/content";
import { BASE_URL, SITE_NAME } from "@/lib/constants";

export async function GET() {
  const slugs = getAllBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogPost(slug))
    .filter(Boolean)
    .sort((a, b) => (b!.date > a!.date ? 1 : -1));

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post!.title)}</title>
      <link>${BASE_URL}/blog/${post!.slug}</link>
      <guid>${BASE_URL}/blog/${post!.slug}</guid>
      <pubDate>${new Date(post!.date).toUTCString()}</pubDate>
      <description>${escapeXml(post!.description)}</description>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Expert articles on cold email personalization, outreach strategy, and sales prospecting.</description>
    <language>en-us</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
