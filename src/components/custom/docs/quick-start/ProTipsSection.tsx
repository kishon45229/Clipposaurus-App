import React from "react";
import type { DocsSection, ContentData8 } from "@/types/docs";

interface ProTipsSectionProps {
    section: DocsSection & { data: ContentData8 };
}

export const ProTipsSection: React.FC<ProTipsSectionProps> = React.memo(({ section }) => {
    if (section.type !== "tips" || !Array.isArray(section.data)) {
        return null;
    }

    return (
        <section id={section.id} className="space-y-16">
            <div className="space-y-12">
                {(section.data as ContentData8).map((category, index) => {

                    return (
                        <div key={index} className="space-y-6">
                            {/* Header with icon and title */}
                            <div className="flex items-center gap-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                                <h3 className="text-xl text-emerald-500 font-medium tracking-tight">
                                    {category.title}
                                </h3>
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