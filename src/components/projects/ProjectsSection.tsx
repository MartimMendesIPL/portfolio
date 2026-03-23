import { useEffect, useState } from "react";
import FileTree, { type TreeNode } from "../FileTree";
import EditorPanel, { type Tab } from "../EditorPanel";
import { type Repo } from "@/lib/github-api";
import { GITHUB } from "@/lib/constants";

const CACHE_KEY = `portfolio:github_repos:${GITHUB.USER}:v1`;
const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours
const EXCLUDED = new Set<string>([GITHUB.USER]);

type RepoCache = { ts: number; repos: Repo[] };

const readReposCache = (): Repo[] | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RepoCache;
    if (!parsed?.ts || !Array.isArray(parsed.repos)) return null;
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed.repos;
  } catch {
    return null;
  }
};

/* ── Single project card ── */
const ProjectCard = ({
  repo,
  onClick,
}: {
  repo: Repo;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex flex-col rounded-none overflow-hidden cursor-pointer hover:bg-white/[0.05] transition-colors"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      onClick={onClick}
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
            <div className="w-2.5 h-2.5 rounded-none bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-none bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-none bg-green-500/70" />
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
                <span className="text-blue-400">repo</span> = {"{"}
              </p>
              <p className="ml-4">
                name: <span className="text-green-400">'{repo.name}'</span>,
              </p>
              <p className="ml-4">
                stars:{" "}
                <span className="text-orange-400">{repo.stargazers_count}</span>
                ,
              </p>
              {repo.language && (
                <p className="ml-4">
                  lang:{" "}
                  <span className="text-green-400">'{repo.language}'</span>,
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
          onClick={(e) => e.stopPropagation()}
          className="mt-auto text-center text-sm font-mono text-gray-300 hover:text-white transition-colors duration-150 py-1.5 rounded-none"
          style={{ border: "1px solid rgba(255,255,255,0.12)" }}
        >
          view project on github
        </a>
      </div>
    </div>
  );
};

/* ── Project Detail View ── */
const ProjectDetail = ({ repo }: { repo: Repo }) => {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8 max-w-4xl mx-auto w-full font-mono">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-2xl text-gray-200 font-semibold">{repo.name}</h2>
        <div className="flex gap-3">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs text-blue-400 bg-blue-400/10 hover:bg-blue-400/20 rounded-none transition-colors border border-blue-400/20"
            >
              live_demo ↗
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs text-gray-300 bg-white/5 hover:bg-white/10 rounded-none transition-colors border border-white/10"
          >
            github ↗
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <p className="text-purple-400/60 mb-2">{"/* description */"}</p>
            <p className="text-gray-300 leading-relaxed text-sm">
              {repo.description || "No description provided."}
            </p>
          </div>
          {repo.topics && repo.topics.length > 0 && (
            <div>
              <p className="text-purple-400/60 mb-2">{"/* topics */"}</p>
              <div className="flex flex-wrap gap-2">
                {repo.topics.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded-none text-xs text-gray-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 bg-white/[0.02] border border-white/5 p-4 rounded-none h-fit">
          <p className="text-purple-400/60 mb-2">{"/* stats */"}</p>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>stars</span>
              <span className="text-orange-400">{repo.stargazers_count}</span>
            </div>
            {repo.language && (
              <div className="flex justify-between">
                <span>language</span>
                <span className="text-green-400">{repo.language}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>fork</span>
              <span className="text-blue-400">
                {repo.fork ? "true" : "false"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Loading skeleton ── */
const Skeleton = () => (
  <div
    className="rounded-none overflow-hidden animate-pulse"
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <div style={{ height: "170px", background: "rgba(255,255,255,0.05)" }} />
    <div className="p-4 space-y-2">
      <div className="h-2 rounded-none bg-white/5 w-1/3" />
      <div className="h-2 rounded-none bg-white/5 w-full" />
      <div className="h-2 rounded-none bg-white/5 w-4/5" />
      <div className="h-6 rounded-none bg-white/5 mt-4" />
    </div>
  </div>
);

/* ── Main section ── */
const ProjectsSection = () => {
  const [initialCache] = useState<Repo[] | null>(() => readReposCache());
  const [repos, setRepos] = useState<Repo[]>(() => initialCache ?? []);
  const [openTabs, setOpenTabs] = useState<Tab[]>([
    { id: "all_projects", label: "all_projects", closable: false },
  ]);
  const [activeTab, setActiveTab] = useState<string>("all_projects");
  const [loading, setLoading] = useState<boolean>(() => initialCache === null);
  const [error, setError] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const controller = new AbortController();
    const didUseCache = initialCache !== null;

    const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    fetch(
      `https://api.github.com/users/${GITHUB.USER}/repos?sort=updated&per_page=100`,
      {
        signal: controller.signal,
        headers,
      },
    )
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub fetch failed: ${r.status}`);
        return r.json();
      })
      .then((data: Repo[]) => {
        const filtered = data.filter((r) => !EXCLUDED.has(r.name));
        setRepos(filtered);
        try {
          const cache: RepoCache = { ts: Date.now(), repos: filtered };
          window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
        } catch {
          // Cache write is best-effort.
        }
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        // If we have cached data, prefer keeping UI usable.
        if (!didUseCache) setError(true);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [initialCache]);

  const totalPages = Math.ceil(repos.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));

  /* Sidebar tree structure */
  const projectsTree: TreeNode[] = [
    {
      id: "projects",
      label: "projects",
      type: "folder",
      defaultOpen: true,
      children: [
        { id: "all_projects", label: "all_projects", type: "file" },
        {
          id: "my_projects",
          label: "my_projects",
          type: "folder",
          defaultOpen: true,
          children: repos.map((r) => ({
            id: r.name,
            label: r.name,
            type: "file",
          })),
        },
      ],
    },
  ];

  const displayRepos = repos.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  const handleSelect = (id: string) => {
    setOpenTabs((prev) => {
      if (prev.find((t) => t.id === id)) return prev;
      return [...prev, { id, label: id, closable: id !== "all_projects" }];
    });
    setActiveTab(id);
    setShowSidebar(false);
    if (id === "all_projects") {
      setCurrentPage(1);
    }
  };

  const handleTabClose = (id: string) => {
    setOpenTabs((prev) => {
      const next = prev.filter((t) => t.id !== id);
      if (activeTab === id && next.length > 0) {
        setActiveTab(next[next.length - 1].id);
      } else if (next.length === 0) {
        setActiveTab("");
      }
      return next;
    });
  };

  return (
    <section id="projects" className="flex flex-col h-full">
      <h2 className="sr-only">Projects</h2>
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
          className={`flex items-center gap-1.5 text-xs font-mono transition-all duration-200 px-2.5 py-1 rounded-none border ${
            showSidebar
              ? "text-blue-400 bg-blue-500/10 border-blue-500/30"
              : "text-gray-400 bg-transparent border-white/10 hover:text-white hover:bg-white/5"
          }`}
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
          {activeTab === "all_projects" ? "all projects" : activeTab}
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
          <FileTree
            tree={projectsTree}
            activeFile={activeTab}
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
          <FileTree
            tree={projectsTree}
            activeFile={activeTab}
            onSelect={handleSelect}
          />
        </div>

        {/* ── Col 2: Main panel ── */}
        <div
          className="flex flex-col flex-1 overflow-hidden"
          style={{ background: "rgba(10,8,22,0.55)" }}
        >
          <EditorPanel
            tabs={openTabs}
            activeTab={activeTab}
            onTabClose={handleTabClose}
            onTabSelect={setActiveTab}
          >
            <div className="p-3 sm:p-5 h-full">
              {error && (
                <p className="text-gray-500 font-mono text-sm">
                  // failed to load repos from GitHub
                </p>
              )}

              {activeTab === "all_projects" ? (
                loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} />
                    ))}
                  </div>
                ) : (
                  <>
                    <div
                      key={currentPage}
                      className={`grid gap-4 animate-window-open grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}
                    >
                      {displayRepos.map((repo) => (
                        <ProjectCard
                          key={repo.id}
                          repo={repo}
                          onClick={() => handleSelect(repo.name)}
                        />
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-4 mt-6">
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className="px-3 py-1 text-sm font-mono text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-none bg-white/5 border border-white/10"
                        >
                          prev
                        </button>
                        <span className="text-sm font-mono text-gray-500">
                          {currentPage} / {totalPages}
                        </span>
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 text-sm font-mono text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-none bg-white/5 border border-white/10"
                        >
                          next
                        </button>
                      </div>
                    )}
                  </>
                )
              ) : (
                <div className="flex w-full h-full text-gray-500 font-mono text-sm items-start">
                  {/* Details for single project */}
                  {repos.find((r) => r.name === activeTab) && (
                    <ProjectDetail
                      repo={repos.find((r) => r.name === activeTab)!}
                    />
                  )}
                </div>
              )}
            </div>
          </EditorPanel>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
