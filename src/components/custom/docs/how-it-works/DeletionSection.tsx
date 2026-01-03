import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface DeletionModuleData {
    items: string[];
}

interface DeletionModuleProps {
    section: DocsPageSection;
}

export const DeletionSection = React.memo<DeletionModuleProps>(({ section }) => {
    if (!section.data || !Array.isArray(section.data)) return null;

    const { items } = (section.data as unknown) as DeletionModuleData;

    return (
        <section id={section.id}>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                        <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item}</span>
                    </div>
                ))}
            </div>
        </section>
    );
});

DeletionSection.displayName = "DeletionSection";
