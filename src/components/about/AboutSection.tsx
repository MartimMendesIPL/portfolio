import { useState } from "react";
import FileTree, { type TreeNode } from "../FileTree";
import EditorPanel, { type Tab } from "../EditorPanel";
import SkillsPanel from "./SkillsPanel";
import { CONTENT_MAP } from "./AboutContent";

const ABOUT_TREE: TreeNode[] = [
    {
        id: "personal-info",
        label: "personal-info",
        type: "folder",
        defaultOpen: true,
        children: [
            { id: "bio", label: "bio", type: "file" },
            { id: "interests", label: "interests", type: "file" },
            { id: "experience", label: "experience", type: "file" },
            {
                id: "education",
                label: "education",
                type: "folder",
                defaultOpen: true,
                children: [
                    { id: "university", label: "university", type: "file" },
                    {
                        id: "certifications",
                        label: "certifications",
                        type: "file",
                    },
                ],
            },
        ],
    },
];

const AboutSection = () => {
    const [openTabs, setOpenTabs] = useState<Tab[]>([
        { id: "bio", label: "bio" },
        { id: "experience", label: "experience" },
    ]);
    const [activeTab, setActiveTab] = useState<string>("bio");
    const [showSkills, setShowSkills] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);

    const handleFileSelect = (id: string) => {
        const labels: Record<string, string> = {
            bio: "bio",
            interests: "interests",
            university: "university",
            certifications: "certifications",
            experience: "experience",
        };
        const label = labels[id] ?? id;

        setOpenTabs((prev) => {
            if (prev.find((t) => t.id === id)) return prev;
            return [...prev, { id, label }];
        });
        setActiveTab(id);
        setShowSidebar(false);
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
        <section
            id="about"
            className="flex flex-col"
            style={{
                height: "100vh",
            }}
        >
            {/* Mobile toolbar */}
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

                <button
                    onClick={() => setShowSkills((o) => !o)}
                    className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors px-2 py-1 rounded"
                    style={{
                        background: showSkills
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
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                    </svg>
                    skills
                </button>
            </div>

            {/* Mobile sidebar overlay */}
            {showSidebar && (
                <div
                    className="md:hidden shrink-0 overflow-hidden flex flex-col"
                    style={{
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                        background: "rgba(8,6,18,0.95)",
                        maxHeight: "40vh",
                    }}
                >
                    <div
                        className="px-3 py-2 text-xs font-mono text-gray-500 tracking-widest uppercase select-none shrink-0"
                        style={{
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                    >
                        explorer
                    </div>
                    <FileTree
                        tree={ABOUT_TREE}
                        activeFile={activeTab}
                        onSelect={handleFileSelect}
                    />
                </div>
            )}

            {/* Mobile skills panel */}
            {showSkills && (
                <div
                    className="md:hidden shrink-0 overflow-hidden flex flex-col"
                    style={{
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                        background: "rgba(8,6,18,0.95)",
                        maxHeight: "40vh",
                    }}
                >
                    <SkillsPanel
                        tab="skills"
                        onClose={() => setShowSkills(false)}
                    />
                </div>
            )}

            {/* 3-column IDE layout — desktop only */}
            <div
                className="hidden md:flex flex-1 overflow-hidden"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
                {/* ── Column 1: File tree sidebar ── */}
                <div
                    className="shrink-0 overflow-hidden flex flex-col"
                    style={{
                        width: "190px",
                        borderRight: "1px solid rgba(255,255,255,0.07)",
                        background: "rgba(8,6,18,0.6)",
                    }}
                >
                    <div
                        className="px-3 py-2 text-sm font-mono text-gray-500 tracking-widest uppercase select-none shrink-0"
                        style={{
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                    >
                        explorer
                    </div>
                    <FileTree
                        tree={ABOUT_TREE}
                        activeFile={activeTab}
                        onSelect={handleFileSelect}
                    />
                </div>

                {/* ── Column 2: Editor panels ── */}
                <div
                    className="flex flex-col flex-1 overflow-hidden"
                    style={{ background: "rgba(10,8,22,0.5)" }}
                >
                    <EditorPanel
                        tabs={openTabs}
                        activeTab={activeTab}
                        onTabClose={handleTabClose}
                        onTabSelect={setActiveTab}
                    >
                        {CONTENT_MAP[activeTab]}
                    </EditorPanel>
                </div>

                {/* ── Column 3: Skills panel ── */}
                {showSkills && (
                    <div
                        className="shrink-0 flex flex-col overflow-hidden"
                        style={{
                            width: "340px",
                            borderLeft: "1px solid rgba(255,255,255,0.07)",
                            background: "rgba(8,6,18,0.6)",
                        }}
                    >
                        <SkillsPanel
                            tab="skills"
                            onClose={() => setShowSkills(false)}
                        />
                    </div>
                )}
            </div>

            {/* Mobile editor — always visible */}
            <div
                className="flex md:hidden flex-col flex-1 overflow-hidden"
                style={{ background: "rgba(10,8,22,0.5)" }}
            >
                <EditorPanel
                    tabs={openTabs}
                    activeTab={activeTab}
                    onTabClose={handleTabClose}
                    onTabSelect={setActiveTab}
                >
                    {CONTENT_MAP[activeTab]}
                </EditorPanel>
            </div>
        </section>
    );
};

export default AboutSection;
