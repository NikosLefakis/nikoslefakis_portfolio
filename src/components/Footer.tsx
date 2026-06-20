"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { LogoMark } from "@/components/LogoMark";

const SOCIALS = [
  { href: "https://github.com/NikosLefakis",           icon: "fa-brands fa-github",      label: "GitHub" },
  { href: "https://www.linkedin.com/in/nikoslefakis/", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
  { href: "mailto:lefnick@gmail.com",                  icon: "fa-regular fa-envelope",   label: "lefnick@gmail.com" },
];

export default function Footer() {
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.home,     href: "#home" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.skills,   href: "#skills" },
    { label: t.nav.about,    href: "#about" },
    { label: t.nav.letsTalk, href: "#contact" },
  ];

  return (
    <footer className="border-t t-border-faint pt-10 md:pt-16 pb-8 relative z-10">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-8 md:mb-14">

          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link href="#home" className="inline-flex items-center gap-2.5 group w-fit">
              {/* Gradient-border container */}
              <div className="relative w-9 h-9 shrink-0">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/30 to-cyan-700/15 group-hover:from-cyan-400/50 group-hover:to-cyan-600/30 transition-all duration-300" />
                <div className="absolute inset-[1px] rounded-[10px] bg-[#060d1a] flex items-center justify-center">
                  <LogoMark className="w-[18px] h-[18px]" />
                </div>
              </div>
              <span className="font-bold text-lg tracking-wide t-text group-hover:text-cyan-400 transition-colors duration-300">
                Nikos Lefakis
              </span>
            </Link>
            <p className="t-body font-light text-sm leading-relaxed">{t.footer.description}</p>
            <div className="flex items-center gap-2.5 mt-1">
              {SOCIALS.map(({ href, icon, label }) => (
                <a key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg t-surface t-border border flex items-center justify-center t-muted hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-250">
                  <i className={`${icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-semibold t-muted uppercase tracking-[0.18em] mb-5">{t.footer.navigation}</h4>
            <ul className="flex flex-col gap-3">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm t-body hover:text-cyan-400 transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-semibold t-muted uppercase tracking-[0.18em] mb-5">{t.footer.connect}</h4>
            <ul className="flex flex-col gap-3">
              {SOCIALS.map(({ href, icon, label }) => (
                <li key={label}>
                  <a href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-sm t-body hover:text-cyan-400 transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <i className={`${icon} w-4 text-center t-muted group-hover:text-cyan-400 transition-colors`} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-lg t-surface t-border border text-xs t-body">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t.about.statusValue}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t t-divide pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs t-subtle">
          <p>© {new Date().getFullYear()} Nikos Lefakis · {t.footer.rights}</p>
          <span className="flex items-center gap-1.5">
            <i className="fa-solid fa-location-dot text-[10px]" />
            Heraklion, GR
          </span>
        </div>

      </div>
    </footer>
  );
}
