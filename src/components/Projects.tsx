"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { projectsData } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EXPO } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const CATEGORIES = ["AI", "SaaS", "Web", "Marketplace", "UI/UX", "Frontend"];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-20 md:py-32 relative border-t t-border-faint">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-10 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-xs font-medium text-cyan-500/60">01</span>
          <span className="w-5 h-px bg-white/10" />
          <span className="text-xs font-medium uppercase tracking-[0.12em] t-muted">{t.projects.sectionLabel}</span>
        </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t.projects.title}{" "}
            <span className="accent-glow">{t.projects.titleAccent}</span>
          </h2>
        </motion.div>

        {/* 2-col tall image grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {projectsData.map((project, index) => {
            const primaryLink =
              project.links.website || project.links.github || project.links.figma || project.links.report;

            return (
              <motion.article
                key={project.title}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.35, ease: EXPO }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ minHeight: "340px" }}
              >
                {/* Full-bleed image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Gradient overlay — always present, stronger on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top row: number + category + link icon */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="font-mono text-[11px] font-bold text-white/50 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-lg select-none">
                    {String(index + 1).padStart(2, "0")} / {CATEGORIES[index] ?? "Project"}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-200"
                      >
                        <i className="fa-brands fa-github text-sm" />
                      </a>
                    )}
                    {project.links.figma && (
                      <a
                        href={project.links.figma}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Figma"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-200"
                      >
                        <i className="fa-brands fa-figma text-sm" />
                      </a>
                    )}
                    {project.links.website && (
                      <a
                        href={project.links.website}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Live"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-200"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed line-clamp-2 mb-4 max-w-md">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300/80 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-1 text-[11px] text-white/30">+{project.tags.length - 4}</span>
                    )}
                  </div>
                </div>

                {/* Clickable overlay for primary link */}
                {primaryLink && (
                  <a
                    href={primaryLink}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 z-[5]"
                    aria-label={`Open ${project.title}`}
                  />
                )}
              </motion.article>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
