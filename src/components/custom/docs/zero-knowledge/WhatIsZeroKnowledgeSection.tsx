import React from "react";
import type { DocsSection, ContentData25 } from "@/types/docs";

interface WhatIsZeroKnowledgeSectionProps {
    section: DocsSection & { data: ContentData25 };
}

export const WhatIsZeroKnowledgeSection = React.memo<WhatIsZeroKnowledgeSectionProps>(({ section }) => {
    const data = section.data;
    if (!data) return null;

    const { items, analogy } = data as ContentData25;

    return (
        <section id={section.id} className="space-y-16">
            <div className="space-y-12">
                {items.map((item, index) => (
                    <div key={index} className="relative pl-40 md:pl-56">
                        <div className="absolute left-0 top-0 text-base font-semibold text-emerald-700 dark:text-emerald-500 w-32 md:w-48 pr-4 text-right">
                            {item.label}
                        </div>

                        <div className="text-zinc-800 dark:text-zinc-400 leading-relaxed text-base">
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-xl p-6 md:p-8 bg-gradient-to-r from-emerald-50 to-zinc-100 dark:from-emerald-950/20 dark:to-zinc-900 border border-emerald-200/40 dark:border-emerald-800/30">
                <div className="text-base font-semibold text-zinc-900 dark:text-zinc-300 mb-3">
                    Simple Analogy
                </div>
                <div className="text-sm md:text-base text-zinc-700 dark:text-zinc-400 leading-relaxed">
                    {analogy}
                </div>
            </div>
        </section>
    );
});

WhatIsZeroKnowledgeSection.displayName = "WhatIsZeroKnowledgeSection";
