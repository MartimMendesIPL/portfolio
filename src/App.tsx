import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BottomBar from "./components/BottomBar";
import AboutSection from "./components/about/AboutSection";
import ProjectsSection from "./components/projects/ProjectsSection";
import ContactSection from "./components/contact/ContactSection";
import Waves from "./components/Waves";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

const SECTIONS = ["home", "about", "projects", "contact"];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const scrollContainerRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleSkipLink = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "Enter" && mainRef.current) {
      mainRef.current.focus();
      mainRef.current.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const scrollContainer = scrollContainerRef.current;

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        {
          threshold: 0.5,
          root: scrollContainer,
        },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="h-[100dvh] flex flex-col bg-[#0a0814] relative overflow-hidden">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        onKeyDown={handleSkipLink}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:font-mono focus:text-sm focus:rounded-none"
      >
        Skip to main content
      </a>

      {/* Waves fills the entire background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Waves
          lineColor="rgba(168, 85, 247, 0.2)"
          backgroundColor="transparent"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>

      {/* Content layout */}
      <Navbar activeSection={activeSection} />

      <main
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto snap-container relative z-10"
        id="main-scroll-container"
        tabIndex={-1}
      >
        <div className="snap-section">
          <HeroSection />
        </div>
        <div className="snap-section">
          <AboutSection />
        </div>
        <div className="snap-section">
          <ProjectsSection />
        </div>
        <div className="snap-section">
          <ContactSection />
        </div>
      </main>

      <BottomBar />
    </div>
  );
}

export default App;
