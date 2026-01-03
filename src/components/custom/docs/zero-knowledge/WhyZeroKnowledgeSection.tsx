import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface WhyZeroKnowledgeSectionData {
    label: string;
    text: string;
}

interface WhyZeroKnowledgeSectionProps {
    section: DocsPageSection;
}

export const WhyZeroKnowledgeSection = React.memo<WhyZeroKnowledgeSectionProps>(({ section }) => {
    if (!section.data || !Array.isArray(section.data)) return null;

    const items = section.data as WhyZeroKnowledgeSectionData[];

    return (
        <section id={section.id} className="space-y-16">
            <div className="space-y-10">
                {items.map((item, index) => (
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
