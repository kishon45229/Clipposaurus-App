"use client";

import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface AccessFeaturesSectionProps {
    section: DocsPageSection;
}

export const AccessFeaturesSection = React.memo<AccessFeaturesSectionProps>(({ section }) => {
    if (section.type !== "content-types" || !Array.isArray(section.data)) {
        return null;
    }

    return (
        <section id={section.id} className="space-y-6">
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

            <div className="grid md:grid-cols-3 gap-6">
                {section.data.map((feature, index) => (
                    <div key={index} className="space-y-3 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-zinc-800 hover:shadow-lg transition-all duration-200">
                        <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            {feature.title}
                        </div>
                        <ul className="space-y-2">
                            {feature.items?.map((item: string, i: number) => (
                                <li key={i} className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 shrink-0"></div>
                                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
});

AccessFeaturesSection.displayName = "AccessFeaturesSection";