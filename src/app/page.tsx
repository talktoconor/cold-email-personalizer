import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import {
  organizationSchema,
  softwareApplicationSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/structured-data";
import { LiveDemo } from "@/components/live-demo";

/* ---------- small reusable icons ---------- */

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-slate-600"}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ---------- data ---------- */

const homeFaqs = [
  {
    question: "How does SpearFisher personalize cold emails?",
    answer:
      "SpearFisher uses AI to analyze prospect information you provide — LinkedIn profiles, company details, recent news, tech stack, and more — then generates three personalized email variants using different persuasion angles: direct value, curiosity hook, and social proof.",
  },
  {
    question: "Is SpearFisher free to use?",
    answer:
      "Yes. The free tier gives you 5 personalized emails per month with basic personalization. Pro ($49/mo) gives you 200 emails with advanced personalization including company news, tech stack detection, and hiring signals.",
  },
  {
    question: "What reply rate improvement can I expect?",
    answer:
      "Sales teams using SpearFisher report 2-3x higher reply rates compared to generic cold emails. Personalized emails that reference specific prospect details consistently outperform templates.",
  },
  {
    question: "How is SpearFisher different from email templates?",
    answer:
      "Templates are static — every prospect gets the same email with a name swapped in. SpearFisher researches each prospect individually and generates unique emails that reference their specific company, role, recent news, and pain points.",
  },
];

const testimonials = [
  {
    quote: "SpearFisher cut my email writing time from 20 minutes to 30 seconds per prospect. My reply rate went from 3% to 11%.",
    name: "Marcus Rodriguez",
    title: "Senior SDR, Series B SaaS",
    avatar: "MR",
  },
  {
    quote: "We rolled this out to our 12-person BDR team. Pipeline generation jumped 40% in the first month. The personalization quality is unreal.",
    name: "Jennifer Park",
    title: "VP of Sales, Fintech",
    avatar: "JP",
  },
  {
    quote: "I used to dread prospecting. Now I actually look forward to it. The curiosity hook variants are insanely good at getting responses.",
    name: "David Okafor",
    title: "Account Executive, Enterprise",
    avatar: "DO",
  },
  {
    quote: "Replaced three email tools with SpearFisher. Better output, lower cost, and my team actually uses it because it is so fast.",
    name: "Sarah Lin",
    title: "Head of Growth, Agency",
    avatar: "SL",
  },
];

/* ---------- page ---------- */

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "https://spearfisher.app" }])} />
      <JsonLd data={faqSchema(homeFaqs)} />

      <Nav />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        {/* Glow effects */}
        <div className="hero-glow absolute -top-40 -right-40 animate-pulse-glow" />
        <div className="hero-glow absolute -bottom-60 -left-60 animate-pulse-glow" style={{ animationDelay: "2s" }} />

        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                Built by AEs &amp; SDRs who closed $100M+ in ACV
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
                Stop sending cold emails{" "}
                <span className="gradient-text">nobody reads</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted max-w-lg mb-8 leading-relaxed">
                Paste a LinkedIn profile or company info. Get 3 personalized email
                variants in seconds. Your prospects will think you spent 20 minutes
                researching them.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link
                  href="/app"
                  className="inline-flex items-center justify-center gap-2 btn-primary text-white font-semibold px-8 py-3.5 rounded-xl text-lg"
                >
                  Try Free
                  <ArrowIcon />
                </Link>
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 border border-border hover:border-border-light font-medium px-8 py-3.5 rounded-xl hover:bg-surface-light transition-all text-lg text-foreground"
                >
                  Live Demo
                </a>
              </div>

              <p className="text-sm text-muted">
                5 free emails/month &middot; No credit card required
              </p>
            </div>

            {/* Right — Product mockup */}
            <div className="animate-fade-in-delay-1 animate-float">
              <div className="gradient-border p-5 sm:p-6 shadow-2xl shadow-indigo-500/5">
                {/* Mock toolbar */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="text-xs text-muted ml-3 font-mono">spearfisher.app</span>
                </div>

                {/* Mock email output */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">Direct Value</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} />)}
                    </div>
                  </div>

                  <div className="bg-surface rounded-lg p-4 border border-border">
                    <p className="text-xs text-muted mb-1">Subject:</p>
                    <p className="text-sm font-medium text-foreground mb-3">saw your 5 new sdr hires</p>
                    <p className="text-xs text-muted mb-1">Body:</p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Hey Sarah,<br /><br />
                      Noticed Acme just brought on 5 SDRs — scaling outbound post-Series B is the right move. The tricky part: ramping them before your board expects pipeline.
                      <br /><br />
                      <span className="text-indigo-400">Worth a quick look?</span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-500/20">
                      Copy
                    </button>
                    <button className="text-xs bg-surface text-muted px-3 py-1.5 rounded-lg border border-border">
                      Regenerate
                    </button>
                    <span className="text-xs text-muted flex items-center ml-auto">+2 variants</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST BAR ============ */}
      <section className="py-8 border-y border-border overflow-hidden">
        <p className="text-xs font-medium text-center uppercase tracking-[0.2em] text-muted mb-6">
          Works with your sales stack
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex shrink-0 items-center gap-5 px-3">
                {[
                  "Salesforce",
                  "HubSpot",
                  "Outreach",
                  "Gong",
                  "Apollo",
                  "Salesloft",
                  "ZoomInfo",
                  "LinkedIn",
                ].map((name) => (
                  <div
                    key={`${setIndex}-${name}`}
                    className="flex items-center justify-center px-6 py-3 rounded-xl bg-surface border border-border/60"
                  >
                    <span className="text-sm font-semibold text-muted/50 tracking-wide">{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUE PROPS ============ */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z", title: "Instant Research", desc: "AI analyzes prospects in seconds — company stage, tech stack, pain points" },
              { icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z", title: "3 Persuasion Angles", desc: "Direct value, curiosity hook, and social proof — pick what fits" },
              { icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75", title: "Copy & Send", desc: "One click to copy. Paste into your sequencer and start booking meetings" },
            ].map((item) => (
              <div key={item.title} className="gradient-border p-6 text-center card-glow">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how-it-works" className="py-20 px-6 border-y border-border bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Three steps. Three emails.{" "}
              <span className="gradient-text">More replies.</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              No more staring at a blank compose window. SpearFisher does the
              research and writing so you can focus on selling.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Paste Prospect Info",
                desc: "Drop in a LinkedIn URL, company website, or just paste their bio. We extract what matters.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "Add Your Context",
                desc: "Tell us what you sell and your value prop. We match your offering to their specific pain points.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "Get 3 Variants",
                desc: "Direct, curiosity-based, and social proof — pick the angle that fits, copy, and send.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="gradient-border p-7 card-glow">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <div className="text-xs font-semibold text-indigo-400 mb-2">Step {item.step}</div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SOCIAL PROOF STATS ============ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            SDRs are getting <span className="gradient-text">replies</span>
          </h2>
          <p className="text-muted text-center mb-14 max-w-lg mx-auto">
            Real numbers from teams using AI-powered personalization.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { stat: "3.2x", label: "Higher reply rates", desc: "vs. generic templates" },
              { stat: "47s", label: "Avg. time per email", desc: "down from 18 minutes" },
              { stat: "2hr+", label: "Saved per day", desc: "per sales rep" },
            ].map((item) => (
              <div key={item.label} className="gradient-border p-8 text-center card-glow">
                <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">{item.stat}</div>
                <div className="font-medium text-foreground mb-1">{item.label}</div>
                <div className="text-xs text-muted">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BEFORE / AFTER ============ */}
      <section className="py-20 px-6 border-y border-border bg-surface">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Generic vs. <span className="gradient-text">Personalized</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              See the difference AI personalization makes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Generic */}
            <div className="rounded-2xl p-6 bg-red-500/5 border border-red-500/15">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full">
                  Generic Template
                </span>
                <span className="text-xs text-red-400/70">&sim;2% reply rate</span>
              </div>
              <p className="text-sm font-medium mb-2 text-red-300">
                Subject: quick question
              </p>
              <p className="text-sm text-red-300/80 leading-relaxed">
                Hi [First Name],
                <br /><br />
                I hope this email finds you well. I came across your profile and
                thought our solution might be a good fit for your company. We
                help businesses like yours improve their sales process.
                <br /><br />
                Would you be open to a 15-minute call this week?
              </p>
            </div>

            {/* Personalized */}
            <div className="rounded-2xl p-6 bg-green-500/5 border border-green-500/15">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full">
                  SpearFisher Personalized
                </span>
                <span className="text-xs text-green-400/70">&sim;7% reply rate</span>
              </div>
              <p className="text-sm font-medium mb-2 text-green-300">
                Subject: saw your 5 new sdr hires
              </p>
              <p className="text-sm text-green-300/80 leading-relaxed">
                Hey Sarah,
                <br /><br />
                Noticed Acme just brought on 5 SDRs — scaling the outbound
                motion post-Series B is the right move. The tricky part: ramping
                them before your board expects pipeline numbers.
                <br /><br />
                We built an AI coach that cuts SDR ramp time from 3 months to 6
                weeks (Lattice and Notion both hit quota 40% faster). Worth a
                look?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">sales teams</span>
            </h2>
            <p className="text-muted max-w-lg mx-auto">
              Hear from the SDRs, AEs, and founders who are sending better emails.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="gradient-border p-6 card-glow">
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((n) => <StarIcon key={n} />)}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{t.name}</div>
                    <div className="text-xs text-muted">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="py-20 px-6 border-y border-border bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="gradient-text">book more meetings</span>
            </h2>
            <p className="text-muted max-w-lg mx-auto">
              From research to send. SpearFisher handles the hard parts.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "3 Persuasion Angles",
                desc: "Every email comes in Direct Value, Curiosity Hook, and Social Proof variants. Pick the one that fits.",
                icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
              },
              {
                title: "Prospect Research",
                desc: "Paste a URL or bio and our AI extracts company stage, tech stack, hiring signals, and pain points.",
                icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
              },
              {
                title: "PDF Context Upload",
                desc: "Upload your pitch deck, case study, or one-pager. SpearFisher weaves your specific proof points into each email.",
                icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
              },
              {
                title: "Tone Matching",
                desc: "Executive? Casual IC? Technical lead? SpearFisher matches the communication style to the prospect.",
                icon: "M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802",
              },
              {
                title: "One-Click Copy",
                desc: "Generated emails land in a clean interface. Click to copy and paste straight into your sequencer.",
                icon: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75",
              },
              {
                title: "No Banned Phrases",
                desc: 'SpearFisher never writes "I hope this email finds you well" or "I\'d love to pick your brain." Ever.',
                icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",
              },
            ].map((feat) => (
              <div key={feat.title} className="gradient-border p-6 card-glow">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={feat.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{feat.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LIVE DEMO ============ */}
      <section id="demo" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Try it <span className="gradient-text">right now</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Paste any prospect info below and see AI personalization in action.
              No signup required.
            </p>
          </div>
          <LiveDemo />
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-20 px-6 border-y border-border bg-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="space-y-4">
            {homeFaqs.map((faq) => (
              <div
                key={faq.question}
                className="gradient-border p-6 card-glow"
              >
                <h3 className="font-semibold mb-2 text-foreground">{faq.question}</h3>
                <p className="text-muted text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
        <div className="max-w-2xl mx-auto text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to send emails that{" "}
            <span className="gradient-text">get replies</span>?
          </h2>
          <p className="text-muted mb-8 max-w-lg mx-auto">
            Join 2,500+ sales teams using AI-powered personalization. Free to
            start — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 btn-primary text-white font-semibold px-8 py-3.5 rounded-xl text-lg"
            >
              Start Personalizing Free
              <ArrowIcon />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-1.5">
              <CheckIcon />
              <span className="text-sm text-muted">5 free emails/month</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckIcon />
              <span className="text-sm text-muted">No credit card</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckIcon />
              <span className="text-sm text-muted">Setup in 30 seconds</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
