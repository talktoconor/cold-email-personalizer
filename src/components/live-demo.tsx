"use client";

import { useState } from "react";

interface Email {
  variant: string;
  subject: string;
  body: string;
}

export function LiveDemo() {
  const [prospectInfo, setProspectInfo] = useState("");
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prospectInfo.trim()) return;
    setLoading(true);
    setError("");
    setEmails([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prospectInfo }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      setEmails(data.emails || []);
    } catch {
      setError("Failed to connect. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-border p-6 sm:p-8">
      <div className="grid md:grid-cols-[1fr_1fr] gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            Paste prospect info
          </label>
          <textarea
            value={prospectInfo}
            onChange={(e) => setProspectInfo(e.target.value)}
            placeholder={
              "LinkedIn URL, bio, or company info.\n\nExample: Sarah Chen, VP Sales at Acme Corp (Series B, 200 employees). Sells HR software to mid-market. Just hired 5 SDRs."
            }
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-foreground text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:text-slate-500"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prospectInfo.trim()}
            className="w-full mt-3 py-3 rounded-xl btn-primary text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Personalizing...
              </>
            ) : (
              "Generate Preview"
            )}
          </button>
          <p className="text-xs text-muted mt-2 text-center">
            Free preview — no signup required
          </p>
        </div>
        <div className="min-h-[200px]">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}
          {!loading && emails.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center h-full text-center py-8 text-muted">
              <svg
                className="w-10 h-10 text-border mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <p className="text-sm">Your personalized preview appears here</p>
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <svg
                className="w-8 h-8 animate-spin text-accent mb-3"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <p className="text-sm text-muted">
                Researching prospect and crafting emails...
              </p>
            </div>
          )}
          {emails.length > 0 && (
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
              {emails.slice(0, 1).map((email, i) => (
                <div key={i}>
                  <span className="inline-flex text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full mb-2">
                    {email.variant}
                  </span>
                  <p className="text-sm font-medium mb-1 text-foreground">
                    Subject: {email.subject}
                  </p>
                  <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
                    {email.body}
                  </p>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted">
                      + 2 more variants with{" "}
                      <a
                        href="/app"
                        className="text-accent-light font-medium hover:underline"
                      >
                        full access &rarr;
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
