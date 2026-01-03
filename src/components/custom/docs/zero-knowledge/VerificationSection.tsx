import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface VerificationSectionData {
    label: string;
    text: string;
}

interface VerificationSectionProps {
    section: DocsPageSection;
}

export const VerificationSection = React.memo<VerificationSectionProps>(({ section }) => {
    if (!section.data || !Array.isArray(section.data)) return null;

    const items = section.data as VerificationSectionData[];

    return (
        <section id={section.id}>
            <div className="grid grid-cols-3 gap-8 items-start">
                {items.map((item, index) => {
                    return (
                        <div key={index} className="relative flex flex-col items-start">
                            <div className="relative z-10 px-3 py-1.5 rounded-full bg-emerald-500 text-zinc-900 font-semibold text-sm shadow-md mb-4">
                                Option {index + 1}
                            </div>

                            {index < items.length && (
                                <div className="absolute top-3 w-full h-0.5 bg-emerald-300/50 dark:bg-emerald-700/40" />
                            )}

                            <div className="text-base font-semibold text-zinc-900 dark:text-zinc-300 mb-2">
                                {item.label}
                            </div>

                            <div className="text-sm md:text-base text-zinc-700 dark:text-zinc-400 leading-relaxed pr-4">
                                {item.text}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
});

VerificationSection.displayName = "VerificationSection";
