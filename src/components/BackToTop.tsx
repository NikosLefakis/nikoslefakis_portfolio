"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPRING_SNAPPY } from "@/lib/motion";
import { scrollToY } from "@/lib/scroll";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => scrollToY(0);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, transform: "translateY(8px) scale(0.9)" }}
          animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
          exit={{ opacity: 0, transform: "translateY(8px) scale(0.9)" }}
          transition={SPRING_SNAPPY}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="press fixed bottom-6 right-6 z-50 w-10 h-10 rounded-xl glass-panel t-border border flex items-center justify-center text-cyan-500 hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-300 group"
        >
          <i className="fa-solid fa-chevron-up text-xs group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
