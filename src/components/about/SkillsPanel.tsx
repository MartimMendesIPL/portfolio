/* ── Skill badge ── */
interface SkillBadgeProps {
  label: string;
  checked?: boolean;
}

const SkillBadge = ({ label, checked = false }: SkillBadgeProps) => (
  <div className="flex items-center gap-1.5 text-sm font-mono min-w-0">
    <span
      className={`w-3.5 h-3.5 rounded-none border flex items-center justify-center shrink-0 ${
        checked
          ? "border-purple-500 bg-purple-500/20"
          : "border-gray-600 bg-transparent"
      }`}
    >
      {checked && (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path
            d="M1.5 4L3 5.5L6.5 2"
            stroke="#a855f7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
    <span
      className={`min-w-0 truncate ${checked ? "text-gray-300" : "text-gray-500"}`}
    >
      {label}
    </span>
  </div>
);

/* ── Skill card ── */
interface SkillCardProps {
  handle: string;
  sectionLabel: string;
  skills: { label: string; checked: boolean }[];
}

const SkillCard = ({ handle, sectionLabel, skills }: SkillCardProps) => (
  <div
    className="rounded-none p-4 mb-3"
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
    }}
  >
    {/* Profile row */}
    <div className="flex items-center gap-2 mb-3">
      <div
        className="w-7 h-7 rounded-none flex items-center justify-center shrink-0"
        style={{
          background: "rgba(168,85,247,0.2)",
          border: "1px solid rgba(168,85,247,0.3)",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <span className="text-sm font-mono text-gray-300">{handle}</span>
    </div>

    {/* Section label */}
    <p className="text-sm font-mono text-purple-400/70 mb-3">
      {`// ${sectionLabel}`}
    </p>

    {/* Skills grid */}
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {skills.map((s, i) => (
        <SkillBadge key={i} label={s.label} checked={s.checked} />
      ))}
    </div>
  </div>
);

/* ── Skills panel data ── */
const SKILL_GROUPS: SkillCardProps[] = [
  {
    handle: "@MartimMendesIPL",
    sectionLabel: "languages",
    skills: [
      { label: "TS", checked: true },
      { label: "Python", checked: true },
      { label: "C/C#", checked: true },
      { label: "Java", checked: true },
      { label: "Go", checked: true },
      { label: "PHP", checked: true },
    ],
  },
  {
    handle: "@MartimMendesIPL",
    sectionLabel: "frameworks",
    skills: [
      { label: "Next.js", checked: true },
      { label: "Tailwind", checked: true },
      { label: ".NET", checked: true },
      { label: "Laravel", checked: true },
    ],
  },
  {
    handle: "@MartimMendesIPL",
    sectionLabel: "tools and software",
    skills: [
      { label: "Zed", checked: true },
      { label: "Git", checked: true },
      { label: "Figma", checked: true },
    ],
  },
  {
    handle: "@MartimMendesIPL",
    sectionLabel: "languages",
    skills: [
      { label: "PT/Native", checked: true },
      { label: "ENG/C2", checked: true },
    ],
  },
];

/* ── Tab bar + panel ── */
interface SkillsPanelProps {
  tab: string;
  onClose: () => void;
}

const SkillsPanel = ({ tab, onClose }: SkillsPanelProps) => (
  <div className="flex flex-col h-full overflow-hidden">
    {/* Tab bar */}
    <div className="flex items-stretch shrink-0 border-b border-white/10">
      <div className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-white bg-white/5 border-r border-white/10 cursor-default">
        <span>{tab}</span>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white hover:bg-white/8] transition-colors ml-1 w-6 h-5 flex items-center justify-center rounded-none"
          style={{ border: "1px solid transparent" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.border = "1px solid transparent")
          }
          aria-label="Close skills"
        >
          ×
        </button>
      </div>
    </div>

    {/* Scrollable skill cards */}
    <div className="flex-1 overflow-y-auto p-3">
      {SKILL_GROUPS.map((group, i) => (
        <SkillCard key={i} {...group} />
      ))}
    </div>
  </div>
);

export default SkillsPanel;
