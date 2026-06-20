import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <BackToTop />
      <Header />
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
