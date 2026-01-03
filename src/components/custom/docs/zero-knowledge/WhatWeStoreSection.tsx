import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface WhatWeStoreSectionData {
    stored: {
        title: string;
        items: {
            label: string;
            text: string;
        }[];
    };
    notStored: {
        title: string;
        items: {
            label: string;
            text: string;
        }[];
    };
}

interface WhatWeStoreSectionProps {
    section: DocsPageSection;
}

export const WhatWeStoreSection = React.memo<WhatWeStoreSectionProps>(({ section }) => {
    if (!section.data || typeof section.data !== "object") return null;

    const { stored, notStored } = section.data as WhatWeStoreSectionData;

    return (
        <section id={section.id} className="space-y-16">
            <div className="relative grid md:grid-cols-2 gap-12">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 bg-gradient-to-b from-emerald-400 via-zinc-400 to-zinc-500 rounded-full opacity-40" />

                <div className="space-y-8 pr-4">
                    <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-300">
                        {stored.title}
                    </div>

                    <div className="space-y-5">
                        {stored.items.map((item, index: number) => (
                            <div key={index} className="flex items-start gap-4 group">
                                <div className="mt-1 w-3 h-3 rounded-full bg-emerald-500/70 group-hover:bg-emerald-500 transition-colors" />
                                <div className="space-y-1">
                                    <div className="text-base font-semibold text-emerald-700 dark:text-emerald-500">
                                        {item.label}
                                    </div>
                                    <div className="text-base text-zinc-700 dark:text-zinc-300">
                                        {item.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8 pl-4">
                    <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-300">
                        {notStored.title}
                    </div>

                    <div className="space-y-5">
                        {notStored.items.map((item, index: number) => (
                            <div key={index} className="flex items-start gap-4 group">
                                <div className="mt-1 w-3 h-3 rounded-full bg-zinc-400/70 group-hover:bg-zinc-400 transition-colors" />
                                <div className="space-y-1">
                                    <div className="text-base font-semibold text-zinc-700 dark:text-zinc-300">
                                        {item.label}
                                    </div>
                                    <div className="text-base text-zinc-600 dark:text-zinc-400">
                                        {item.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

WhatWeStoreSection.displayName = "WhatWeStoreSection";
