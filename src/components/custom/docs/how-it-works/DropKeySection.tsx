import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface DropKeySectionData {
    label: string;
    example: string;
    type: string;
    content: string;
}

interface DropKeySectionProps {
    section: DocsPageSection;
};

export const DropKeySection = React.memo<DropKeySectionProps>(({ section }) => {
    if (!section.data || !Array.isArray(section.data)) return null;

    const items = (section.data as unknown) as DropKeySectionData[];

    return (
        <section id={section.id}>
            <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 shadow-sm">
                    {items.map((item, index) => (
                        <React.Fragment key={index}>
                            <span className="font-mono text-2xl text-emerald-500 dark:text-emerald-400">
                                {item.example}
                            </span>
                            {index < items.length - 1 && (
                                <span className="mx-1 text-zinc-400">-</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="mt-3 flex items-center justify-center gap-8 text-xs text-zinc-500 dark:text-zinc-400">
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <span className="block h-2 w-px mb-1 bg-zinc-400"></span>
                            <span className="text-zinc-600 dark:text-zinc-400">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
                {items.map((item, index) => (
                    <div key={index} className="p-5 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-zinc-50 dark:bg-zinc-900/30">
                        <div className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
                            {item.label}
                        </div>
                        <div className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {item.content}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

DropKeySection.displayName = "DropKeySection";
