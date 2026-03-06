import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BottomBar from "./components/BottomBar";
import AboutSection from "./components/about/AboutSection";
import ProjectsSection from "./components/projects/ProjectsSection";
import ContactSection from "./components/contact/ContactSection";
import Waves from "./components/Waves";

const SECTIONS = ["home", "about", "projects", "contact"];

function App() {
    const [activeSection, setActiveSection] = useState("home");
    const scrollContainerRef = useRef<HTMLElement>(null);

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
                    root: scrollContainer
                },
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <div className="h-screen flex flex-col bg-[#0a0814] relative overflow-hidden">
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
            >
                <div className="snap-section"><HeroSection /></div>
                <div className="snap-section"><AboutSection /></div>
                <div className="snap-section"><ProjectsSection /></div>
                <div className="snap-section"><ContactSection /></div>
            </main>

            <BottomBar />
        </div>
    );
}

export default App;
