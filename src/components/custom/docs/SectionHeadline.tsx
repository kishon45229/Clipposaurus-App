import React from "react";
import type { DocsSection, ContentData1 } from "@/types/docs";

interface SectionHeadlineProps {
    section: DocsSection & { data: ContentData1 };
}

export const SectionHeadline = React.memo<SectionHeadlineProps>(({ section }) => {
    const { title, description } = section;

    return (
        <div className="space-y-4">
            <div className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-200 border-l-4 border-emerald-500 pl-4">
                {title}
            </div>

            {description && (
                <div className="text-sm md:text-base text-zinc-800 dark:text-zinc-400 leading-relaxed">
                    {description}
                </div>
            )}
        </div>
    )
});

SectionHeadline.displayName = "SectionHeadline";