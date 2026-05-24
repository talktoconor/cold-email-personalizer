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

const CONTENT_DIR = path.join(process.cwd(), "content", "pages");

interface PageContent {
  title: string;
  description: string;
  category: string;
  slug: string;
  h1: string;
  intro: string;
  whyPersonalization: string;
  commonMistakes: string;
  keyDataPoints: string;
  subjectLineFormulas: string;
  emailStructure: string;
  beforeAfter: { generic: string; personalized: string };
  cta: string;
  faqs: { question: string; answer: string }[];
  relatedPages: { href: string; label: string }[];
}

const ROLES = [
  "sdr", "bdr", "account-executive", "sales-manager", "vp-sales",
  "head-of-growth", "founder", "ceo", "recruiter", "talent-acquisition",
  "agency-owner", "marketing-director", "partnerships-manager",
  "business-development", "customer-success", "fundraising",
  "investor-relations", "pr-outreach", "link-building", "influencer-outreach",
];

const INDUSTRIES = [
  "saas", "fintech", "healthtech", "edtech", "cybersecurity", "ai-ml",
  "ecommerce", "real-estate", "insurance", "legal-services", "accounting",
  "manufacturing", "logistics", "construction", "hospitality", "media",
  "advertising", "consulting", "staffing", "energy", "nonprofit", "government",
];

const USE_CASES = [
  "prospecting", "meeting-booking", "follow-up", "breakup-email",
  "referral-request", "partnership-outreach", "investor-outreach",
  "recruiting", "link-building-outreach", "podcast-guest-pitch",
  "event-invitation", "product-launch", "case-study-request",
  "review-request", "upsell-cross-sell", "renewal-outreach",
  "win-back", "conference-networking", "warm-introduction",
  "cold-linkedin-to-email",
];

const PERSONAS = [
  "cto", "cfo", "cmo", "ciso", "vp-engineering", "head-of-product",
  "head-of-hr", "procurement-manager", "it-director", "operations-manager",
  "marketing-manager", "sales-director", "general-counsel",
  "chief-of-staff", "board-member",
];

function slugToTitle(slug: string): string {
  const overrides: Record<string, string> = {
    sdr: "SDR", bdr: "BDR", ceo: "CEO", cto: "CTO", cfo: "CFO",
    cmo: "CMO", ciso: "CISO", saas: "SaaS", "ai-ml": "AI/ML",
    "vp-sales": "VP of Sales", "vp-engineering": "VP of Engineering",
  };
  if (overrides[slug]) return overrides[slug];
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function getRelatedPages(category: string, slug: string): { href: string; label: string }[] {
  const related: { href: string; label: string }[] = [];
  const allItems: Record<string, string[]> = {
    roles: ROLES, industries: INDUSTRIES,
    "use-cases": USE_CASES, personas: PERSONAS,
  };
  const current = allItems[category];
  if (!current) return related;

  const idx = current.indexOf(slug);
  const neighbors = [
    current[(idx - 1 + current.length) % current.length],
    current[(idx + 1) % current.length],
    current[(idx + 2) % current.length],
  ].filter((s) => s !== slug);

  for (const s of neighbors) {
    related.push({
      href: `/cold-email/${category}/${s}`,
      label: `Cold Email for ${slugToTitle(s)}`,
    });
  }

  // Cross-link to other categories
  const otherCats = Object.keys(allItems).filter((c) => c !== category);
  for (const cat of otherCats.slice(0, 1)) {
    const items = allItems[cat];
    related.push({
      href: `/cold-email/${cat}/${items[0]}`,
      label: `Cold Email for ${slugToTitle(items[0])}`,
    });
  }

  return related.slice(0, 5);
}

async function generateContent(
  category: string,
  slug: string
): Promise<PageContent> {
  const title = slugToTitle(slug);
  const catLabel =
    category === "roles" ? "role" :
    category === "industries" ? "industry" :
    category === "use-cases" ? "use case" : "persona";

  const prompt = `Generate cold email personalization guide content for: "${title}" (${catLabel}).

Return ONLY valid JSON matching this structure (no markdown fences):
{
  "h1": "naturally worded H1 heading about cold email for ${title}",
  "intro": "2-3 sentence intro paragraph about why cold email personalization matters for ${title}",
  "whyPersonalization": "3-4 paragraphs about why personalization is critical for this specific ${catLabel}. Include specific stats and data points.",
  "commonMistakes": "5-6 common mistakes people make in cold emails for ${title}, with brief explanations. Use dash-separated list format.",
  "keyDataPoints": "5-8 specific data points to personalize on for ${title}. Include company news, tech stack, hiring signals, funding, etc. Use dash-separated list format.",
  "subjectLineFormulas": "5-6 subject line formulas that work for ${title} outreach. Give the formula and a concrete example for each.",
  "emailStructure": "A recommended email framework/structure for ${title}. Include opening hook, body, CTA. 2-3 paragraphs.",
  "beforeAfter": {
    "generic": "A realistic generic cold email that a lazy rep would send to a ${title} (50-70 words)",
    "personalized": "A SpearFisher-style personalized email to the same ${title} that references specific details (50-70 words)"
  },
  "cta": "Short CTA text like 'Personalize your ${title} cold emails with AI'",
  "faqs": [
    {"question": "How do I personalize cold emails for ${title}?", "answer": "Detailed 2-3 sentence answer"},
    {"question": "What reply rate should I expect from ${title} cold emails?", "answer": "Answer with specific benchmarks"},
    {"question": "How many cold emails should I send to ${title} prospects per day?", "answer": "Practical answer"}
  ]
}

Make the content genuinely helpful — specific enough that someone could improve their outreach after reading it. Reference real personalization strategies, not generic advice. The content should demonstrate expertise that makes readers want to use SpearFisher.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const parsed = JSON.parse(text);

  return {
    title: `Cold Email for ${title} — Personalization Guide`,
    description: `Learn how to write personalized cold emails for ${title.toLowerCase()}. Expert tips on subject lines, personalization data points, and email frameworks that get replies.`,
    category,
    slug,
    ...parsed,
    relatedPages: getRelatedPages(category, slug),
  };
}

async function generateAndSave(category: string, slug: string) {
  const dir = path.join(CONTENT_DIR, category);
  const filePath = path.join(dir, `${slug}.json`);

  if (fs.existsSync(filePath)) {
    console.log(`  SKIP ${category}/${slug} (already exists)`);
    return;
  }

  fs.mkdirSync(dir, { recursive: true });

  console.log(`  GENERATING ${category}/${slug}...`);
  try {
    const content = await generateContent(category, slug);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`  DONE ${category}/${slug}`);
  } catch (err) {
    console.error(`  FAILED ${category}/${slug}:`, err);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const limit = args.includes("--all") ? Infinity : 50;
  const categoryFilter = args.find((a) => a.startsWith("--category="))?.split("=")[1];

  console.log(`Generating content (limit: ${limit === Infinity ? "all" : limit})...\n`);

  const pages: { category: string; slug: string }[] = [];

  if (!categoryFilter || categoryFilter === "roles") {
    for (const slug of ROLES) pages.push({ category: "roles", slug });
  }
  if (!categoryFilter || categoryFilter === "industries") {
    for (const slug of INDUSTRIES) pages.push({ category: "industries", slug });
  }
  if (!categoryFilter || categoryFilter === "use-cases") {
    for (const slug of USE_CASES) pages.push({ category: "use-cases", slug });
  }
  if (!categoryFilter || categoryFilter === "personas") {
    for (const slug of PERSONAS) pages.push({ category: "personas", slug });
  }

  const toGenerate = pages.slice(0, limit);
  console.log(`Will generate ${toGenerate.length} pages.\n`);

  // Process sequentially to respect rate limits
  for (const page of toGenerate) {
    await generateAndSave(page.category, page.slug);
    // Small delay between requests
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log("\nDone!");
}

main().catch(console.error);
