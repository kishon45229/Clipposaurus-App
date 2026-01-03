import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface LocalFirstSectionData {
    heading: string;
    text: string;
}

interface LocalFirstSectionProps {
    section: DocsPageSection;
};

export const LocalFirstSection = React.memo<LocalFirstSectionProps>(({ section }) => {
    if (!section.data || !Array.isArray(section.data)) return null;

    const blocks = (section.data as unknown) as LocalFirstSectionData[];

    return (
        <section id={section.id} className="space-y-6">
            {blocks.map((block, idx) => (
                <div key={idx} className="group">
                    <div className="text-lg font-medium text-emerald-500 mb-3 tracking-tight">
                        {block.heading}
                    </div>

                    <div className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed pl-4 border-l border-zinc-300 dark:border-zinc-700 group-hover:pl-5 transition-all duration-300">
                        {block.text}
                    </div>
                </div>
            ))}
        </section>
    );
});

LocalFirstSection.displayName = "LocalFirstSection";
