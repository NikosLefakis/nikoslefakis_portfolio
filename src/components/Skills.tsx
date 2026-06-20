"use client";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const skillData = [
  { icon: "fa-solid fa-code",        skills: ["JavaScript", "TypeScript", "Java", "C++", "Python", "PHP"] },
  { icon: "fa-solid fa-layer-group", skills: ["React.js", "Next.js", "Tailwind CSS", "HTML/CSS", "Figma"] },
  { icon: "fa-solid fa-server",      skills: ["Node.js", "Express.js", "Prisma ORM", "REST APIs", "Java Servlets", "JSP"] },
  { icon: "fa-solid fa-database",    skills: ["PostgreSQL", "MySQL", "Docker", "Git/GitHub", "Linux"] },
  { icon: "fa-solid fa-brain",       skills: ["LangChain", "RAG", "Gemini API", "OpenAI API"] },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO } },
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-16 md:py-28 relative border-t t-border-faint">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-10 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-xs font-medium text-cyan-500/60">02</span>
          <span className="w-5 h-px t-divider" />
          <span className="text-xs font-medium uppercase tracking-[0.12em] t-muted">{t.skills.sectionLabel}</span>
        </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t.skills.title} <span className="accent-glow">{t.skills.titleAccent}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillData.map((cat, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: EXPO, delay: index * 0.08 },
                },
              }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-[1px] rounded-2xl t-gradient-border card-hover-glow group"
            >
              <div className="t-card h-full w-full rounded-2xl p-6 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="flex items-center gap-3 mb-6 pb-4 border-b t-border relative z-10">
                  <div className="w-9 h-9 rounded-lg t-surface t-border border flex items-center justify-center text-cyan-500 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-350">
                    <i className={cat.icon} />
                  </div>
                  <h3 className="text-sm font-bold tracking-wide">{t.skills.categories[index]}</h3>
                </div>

                <div className="flex flex-wrap gap-2 relative z-10">
                  {cat.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg t-surface t-border border text-sm t-body hover:border-cyan-500/40 hover:text-cyan-400 cursor-default transition-all duration-250"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
