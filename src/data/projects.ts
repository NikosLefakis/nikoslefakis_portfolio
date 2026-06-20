export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  links: {
    github?: string;
    figma?: string;
    website?: string;
    report?: string;
  };
}

export const projectsData: Project[] = [
  {
    title: "Docveo",
    description: "Full-stack RAG application that lets users upload PDFs and query them with natural language using LLMs. Features semantic search via pgvector, Groq API for fast inference, and Gemini Embeddings for document understanding.",
    tags: ["Next.js 16", "TypeScript", "LangChain", "Supabase", "pgvector", "Groq API", "Gemini Embeddings", "Tailwind CSS v4"],
    image: "https://docveo-beige.vercel.app/opengraph-image?31c5cb54ce578915",
    links: {
      github: "https://github.com/NikosLefakis/Docveo",
      website: "https://docveoai.vercel.app",
    },
  },
  {
    title: "FormaRep",
    description: "Subscription-based fitness platform with AI personal trainer, workout logging, macro tracking, and progress analytics. Features Stripe-powered tiers and personalized coaching via AI workflows.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Supabase", "Stripe", "AI"],
    image: "https://formarep.site/opengraph-image?7dd925e099c79344",
    links: { website: "https://formarep.site" },
  },
  {
    title: "E-Library Web Platform",
    description: "Full-stack digital library with role-based access control for admins, librarians, students, and visitors. Built with Java Servlets and REST APIs on the backend, AJAX on the frontend, and integrated map visualisation APIs.",
    tags: ["HTML", "JavaScript", "AJAX", "Java Servlets", "REST APIs", "JSP", "Map APIs"],
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop",
    links: { github: "https://github.com/NikosLefakis/e-library" },
  },
  {
    title: "LensHub",
    description: "Full-stack marketplace for buying, renting, and trading photography equipment, with features for user interaction and stolen equipment tracking.",
    tags: ["React", "PHP", "MySQL", "REST", "Docker"],
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    links: { github: "https://github.com/NikosLefakis/LensHub" },
  },
  {
    title: "Job Platform UI/UX",
    description: "UI/UX prototype for a job platform, focused on intuitive navigation, accessibility, user flows, and iterative design improvement.",
    tags: ["Figma", "UI/UX", "User Testing"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    links: { figma: "https://www.figma.com/proto/0KkLq57YfuN39gCovdWo8z/PhaseB?t=1JZvm6nUaZQntiKW-1" },
  },
  {
    title: "iGEM UniCRETE",
    description: "Contributed to the design and development of the official website for an international synthetic biology competition as part of the iGEM UniCRETE team.",
    tags: ["Frontend", "HTML", "CSS"],
    image: "/assets/igem.png",
    links: { website: "https://2023.igem.wiki/unicrete/" },
  },
];
