"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { flushSync } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SPRING, SPRING_SNAPPY } from "@/lib/motion";
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

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

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

  // Theme change crossfades the whole page (View Transitions) instead of snapping,
  // so the brightness change is eased. Falls back to an instant swap.
  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished?: Promise<void> } };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce || document.visibilityState !== "visible") { setTheme(next); return; }
    const vt = doc.startViewTransition(() => flushSync(() => setTheme(next)));
    // A skipped transition (tab hidden mid-way, rapid double toggle) rejects: that is fine
    vt?.finished?.catch(() => {});
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <motion.nav
        initial={{ transform: "translateY(-24px)", opacity: 0 }}
        animate={{ transform: "translateY(0px)", opacity: 1 }}
        transition={SPRING}
        className={`pointer-events-auto w-full max-w-5xl flex items-center justify-between gap-6 pl-4 pr-3.5 py-3 rounded-[26px] border transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "t-header-scrolled shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-2.5 group shrink-0 z-10 px-1">
          {/* Gradient-border container */}
          <LogoMark className="w-11 h-11 shrink-0 transition-transform duration-200 group-active:scale-95" />
          <span className="font-display font-extrabold text-[18px] tracking-tight t-text hidden sm:block">
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
                className={`relative px-5 py-2.5 text-[15px] font-medium rounded-2xl transition-colors duration-200 ${
                  isActive ? "text-cyan-400" : "t-body hover:t-text"
                }`}
              >
                {isHovered && !isActive && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 t-surface t-border border rounded-2xl -z-10"
                    transition={SPRING_SNAPPY}
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-cyan-500/[0.08] border border-cyan-500/[0.15] rounded-2xl -z-10"
                    transition={SPRING_SNAPPY}
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
            className="press h-10 px-4 rounded-xl t-border border t-surface text-xs font-bold t-body hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200 tracking-wider"
            aria-label="Toggle language"
          >
            {language === "en" ? "EN" : "EL"}
          </button>
          {mounted && (
            <button
              onClick={toggleTheme}
              className="press w-10 h-10 rounded-xl t-border border t-surface flex items-center justify-center t-body hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
              aria-label="Toggle theme"
            >
              <i className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"} text-sm`} />
            </button>
          )}
          <Link
            href="#contact"
            className="btn-primary ml-1 !px-6 !py-3"
          >
            {t.nav.letsTalk}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="press md:hidden w-11 h-11 flex items-center justify-center rounded-xl t-body hover:text-cyan-400 focus:outline-none transition-colors z-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-lg`} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            // Materializes out of the menu button (top right): blur, scale and opacity arrive
            // together and leave the same way. Critically damped spring, so a quick re-tap
            // reverses from where it is instead of waiting.
            initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
            // Drag up to dismiss: follows the finger 1:1, resists past its bounds, and a quick
            // flick closes it even over a short distance
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.35, bottom: 0.04 }}
            onDragEnd={(_, info) => { if (info.offset.y < -50 || info.velocity.y < -400) setMenuOpen(false); }}
            transition={SPRING_SNAPPY}
            className="material-sheet absolute top-[92px] inset-x-4 max-w-sm ml-auto rounded-2xl p-4 flex flex-col gap-2 pointer-events-auto md:hidden"
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
                className="press flex-1 py-2.5 rounded-xl t-border border t-surface text-xs font-bold t-body hover:text-cyan-400 transition-all tracking-wider"
              >
                {language === "en" ? "EN" : "EL"}
              </button>
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="press flex-1 py-2.5 rounded-xl t-border border t-surface t-body hover:text-cyan-400 transition-all text-xs font-medium"
                >
                  <i className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"} mr-2`} />
                  {isDark ? "Light" : "Dark"}
                </button>
              )}
            </div>
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary"
            >
              {t.nav.letsTalk}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
