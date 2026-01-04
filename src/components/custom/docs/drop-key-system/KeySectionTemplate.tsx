import React from "react";
import type { DocsPageSection, ActiveSection } from "@/types/contentData-types/docs-types";
import { DropKeyVisual } from "@/components/custom/docs/drop-key-system/DropKeyVisual";
import { Check, X } from "lucide-react";

interface KeySectionData {
    name: string;
    word: string;
    can: string[];
    cannot: string[];
}

interface KeySectionTemplateProps {
    section: DocsPageSection;
    activeSection: ActiveSection;
}

export const KeySectionTemplate = React.memo<KeySectionTemplateProps>(({ section, activeSection }) => {
    if (!section.data || !(typeof section.data === "object") || !activeSection) return null;

    const items = (section.data as unknown) as KeySectionData;

    return (
        <section id={section.id} className="space-y-10">
            <DropKeyVisual activeSection={activeSection} />

            <div className="mt-10 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                <div className="grid grid-cols-2 bg-zinc-100 dark:bg-zinc-900/40">
                    <div className="px-4 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        What It Can Do
                    </div>
                    <div className="px-4 py-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        What It Cannot Do
                    </div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-zinc-200 dark:divide-zinc-800">
                    <div className="p-4 space-y-4">
                        {items.can.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <span className="text-emerald-500 dark:text-emerald-400 mt-1"><Check /></span>
                                <span className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 space-y-4 bg-zinc-50 dark:bg-zinc-900/20">
                        {items.cannot.map((item, idx) => (
                            <div key={idx} className="flex items-start justify-start gap-3">
                                <span className="text-emerald-500 dark:text-emerald-400"><X /></span>
                                <span className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
});

KeySectionTemplate.displayName = "KeySectionTemplate";