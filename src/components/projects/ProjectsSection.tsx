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
    const [imgError, setImgError] = useState(false);
    const ogImage = `https://opengraph.githubassets.com/1/${GITHUB_USER}/${repo.name}`;

    return (
        <div
            className="flex flex-col rounded-lg overflow-hidden"
            style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            {/* Preview image */}
            <div
                className="shrink-0 overflow-hidden flex items-center justify-center"
                style={{
                    height: "170px",
                    background: "rgba(255,255,255,0.04)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                {imgError ? (
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                    </svg>
                ) : (
                    <img
                        src={ogImage}
                        alt={repo.name}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-4 gap-3">
                {/* Repo name */}
                <p className="text-sm font-mono text-gray-400">{repo.name}</p>

                {/* Description */}
                <p className="text-sm font-mono text-gray-300 leading-5 flex-1">
                    {repo.description ?? "No description provided."}
                </p>

                {/* Language tag */}
                {repo.language && (
                    <div className="flex items-center gap-1.5">
                        <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{
                                background:
                                    LANG_COLORS[repo.language] ?? "#888",
                            }}
                        />
                        <span className="text-sm font-mono text-gray-500">
                            {repo.language}
                        </span>
                    </div>
                )}

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

/* ── Main section ── */
const ProjectsSection = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [selected, setSelected] = useState<string>("all_projects");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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

    return (
        <section
            id="projects"
            className="flex flex-col"
            style={{ height: "100vh", paddingTop: "56px" }}
        >
            <div
                className="flex flex-1 overflow-hidden"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
                {/* ── Col 1: Sidebar ── */}
                <div
                    className="shrink-0 flex flex-col overflow-hidden"
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
                            onClick={() => setSelected("all_projects")}
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
                                onClick={() => setSelected(item.id)}
                            >
                                <span className="w-2.5 shrink-0" />
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Col 2: Main panel ── */}
                <div
                    className="flex flex-col flex-1 overflow-hidden"
                    style={{ background: "rgba(10,8,22,0.55)" }}
                >
                    {/* Tab bar */}
                    <div
                        className="flex items-stretch shrink-0"
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
                    <div className="flex-1 overflow-y-auto p-5">
                        {error && (
                            <p className="text-gray-500 font-mono text-sm">
                                // failed to load repos from GitHub
                            </p>
                        )}

                        {loading ? (
                            <div className="grid grid-cols-3 gap-4">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Skeleton key={i} />
                                ))}
                            </div>
                        ) : (
                            <div
                                className={`grid gap-4 ${displayRepos.length === 1 ? "grid-cols-1 max-w-sm" : "grid-cols-3"}`}
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
