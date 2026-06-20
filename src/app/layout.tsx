import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className={`${geist.variable} ${geist.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
