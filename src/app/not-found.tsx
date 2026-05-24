import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Nav />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-7xl font-bold text-indigo-500 mb-4">404</p>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Page not found
          </h1>
          <p className="text-muted mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl btn-primary text-white font-semibold text-sm"
            >
              Back to Home
            </Link>
            <Link
              href="/app"
              className="px-5 py-2.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-surface transition-colors"
            >
              Open App
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
