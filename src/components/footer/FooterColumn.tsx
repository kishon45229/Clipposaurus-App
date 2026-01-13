import React from "react";

interface FooterColumnProps {
    column: {
        category: string;
        links: string[]
    };
    redirectHandlers: Record<string, () => void>;
}

export const FooterColumn = React.memo(({ column, redirectHandlers }: FooterColumnProps) => {
    const { category, links } = column;

    return (
        <div>
            <div className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50 mb-4">
                {category}
            </div>
            <ul className="space-y-3">
                {links.map((link, index) => (
                    <li key={index}>
                        <button
                            onClick={redirectHandlers[link]}
                            className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-500 hover:font-semibold transition-colors duration-200 cursor-target"
                            type="button"
                        >
                            <span>{link}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
});

FooterColumn.displayName = 'FooterColumn';