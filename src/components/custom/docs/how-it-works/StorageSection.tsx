import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface StorageModuleData {
    items: string[];
}

interface StorageModuleProps {
    section: DocsPageSection;
};

export const StorageSection = React.memo<StorageModuleProps>(({ section }) => {
    if (!section.data || !Array.isArray(section.data)) return null;

    const { items } = (section.data as unknown) as StorageModuleData;

    return (
        <section id={section.id} className="max-w-none space-y-10">
            <div>
                <ul className="space-y-4">
                    {items.map((item, index) => (
                        <li key={index} className="flex gap-3 items-start">
                            <span className="h-3 w-3 mt-1.5 rounded-full flex-shrink-0 bg-emerald-500/70 dark:bg-emerald-400/70 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
                            <span className="text-zinc-700 dark:text-zinc-300 leading-snug">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section >
    );
});

StorageSection.displayName = "StorageSection";