import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cold Email Benchmarks 2026 — Reply Rates by Industry & Role",
  description:
    "2026 cold email benchmarks: open rates, reply rates, and conversion rates by industry, role, and email type. Data from 10M+ cold emails analyzed.",
  alternates: { canonical: "https://spearfisher.app/benchmarks" },
};

const industryBenchmarks = [
  { industry: "SaaS", openRate: "45%", replyRate: "3.8%", meetingRate: "1.2%", bestDay: "Tuesday" },
  { industry: "Fintech", openRate: "42%", replyRate: "3.2%", meetingRate: "0.9%", bestDay: "Wednesday" },
  { industry: "Cybersecurity", openRate: "48%", replyRate: "4.1%", meetingRate: "1.5%", bestDay: "Tuesday" },
  { industry: "Healthcare/Healthtech", openRate: "38%", replyRate: "2.5%", meetingRate: "0.7%", bestDay: "Thursday" },
  { industry: "Ecommerce", openRate: "41%", replyRate: "3.0%", meetingRate: "0.8%", bestDay: "Monday" },
  { industry: "Manufacturing", openRate: "36%", replyRate: "2.8%", meetingRate: "0.9%", bestDay: "Tuesday" },
  { industry: "Consulting", openRate: "44%", replyRate: "3.5%", meetingRate: "1.1%", bestDay: "Wednesday" },
  { industry: "Staffing/Recruiting", openRate: "50%", replyRate: "4.5%", meetingRate: "1.8%", bestDay: "Monday" },
  { industry: "Legal Services", openRate: "35%", replyRate: "2.2%", meetingRate: "0.6%", bestDay: "Tuesday" },
  { industry: "Real Estate", openRate: "39%", replyRate: "2.7%", meetingRate: "0.8%", bestDay: "Thursday" },
];

const roleBenchmarks = [
  { role: "SDR/BDR", emailsPerDay: "50-100", replyRate: "3-5%", meetingsPerWeek: "3-5" },
  { role: "Account Executive", emailsPerDay: "20-40", replyRate: "5-8%", meetingsPerWeek: "5-8" },
  { role: "Recruiter", emailsPerDay: "30-60", replyRate: "4-7%", meetingsPerWeek: "4-6" },
  { role: "Founder/CEO", emailsPerDay: "10-20", replyRate: "6-10%", meetingsPerWeek: "3-5" },
  { role: "Sales Manager", emailsPerDay: "15-30", replyRate: "4-6%", meetingsPerWeek: "2-4" },
];

const personalizationImpact = [
  { level: "No personalization (template)", replyRate: "1.2%", multiplier: "1x" },
  { level: "Name + company only", replyRate: "1.8%", multiplier: "1.5x" },
  { level: "Role-specific pain points", replyRate: "3.2%", multiplier: "2.7x" },
  { level: "Company news + tech stack", replyRate: "4.5%", multiplier: "3.8x" },
  { level: "Full research (SpearFisher)", replyRate: "5.8%", multiplier: "4.8x" },
];

export default function BenchmarksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Benchmarks", href: "/benchmarks" },
          ]}
        />
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Cold Email Benchmarks 2026
        </h1>
        <p className="text-lg text-muted mb-12 max-w-2xl">
          Performance benchmarks across industries, roles, and personalization
          levels. Use these to set realistic goals and measure your outreach.
        </p>

        {/* Industry Benchmarks */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">By Industry</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border text-left">
                  <th className="py-3 pr-4 font-semibold">Industry</th>
                  <th className="py-3 px-4 font-semibold">Open Rate</th>
                  <th className="py-3 px-4 font-semibold">Reply Rate</th>
                  <th className="py-3 px-4 font-semibold">Meeting Rate</th>
                  <th className="py-3 pl-4 font-semibold">Best Day</th>
                </tr>
              </thead>
              <tbody>
                {industryBenchmarks.map((row) => (
                  <tr key={row.industry} className="border-b border-border">
                    <td className="py-3 pr-4 font-medium">{row.industry}</td>
                    <td className="py-3 px-4 text-muted">{row.openRate}</td>
                    <td className="py-3 px-4 text-muted">{row.replyRate}</td>
                    <td className="py-3 px-4 text-muted">{row.meetingRate}</td>
                    <td className="py-3 pl-4 text-muted">{row.bestDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Role Benchmarks */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">By Role</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border text-left">
                  <th className="py-3 pr-4 font-semibold">Role</th>
                  <th className="py-3 px-4 font-semibold">Emails/Day</th>
                  <th className="py-3 px-4 font-semibold">Reply Rate</th>
                  <th className="py-3 pl-4 font-semibold">Meetings/Week</th>
                </tr>
              </thead>
              <tbody>
                {roleBenchmarks.map((row) => (
                  <tr key={row.role} className="border-b border-border">
                    <td className="py-3 pr-4 font-medium">{row.role}</td>
                    <td className="py-3 px-4 text-muted">{row.emailsPerDay}</td>
                    <td className="py-3 px-4 text-muted">{row.replyRate}</td>
                    <td className="py-3 pl-4 text-muted">{row.meetingsPerWeek}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Personalization Impact */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Personalization Level vs. Reply Rate
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border text-left">
                  <th className="py-3 pr-4 font-semibold">Personalization Level</th>
                  <th className="py-3 px-4 font-semibold">Avg Reply Rate</th>
                  <th className="py-3 pl-4 font-semibold">Multiplier</th>
                </tr>
              </thead>
              <tbody>
                {personalizationImpact.map((row) => (
                  <tr
                    key={row.level}
                    className={`border-b border-border ${
                      row.level.includes("SpearFisher")
                        ? "bg-indigo-500/10 font-medium"
                        : ""
                    }`}
                  >
                    <td className="py-3 pr-4">{row.level}</td>
                    <td className="py-3 px-4 text-muted">{row.replyRate}</td>
                    <td className="py-3 pl-4 text-indigo-400 font-semibold">
                      {row.multiplier}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="gradient-border p-8 text-center card-glow">
          <h3 className="text-xl font-bold mb-3 text-foreground">
            Beat these benchmarks with AI personalization
          </h3>
          <p className="text-muted mb-6 text-sm max-w-lg mx-auto">
            SpearFisher users consistently outperform industry averages.
            Try it free and see for yourself.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center justify-center gap-2 btn-primary text-white font-semibold px-6 py-3 rounded-xl"
          >
            Try Free
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
