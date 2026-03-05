import { useEffect, useState } from "react";

/* ── Types ── */
interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    fork: boolean;
    topics: string[];
}

/* ── Language colour dots ── */
const LANG_COLORS: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    "C++": "#f34b7d",
    "C#": "#178600",
    C: "#555555",
    HTML: "#e34c26",
    Shell: "#89e051",
};

const GITHUB_USER = "MartimMendesIPL";
const EXCLUDED = new Set([GITHUB_USER]);

/* ── Single project card ── */
const ProjectCard = ({ repo }: { repo: Repo }) => {
    return (
        <div
            className="flex flex-col rounded-lg overflow-hidden"
            style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            {/* Editor-like Preview */}
            <div
                className="shrink-0 flex flex-col relative overflow-hidden"
                style={{
                    height: "160px",
                    background: "rgba(8,6,18,0.4)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                {/* Header */}
                <div
                    className="flex items-center px-3 py-2 shrink-0 gap-2"
                    style={{
                        background: "rgba(255,255,255,0.03)",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                >
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-xs font-mono text-gray-500 ml-1 truncate">
                        {repo.name}
                        {repo.language ? `.${repo.language.toLowerCase()}` : ""}
                    </span>
                </div>
                {/* Code Body */}
                <div className="flex-1 p-4 font-mono text-xs text-gray-400 overflow-hidden opacity-80">
                    <div className="flex gap-3">
                        <div className="flex flex-col text-gray-600 select-none items-end">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            {repo.language && <span>5</span>}
                        </div>
                        <div className="flex flex-col">
                            <p>
                                <span className="text-purple-400">const</span>{" "}
                                <span className="text-blue-400">repo</span> ={" "}
                                {"{"}
                            </p>
                            <p className="ml-4">
                                name:{" "}
                                <span className="text-green-400">
                                    '{repo.name}'
                                </span>
                                ,
                            </p>
                            <p className="ml-4">
                                stars:{" "}
                                <span className="text-orange-400">
                                    {repo.stargazers_count}
                                </span>
                                ,
                            </p>
                            {repo.language && (
                                <p className="ml-4">
                                    lang:{" "}
                                    <span className="text-green-400">
                                        '{repo.language}'
                                    </span>
                                    ,
                                </p>
                            )}
                            <p>{"};"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-4 gap-3">
                {/* Description */}
                <p className="text-sm font-mono text-gray-300 leading-5 flex-1">
                    {repo.description ?? "No description provided."}
                </p>

                {/* GitHub button */}
                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto text-center text-sm font-mono text-gray-300 hover:text-white transition-colors duration-150 py-1.5 rounded"
                    style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                >
                    view project on github
                </a>
            </div>
        </div>
    );
};

/* ── Loading skeleton ── */
const Skeleton = () => (
    <div
        className="rounded-lg overflow-hidden animate-pulse"
        style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
        }}
    >
        <div
            style={{ height: "170px", background: "rgba(255,255,255,0.05)" }}
        />
        <div className="p-4 space-y-2">
            <div className="h-2 rounded bg-white/5 w-1/3" />
            <div className="h-2 rounded bg-white/5 w-full" />
            <div className="h-2 rounded bg-white/5 w-4/5" />
            <div className="h-6 rounded bg-white/5 mt-4" />
        </div>
    </div>
);

/* ── Sidebar content ── */
interface SidebarContentProps {
    selected: string;
    sidebarItems: { id: string; label: string }[];
    onSelect: (id: string) => void;
}

const SidebarContent = ({
    selected,
    sidebarItems,
    onSelect,
}: SidebarContentProps) => (
    <div className="overflow-y-auto flex-1 pt-2 pb-4">
        {/* "projects" folder header */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 text-sm font-mono text-gray-300 select-none">
            <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="currentColor"
                className="rotate-90 text-gray-500"
            >
                <path d="M3 2l4 3-4 3V2z" />
            </svg>
            <span>projects</span>
        </div>

        {/* "all_projects" entry */}
        <div
            className={`flex items-center gap-1.5 py-0.5 cursor-pointer select-none text-xs font-mono transition-colors duration-100 ${selected === "all_projects" ? "text-white bg-white/10" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"}`}
            style={{ paddingLeft: "22px", paddingRight: "8px" }}
            onClick={() => onSelect("all_projects")}
        >
            <span className="w-2.5 shrink-0" />
            all_projects
        </div>

        {/* Individual repos */}
        {sidebarItems.map((item) => (
            <div
                key={item.id}
                className={`flex items-center gap-1.5 py-0.5 cursor-pointer select-none text-xs font-mono transition-colors duration-100 ${selected === item.id ? "text-white bg-white/10" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"}`}
                style={{
                    paddingLeft: "22px",
                    paddingRight: "8px",
                }}
                onClick={() => onSelect(item.id)}
            >
                <span className="w-2.5 shrink-0" />
                {item.label}
            </div>
        ))}
    </div>
);

/* ── Main section ── */
const ProjectsSection = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [selected, setSelected] = useState<string>("all_projects");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
        )
            .then((r) => r.json())
            .then((data: Repo[]) => {
                const filtered = data
                    .filter((r) => !r.fork && !EXCLUDED.has(r.name))
                    .slice(0, 12);
                setRepos(filtered);
                setSelected("all_projects");
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    /* Sidebar items */
    const sidebarItems = loading
        ? []
        : repos.map((r) => ({ id: r.name, label: r.name }));

    /* Cards to show — all_projects = all, or single repo */
    const displayRepos =
        selected === "all_projects"
            ? repos
            : repos.filter((r) => r.name === selected);

    const handleSelect = (id: string) => {
        setSelected(id);
        setShowSidebar(false);
    };

    return (
        <section
            id="projects"
            className="flex flex-col"
            style={{ minHeight: "100vh", height: "100vh", paddingTop: "56px" }}
        >
            {/* ── Mobile toolbar ── */}
            <div
                className="flex md:hidden items-center justify-between px-3 py-1.5 shrink-0"
                style={{
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(8,6,18,0.8)",
                }}
            >
                <button
                    onClick={() => setShowSidebar((o) => !o)}
                    className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors px-2 py-1 rounded"
                    style={{
                        background: showSidebar
                            ? "rgba(255,255,255,0.08)"
                            : "transparent",
                        border: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 6h18M3 12h18M3 18h18" />
                    </svg>
                    explorer
                </button>

                <span className="text-xs font-mono text-gray-500">
                    {selected === "all_projects" ? "all projects" : selected}
                </span>
            </div>

            {/* ── Mobile sidebar dropdown ── */}
            {showSidebar && (
                <div
                    className="md:hidden shrink-0 flex flex-col overflow-hidden"
                    style={{
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                        background: "rgba(8,6,18,0.97)",
                        maxHeight: "40vh",
                    }}
                >
                    <div
                        className="px-3 py-2 text-xs font-mono text-gray-600 tracking-widest uppercase select-none shrink-0"
                        style={{
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                    >
                        explorer
                    </div>
                    <SidebarContent
                        selected={selected}
                        sidebarItems={sidebarItems}
                        onSelect={handleSelect}
                    />
                </div>
            )}

            <div
                className="flex flex-1 overflow-hidden"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
                {/* ── Col 1: Sidebar (desktop only) ── */}
                <div
                    className="hidden md:flex shrink-0 flex-col overflow-hidden"
                    style={{
                        width: "190px",
                        borderRight: "1px solid rgba(255,255,255,0.07)",
                        background: "rgba(8,6,18,0.7)",
                    }}
                >
                    <div
                        className="px-3 py-2 text-sm font-mono text-gray-600 tracking-widest uppercase select-none shrink-0"
                        style={{
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                    >
                        explorer
                    </div>
                    <SidebarContent
                        selected={selected}
                        sidebarItems={sidebarItems}
                        onSelect={handleSelect}
                    />
                </div>

                {/* ── Col 2: Main panel ── */}
                <div
                    className="flex flex-col flex-1 overflow-hidden"
                    style={{ background: "rgba(10,8,22,0.55)" }}
                >
                    {/* Tab bar */}
                    <div
                        className="hidden md:flex items-stretch shrink-0"
                        style={{
                            borderBottom: "1px solid rgba(255,255,255,0.07)",
                        }}
                    >
                        <div
                            className="flex items-center gap-2 px-4 py-2 text-sm font-mono text-white bg-white/5 cursor-default"
                            style={{
                                borderRight: "1px solid rgba(255,255,255,0.07)",
                            }}
                        >
                            {selected === "all_projects"
                                ? "all projects"
                                : selected}
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-5">
                        {error && (
                            <p className="text-gray-500 font-mono text-sm">
                                // failed to load repos from GitHub
                            </p>
                        )}

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Skeleton key={i} />
                                ))}
                            </div>
                        ) : (
                            <div
                                className={`grid gap-4 ${
                                    displayRepos.length === 1
                                        ? "grid-cols-1 max-w-sm"
                                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                }`}
                            >
                                {displayRepos.map((repo) => (
                                    <ProjectCard key={repo.id} repo={repo} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
