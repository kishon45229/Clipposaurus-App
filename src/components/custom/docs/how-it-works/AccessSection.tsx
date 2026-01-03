import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";
import { ArrowDown, ArrowRight } from "lucide-react";

interface AccessModuleData {
    items: string[];
}

interface AccessModuleProps {
    section: DocsPageSection;
}

export const AccessSection = React.memo<AccessModuleProps>(({ section }) => {
    if (!section.data || !Array.isArray(section.data)) return null;

    const { items } = (section.data as unknown) as AccessModuleData;

    return (
        <section id={section.id} className="max-w-none space-y-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6 md:gap-8">
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center text-center w-full gap-3">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-white font-semibold text-sm shadow-[0_0_8px_rgba(16,185,129,0.45)]">
                                {index + 1}
                            </div>
                            <div className="text-zinc-700 dark:text-zinc-300 text-sm md:text-base leading-snug">
                                {item}
                            </div>
                        </div>

                        {index < items.length - 1 && (
                            <>
                                <div className="hidden md:flex text-emerald-500 text-2xl font-semibold select-none">
                                    <ArrowRight />
                                </div>
                                <div className="flex md:hidden justify-center text-emerald-500 text-2xl font-semibold select-none">
                                    <ArrowDown />
                                </div>
                            </>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
});

AccessSection.displayName = "AccessSection";
