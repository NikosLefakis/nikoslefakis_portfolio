"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SPRING } from "@/lib/motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, transform: "translateY(14px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    transform: "translateY(0px)",
    transition: { ...SPRING, delay },
  }),
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, transform: "translateY(16px) scale(0.97)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px) scale(1)",
    transition: { ...SPRING, duration: 0.8, delay: 0.2 },
  },
};

const SOCIALS = [
  { href: "https://github.com/NikosLefakis",           icon: "fa-brands fa-github",      label: "GitHub" },
  { href: "https://www.linkedin.com/in/nikoslefakis/", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
  { href: "mailto:lefnick@gmail.com",                  icon: "fa-regular fa-envelope",   label: "Email" },
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 sm:pt-24 overflow-hidden">
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
              <div className="mb-7 flex items-center gap-3 pl-3 pr-4 py-1.5 rounded-full t-border border t-badge w-fit text-[13px]">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <span className="font-semibold t-text">{t.hero.badge}</span>
                <span className="hidden sm:block w-px h-3.5 t-divider" aria-hidden="true" />
                <span className="hidden sm:inline t-muted">{t.hero.location}</span>
              </div>
            </motion.div>

            {/* Mobile profile image: shown between badge and H1 */}
            <motion.div
              variants={fadeUp}
              custom={0.02}
              className="md:hidden flex justify-center w-full mb-8"
            >
              <div className="relative">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden t-border border">
                  <Image src="/assets/profile.png" alt="Nikos Lefakis" fill sizes="176px" className="object-cover object-top" priority />
                </div>
                <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-[var(--background)] border-2 border-emerald-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              </div>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              custom={0.05}
              className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
            >
              {t.hero.greeting}
              <br />
              <span className="accent-glow">{t.hero.title}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              custom={0.1}
              className="text-base sm:text-lg md:text-xl t-body max-w-lg mb-9 sm:mb-10 leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={0.15} className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link href="#projects" className="btn-primary">
                {t.hero.viewProjects}
              </Link>
              <Link href="#contact" className="btn-ghost">
                {t.nav.letsTalk}
              </Link>
              <a
                href="/assets/cv_nikoslefakis.pdf"
                download
                hidden
                className="btn-ghost"
              >
                <i className="fa-solid fa-download text-sm" />
                {t.hero.downloadCV}
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={fadeUp} custom={0.2} className="flex items-center gap-3 mt-10 sm:mt-12">
              {SOCIALS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="press w-11 h-11 rounded-xl t-border border t-surface flex items-center justify-center t-body hover:t-text hover:border-[var(--border-hover)] transition-colors duration-200 text-lg"
                >
                  <i className={icon} aria-hidden="true" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Desktop profile ── */}
          <motion.div variants={imageReveal} className="md:col-span-5 hidden md:block relative">
            <div className="relative w-full aspect-[4/5] rounded-2xl glass-panel p-2">
              <div className="relative w-full h-full rounded-xl overflow-hidden group">
                <Image
                  src="/assets/profile.png"
                  alt="Nikos Lefakis"
                  fill
                  sizes="(max-width: 1080px) 40vw, 440px"
                  className="object-cover object-[center_20%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white font-bold text-lg tracking-tight">Nikos Lefakis</p>
                  <p className="text-slate-300 text-sm font-medium mt-0.5">{t.hero.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
