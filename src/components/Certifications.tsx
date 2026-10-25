"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { reveal as fadeUp, revealGroup as stagger } from "@/lib/motion";


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
              className="flex flex-col gap-4 p-6 rounded-2xl glass-panel card-hover-glow group"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="w-9 h-9 rounded-lg t-surface t-border border flex items-center justify-center text-cyan-500 group-hover:border-cyan-500/40 transition-all duration-350">
                  <i className={`${cert.issuerIcon} text-sm`} />
                </div>
                <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {t.certifications.completed}
                </span>
              </div>

              {/* Body */}
              <div className="flex-1 mt-1">
                <p className="text-xs t-muted font-medium mb-2">{cert.issuer}</p>
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
