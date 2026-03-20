import type { ReactNode } from "react";

export interface Tab {
    id: string;
    label: string;
    closable?: boolean;
}

interface EditorPanelProps {
    tabs: Tab[];
    activeTab: string;
    onTabClose: (id: string) => void;
    onTabSelect: (id: string) => void;
    children?: ReactNode;
}

const EditorPanel = ({
    tabs,
    activeTab,
    onTabClose,
    onTabSelect,
    children,
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
            <style>
                {`
                @keyframes window-open {
                    0% { opacity: 0; transform: scale(0.95); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .animate-window-open {
                    animation: window-open 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                `}
            </style>
            {/* Tab bar */}
            <div
                className="flex items-stretch shrink-0 border-b border-white/10 overflow-x-auto"
                role="tablist"
                aria-label="Editor tabs"
            >
                {tabs.map((tab, idx) => {
                    const isActive = activeTab === tab.id;
                    const tabId = `tab-${tab.id}`;
                    const panelId = `tabpanel-${tab.id}`;

                    return (
                        <div
                            key={tab.id}
                            id={tabId}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={panelId}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => onTabSelect(tab.id)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    onTabSelect(tab.id);
                                }
                                // Optional: simple arrow navigation.
                                if (e.key === "ArrowRight") {
                                    e.preventDefault();
                                    const next = tabs[Math.min(tabs.length - 1, idx + 1)];
                                    onTabSelect(next.id);
                                }
                                if (e.key === "ArrowLeft") {
                                    e.preventDefault();
                                    const prev = tabs[Math.max(0, idx - 1)];
                                    onTabSelect(prev.id);
                                }
                            }}
                            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono cursor-pointer border-r border-white/10 shrink-0 transition-colors duration-100 select-none
                                ${
                                    isActive
                                        ? "text-white bg-white/5"
                                        : "text-gray-500 hover:text-gray-300 hover:bg-white/3"
                                }
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60`}
                        >
                            <span>{tab.label}</span>
                            {tab.closable !== false && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onTabClose(tab.id);
                                    }}
                                    className="text-gray-500 hover:text-white hover:bg-white/8 transition-colors ml-1 w-6 h-5 flex items-center justify-center rounded-none"
                                    style={{ border: "1px solid transparent" }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.border =
                                            "1px solid rgba(255,255,255,0.1)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.border =
                                            "1px solid transparent")
                                    }
                                    aria-label={`Close ${tab.label}`}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Content area */}
            <div
                key={activeTab}
                className="flex-1 overflow-y-auto animate-window-open"
                role="tabpanel"
                id={`tabpanel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
            >
                {children ?? (
                    <div className="p-5 font-mono text-base text-gray-600">
                        No content for "{activeTab}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditorPanel;
