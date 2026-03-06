import { useState } from "react";

interface NavLink {
    label: string;
    href: string;
    sectionId: string;
}

const navLinks: NavLink[] = [
    { label: "home", href: "#home", sectionId: "home" },
    { label: "about me", href: "#about", sectionId: "about" },
    { label: "projects", href: "#projects", sectionId: "projects" },
];

interface NavbarProps {
    activeSection?: string;
}

const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    onDone?: () => void,
) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: "smooth" });
    }
    onDone?.();
};

const Navbar = ({ activeSection = "home" }: NavbarProps) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav
            className="top-0 left-0 right-0 z-50 h-14 shrink-0"
            style={{
                background: "rgba(10, 8, 20, 0.92)",
                backdropFilter: "blur(8px)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
        >
            {/* ── Desktop layout ── */}
            <div className="hidden md:flex items-stretch h-full">
                {/* Logo */}
                <div className="flex items-center px-6 text-white text-sm font-mono tracking-widest border-r border-white/10 min-w-[160px]">
                    martim-mendes
                </div>

                {/* Nav Links — centered */}
                <div className="flex items-stretch flex-1 justify-center">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.sectionId;
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) =>
                                    scrollToSection(e, link.sectionId)
                                }
                                className={`flex items-center px-10 text-sm font-mono tracking-wider transition-colors duration-200 border-r border-white/10 relative
                                    ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}
                            >
                                {link.label}
                                {isActive && (
                                    <span
                                        className="absolute bottom-0 left-0 right-0 h-0.5"
                                        style={{ background: "white" }}
                                    />
                                )}
                            </a>
                        );
                    })}
                </div>

                {/* Contact — right */}
                <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, "contact")}
                    className={`flex items-center px-8 text-sm font-mono tracking-wider transition-colors duration-200 border-l border-white/10 ml-auto relative
                        ${activeSection === "contact" ? "text-white" : "text-gray-400 hover:text-white"}`}
                >
                    contact
                    {activeSection === "contact" && (
                        <span
                            className="absolute bottom-0 left-0 right-0 h-0.5"
                            style={{ background: "white" }}
                        />
                    )}
                </a>
            </div>

            {/* ── Mobile layout ── */}
            <div className="flex md:hidden items-center justify-between h-full px-4">
                {/* Logo */}
                <span className="text-white text-sm font-mono tracking-widest">
                    martim-mendes
                </span>

                {/* Hamburger button */}
                <button
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Toggle menu"
                    className="flex flex-col justify-center items-center gap-1.5 w-8 h-8"
                >
                    <span
                        className="block h-0.5 w-5 bg-gray-300 transition-all duration-300 origin-center"
                        style={{
                            transform: menuOpen
                                ? "translateY(8px) rotate(45deg)"
                                : "none",
                        }}
                    />
                    <span
                        className="block h-0.5 w-5 bg-gray-300 transition-all duration-300"
                        style={{ opacity: menuOpen ? 0 : 1 }}
                    />
                    <span
                        className="block h-0.5 w-5 bg-gray-300 transition-all duration-300 origin-center"
                        style={{
                            transform: menuOpen
                                ? "translateY(-8px) rotate(-45deg)"
                                : "none",
                        }}
                    />
                </button>
            </div>

            {/* ── Mobile dropdown menu ── */}
            <div
                className="md:hidden overflow-hidden transition-all duration-300"
                style={{
                    maxHeight: menuOpen ? "300px" : "0px",
                    background: "rgba(10, 8, 20, 0.97)",
                    borderBottom: menuOpen
                        ? "1px solid rgba(255,255,255,0.07)"
                        : "none",
                }}
            >
                <div className="flex flex-col py-2">
                    {[
                        ...navLinks,
                        {
                            label: "contact",
                            href: "#contact",
                            sectionId: "contact",
                        },
                    ].map((link) => {
                        const isActive = activeSection === link.sectionId;
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) =>
                                    scrollToSection(e, link.sectionId, () =>
                                        setMenuOpen(false),
                                    )
                                }
                                className={`px-6 py-3 text-sm font-mono tracking-wider transition-colors duration-150 relative
                                        ${isActive ? "text-white" : "text-gray-400"}`}
                                style={{
                                    borderLeft: isActive
                                        ? "2px solid white"
                                        : "2px solid transparent",
                                }}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
