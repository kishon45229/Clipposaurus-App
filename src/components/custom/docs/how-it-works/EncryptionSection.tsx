import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface EncryptionSectionData {
    title: string;
    text: string;
}

interface EncryptionSectionProps {
    section: DocsPageSection;
}

export const EncryptionSection = React.memo<EncryptionSectionProps>(({ section }) => {
    if (!section.data || !Array.isArray(section.data)) return null;

    const blocks = (section.data as unknown) as EncryptionSectionData[];

    return (
        <section id={section.id}>
            <div className="space-y-4">
                {blocks.map((block, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr_5fr] gap-4 relative">
                        <div className="relative flex items-start">
                            <div className="absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full bg-emerald-500/70 dark:bg-emerald-400/70 ring-4 ring-emerald-500/20 dark:ring-emerald-500/10" />
                            <div className="text-lg tracking-tighttext-zinc-900 dark:text-zinc-100">
                                {block.title}
                            </div>
                        </div>
                        <div className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-base">
                            {block.text}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

EncryptionSection.displayName = "EncryptionSection";
