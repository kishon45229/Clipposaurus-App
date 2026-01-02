import React from "react";
import type { DocsSection, ContentData14 } from "@/types/docs";

interface DeletionModuleProps {
    section: DocsSection & { data: ContentData14 };
}

export const DeletionSection = React.memo<DeletionModuleProps>(({ section }) => {
    const { data } = section as { data: ContentData14 };

    return (
        <section id={section.id}>
                <div className="space-y-4">
                    {data.items.map((item, index) => (
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
