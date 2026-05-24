import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">SF</span>
              </div>
              <span className="font-semibold text-foreground">SpearFisher</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              AI-powered cold email personalization for sales teams that want
              replies, not opens.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Product</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link
                  href="/app"
                  className="hover:text-foreground transition-colors"
                >
                  Generate Emails
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="hover:text-foreground transition-colors"
                >
                  Free Tools
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Resources</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/cold-email"
                  className="hover:text-foreground transition-colors"
                >
                  Cold Email Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/glossary"
                  className="hover:text-foreground transition-colors"
                >
                  Glossary
                </Link>
              </li>
              <li>
                <Link
                  href="/benchmarks"
                  className="hover:text-foreground transition-colors"
                >
                  Benchmarks
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">By Role</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link
                  href="/cold-email/roles/sdr"
                  className="hover:text-foreground transition-colors"
                >
                  For SDRs
                </Link>
              </li>
              <li>
                <Link
                  href="/cold-email/roles/account-executive"
                  className="hover:text-foreground transition-colors"
                >
                  For Account Executives
                </Link>
              </li>
              <li>
                <Link
                  href="/cold-email/roles/recruiter"
                  className="hover:text-foreground transition-colors"
                >
                  For Recruiters
                </Link>
              </li>
              <li>
                <Link
                  href="/cold-email/roles/founder"
                  className="hover:text-foreground transition-colors"
                >
                  For Founders
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} SpearFisher. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Built for reps who want replies, not opens.
          </p>
        </div>
      </div>
    </footer>
  );
}
