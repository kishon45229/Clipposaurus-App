"use client";

import React from "react";

interface TOCItem {
    id: string;
    label: string;
}

interface StickyTOCProps {
    title: string;
    items: TOCItem[];
    activeSection: string;
}

export const StickyTOC = React.memo<StickyTOCProps>(({ title, items, activeSection }) => {
    return (
        <div className="hidden lg:block print:hidden">
            <nav className="sticky top-24 text-[clamp(0.75rem,1.2vw,0.9rem)] leading-6">
                <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    {title}
                </div>

                <ul className="border-l border-zinc-200 dark:border-zinc-800 pl-4 space-y-2">
                    {items.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={`block transition-colors ${isActive
                                        ? "text-emerald-600 dark:text-emerald-400 font-medium"
                                        : "text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                                        }`}
                                >
                                    {item.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
});

StickyTOC.displayName = "StickyTOC";