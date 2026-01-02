import React from "react";
import type { DocsSection, ContentData24 } from "@/types/docs";

interface VerificationSectionProps {
    section: DocsSection & { data: ContentData24 };
}

export const VerificationSection = React.memo<VerificationSectionProps>(({ section }) => {
    const data = section.data as ContentData24;
    if (!data) return null;

    return (
        <section id={section.id}>
            <div className="grid grid-cols-3 gap-8 items-start">
                {data.map((item, index) => {
                    return (
                        <div key={index} className="relative flex flex-col items-start">
                            <div className="relative z-10 px-3 py-1.5 rounded-full bg-emerald-500 text-zinc-900 font-semibold text-sm shadow-md mb-4">
                                Option {index + 1}
                            </div>

                            {index < data.length && (
                                <div className="absolute top-3 w-full h-[2px] bg-emerald-300/50 dark:bg-emerald-700/40" />
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
