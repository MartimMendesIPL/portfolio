import { useEffect, useState } from "react";
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

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        SECTIONS.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id);
                },
                { threshold: 0.4 },
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <div
            style={{
                position: "relative",
                fontFamily: "Inter, sans-serif",
                minHeight: "100vh",
                background: "#0a0814",
            }}
        >
            {/* Waves fills the entire page background */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
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

            <div style={{ position: "relative", zIndex: 1 }}>
                <Navbar activeSection={activeSection} />
                <HeroSection />
                <AboutSection />
                <ProjectsSection />
                <ContactSection />
                <BottomBar />
            </div>
        </div>
    );
}

export default App;
