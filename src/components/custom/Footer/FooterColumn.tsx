import React from "react";

interface FooterLink {
    label: string;
}

interface FooterColumnProps {
    title: string;
    links: FooterLink[];
    redirectHandlers: Record<string, () => void>;
}

export const FooterColumn = React.memo(({ title, links, redirectHandlers }: FooterColumnProps) => {
    return (
        <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50 mb-4">
                {title}
            </h3>
            <ul className="space-y-3">
                {links.map((link) => (
                    <li key={link.label}>
                        <button
                            onClick={redirectHandlers[link.label]}
                            className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors duration-200"
                            type="button"
                        >
                            <span>{link.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
});

FooterColumn.displayName = "FooterColumn";