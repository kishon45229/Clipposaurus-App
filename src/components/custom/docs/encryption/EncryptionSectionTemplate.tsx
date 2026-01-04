import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";
import { SectionTitle } from "@/components/custom/docs/encryption/SectionTitle";
import { NumberedSteps } from "@/components/custom/docs/encryption/NumberedSteps";

interface EncryptionSectionTemplateData {
    whatIs: {
        title: string;
        items: string[];
    };
    howWeUseIt: {
        title: string;
        items: string[];
    };
    whyItMatters: {
        title: string;
        items: {
            label: string;
            text: string;
        }[];
    };
};

interface EncryptionSectionTemplateProps {
    section: DocsPageSection
};

export const EncryptionSectionTemplate = React.memo<EncryptionSectionTemplateProps>(({ section }) => {
    if (!section.data || !(typeof section.data === "object")) return null;

    const { whatIs, howWeUseIt, whyItMatters } = (section.data as unknown) as EncryptionSectionTemplateData;

    return (
        <section id={section.id} className="space-y-12">
            <div className="space-y-6">
                <SectionTitle title={whatIs.title} />

                {whatIs.items.map((item, index) => (
                    <div key={index} className="text-sm md:text-base text-zinc-800 dark:text-zinc-400 leading-relaxed">
                        {item}
                    </div>
                ))}
            </div>


            <div className="space-y-6">
                <SectionTitle title={howWeUseIt.title} />
                <NumberedSteps items={howWeUseIt.items} />
            </div>

            <div className="space-y-6">
                <SectionTitle title={whyItMatters.title} />

                <div className="space-y-10">
                    {whyItMatters.items.map((item, index) => (
                        <div key={index} className="relative pl-6">
                            <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]"></div>

                            <div className="text-base font-semibold text-zinc-900 dark:text-zinc-300 mb-1">
                                {item.label}
                            </div>

                            <div className="text-sm md:text-base text-zinc-700 dark:text-zinc-400 leading-relaxed">
                                {item.text}
                            </div>

                            {index < whyItMatters.items.length - 1 && (
                                <div className="mt-6 ml-[-1.15rem] h-px w-[calc(100%+1rem)] bg-gradient-to-r from-emerald-300/40 to-transparent dark:from-emerald-700/40"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

EncryptionSectionTemplate.displayName = "EncryptionSectionTemplate";
