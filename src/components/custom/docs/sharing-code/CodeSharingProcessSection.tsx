"use client";

import React from "react";
import { DocsSection } from "@/types/docs";

interface CodeSharingProcessSectionProps {
    section: DocsSection;
}

export const CodeSharingProcessSection: React.FC<CodeSharingProcessSectionProps> = React.memo(({ section }) => {
    if (section.type !== "sharing" || !Array.isArray(section.data)) {
        return null;
    }

    return (
        <section id={section.id} className="space-y-8">
            <div className="space-y-4">
                <div className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {section.title}
                </div>
                {section.description && (
                    <div className="text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {section.description}
                    </div>
                )}
            </div>

            <div className="space-y-12">
                {section.data.map((step, index) => (
                    <div key={index} className="relative">
                        {/* Step number indicator */}
                        <div className="flex items-start space-x-6">
                            <div className="relative z-10 shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center border-4 border-white dark:border-zinc-900">
                                <span className="text-white font-bold text-lg">{index + 1}</span>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                                    {step.title}
                                </div>

                                <div className="space-y-3">
                                    {step.items?.map((item: string, i: number) => (
                                        <div key={i} className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                                            <div className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                                {item.split('**').map((part, partIndex) =>
                                                    partIndex % 2 === 0 ? (
                                                        <span key={partIndex}>{part}</span>
                                                    ) : (
                                                        <strong key={partIndex} className="font-semibold text-zinc-900 dark:text-zinc-100">{part}</strong>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {step.screenshot && (
                                    <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                            💻 Screenshot: {step.screenshot}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Connecting line */}
                        {index < section.data.length - 1 && (
                            <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-700 -z-10"></div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
});

CodeSharingProcessSection.displayName = "CodeSharingProcessSection";