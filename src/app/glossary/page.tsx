import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Cold Email Glossary — Sales & Outreach Terms Defined",
  description:
    "Complete glossary of cold email, sales outreach, and email marketing terms. Definitions for SDRs, BDRs, and sales teams.",
  alternates: { canonical: "https://spearfisher.app/glossary" },
};

const terms = [
  { term: "A/B Testing", definition: "Sending two variants of an email to different segments to determine which performs better on a specific metric (open rate, reply rate, etc.)." },
  { term: "BDR (Business Development Representative)", definition: "A sales role focused on outbound prospecting and generating qualified meetings for account executives." },
  { term: "Bounce Rate", definition: "The percentage of sent emails that couldn't be delivered. Hard bounces indicate invalid addresses; soft bounces are temporary delivery failures." },
  { term: "CAC (Customer Acquisition Cost)", definition: "The total cost of acquiring a new customer, including marketing spend, sales team costs, and tools." },
  { term: "CAN-SPAM Act", definition: "US federal law regulating commercial email. Requires opt-out mechanism, physical address, and honest subject lines." },
  { term: "Cadence", definition: "A structured sequence of outreach touchpoints (emails, calls, social touches) over a set period." },
  { term: "Cold Email", definition: "An unsolicited email sent to a prospect with no prior relationship. The foundation of outbound sales development." },
  { term: "DKIM (DomainKeys Identified Mail)", definition: "An email authentication protocol that uses cryptographic signatures to verify an email was sent by the domain it claims to be from." },
  { term: "DMARC", definition: "Domain-based Message Authentication, Reporting, and Conformance. An email authentication protocol that builds on SPF and DKIM." },
  { term: "Deliverability", definition: "The ability of an email to reach the recipient's inbox rather than spam folder. Affected by domain reputation, content, and authentication." },
  { term: "Domain Warming", definition: "Gradually increasing email sending volume from a new domain to build sender reputation with email providers." },
  { term: "Email Personalization", definition: "Customizing email content based on prospect-specific data points like company, role, recent news, and pain points." },
  { term: "GDPR", definition: "General Data Protection Regulation. EU law governing data privacy that affects cold email by requiring legitimate interest basis for processing." },
  { term: "ICP (Ideal Customer Profile)", definition: "A description of the type of company that would benefit most from your product. Includes firmographic criteria like industry, size, and tech stack." },
  { term: "Intent Data", definition: "Behavioral signals indicating a prospect is actively researching solutions in your category." },
  { term: "MQL (Marketing Qualified Lead)", definition: "A lead that has shown enough engagement with marketing content to warrant sales outreach." },
  { term: "Open Rate", definition: "The percentage of delivered emails that were opened. Tracked via pixel or image loading. Industry average for cold email: 30-50%." },
  { term: "Outbound Sales", definition: "A sales strategy where reps proactively reach out to prospects rather than waiting for inbound leads." },
  { term: "Personalization Token", definition: "A placeholder variable in an email template that gets replaced with prospect-specific data (e.g., {{company_name}})." },
  { term: "Prospect Research", definition: "The process of gathering information about a potential customer before outreach. Includes company data, role, tech stack, and recent activity." },
  { term: "Reply Rate", definition: "The percentage of delivered emails that received a response. The primary success metric for cold email. Industry average: 1-5%." },
  { term: "SDR (Sales Development Representative)", definition: "A sales role focused on outbound prospecting, qualifying leads, and booking meetings for account executives." },
  { term: "SPF (Sender Policy Framework)", definition: "An email authentication method that specifies which mail servers are authorized to send email on behalf of your domain." },
  { term: "Sequence", definition: "A multi-step email campaign with automated follow-ups sent on a schedule. Typically 3-7 emails over 2-4 weeks." },
  { term: "Social Proof", definition: "Evidence that others trust and use your product. In cold email, referencing similar companies or sharing results builds credibility." },
  { term: "SQL (Sales Qualified Lead)", definition: "A prospect that has been vetted by sales and meets criteria for a genuine sales opportunity." },
  { term: "Subject Line", definition: "The preview text recipients see before opening an email. Best-performing cold email subject lines are 4-7 words, lowercase, and specific." },
  { term: "Warm Intro", definition: "An introduction to a prospect made through a mutual connection, significantly increasing response likelihood." },
];

export default function GlossaryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Glossary", href: "/glossary" },
          ]}
        />
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Cold Email Glossary
        </h1>
        <p className="text-lg text-muted mb-12">
          Definitions for every term you need to know in cold email, outbound
          sales, and email deliverability.
        </p>
        <div className="space-y-6">
          {terms.map((t) => (
            <div
              key={t.term}
              id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="border-b border-border pb-5"
            >
              <h2 className="font-semibold text-lg mb-1">{t.term}</h2>
              <p className="text-muted text-sm leading-relaxed">
                {t.definition}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
