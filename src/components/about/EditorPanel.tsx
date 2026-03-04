import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGamepad,
    faMobileAlt,
    faLaptopCode,
    faCode,
    faGlobe,
    faBrain,
    faBuilding,
    faCalendar,
    faRocket,
    faWrench,
    faRobot,
    faBriefcase,
    faGraduationCap,
    faUniversity,
    faAward,
    faScroll,
} from "@fortawesome/free-solid-svg-icons";

interface Tab {
    id: string;
    label: string;
}

interface EditorPanelProps {
    tabs: Tab[];
    activeTab: string;
    onTabClose: (id: string) => void;
    onTabSelect: (id: string) => void;
}

/* ── Content renderers ── */

const BioContent = () => (
    <div className="p-5 font-mono text-base leading-relaxed space-y-4">
        <p className="text-purple-400/60">{"/* summary */"}</p>
        <p className="text-gray-300 leading-6">
            I've been writing code since high school — what started as curiosity
            quickly turned into an obsession. Games were my first love, so
            naturally I found myself building them in Unity, learning C# along
            the way and spending way too many hours tweaking mechanics that
            probably only I cared about.
        </p>
        <p className="text-gray-300 leading-6">
            From there things just kept expanding. I picked up Android Studio,
            jumped into web development with React, PHP, and SQL, and got
            comfortable on the backend with .NET. These days I enjoy the full
            picture — whether that's a web app, a game, or something in between,
            I just like building things that actually work and feel good to use.
        </p>
    </div>
);

const InterestsContent = () => (
    <div className="p-5 font-mono text-base leading-relaxed space-y-3">
        <p className="text-purple-400/60">{"/* interests */"}</p>
        {[
            { icon: faGamepad, label: "Game Development" },
            { icon: faMobileAlt, label: "Mobile Development" },
            {
                icon: faLaptopCode,
                label: "Full-stack web (React, TS, PHP, .NET, SQL)",
            },
            { icon: faCode, label: "Tinkering with new tools & frameworks" },
            {
                icon: faGlobe,
                label: "Open-source tools & developer experience",
            },
            { icon: faBrain, label: "Problem-solving & system design" },
        ].map((item, i) => (
            <p
                key={i}
                className="text-gray-300 leading-6 flex items-center gap-2"
            >
                <FontAwesomeIcon
                    icon={item.icon}
                    className="text-purple-400/70 w-4"
                />
                {item.label}
            </p>
        ))}
    </div>
);

const ExperienceContent = () => (
    <div className="p-5 font-mono text-base leading-relaxed space-y-3">
        <p className="text-purple-400/60">{"/* experience */"}</p>
        <div className="space-y-2">
            <p className="text-gray-200 font-semibold flex items-center gap-2">
                <FontAwesomeIcon
                    icon={faBuilding}
                    className="text-purple-400/70"
                />
                Brindicis <span className="text-purple-400">(Internship)</span>
            </p>
            <p className="text-gray-400 flex items-center gap-2">
                <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-purple-400/50"
                />
                2026 – Present
            </p>
            <p className="text-purple-300 flex items-center gap-2">
                <FontAwesomeIcon
                    icon={faRocket}
                    className="text-purple-300/70"
                />
                What I Do:
            </p>
            {[
                {
                    icon: faCode,
                    label: "PHP Development: Maintaining and improving their existing website, fixing bugs, and adding new features to keep things running smoothly.",
                },
                {
                    icon: faWrench,
                    label: "Internal Tools: Working on internal systems used by the team day-to-day, making sure they're reliable and easy to use.",
                },
                {
                    icon: faRobot,
                    label: "AI Chatbots: Developing AI-powered chatbots to help automate and improve how the business interacts with clients and handles internal workflows.",
                },
                {
                    icon: faBriefcase,
                    label: "Real-world experience: Getting hands-on with a live production environment — writing code that actually matters and learning how a business operates from the inside.",
                },
            ].map((item, i) => (
                <p
                    key={i}
                    className="text-gray-300 leading-6 flex items-start gap-2"
                >
                    <FontAwesomeIcon
                        icon={item.icon}
                        className="text-purple-400/70 mt-1 w-4 shrink-0"
                    />
                    {item.label}
                </p>
            ))}
        </div>
    </div>
);

const UniversityContent = () => (
    <div className="p-5 font-mono text-base leading-relaxed space-y-3">
        <p className="text-purple-400/60">{"/* university */"}</p>
        <div className="space-y-2">
            <p className="text-gray-200 font-semibold flex items-center gap-2">
                <FontAwesomeIcon
                    icon={faGraduationCap}
                    className="text-purple-400/70"
                />
                CTeSP - Programmer
            </p>
            <p className="text-gray-400 flex items-center gap-2">
                <FontAwesomeIcon
                    icon={faUniversity}
                    className="text-purple-400/50"
                />
                Instituto Politécnico de Leiria
            </p>
            <p className="text-gray-400 flex items-center gap-2">
                <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-purple-400/50"
                />
                2024 – NOW
            </p>
            <p className="text-gray-300 mt-2 leading-6">
                A 2-year technical degree focused on software development —
                covering programming fundamentals, databases, web and mobile
                development. It's been a solid foundation for putting everything
                together in a more structured way. Still going, but it's where a
                lot of things really started clicking — from writing cleaner SQL
                queries and backend logic with PHP and .NET, to actually
                shipping projects that work end to end. The kind of place that
                bridges the gap between tinkering on your own and building
                things properly.
            </p>
        </div>
    </div>
);

const CertificationsContent = () => (
    <div className="p-5 font-mono text-base leading-relaxed space-y-3">
        <p className="text-purple-400/60">{"/* certifications */"}</p>
        {[
            {
                icon: faScroll,
                title: "Highschool Diploma",
                org: "Specialized technical course on programming",
                year: "2022",
            },
            {
                icon: faAward,
                title: "Working on new stuff",
                org: "...",
                year: "...",
            },
        ].map((cert, i) => (
            <div
                key={i}
                className="border border-white/5 rounded px-3 py-2 bg-white/[0.02] flex items-start gap-3"
            >
                <FontAwesomeIcon
                    icon={cert.icon}
                    className="text-purple-400/70 mt-1 shrink-0"
                />
                <div>
                    <p className="text-gray-200">{cert.title}</p>
                    <p className="text-gray-500">
                        {cert.org} · {cert.year}
                    </p>
                </div>
            </div>
        ))}
    </div>
);

const CONTENT_MAP: Record<string, React.ReactNode> = {
    bio: <BioContent />,
    interests: <InterestsContent />,
    experience: <ExperienceContent />,
    university: <UniversityContent />,
    certifications: <CertificationsContent />,
};

/* ── Main Panel ── */

const EditorPanel = ({
    tabs,
    activeTab,
    onTabClose,
    onTabSelect,
}: EditorPanelProps) => {
    if (tabs.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-600 font-mono text-xs">
                    select a file from the sidebar
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Tab bar */}
            <div className="flex items-stretch shrink-0 border-b border-white/10 overflow-x-auto">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        onClick={() => onTabSelect(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 text-xs font-mono cursor-pointer border-r border-white/10 shrink-0 transition-colors duration-100
                            ${
                                activeTab === tab.id
                                    ? "text-white bg-white/5"
                                    : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]"
                            }`}
                    >
                        <span>{tab.label}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onTabClose(tab.id);
                            }}
                            className="text-gray-600 hover:text-gray-200 transition-colors ml-1 leading-none"
                            aria-label={`Close ${tab.label}`}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {CONTENT_MAP[activeTab] ?? (
                    <div className="p-5 font-mono text-base text-gray-600">
                        No content for "{activeTab}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditorPanel;
