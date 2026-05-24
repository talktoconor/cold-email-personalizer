"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#060a13",
          color: "#f1f5f9",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "28rem", padding: "1.5rem" }}>
          <div
            style={{
              width: "3.5rem",
              height: "3.5rem",
              borderRadius: "1rem",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f87171"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            Something went wrong
          </h1>
          <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
            A critical error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "0.625rem 1.25rem",
              borderRadius: "0.75rem",
              border: "none",
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.2)",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
