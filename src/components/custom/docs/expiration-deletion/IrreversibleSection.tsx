import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface IrreversibleSectionData {
    label: string;
    text: string;
}

interface IrreversibleSectionProps {
    section: DocsPageSection;
}

export const IrreversibleSection = React.memo<IrreversibleSectionProps>(({ section }) => {
    if (!section.data || !Array.isArray(section.data)) return null;

    const items = section.data as IrreversibleSectionData[];

    return (
        <section id={section.id}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2px_4fr] gap-y-10 gap-x-8">

                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="text-base md:text-right text-zinc-900 dark:text-zinc-100 font-medium">
                            {item.label}
                        </div>

                        <div className="hidden md:block w-1 bg-emerald-400/40" />

                        <div className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {item.text}
                        </div>
                    </React.Fragment>
                ))}

            </div>
        </section>
    );
});

IrreversibleSection.displayName = "IrreversibleSection";
