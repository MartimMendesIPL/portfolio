/* Simple SVG link/chain icon */
const LinkIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
);

/* External link icon */
const ExternalIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const socialLinks = [
    { href: "#", label: "Link 1" },
    { href: "#", label: "Link 2" },
    { href: "#", label: "Link 3" },
];

const BottomBar = () => {
    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between h-12 px-4"
            style={{
                background: "rgba(10, 8, 20, 0.9)",
                backdropFilter: "blur(8px)",
                borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
        >
            {/* Left — Socials */}
            <div className="flex items-center gap-3">
                <span
                    className="text-xs font-mono tracking-widest mr-2"
                    style={{ color: "rgba(180,170,200,0.6)" }}
                >
                    socials
                </span>
                {socialLinks.map((link, i) => (
                    <a
                        key={i}
                        href={link.href}
                        aria-label={link.label}
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                    >
                        <LinkIcon />
                    </a>
                ))}
            </div>

            {/* Right — Handle */}
            <a
                href="#"
                className="flex items-center gap-1.5 text-xs font-mono tracking-wider text-gray-400 hover:text-purple-400 transition-colors duration-200"
            >
                @MartimMendesIPL
                <ExternalIcon />
            </a>
        </div>
    );
};

export default BottomBar;
