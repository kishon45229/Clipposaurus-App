import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface ProTipsSectionData {
    title: string;
    items: string[];
}

interface ProTipsSectionProps {
    section: DocsPageSection;
}

export const ProTipsSection = React.memo<ProTipsSectionProps>(({ section }) => {
    if (section.type !== "tips" || !Array.isArray(section.data)) return null;

    const categories = section.data as ProTipsSectionData[];

    return (
        <section id={section.id} className="space-y-16">
            <div className="space-y-12">
                {categories.map((category, index) => {

                    return (
                        <div key={index} className="space-y-6">
                            <div className="flex items-center gap-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                                <div className="text-xl text-emerald-500 font-medium tracking-tight">
                                    {category.title}
                                </div>
                            </div>

                            {/* Items list */}
                            <ul className="space-y-4 pl-9">
                                {category.items.map((item, itemIndex) => (
                                    <li
                                        key={itemIndex}
                                        className="relative text-[15px] leading-relaxed opacity-80 before:content-['—'] before:absolute before:-left-5 before:top-0"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </section>
    );
});

ProTipsSection.displayName = "ProTipsSection";