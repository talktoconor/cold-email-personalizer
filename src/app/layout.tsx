import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TrackingPixels } from "@/components/tracking";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SpearFisher — AI Cold Email Personalization Tool",
    template: "%s | SpearFisher",
  },
  description:
    "AI-powered cold email personalization. Paste prospect info, get 3 personalized email variants in seconds. 3x higher reply rates for SDRs, BDRs, and sales teams.",
  metadataBase: new URL("https://spearfisher.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://spearfisher.app",
    siteName: "SpearFisher",
    title: "SpearFisher — AI Cold Email Personalization Tool",
    description:
      "Stop sending generic cold emails. AI researches your prospects and writes personalized emails that get replies. Free tier available.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SpearFisher - AI Cold Email Personalization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpearFisher — AI Cold Email Personalization Tool",
    description:
      "Stop sending generic cold emails. AI researches your prospects and writes personalized emails that get replies.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://spearfisher.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TrackingPixels />
        {children}
      </body>
    </html>
  );
}
