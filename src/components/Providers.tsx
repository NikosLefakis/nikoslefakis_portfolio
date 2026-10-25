"use client";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <MotionConfig reducedMotion="user">
        <LanguageProvider>{children}</LanguageProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
