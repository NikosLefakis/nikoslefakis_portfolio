"use client";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Certification {
  title: string;
  issuer: string;
  issuerIcon: string;
  status: "completed" | "in-progress";
  date: string;
  skills: string[];
}

const certsData: Certification[] = [
  {
    title: "Microsoft Azure Essentials",
    issuer: "Microsoft Press",
    issuerIcon: "fa-brands fa-microsoft",
    status: "completed",
    date: "2026",
    skills: ["Azure Infrastructure", "Cloud Services", "Scalability", "Serverless Architecture"],
  },
  {
    title: "AI Fluency & Claude 101",
    issuer: "Anthropic",
    issuerIcon: "fa-solid fa-robot",
    status: "completed",
    date: "2026",
    skills: ["AI Fundamentals", "Prompt Engineering", "Claude APIs", "Responsible AI"],
  },
  {
    title: "Google Generative AI Fundamentals",
    issuer: "Google Cloud",
    issuerIcon: "fa-brands fa-google",
    status: "completed",
    date: "2026",
    skills: ["Generative AI", "LLMs", "Google AI Tools", "AI Applications"],
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Certifications() {
  const { t } = useLanguage();

  return (
    <section id="learning" className="py-16 md:py-28 relative border-t t-border-faint">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-8 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-xs font-medium text-cyan-500/60">03</span>
          <span className="w-5 h-px t-divider" />
          <span className="text-xs font-medium uppercase tracking-[0.12em] t-muted">{t.certifications.sectionLabel}</span>
        </div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            {t.certifications.title}{" "}
            <span className="accent-glow">{t.certifications.titleAccent}</span>
          </h2>
          <p className="t-body text-sm max-w-xl leading-relaxed">{t.certifications.description}</p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {certsData.map((cert, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 p-6 rounded-2xl glass-panel card-hover-glow group"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="w-9 h-9 rounded-lg t-surface t-border border flex items-center justify-center text-cyan-500 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-350">
                  <i className={`${cert.issuerIcon} text-sm`} />
                </div>
                <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {t.certifications.completed}
                </span>
              </div>

              {/* Body */}
              <div className="flex-1 mt-1">
                <p className="text-[11px] t-muted font-medium mb-2 uppercase tracking-widest">{cert.issuer}</p>
                <h3 className="text-base font-bold group-hover:text-cyan-400 transition-colors duration-300 leading-snug tracking-tight mb-1.5">
                  {cert.title}
                </h3>
                <p className="text-xs t-muted font-mono">{cert.date}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t t-border">
                {cert.skills.map((skill, i) => (
                  <span key={i} className="px-2 py-0.5 text-[11px] rounded t-surface t-border border t-body">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
