import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface WhatIsZeroKnowledgeSectionData {
    label: string;
    text: string;
}

interface WhatIsZeroKnowledgeSectionProps {
    section: DocsPageSection;
}

export const WhatIsZeroKnowledgeSection = React.memo<WhatIsZeroKnowledgeSectionProps>(({ section }) => {
    if (!section.data || !(Array.isArray(section.data))) return null;

    const items = (section.data as unknown) as WhatIsZeroKnowledgeSectionData[];

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
        </section>
    );
});

WhatIsZeroKnowledgeSection.displayName = "WhatIsZeroKnowledgeSection";
