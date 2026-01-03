import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface StepsSectionData {
    title: string;
    items: string[];
    screenshot?: string;
}

interface StepsSectionProps {
    section: DocsPageSection;
}

export const StepsSection = React.memo<StepsSectionProps>(({ section }) => {
    if (!section || !Array.isArray(section.data)) return null;
    const steps = section.data as StepsSectionData[];

    return (
        <section id={section.id}>
            <div className="space-y-12">
                {steps.map((step, index) => (
                    <div key={index} className="relative">
                        <div className="flex items-start space-x-6">
                            <div className="relative z-10 shrink-0 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white dark:border-zinc-900">
                                <span className="text-white font-bold text-lg">{index + 1}</span>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-300">
                                    {step.title}
                                </div>

                                <div className="space-y-3">
                                    {step.items?.map((item: string, i: number) => (
                                        <div key={i} className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0" />
                                            <div className="text-base md:text-base text-zinc-700 dark:text-zinc-400 leading-relaxed">
                                                {item.split('**').map((part, partIndex) =>
                                                    partIndex % 2 === 0 ? (
                                                        <span key={partIndex}>{part}</span>
                                                    ) : (
                                                        <strong key={partIndex} className="font-semibold text-zinc-900 dark:text-zinc-400">{part}</strong>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* {step.screenshot && (
                                    <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-2 border-dashed border-emerald-300 dark:border-emerald-600">
                                        <div className="text-emerald-600 dark:text-emerald-400 text-sm">
                                            {step.screenshot}
                                        </div>
                                    </div>
                                )} */}
                            </div>
                        </div>

                        {index < steps.length - 1 && (
                            <div className="absolute left-6 top-12 w-px h-full bg-gradient-to-b from-emerald-500/50 to-transparent" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
});

StepsSection.displayName = "StepsSection";
