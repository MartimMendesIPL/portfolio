import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BottomBar from "./components/BottomBar";
import AboutSection from "./components/about/AboutSection";
import ProjectsSection from "./components/projects/ProjectsSection";
import ContactSection from "./components/contact/ContactSection";

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
                background:
                    "linear-gradient(135deg, #0a0814 0%, #0f0d1f 40%, #13102a 70%, #0a0814 100%)",
                fontFamily: "Inter, sans-serif",
                minHeight: "100vh",
            }}
        >
            <Navbar activeSection={activeSection} />
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
            <BottomBar />
        </div>
    );
}

export default App;
