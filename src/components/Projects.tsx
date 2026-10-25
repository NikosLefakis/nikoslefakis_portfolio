"use client";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { projectsData, type Project } from "@/data/projects";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToY } from "@/lib/scroll";
import { reveal as fadeUp, revealGroup as stagger, SPRING_SNAPPY, EASE_OUT } from "@/lib/motion";

const TOTAL = projectsData.length;



const STATUS_CLASS = { live: "status-live", source: "status-source", prototype: "status-proto" } as const;
const CATEGORIES = ["AI", "SaaS", "Web", "Marketplace", "UI/UX", "Frontend"];

const iconLinkClass =
  "press w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-200";

function ProjectCard({ project, index, pinned = false }: { project: Project; index: number; pinned?: boolean }) {
  const { t } = useLanguage();
  const primaryLink =
    project.links.website || project.links.github || project.links.figma || project.links.report;

  return (
    <article
      className="group relative rounded-2xl overflow-hidden"
      style={{ minHeight: pinned ? "min(500px, 62vh)" : "340px" }}
    >
      <Image
        src={project.image}
        alt=""
        fill
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        sizes="(max-width: 768px) 100vw, (max-width: 980px) 50vw, 640px"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 gap-3">
        <span className="font-mono text-[11px] font-bold text-white/50 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-lg select-none">
          {String(index + 1).padStart(2, "0")} / {CATEGORIES[index] ?? "Project"}
        </span>
        <div className="flex items-center gap-2">
          <span className={`status-chip ${STATUS_CLASS[project.status]} mr-1`}>{t.projects.status[project.status]}</span>
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={`${iconLinkClass} relative z-10`}>
              <i className="fa-brands fa-github text-sm" />
            </a>
          )}
          {project.links.figma && (
            <a href={project.links.figma} target="_blank" rel="noreferrer" aria-label="Figma" className={`${iconLinkClass} relative z-10`}>
              <i className="fa-brands fa-figma text-sm" />
            </a>
          )}
          {project.links.website && (
            <a href={project.links.website} target="_blank" rel="noreferrer" aria-label="Live" className={`${iconLinkClass} relative z-10`}>
              <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
            </a>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors duration-300">
          {project.title}
        </h3>
        <p className={`text-sm text-white/60 leading-relaxed mb-4 max-w-md ${pinned ? "line-clamp-4" : "line-clamp-2"}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
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

      {primaryLink && (
        <a
          href={primaryLink}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 z-[5]"
          aria-label={`Open ${project.title}`}
        />
      )}
    </article>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Progress through the pinned track, 0 to 1. Only the desktop layout is pinned;
  // phones, short screens and reduced motion get the plain grid below.
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!Number.isFinite(p)) return;
    const next = Math.min(TOTAL - 1, Math.max(0, Math.floor(p * TOTAL)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const goTo = useCallback((index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    scrollToY(top + ((index + 0.5) / TOTAL) * distance);
  }, []);

  return (
    <section id="projects" className="pt-20 md:pt-32 pb-20 md:pb-24 relative border-t t-border-faint">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-10 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t.projects.title}{" "}
            <span className="accent-glow">{t.projects.titleAccent}</span>
          </h2>
        </motion.div>

        {/* Desktop: pinned story. The log follows scroll, the card on the right changes with it. */}
        <div
          ref={trackRef}
          className="story-pinned story-track"
          style={{ "--n": TOTAL } as React.CSSProperties}
        >
          <div className="story-sticky">
            <div className="story-grid w-full">
              <div>
                <p className="font-mono text-xs t-muted mb-5" aria-hidden="true">
                  {String(active + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
                </p>
                <ol className="story-log" aria-label={t.projects.listLabel}>
                  <motion.span className="story-fill" style={{ scaleY: scrollYProgress }} aria-hidden="true" />
                  {projectsData.map((project, i) => (
                    <li key={project.title}>
                      <button
                        type="button"
                        className="story-item"
                        data-state={i < active ? "done" : i === active ? "active" : "todo"}
                        aria-current={i === active ? "step" : undefined}
                        onClick={() => goTo(i)}
                      >
                        <span className="story-node" aria-hidden="true" />
                        <span>
                          <span className="story-name">{project.title}</span>
                          <span className="story-meta">{t.projects.status[project.status]}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>

              <div aria-live="polite" className="relative">
                {/* No lockout: the outgoing card leaves while the next arrives, so scrolling
                    quickly through several projects never waits on an animation. */}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, transform: "translateY(12px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transform: "translateY(-8px)", transition: { duration: 0.14, ease: EASE_OUT } }}
                    transition={SPRING_SNAPPY}
                  >
                    <ProjectCard project={projectsData[active]} index={active} pinned />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Everywhere else: every project in a grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="story-stack"
        >
          {projectsData.map((project, index) => (
            <motion.div key={project.title} variants={fadeUp}>
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
