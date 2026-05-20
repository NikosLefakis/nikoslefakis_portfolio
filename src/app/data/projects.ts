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
    title: "LensHub",
    description: "Full-stack marketplace for buying, renting, and trading photography equipment, with features for user interaction and stolen equipment tracking.",
    tags: ["React", "PHP", "MySQL", "REST", "Docker"],
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    links: { github: "https://github.com/NikosLefakis/LensHub" }
  },
  {
    title: "E-Library Platform",
    description: "Full-stack e-library platform with role-based functionality for administrators, librarians, students, and visitors.",
    tags: ["Java", "Servlets", "JSP", "AJAX", "REST APIs"],
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=80",
    links: { report: "https://drive.google.com/drive/folders/10s7VnKdB76SgBCLtd7MZz2N9lyUXQtGb" }
  },
  {
    title: "Electric Vehicle Rental System",
    description: "Web-based management system for electric vehicle rentals, including reservations, availability tracking, and user account management.",
    tags: ["HTML", "CSS", "JavaScript", "MySQL"],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80",
    links: { github: "https://github.com/NikosLefakis/CS360-Project" }
  },
  {
    title: "Pokémon Battle DSL",
    description: "C++ domain-specific language for Pokémon battle simulation, designed with macros, operator overloading, and object-oriented programming principles.",
    tags: ["C++", "DSL", "OOP", "Macros"],
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800&auto=format&fit=crop&q=80",
    links: { github: "https://github.com/NikosLefakis/DSL_pokemon" }
  },
  {
    title: "Job Platform UI/UX",
    description: "UI/UX prototype for a job platform, focused on intuitive navigation, accessibility, user flows, and iterative design improvement.",
    tags: ["Figma", "UI/UX", "User Testing"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    links: { figma: "https://www.figma.com/proto/0KkLq57YfuN39gCovdWo8z/PhaseB?t=1JZvm6nUaZQntiKW-1" }
  },
  {
    title: "iGEM UniCRETE",
    description: "Contributed to the design and development of the official website for an international synthetic biology competition as part of the iGEM UniCRETE team.",
    tags: ["Frontend", "HTML", "CSS"],
    image: "https://www.oecd.org/adobe/dynamicmedia/deliver/dm-aid--a7cef11e-7320-43f4-a2be-fb2a7979594e/synbio.png?quality=80&preferwebp=true",
    links: { website: "https://2023.igem.wiki/unicrete/" }
  }
];