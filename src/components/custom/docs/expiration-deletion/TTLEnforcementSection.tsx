import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface TTLEnforcementSectionData {
    label: string;
    text: string;
}

interface TTLEnforcementSectionProps {
    section: DocsPageSection;
}

export const TTLEnforcementSection = React.memo<TTLEnforcementSectionProps>(({ section }) => {
    if (!section.data || !Array.isArray(section.data)) return null;

    const items = section.data as TTLEnforcementSectionData[];

    return (
        <section id={section.id}>
            <div className="space-y-12">
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {items.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center justify-center flex-shrink-0 w-fit text-emerald-500 font-semibold text-lg">
                                        {item.label}
                                    </div>
                                    <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-700" />
                                </div>

                                <div className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {item.text}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
});

TTLEnforcementSection.displayName = "TTLEnforcementSection";
