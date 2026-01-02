import React from "react";
import type { DocsSection, ContentData12 } from "@/types/docs";

interface BestPracticesSectionProps {
    section: DocsSection & { data: ContentData12 };
}

export const BestPracticesSection = React.memo<BestPracticesSectionProps>(({ section }) => {
    const data = section.data as ContentData12;
    if (!data) return null;

    return (
<section id={section.id}>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {data.map((practice, index) => (
            <div key={index} className="space-y-3 group">

                {/* Title with subtle underline */}
                <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 border-b border-emerald-400/30 pb-1 group-hover:border-emerald-500 transition-colors">
                    {practice.title}
                </h3>

                <p className="text-base text-zinc-700 dark:text-zinc-400 leading-relaxed">
                    {practice.text}
                </p>

            </div>
        ))}
    </div>
</section>


    );
});

BestPracticesSection.displayName = "BestPracticesSection";