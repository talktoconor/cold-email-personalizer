import Link from "next/link";

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">SF</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">SpearFisher</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#pricing" className="text-sm text-muted hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link
            href="/app"
            className="text-sm font-medium bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Try Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
          Built by AEs and SDRs who&apos;ve sourced and closed $100M+ in ACV
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          Stop writing generic
          <br />
          <span className="text-indigo-500">cold emails</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted max-w-2xl mb-10 leading-relaxed">
          Paste a LinkedIn profile or company info. Get 3 personalized email
          variants in seconds. Your prospects will think you spent 20 minutes
          researching them.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/app"
            className="inline-flex items-center justify-center gap-2 bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-600 transition-colors text-lg"
          >
            Generate Emails Free
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 border border-border font-medium px-8 py-3.5 rounded-xl hover:bg-surface transition-colors text-lg"
          >
            See How It Works
          </Link>
        </div>
        <p className="mt-6 text-sm text-muted">5 free emails/day. No credit card required.</p>
      </section>

      {/* Logo Marquee */}
      <section className="py-6 border-y border-border bg-surface overflow-hidden">
        <p className="text-xs font-medium text-center uppercase tracking-[0.2em] text-slate-400 mb-5">
          Built by reps with experience from
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex shrink-0 items-center gap-4 px-2">
                {[
                  { src: "/logos/blackrock.png", alt: "BlackRock" },
                  { src: "/logos/carta.png", alt: "Carta" },
                  { src: "/logos/nike.png", alt: "Nike" },
                  { src: "/logos/kaiser.png", alt: "Kaiser Permanente" },
                  { src: "/logos/focus.png", alt: "Focus" },
                ].map((logo) => (
                  <div
                    key={`${setIndex}-${logo.alt}`}
                    className="flex items-center justify-center px-6 py-3 rounded-xl bg-white border border-border/60 shadow-sm"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-7 w-auto grayscale opacity-40"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Three steps. Three emails. More replies.</h2>
          <p className="text-muted text-center mb-14 max-w-xl mx-auto">
            No more staring at a blank compose window. SpearFisher does the research and writing so you can focus on selling.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Paste Prospect Info",
                desc: "Drop in a LinkedIn URL, company website, or just paste their bio. We extract what matters.",
              },
              {
                step: "2",
                title: "Add Your Context",
                desc: "Tell us what you sell and your value prop. We match your offering to their specific pain points.",
              },
              {
                step: "3",
                title: "Get 3 Variants",
                desc: "Direct, curiosity-based, and social proof — pick the angle that fits, copy, and send.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-8 border border-border">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">SDRs are getting replies</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-500 mb-1">3.2x</div>
              <div className="text-muted text-sm">higher reply rates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-500 mb-1">47s</div>
              <div className="text-muted text-sm">avg. time per email</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-500 mb-1">2hr+</div>
              <div className="text-muted text-sm">saved per day</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple pricing</h2>
          <p className="text-muted text-center mb-12">One plan. Everything included. Cancel anytime.</p>
          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl p-8 border border-border">
              <h3 className="font-semibold text-lg mb-1">Free</h3>
              <p className="text-muted text-sm mb-6">Try it out</p>
              <div className="text-4xl font-bold mb-6">
                $0<span className="text-lg font-normal text-muted">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["5 emails per day", "3 variants per generation", "All email styles"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/app"
                className="block w-full text-center py-2.5 rounded-lg border border-border font-medium hover:bg-surface transition-colors"
              >
                Get Started
              </Link>
            </div>
            {/* Pro */}
            <div className="bg-white rounded-2xl p-8 border-2 border-indigo-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="font-semibold text-lg mb-1">Pro</h3>
              <p className="text-muted text-sm mb-6">For serious SDRs</p>
              <div className="text-4xl font-bold mb-6">
                $29<span className="text-lg font-normal text-muted">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited emails",
                  "3 variants per generation",
                  "Gmail integration — send directly",
                  "LinkedIn integration — auto-pull profiles",
                  "PDF context upload",
                  "Priority generation",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/app"
                className="block w-full text-center py-2.5 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">SF</span>
            </div>
            <span className="text-sm text-muted">SpearFisher</span>
          </div>
          <p className="text-sm text-muted">Built for reps who want replies, not opens.</p>
        </div>
      </footer>
    </div>
  );
}
