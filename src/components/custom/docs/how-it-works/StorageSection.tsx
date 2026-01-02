import React from "react";
import type { ContentData14, DocsSection } from "@/types/docs";

interface NarrativeModuleProps {
    section: DocsSection & { data: ContentData14 };
};

export const StorageSection = React.memo<NarrativeModuleProps>(({ section }) => {
    const { data } = section as { data: ContentData14 };

    return (
        <section id={section.id} className="max-w-none space-y-10">
            <div>
                <ul className="space-y-4">
                    {data.items.map((item, index) => (
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
