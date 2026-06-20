"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { LogoMark } from "@/components/LogoMark";

export default function Header() {
  const [menuOpen, setMenuOpen]           = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted]             = useState(false);
  const [hoveredLink, setHoveredLink]     = useState<string | null>(null);

  const { theme, setTheme }          = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.home,     href: "#home",     id: "home" },
    { name: t.nav.projects, href: "#projects", id: "projects" },
    { name: t.nav.about,    href: "#about",    id: "about" },
    { name: t.nav.skills,   href: "#skills",   id: "skills" },
  ];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "projects", "about", "skills"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0, rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-5 px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto w-full max-w-4xl flex items-center justify-between px-4 py-2.5 rounded-2xl border transition-all duration-500 ${
          scrolled
            ? "t-header-scrolled shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-2.5 group shrink-0 z-10 px-1">
          {/* Gradient-border container */}
          <div className="relative w-9 h-9 shrink-0">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/30 to-cyan-700/15 group-hover:from-cyan-400/50 group-hover:to-cyan-600/30 transition-all duration-300" />
            <div className="absolute inset-[1px] rounded-[10px] bg-[#060d1a] flex items-center justify-center">
              <LogoMark className="w-[18px] h-[18px]" />
            </div>
          </div>
          <span className="font-bold text-sm tracking-wide t-text hidden sm:block group-hover:text-cyan-400 transition-colors duration-200">
            Nikos Lefakis
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 relative z-10">
          {navLinks.map((link) => {
            const isActive  = activeSection === link.id;
            const isHovered = hoveredLink   === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                  isActive ? "text-cyan-400" : "t-body hover:t-text"
                }`}
              >
                {isHovered && !isActive && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 t-surface t-border border rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-cyan-500/[0.08] border border-cyan-500/[0.15] rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2 z-10 shrink-0">
          <button
            onClick={() => setLanguage(language === "en" ? "el" : "en")}
            className="h-8 px-3 rounded-lg t-border border t-surface text-[11px] font-bold t-body hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200 tracking-wider"
            aria-label="Toggle language"
          >
            {language === "en" ? "EN" : "EL"}
          </button>
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-8 h-8 rounded-lg t-border border t-surface flex items-center justify-center t-body hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
              aria-label="Toggle theme"
            >
              <i className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"} text-[12px]`} />
            </button>
          )}
          <Link
            href="#contact"
            className="ml-1 px-5 py-2 rounded-xl bg-cyan-500 text-black text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 hover:shadow-[0_0_16px_rgba(6,182,212,0.45)] transition-all duration-300"
          >
            {t.nav.letsTalk}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg t-body hover:text-cyan-400 focus:outline-none transition-colors z-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-lg`} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[72px] inset-x-4 max-w-sm mx-auto t-card border t-border rounded-2xl p-4 flex flex-col gap-2 shadow-2xl pointer-events-auto md:hidden backdrop-blur-3xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-center font-medium py-3 px-4 rounded-xl border transition-all ${
                  activeSection === link.id
                    ? "text-cyan-400 bg-cyan-500/[0.08] border-cyan-500/20"
                    : "t-body t-border hover:text-cyan-400 hover:border-cyan-500/20"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={() => setLanguage(language === "en" ? "el" : "en")}
                className="flex-1 py-2.5 rounded-xl t-border border t-surface text-xs font-bold t-body hover:text-cyan-400 transition-all tracking-wider"
              >
                {language === "en" ? "EN" : "EL"}
              </button>
              {mounted && (
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="flex-1 py-2.5 rounded-xl t-border border t-surface t-body hover:text-cyan-400 transition-all text-xs font-medium"
                >
                  <i className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"} mr-2`} />
                  {isDark ? "Light" : "Dark"}
                </button>
              )}
            </div>
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="text-center text-black font-bold uppercase tracking-widest text-xs bg-cyan-500 hover:bg-cyan-400 py-3.5 rounded-xl transition-all"
            >
              {t.nav.letsTalk}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
