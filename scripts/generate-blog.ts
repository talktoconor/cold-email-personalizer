import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

// Load .env / .env.local files if present
for (const envFile of [".env", ".env.local"]) {
  const envPath = path.join(process.cwd(), envFile);
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match && !process.env[match[1].trim()]) {
        process.env[match[1].trim()] = match[2].trim();
      }
    }
  }
}

const client = new Anthropic();
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const BLOG_POSTS = [
  {
    slug: "how-to-write-cold-email-that-gets-replies",
    title: "How to Write a Cold Email That Gets Replies (2026 Guide)",
  },
  {
    slug: "cold-email-personalization-complete-playbook",
    title: "Cold Email Personalization: The Complete Playbook",
  },
  {
    slug: "best-cold-email-subject-lines",
    title: "Best Cold Email Subject Lines: 50 Examples That Work",
  },
  {
    slug: "cold-email-vs-linkedin-outreach",
    title: "Cold Email vs. LinkedIn Outreach: Which Converts Better?",
  },
  {
    slug: "how-many-cold-emails-per-day",
    title: "How Many Cold Emails Should You Send Per Day?",
  },
  {
    slug: "cold-email-follow-up-strategy",
    title: "Cold Email Follow-Up Strategy: Timing, Templates, Results",
  },
  {
    slug: "ai-cold-email-tools-comparison",
    title: "AI Cold Email Tools: Complete Comparison (2026)",
  },
  {
    slug: "cold-email-deliverability",
    title: "Cold Email Deliverability: How to Stay Out of Spam",
  },
  {
    slug: "b2b-cold-email-benchmarks",
    title: "B2B Cold Email Benchmarks: Open Rates, Reply Rates, Conversion Rates",
  },
  {
    slug: "how-to-research-prospects",
    title: "How to Research Prospects for Cold Email Personalization",
  },
  {
    slug: "cold-email-compliance-can-spam-gdpr",
    title: "Cold Email Compliance: CAN-SPAM, GDPR, and Legal Requirements",
  },
  {
    slug: "cold-email-for-startups",
    title: "Cold Email for Startups: Getting Your First 100 Customers",
  },
  {
    slug: "sdr-cold-email-workflow",
    title: "SDR Cold Email Workflow: From List to Meeting Booked",
  },
  {
    slug: "roi-of-cold-email-personalization",
    title: "The ROI of Cold Email Personalization [Data Study]",
  },
  {
    slug: "cold-email-mistakes",
    title: "Cold Email Mistakes: 15 Things Killing Your Reply Rate",
  },
  {
    slug: "cold-email-ab-testing",
    title: "Cold Email A/B Testing: What to Test and How to Measure",
  },
  {
    slug: "cold-email-sequences",
    title: "Cold Email Sequences: How to Build a Multi-Touch Outreach Campaign",
  },
  {
    slug: "cold-email-for-agencies",
    title: "Cold Email for Agencies: Win New Clients with Outbound",
  },
  {
    slug: "sales-prospecting-tools",
    title: "Sales Prospecting Tools: The Complete Stack for 2026",
  },
  {
    slug: "cold-email-copywriting-frameworks",
    title: "Cold Email Copywriting Frameworks: AIDA, PAS, BAB, and More",
  },
];

async function generateBlogPost(slug: string, title: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.json`);

  if (fs.existsSync(filePath)) {
    console.log(`  SKIP ${slug} (already exists)`);
    return;
  }

  console.log(`  GENERATING ${slug}...`);

  const prompt = `Write an expert-level blog post about: "${title}"

This is for SpearFisher, an AI-powered cold email personalization tool. The article should be genuinely helpful and demonstrate deep expertise in cold email and sales outreach.

Return ONLY valid JSON (no markdown fences):
{
  "title": "${title}",
  "description": "1-2 sentence meta description for SEO (under 160 chars)",
  "date": "2026-05-20",
  "quickAnswer": "50-80 word 'Quick Answer' summary box for the top of the article. Definitive, quotable, factual.",
  "toc": [
    {"id": "section-slug", "label": "Section Title"}
  ],
  "content": "The full article in HTML format (2000-3000 words). Use <h2 id='section-slug'>, <h3>, <p>, <ul>, <li>, <strong>, <blockquote> tags. Include: data points and benchmarks (cite industry reports), actionable advice, bullet points for scanability, a summary box at the top. Make it genuinely expert-level — the kind of content that would rank on page 1 and get cited by AI assistants. Reference SpearFisher naturally 1-2 times as a tool that can help, but don't make it salesy. The content should stand on its own as a valuable resource."
}

Requirements:
- Include real-sounding benchmarks (e.g., '3-5% average reply rate for personalized emails')
- Reference industry frameworks and methodologies
- Use H2 headings that map to the toc
- Include at least 3 bullet-point lists
- Add a key takeaways section near the end
- Content must be genuinely helpful, not thin SEO content`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const parsed = JSON.parse(text);
    parsed.slug = slug;

    fs.mkdirSync(BLOG_DIR, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2));
    console.log(`  DONE ${slug}`);
  } catch (err) {
    console.error(`  FAILED ${slug}:`, err);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const limit = args.includes("--all") ? Infinity : 5;

  console.log(`Generating blog posts (limit: ${limit === Infinity ? "all" : limit})...\n`);

  const toGenerate = BLOG_POSTS.slice(0, limit);

  for (const post of toGenerate) {
    await generateBlogPost(post.slug, post.title);
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log("\nDone!");
}

main().catch(console.error);
