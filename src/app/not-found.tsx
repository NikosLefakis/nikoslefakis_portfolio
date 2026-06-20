"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(6,182,212,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EXPO }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: EXPO }}
          className="font-mono text-xs font-medium text-cyan-500/60 tracking-[0.2em] uppercase mb-6"
        >
          Error 404
        </motion.p>

        {/* Big 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 1, ease: EXPO }}
          className="relative mb-6 select-none"
        >
          <span
            className="text-[120px] sm:text-[160px] md:text-[200px] font-extrabold leading-none tracking-tighter"
            style={{
              background: "linear-gradient(135deg, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0.06) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </span>
          {/* Glow overlay */}
          <span
            className="absolute inset-0 text-[120px] sm:text-[160px] md:text-[200px] font-extrabold leading-none tracking-tighter pointer-events-none accent-glow"
            style={{ opacity: 0.12 }}
            aria-hidden="true"
          >
            404
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: EXPO }}
          className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
        >
          Page not found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: EXPO }}
          className="t-body font-light text-base max-w-xs sm:max-w-sm mx-auto mb-10 leading-relaxed"
        >
          This page doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: EXPO }}
          className="flex flex-col sm:flex-row gap-3 items-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-cyan-500 text-black text-sm font-bold hover:bg-cyan-400 hover:shadow-[0_0_28px_rgba(6,182,212,0.45)] transition-all duration-300"
          >
            <i className="fa-solid fa-arrow-left text-xs" />
            Back to Home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl glass-panel border t-border text-sm font-medium t-body hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300"
          >
            View Projects
          </Link>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16 flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs t-muted font-mono">nikoslefakis.vercel.app</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
