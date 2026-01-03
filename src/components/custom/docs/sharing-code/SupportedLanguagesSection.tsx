import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";
import { useDocsManager } from "@/hooks/useDocsManager";

interface SupportedLanguagesSectionProps {
    section: DocsPageSection;
}

export const SupportedLanguagesSection = React.memo<SupportedLanguagesSectionProps>(
    ({ section }) => {
        const { languageStyles } = useDocsManager();

        if (languageStyles.length === 0) return null;

        return (
            <section id={section.id} className="select-none">
                <div className="relative w-full px-4 mx-auto flex flex-wrap justify-center items-center content-start leading-[1.2] gap-[1.2rem]">
                    {languageStyles.map((style, index) => {
                        return (
                            <span
                                key={index}
                                className={`
                                    inline-block font-semibold whitespace-nowrap
                                    transition-all duration-200
                                    hover:scale-110 hover:text-emerald-600 dark:hover:text-emerald-400
                                    text-zinc-700 dark:text-zinc-300
                                    text-[${style.fontSize}rem] opacity-[${style.opacity}] leading-none
                                    ${style.emerald ? "text-emerald-600 dark:text-emerald-400" : ""}
                                `}
                            >
                                {style.lang}
                            </span>
                        );
                    })}
                </div>
            </section>
        );
    }
);

SupportedLanguagesSection.displayName = "SupportedLanguagesSection";