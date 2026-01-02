import React from "react";
import type { DocsSection, ContentData10 } from "@/types/docs";

interface LocalFirstSectionProps {
    section: DocsSection & { data: ContentData10 };
};

export const LocalFirstSection = React.memo<LocalFirstSectionProps>(({ section }) => {
    const { data } = section as { data: ContentData10 };

    return (
        <section id={section.id} className="space-y-6">
            {data.map((block, idx) => (
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
