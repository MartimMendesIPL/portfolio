import { useState } from "react";
import FileTree from "./FileTree";
import EditorPanel from "./EditorPanel";
import SkillsPanel from "./SkillsPanel";

interface Tab {
    id: string;
    label: string;
}

const AboutSection = () => {
    const [openTabs, setOpenTabs] = useState<Tab[]>([
        { id: "bio", label: "bio" },
        { id: "experience", label: "experience" },
    ]);
    const [activeTab, setActiveTab] = useState<string>("bio");
    const [showSkills, setShowSkills] = useState(true);

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
                paddingTop: "56px" /* push content below the fixed navbar */,
            }}
        >
            {/* 3-column IDE layout — fills remaining height */}
            <div
                className="flex flex-1 overflow-hidden"
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
                    />
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
        </section>
    );
};

export default AboutSection;
