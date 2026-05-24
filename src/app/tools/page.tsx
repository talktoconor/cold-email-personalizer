import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Free Cold Email Tools — Subject Line Grader, Email Calculator & More",
  description:
    "Free cold email tools: subject line grader, email calculator, prospect research tool, and deliverability checker. No signup required.",
  alternates: { canonical: "https://spearfisher.app/tools" },
};

const tools = [
  {
    name: "AI Email Personalizer",
    description:
      "Paste prospect info and get 3 personalized cold email variants in seconds. The core SpearFisher experience.",
    href: "/app",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    available: true,
  },
  {
    name: "Subject Line Grader",
    description:
      "Paste your cold email subject line and get a score + specific suggestions to improve open rates.",
    href: "#",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    available: false,
  },
  {
    name: "Cold Email Calculator",
    description:
      "How many cold emails do you need to send to book X meetings? Calculate based on your industry benchmarks.",
    href: "#",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
      </svg>
    ),
    available: false,
  },
  {
    name: "Prospect Research Tool",
    description:
      "Paste a company URL and get personalization data points: tech stack, recent news, hiring signals, and more.",
    href: "#",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    available: false,
  },
];

export default function ToolsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Free Tools", href: "/tools" },
          ]}
        />
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Free Cold Email Tools
        </h1>
        <p className="text-lg text-muted mb-12">
          Free tools to improve your cold email outreach. No signup required.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className={`gradient-border p-6 ${
                tool.available ? "" : "opacity-60"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                {tool.icon}
              </div>
              <h2 className="font-semibold text-lg mb-2">{tool.name}</h2>
              <p className="text-muted text-sm leading-relaxed mb-4">
                {tool.description}
              </p>
              {tool.available ? (
                <Link
                  href={tool.href}
                  className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Use tool →
                </Link>
              ) : (
                <span className="inline-flex items-center text-sm font-medium text-slate-400">
                  Coming soon
                </span>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
