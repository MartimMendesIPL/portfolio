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

/* ── Content renderers ── */

export const BioContent = () => (
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

export const InterestsContent = () => (
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

export const ExperienceContent = () => (
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

export const UniversityContent = () => (
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

export const CertificationsContent = () => (
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
                className="border border-white/5 rounded px-3 py-2 bg-white/2 flex items-start gap-3"
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
