import { useState } from "react";

export interface TreeNode {
    id: string;
    label: string;
    type: "folder" | "file";
    children?: TreeNode[];
    defaultOpen?: boolean;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="currentColor"
        className={`transition-transform duration-150 ${open ? "rotate-90" : ""}`}
    >
        <path d="M3 2l4 3-4 3V2z" />
    </svg>
);

interface TreeItemProps {
    node: TreeNode;
    depth: number;
    activeFile: string;
    onSelect: (id: string) => void;
}

const TreeItem = ({ node, depth, activeFile, onSelect }: TreeItemProps) => {
    const [open, setOpen] = useState(node.defaultOpen ?? false);

    const isFolder = node.type === "folder";
    const isActive = !isFolder && activeFile === node.id;

    return (
        <div>
            <button
                type="button"
                role="treeitem"
                aria-selected={isActive}
                aria-expanded={isFolder ? open : undefined}
                className={`flex items-center gap-1 py-0.5 px-2 select-none text-sm font-mono transition-colors duration-100 w-full text-left
                    ${isActive ? "text-white bg-white/10" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"}`}
                style={{ paddingLeft: `${8 + depth * 14}px` }}
                onClick={() => {
                    if (isFolder) setOpen((o) => !o);
                    else onSelect(node.id);
                }}
            >
                {isFolder ? (
                    <>
                        <span className="text-gray-500" aria-hidden="true">
                            <ChevronIcon open={open} />
                        </span>
                        <span className="text-gray-300">{node.label}</span>
                    </>
                ) : (
                    <>
                        <span className="w-2.5" aria-hidden="true" />
                        <span>{node.label}</span>
                    </>
                )}
            </button>
            {isFolder &&
                open &&
                node.children?.map((child) => (
                    <TreeItem
                        key={child.id}
                        node={child}
                        depth={depth + 1}
                        activeFile={activeFile}
                        onSelect={onSelect}
                    />
                ))}
        </div>
    );
};

export interface FileTreeProps {
    tree: TreeNode[];
    activeFile: string;
    onSelect: (id: string) => void;
}

const FileTree = ({ tree, activeFile, onSelect }: FileTreeProps) => {
    return (
        <div className="h-full overflow-y-auto pt-2 pb-4" role="tree" aria-label="File explorer">
            {tree.map((node) => (
                <TreeItem
                    key={node.id}
                    node={node}
                    depth={0}
                    activeFile={activeFile}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};

export default FileTree;
