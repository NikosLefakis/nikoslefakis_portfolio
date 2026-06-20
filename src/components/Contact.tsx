"use client";
import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EMAIL = "lefnick@gmail.com";

const CHANNELS = [
  {
    icon: "fa-solid fa-envelope",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    copyable: true,
  },
  {
    icon: "fa-brands fa-github",
    label: "GitHub",
    value: "/NikosLefakis",
    href: "https://github.com/NikosLefakis",
  },
  {
    icon: "fa-brands fa-linkedin-in",
    label: "LinkedIn",
    value: "/in/nikoslefakis",
    href: "https://www.linkedin.com/in/nikoslefakis/",
  },
];

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({
    type: "idle", message: "",
  });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: "error", message: t.contact.validation });
      setTimeout(() => setStatus({ type: "idle", message: "" }), 3000);
      return;
    }
    setStatus({ type: "loading", message: t.contact.sending });
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: formData.name, email: formData.email,
          subject: formData.subject, message: formData.message,
          from_name: "Portfolio Contact Form",
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus({ type: "success", message: t.contact.success });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", message: result.message || t.contact.error });
      }
    } catch {
      setStatus({ type: "error", message: t.contact.networkError });
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO } },
  };

  const inputClass =
    "w-full t-input t-border border rounded-lg p-3 t-text placeholder:t-muted focus:outline-none focus:border-cyan-500 transition-all";

  return (
    <section id="contact" className="py-20 md:py-32 relative border-t t-border-faint">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="max-w-2xl mx-auto text-center mb-10 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4 justify-center">
          <span className="font-mono text-xs font-medium text-cyan-500/60">05</span>
          <span className="w-5 h-px bg-white/10" />
          <span className="text-xs font-medium uppercase tracking-[0.12em] t-muted">{t.contact.sectionLabel}</span>
        </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t.contact.title}{" "}
            {t.contact.titleAccent && <span className="accent-glow">{t.contact.titleAccent}</span>}
          </h2>
          <p className="t-body font-light text-lg">{t.contact.subtitle}</p>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* ── Left: info panel ──────────────────────────── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="lg:col-span-5"
          >
            <div className="glass-panel h-full p-8 flex flex-col gap-8 relative overflow-hidden group">
              {/* Ambient glow */}
              <div className="absolute top-0 right-0 w-56 h-56 bg-cyan-500/5 rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Title */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold tracking-tight mb-2">{t.contact.infoTitle}</h3>
                <p className="t-body text-sm font-light leading-relaxed">{t.contact.infoSubtitle}</p>
              </div>

              {/* Channel rows */}
              <div className="flex flex-col gap-3 relative z-10">
                {CHANNELS.map((ch) => (
                  <div key={ch.label} className="flex items-center gap-4 p-4 rounded-xl t-surface t-border border hover:border-cyan-500/30 transition-all duration-250 group/row">
                    <div className="w-10 h-10 rounded-lg t-badge t-border border flex items-center justify-center text-cyan-500 shrink-0 group-hover/row:border-cyan-500/40 group-hover/row:scale-105 transition-all duration-250">
                      <i className={`${ch.icon} text-sm`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-semibold t-muted uppercase tracking-[0.15em] block mb-0.5">{ch.label}</span>
                      <a
                        href={ch.href}
                        target={ch.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="t-text text-sm font-medium hover:text-cyan-400 transition-colors truncate block"
                      >
                        {ch.value}
                      </a>
                    </div>
                    {ch.copyable && (
                      <button onClick={copyEmail} className="shrink-0 p-2 rounded-lg t-badge hover:border-cyan-500/30 t-border border transition-all">
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.i key="check" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}
                              className="fa-solid fa-circle-check text-emerald-400 text-xs" />
                          ) : (
                            <motion.i key="copy" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}
                              className="fa-regular fa-copy text-xs t-muted hover:text-cyan-400 transition-colors" />
                          )}
                        </AnimatePresence>
                      </button>
                    )}
                    {!ch.copyable && (
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px] t-muted group-hover/row:text-cyan-400 transition-colors shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t t-border relative z-10" />

              {/* Location + availability — fill remaining space */}
              <div className="flex flex-col gap-5 flex-1 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg t-surface t-border border flex items-center justify-center text-cyan-500 shrink-0">
                    <i className="fa-solid fa-location-dot text-xs" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold t-muted uppercase tracking-[0.15em] block mb-0.5">Location</span>
                    <span className="t-text text-sm font-medium">{t.contact.location}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-semibold t-muted uppercase tracking-[0.15em] block mb-3">{t.contact.available}</span>
                  <div className="flex flex-wrap gap-2">
                    {t.contact.availability.map((item: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg t-surface t-border border text-xs t-body hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-200 cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Response time badge pinned to bottom */}
                <div className="mt-auto pt-2 flex items-center gap-2.5 p-3 rounded-xl t-surface t-border border">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-xs t-body">{t.contact.responseTime}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Form ───────────────────────────────── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="lg:col-span-7"
          >
            <div className="glass-panel h-full p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <form className="flex flex-col gap-5 h-full relative z-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="text-xs font-medium t-muted uppercase tracking-widest">{t.contact.nameLabel}</label>
                    <input id="contact-name" type="text" placeholder={t.contact.namePlaceholder}
                      value={formData.name} className={inputClass}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={status.type === "loading"} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="text-xs font-medium t-muted uppercase tracking-widest">{t.contact.emailLabel}</label>
                    <input id="contact-email" type="email" placeholder={t.contact.emailPlaceholder}
                      value={formData.email} className={inputClass}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={status.type === "loading"} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-subject" className="text-xs font-medium t-muted uppercase tracking-widest">{t.contact.subjectLabel}</label>
                  <input id="contact-subject" type="text" placeholder={t.contact.subjectPlaceholder}
                    value={formData.subject} className={inputClass}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    disabled={status.type === "loading"} />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="contact-message" className="text-xs font-medium t-muted uppercase tracking-widest">{t.contact.messageLabel}</label>
                  <textarea id="contact-message" rows={8} placeholder={t.contact.messagePlaceholder}
                    value={formData.message} className={`${inputClass} resize-none flex-1`}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={status.type === "loading"} />
                </div>

                <AnimatePresence mode="wait">
                  {status.type !== "idle" && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className={`p-3 rounded-lg text-sm font-medium ${
                        status.type === "success" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500"
                        : status.type === "error" ? "bg-rose-500/10 border border-rose-500/20 text-rose-500"
                        : "t-badge t-border border t-body"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {status.type === "loading" && <i className="fa-solid fa-spinner animate-spin" />}
                        {status.type === "success" && <i className="fa-solid fa-circle-check" />}
                        {status.type === "error" && <i className="fa-solid fa-circle-exclamation" />}
                        <span>{status.message}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button type="submit" disabled={status.type === "loading"}
                  className="w-full py-4 rounded-lg bg-cyan-500 text-black font-bold uppercase tracking-widest text-sm hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  {status.type === "loading" ? t.contact.sending : t.contact.send}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
