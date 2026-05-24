export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Nav skeleton */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-surface animate-pulse" />
          <div className="h-5 w-28 rounded bg-surface animate-pulse" />
        </div>
        <div className="h-5 w-20 rounded bg-surface animate-pulse" />
      </nav>

      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        <div className="grid lg:grid-cols-[420px_1fr] gap-8">
          {/* Left column: form skeleton */}
          <div className="space-y-5">
            {/* Heading */}
            <div>
              <div className="h-7 w-48 rounded bg-surface animate-pulse mb-2" />
              <div className="h-4 w-72 rounded bg-surface animate-pulse" />
            </div>

            {/* Textarea placeholder */}
            <div>
              <div className="h-4 w-28 rounded bg-surface animate-pulse mb-2" />
              <div className="h-40 w-full rounded-xl border border-border bg-card animate-pulse" />
            </div>

            {/* Second textarea */}
            <div>
              <div className="h-4 w-36 rounded bg-surface animate-pulse mb-2" />
              <div className="h-24 w-full rounded-xl border border-border bg-card animate-pulse" />
            </div>

            {/* Pro section */}
            <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
              <div className="h-4 w-40 rounded bg-surface animate-pulse" />
              <div className="h-10 w-full rounded-lg bg-surface animate-pulse" />
              <div className="h-10 w-full rounded-lg bg-surface animate-pulse" />
            </div>

            {/* Button */}
            <div className="h-12 w-full rounded-xl bg-surface animate-pulse" />
          </div>

          {/* Right column: output placeholder */}
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-surface animate-pulse mb-4" />
            <div className="h-4 w-56 rounded bg-surface animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
