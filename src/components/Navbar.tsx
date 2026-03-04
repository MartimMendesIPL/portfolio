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

const Navbar = ({ activeSection = "home" }: NavbarProps) => {
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 flex items-stretch h-14"
            style={{
                background: "rgba(10, 8, 20, 0.92)",
                backdropFilter: "blur(8px)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
        >
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
        </nav>
    );
};

export default Navbar;
