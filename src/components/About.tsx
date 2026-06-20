"use client";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section id="about" className="py-20 md:py-32 relative border-t t-border-faint">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10 md:mb-16">
          <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-xs font-medium text-cyan-500/60">04</span>
          <span className="w-5 h-px bg-white/10" />
          <span className="text-xs font-medium uppercase tracking-[0.12em] t-muted">{t.about.sectionLabel}</span>
        </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t.about.title} <span className="accent-glow">{t.about.titleAccent}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Bio card */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="lg:col-span-7 glass-panel p-8 md:p-10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-2xl font-bold tracking-tight mb-6 relative z-10">{t.about.bioTitle}</h3>
            <div className="font-light text-base md:text-lg leading-relaxed space-y-6 relative z-10">
              <p className="t-body">{t.about.bio1}</p>
              <p className="t-body">{t.about.bio2}</p>
              <blockquote className="border-l-2 border-cyan-500 pl-4 py-1">
                <p className="t-text font-medium text-base italic">{t.about.bio3}</p>
              </blockquote>
              <div className="inline-flex items-center gap-3 px-4 py-3 mt-4 rounded-xl t-border border t-badge text-sm t-body backdrop-blur-md shadow-sm">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-check text-cyan-500 text-[10px]" />
                </div>
                <span>{t.about.statusLabel} <strong className="t-text font-medium">{t.about.statusValue}</strong></span>
              </div>
            </div>
          </motion.div>

          {/* Timeline card */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="lg:col-span-5 glass-panel p-8 md:p-10 relative overflow-hidden group"
          >
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex flex-col gap-10 relative z-10">

              {/* Education */}
              <div className="relative pl-6">
                <span className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
                <span className="absolute left-[-1px] top-4 bottom-[-40px] w-[2px] bg-gradient-to-b from-cyan-500/50 to-transparent" />
                <h3 className="text-xs font-medium text-cyan-500 uppercase tracking-widest mb-2">{t.about.educationLabel}</h3>
                <h4 className="text-lg font-bold mb-1">{t.about.educationTitle}</h4>
                <span className="t-muted font-medium text-xs block mb-2">{t.about.educationDate}</span>
                <p className="t-body font-light text-sm">{t.about.educationDesc}</p>
              </div>

              {/* Volunteering */}
              <div className="relative pl-6 mt-4">
                <span className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 bg-gray-500 rounded-full" />
                <h3 className="text-xs font-medium t-muted uppercase tracking-widest mb-2">{t.about.volunteeringLabel}</h3>
                <h4 className="text-lg font-bold mb-1">{t.about.volunteeringTitle}</h4>
                <span className="t-muted font-medium text-xs block mb-2">{t.about.volunteeringDate}</span>
                <p className="t-body font-light text-sm">{t.about.volunteeringDesc}</p>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
