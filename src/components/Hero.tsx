"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EXPO, delay },
  }),
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.1, ease: EXPO, delay: 0.2 },
  },
};

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 sm:pt-24 overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute -top-[20%] -left-[15%] w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 65%)", animation: "glow-pulse 8s ease-in-out infinite" }} />
        <div className="absolute -bottom-[20%] -right-[10%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 60%)", animation: "glow-pulse 11s ease-in-out infinite 2s" }} />
        <div className="absolute top-[35%] left-[45%] w-[280px] sm:w-[320px] h-[280px] sm:h-[320px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)", animation: "glow-pulse 7s ease-in-out infinite 4s" }} />
        <div className="absolute -top-[5%] right-[10%] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)", animation: "glow-pulse 13s ease-in-out infinite 1s" }} />
        <div className="absolute bottom-[5%] left-[20%] w-[200px] sm:w-[280px] h-[200px] sm:h-[280px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)", animation: "glow-pulse 9s ease-in-out infinite 3.5s" }} />
        <div className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(6,182,212,1) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="absolute left-0 right-0 h-px opacity-20"
          style={{ top: "62%", background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.5) 30%, rgba(6,182,212,0.8) 50%, rgba(6,182,212,0.5) 70%, transparent 100%)", animation: "shimmer 6s ease-in-out infinite" }} />
        <div className="absolute inset-0 hero-vignette-v" />
        <div className="absolute inset-0 hero-vignette-h" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-[1080px] mx-auto w-full px-4 sm:px-6 pb-16 sm:pb-20 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">

          {/* ── Left: Content ── */}
          <div className="md:col-span-7 flex flex-col items-start">

            {/* Badge */}
            <motion.div variants={fadeUp} custom={0}>
              <div className="mb-6 flex items-center gap-3 px-4 py-2 rounded-full t-border border t-badge backdrop-blur-md w-fit">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-70" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                </span>
                <span className="text-xs font-semibold t-body uppercase tracking-widest">{t.hero.badge}</span>
              </div>
            </motion.div>

            {/* Mobile profile image — shown between badge and H1 */}
            <motion.div
              variants={fadeUp}
              custom={0.02}
              className="md:hidden flex justify-center w-full mb-8"
            >
              <div className="relative">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-[2.5px] bg-gradient-to-br from-cyan-500/60 via-cyan-400/20 to-blue-600/30 shadow-[0_0_40px_rgba(6,182,212,0.22)]">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image src="/assets/profile.png" alt="Nikos Lefakis" fill className="object-cover object-top" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>
                {/* Pulsing ring */}
                <div className="absolute inset-[-10px] rounded-full border border-cyan-500/15"
                  style={{ animation: "glow-pulse 4s ease-in-out infinite" }} />
                {/* Available dot */}
                <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-[#020305] border-2 border-emerald-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              custom={0.05}
              className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-[1.06] tracking-tight"
            >
              {t.hero.greeting}
              <br />
              <span className="accent-glow">{t.hero.title}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              custom={0.1}
              className="text-base sm:text-lg md:text-xl t-body max-w-lg mb-8 sm:mb-10 font-light leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={0.15} className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full sm:w-auto mb-10 sm:mb-0">
              <Link
                href="#projects"
                className="px-7 py-3.5 rounded-xl bg-cyan-500 text-black font-bold text-center transition-all duration-300 hover:bg-cyan-400 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(6,182,212,0.45)] active:scale-[0.98]"
              >
                {t.hero.viewProjects}
              </Link>
              <a
                href="/assets/cv_nikoslefakis.pdf"
                download
                className="px-7 py-3.5 rounded-xl t-border border t-badge t-text font-medium text-center transition-all duration-300 flex items-center justify-center gap-2 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5 active:scale-[0.98]"
              >
                <i className="fa-solid fa-download text-sm" />
                {t.hero.downloadCV}
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={fadeUp} custom={0.2} className="flex items-center gap-4 mt-10 sm:mt-12">
              {[
                { href: "https://github.com/NikosLefakis",           icon: "fa-brands fa-github",      label: "GitHub" },
                { href: "https://www.linkedin.com/in/nikoslefakis/", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
                { href: "mailto:lefnick@gmail.com",                  icon: "fa-regular fa-envelope",   label: "Email" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="w-11 h-11 rounded-xl t-border border t-surface flex items-center justify-center t-body hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:scale-110 transition-all duration-300 text-lg"
                >
                  <i className={icon} />
                </a>
              ))}
              <div className="ml-2 h-px flex-1 max-w-[60px] t-border border-t" />
              <span className="text-xs t-muted font-medium tracking-wide">{t.hero.location}</span>
            </motion.div>
          </div>

          {/* ── Right: Desktop profile ── */}
          <motion.div variants={imageReveal} className="md:col-span-5 hidden md:block relative">
            <div className="relative w-full aspect-[4/5] rounded-2xl glass-panel p-2">
              <div className="relative w-full h-full rounded-xl overflow-hidden group">
                <Image
                  src="/assets/profile.png"
                  alt="Nikos Lefakis Portrait"
                  fill
                  className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-[1.04]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                <div className="absolute bottom-6 left-6 border-l-2 border-cyan-500 pl-4">
                  <p className="text-white font-bold text-lg tracking-tight">Nikos Lefakis</p>
                  <p className="text-slate-400 text-sm font-medium mt-0.5">{t.hero.location}</p>
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 rounded-3xl border border-cyan-500/10 pointer-events-none"
              style={{ animation: "glow-pulse 4s ease-in-out infinite 1s" }} />
            <div className="absolute -inset-8 rounded-3xl border border-cyan-500/[0.05] pointer-events-none"
              style={{ animation: "glow-pulse 6s ease-in-out infinite 2s" }} />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
