import fs from "fs";
import path from "path";
import {
  ROLES,
  INDUSTRIES,
  USE_CASES,
  PERSONAS,
  CROSS_COMBINATIONS,
  type Category,
} from "./constants";

const CONTENT_DIR = path.join(process.cwd(), "content", "pages");

export interface PageContent {
  title: string;
  description: string;
  category: Category;
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

export function getAllPageSlugs(): { category: string; slug: string }[] {
  const pages: { category: string; slug: string }[] = [];

  for (const role of ROLES) {
    pages.push({ category: "roles", slug: role });
  }
  for (const industry of INDUSTRIES) {
    pages.push({ category: "industries", slug: industry });
  }
  for (const useCase of USE_CASES) {
    pages.push({ category: "use-cases", slug: useCase });
  }
  for (const persona of PERSONAS) {
    pages.push({ category: "personas", slug: persona });
  }
  for (const [role, industry] of CROSS_COMBINATIONS) {
    pages.push({ category: "cross", slug: `${role}--${industry}` });
  }

  return pages;
}

export function getPageContent(
  category: string,
  slug: string
): PageContent | null {
  const filePath = path.join(CONTENT_DIR, category, `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as PageContent;
  } catch {
    return null;
  }
}

export function getAllPagesForCategory(category: Category): string[] {
  switch (category) {
    case "roles":
      return [...ROLES];
    case "industries":
      return [...INDUSTRIES];
    case "use-cases":
      return [...USE_CASES];
    case "personas":
      return [...PERSONAS];
    case "cross":
      return CROSS_COMBINATIONS.map(([r, i]) => `${r}--${i}`);
    default:
      return [];
  }
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  quickAnswer: string;
  toc: { id: string; label: string }[];
  content: string;
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as BlogPost;
  } catch {
    return null;
  }
}

export function getAllBlogSlugs(): string[] {
  const dir = path.join(process.cwd(), "content", "blog");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));
  } catch {
    return [];
  }
}
