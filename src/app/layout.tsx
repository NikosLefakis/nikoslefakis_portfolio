import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";
import { FontAwesomeLoader } from "@/components/FontAwesomeLoader";
import SpotLight from "@/components/SpotLight";
import SmoothScroll from "@/components/SmoothScroll";

// Display: Inter Tight at heavy weights. Body: Inter. Both cover Greek.
const interTight = Inter_Tight({
  subsets: ["latin", "greek"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-inter-tight",
});

const inter = Inter({
  subsets: ["latin", "greek"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nikoslefakis.vercel.app"),
  title: "Nikos Lefakis",
  description:
    "Full Stack Developer specializing in Next.js, TypeScript, and AI-powered applications. Building modern web products from concept to deployment.",
  keywords: ["Nikos Lefakis", "Full Stack Developer", "Next.js", "TypeScript", "React", "Node.js", "LangChain", "RAG", "AI", "Portfolio"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Nikos Lefakis",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript, and AI-powered applications. Building modern web products from concept to deployment.",
    url: "https://nikoslefakis.vercel.app/",
    siteName: "Nikos Lefakis",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikos Lefakis",
    description: "Full Stack Developer specializing in Next.js, TypeScript, and AI-powered applications.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
      </head>
      <body className={`${inter.variable} ${interTight.variable} ${inter.className}`}>
        <Providers>{children}</Providers>
        <SpotLight />
        <SmoothScroll />
        <FontAwesomeLoader />
        <Analytics />
      </body>
    </html>
  );
}
