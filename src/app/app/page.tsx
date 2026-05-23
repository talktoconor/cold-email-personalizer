"use client";

import { useState } from "react";
import Link from "next/link";

interface Email {
  variant: string;
  subject: string;
  body: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function CopyAllButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-500 hover:text-indigo-700 transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied subject + body
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy Full Email
        </>
      )}
    </button>
  );
}

export default function AppPage() {
  const [prospectInfo, setProspectInfo] = useState("");
  const [senderContext, setSenderContext] = useState("");
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
        body: JSON.stringify({ prospectInfo, senderContext }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setEmails(data.emails || []);
    } catch {
      setError("Failed to connect. Check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border max-w-6xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">CC</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">ColdCraft</span>
        </Link>
        <div className="text-sm text-muted">5 free / day</div>
      </nav>

      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          {/* Left: Input */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Generate Emails</h1>
              <p className="text-sm text-muted">Paste prospect info and get 3 personalized variants.</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Prospect Info <span className="text-red-400">*</span>
              </label>
              <textarea
                value={prospectInfo}
                onChange={(e) => setProspectInfo(e.target.value)}
                placeholder={"Paste a LinkedIn profile URL, bio, company info, or anything you know about the prospect.\n\nExample:\nSarah Chen, VP of Sales at Acme Corp (Series B, 200 employees). They sell HR software to mid-market. Recently hired 5 SDRs. Uses Salesforce + Outreach."}
                rows={8}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Your Product / Value Prop
              </label>
              <textarea
                value={senderContext}
                onChange={(e) => setSenderContext(e.target.value)}
                placeholder={"What do you sell? What's the key benefit?\n\nExample:\nWe're Quota, an AI sales coach that listens to calls and gives reps real-time objection handling tips. Avg customer sees 22% close rate improvement in 60 days."}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:text-slate-400"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prospectInfo.trim()}
              className="w-full py-3 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating...
                </>
              ) : (
                "Generate 3 Emails"
              )}
            </button>
          </div>

          {/* Right: Output */}
          <div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-6">
                {error}
              </div>
            )}

            {emails.length === 0 && !loading && !error && (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <p className="text-muted text-sm">Your personalized emails will appear here</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <svg className="w-8 h-8 animate-spin text-indigo-500 mb-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="text-muted text-sm">Researching prospect and crafting emails...</p>
              </div>
            )}

            {emails.length > 0 && (
              <div className="space-y-6">
                {emails.map((email, i) => (
                  <div
                    key={i}
                    className={`bg-white border border-border rounded-2xl p-6 animate-fade-in${i > 0 ? `-delay-${i}` : ""}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                        {email.variant}
                      </span>
                      <CopyAllButton text={`Subject: ${email.subject}\n\n${email.body}`} />
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-muted uppercase tracking-wider">Subject</span>
                        <CopyButton text={email.subject} />
                      </div>
                      <p className="text-sm font-medium">{email.subject}</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-muted uppercase tracking-wider">Body</span>
                        <CopyButton text={email.body} />
                      </div>
                      <p className="text-sm leading-relaxed whitespace-pre-line text-slate-700">
                        {email.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
