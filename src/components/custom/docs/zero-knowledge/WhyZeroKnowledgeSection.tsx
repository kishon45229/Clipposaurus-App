import React from "react";
import type { DocsSection, ContentData26 } from "@/types/docs";

interface WhyZeroKnowledgeSectionProps {
    section: DocsSection & { data: ContentData26 };
}

export const WhyZeroKnowledgeSection = React.memo<WhyZeroKnowledgeSectionProps>(({ section }) => {
    const data = section.data as ContentData26;
    if (!data) return null;

    return (
        <section id={section.id} className="space-y-16">
            <div className="space-y-10">
                {data.map((item, index) => (
                    <div key={index} className="relative pl-10">
                        <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]" />

                        <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-300 mb-2">
                            {item.label}
                        </div>

                        <div className="text-sm md:text-base text-zinc-700 dark:text-zinc-400 leading-relaxed">
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

WhyZeroKnowledgeSection.displayName = "WhyZeroKnowledgeSection";
