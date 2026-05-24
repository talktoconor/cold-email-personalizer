"use client";

import { useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

interface Email {
  variant: string;
  subject: string;
  body: string;
}

function ProBadge() {
  return (
    <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded ml-2">
      Pro
    </span>
  );
}

function LockIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
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
          <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
      className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
  const [companyUrl, setCompanyUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfText, setPdfText] = useState("");
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  const isPro = session?.user?.plan === "pro";

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("PDF must be under 5MB");
      return;
    }
    setPdfFile(file);
    setError("");

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      setPdfText(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prospectInfo.trim()) return;

    setLoading(true);
    setError("");
    setEmails([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prospectInfo,
          senderContext,
          companyUrl: isPro ? companyUrl : undefined,
          linkedinUrl: isPro ? linkedinUrl : undefined,
          pdfContext: isPro ? pdfText : undefined,
          pdfFileName: isPro ? pdfFile?.name : undefined,
        }),
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
    <div className="flex flex-col min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border max-w-6xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-sm">SF</span>
          </div>
          <span className="font-semibold text-lg tracking-tight text-foreground">SpearFisher</span>
        </Link>
        <div className="flex items-center gap-3">
          {isPro && (
            <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">
              Pro
            </span>
          )}
          <span className="text-sm text-muted">{isPro ? "Unlimited" : "5 free / day"}</span>
          {session?.user && (
            <>
              <span className="text-xs text-muted hidden sm:inline">{session.user.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-xs text-muted hover:text-foreground transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        <div className="grid lg:grid-cols-[420px_1fr] gap-8">
          {/* Left: Input */}
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold mb-1 text-foreground">Generate Emails</h1>
              <p className="text-sm text-muted">Paste prospect info and get 3 personalized variants.</p>
              <p className="text-sm text-muted mt-1">5 free emails per month</p>
            </div>

            {/* Prospect Info */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Prospect Info <span className="text-red-400">*</span>
              </label>
              <textarea
                value={prospectInfo}
                onChange={(e) => setProspectInfo(e.target.value)}
                placeholder={"Paste a LinkedIn profile URL, bio, company info, or anything you know about the prospect.\n\nExample:\nSarah Chen, VP of Sales at Acme Corp (Series B, 200 employees). They sell HR software to mid-market. Recently hired 5 SDRs. Uses Salesforce + Outreach."}
                rows={7}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-foreground text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:text-slate-500"
              />
            </div>

            {/* Your Product / Value Prop */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Your Product / Value Prop
              </label>
              <textarea
                value={senderContext}
                onChange={(e) => setSenderContext(e.target.value)}
                placeholder={"What do you sell? What's the key benefit?\n\nExample:\nWe're Quota, an AI sales coach that listens to calls and gives reps real-time objection handling tips. Avg customer sees 22% close rate improvement in 60 days."}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-foreground text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:text-slate-500"
              />
            </div>

            {/* Pro Features Section */}
            <div className="border border-indigo-500/20 bg-indigo-500/5 rounded-2xl p-4 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-indigo-400">Enhanced Context</span>
                <ProBadge />
              </div>

              {/* Company URL */}
              <div>
                <label className="flex items-center gap-1 text-sm font-medium mb-1.5 text-foreground">
                  <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  Your Company URL
                </label>
                {isPro ? (
                  <input
                    type="url"
                    value={companyUrl}
                    onChange={(e) => setCompanyUrl(e.target.value)}
                    placeholder="https://yourcompany.com"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:text-slate-500"
                  />
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface text-sm text-muted">
                    <LockIcon />
                    Upgrade to Pro to add your company URL
                  </div>
                )}
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="flex items-center gap-1 text-sm font-medium mb-1.5 text-foreground">
                  <svg className="w-4 h-4 text-muted" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Your LinkedIn URL
                </label>
                {isPro ? (
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:text-slate-500"
                  />
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface text-sm text-muted">
                    <LockIcon />
                    Upgrade to Pro to add your LinkedIn
                  </div>
                )}
              </div>

              {/* PDF Upload */}
              <div>
                <label className="flex items-center gap-1 text-sm font-medium mb-1.5 text-foreground">
                  <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  Upload Context PDF
                </label>
                {isPro ? (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                    />
                    {pdfFile ? (
                      <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-sm">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-indigo-300 truncate max-w-[200px]">{pdfFile.name}</span>
                          <span className="text-muted text-xs">({(pdfFile.size / 1024).toFixed(0)}KB)</span>
                        </div>
                        <button
                          onClick={() => { setPdfFile(null); setPdfText(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                          className="text-muted hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-border bg-surface text-sm text-muted hover:border-indigo-500/40 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        Drop a PDF — pitch deck, one-pager, case study
                      </button>
                    )}
                    <p className="text-xs text-muted mt-1">Max 5MB. We extract text to enrich your emails.</p>
                  </>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface text-sm text-muted">
                    <LockIcon />
                    Upgrade to Pro to upload context PDFs
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prospectInfo.trim()}
              className="w-full py-3 rounded-xl btn-primary text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center gap-2"
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
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm mb-6">
                {error}
              </div>
            )}

            {emails.length === 0 && !loading && !error && (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-border-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <p className="text-muted text-sm">Your personalized emails will appear here</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <svg className="w-8 h-8 animate-spin text-accent mb-4" viewBox="0 0 24 24" fill="none">
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
                    className={`gradient-border p-6 animate-fade-in${i > 0 ? `-delay-${i}` : ""}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">
                        {email.variant}
                      </span>
                      <CopyAllButton text={`Subject: ${email.subject}\n\n${email.body}`} />
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-muted uppercase tracking-wider">Subject</span>
                        <CopyButton text={email.subject} />
                      </div>
                      <p className="text-sm font-medium text-foreground">{email.subject}</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-muted uppercase tracking-wider">Body</span>
                        <CopyButton text={email.body} />
                      </div>
                      <p className="text-sm leading-relaxed whitespace-pre-line text-slate-300">
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
