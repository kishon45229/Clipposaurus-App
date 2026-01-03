import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface BestPracticesSectionData {
    title: string;
    text: string;
}

interface BestPracticesSectionProps {
    section: DocsPageSection;
}

export const BestPracticesSection = React.memo<BestPracticesSectionProps>(({ section }) => {
    if (!section.data || !Array.isArray(section.data)) return null;

    const practices = section.data as BestPracticesSectionData[];

    return (
        <section id={section.id}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

                {practices.map((practice, index) => (
                    <div key={index} className="space-y-3 group">
                        <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 border-b border-emerald-400/30 pb-1 group-hover:border-emerald-500 transition-colors">
                            {practice.title}
                        </div>

                        <div className="text-base text-zinc-700 dark:text-zinc-400 leading-relaxed">
                            {practice.text}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

BestPracticesSection.displayName = "BestPracticesSection";