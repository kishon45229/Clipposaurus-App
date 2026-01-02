"use client";

import React from "react";
import { DocsSection } from "@/types/docs";

interface CodeUseCasesSectionProps {
    section: DocsSection;
}

export const CodeUseCasesSection: React.FC<CodeUseCasesSectionProps> = React.memo(({ section }) => {
    if (section.type !== "testimonials" || !Array.isArray(section.data)) {
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

            <div className="grid md:grid-cols-2 gap-6">
                {section.data.map((useCase, index) => (
                    <div key={index} className="relative p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800 hover:shadow-lg transition-all duration-200">
                        {/* Code icon */}
                        <div className="absolute top-4 right-4 text-primary/20 text-2xl">
                            {"</>"}
                        </div>

                        <div className="space-y-4">
                            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {useCase.title}
                            </div>

                            <div className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                                "{useCase.quote}"
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

CodeUseCasesSection.displayName = "CodeUseCasesSection";