import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXTwitter,
    faInstagram,
    faLinkedinIn,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";

const socialLinks = [
    {
        href: "https://x.com/martimyh",
        label: "X/Twitter",
        icon: faXTwitter,
    },
    {
        href: "https://instagram.com/martimyh",
        label: "Instagram",
        icon: faInstagram,
    },
    {
        href: "https://www.linkedin.com/in/martim-mendes-2b7922163/",
        label: "LinkedIn",
        icon: faLinkedinIn,
    },
];

const BottomBar = () => {
    return (
        <div
            className="bottom-0 left-0 right-0 z-50 flex items-center justify-between h-12 px-4 shrink-0"
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                    >
                        <FontAwesomeIcon icon={link.icon} size="lg" />
                    </a>
                ))}
            </div>

            {/* Right — GitHub handle */}
            <a
                href="https://github.com/MartimMendesIPL"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono tracking-wider text-gray-400 hover:text-purple-400 transition-colors duration-200"
            >
                <FontAwesomeIcon icon={faGithub} size="lg" />
                <span className="hidden sm:inline">@MartimMendesIPL</span>
            </a>
        </div>
    );
};

export default BottomBar;
