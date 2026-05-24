import Link from "next/link";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-sm">SF</span>
          </div>
          <span className="font-semibold text-lg tracking-tight text-foreground">
            SpearFisher
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/cold-email"
            className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            Resources
          </Link>
          <Link
            href="/blog"
            className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            Blog
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            Pricing
          </Link>
          <Link
            href="/app"
            className="text-sm font-medium border border-border hover:border-border-light text-foreground px-4 py-2 rounded-lg transition-all hover:bg-surface-light hidden sm:block"
          >
            Book a Demo
          </Link>
          <Link
            href="/app"
            className="text-sm font-medium btn-primary text-white px-4 py-2 rounded-lg"
          >
            Try Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
