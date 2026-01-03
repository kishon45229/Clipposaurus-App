"use client";

import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";
import { Key, Download, Shield, Eye, CheckCircle } from "lucide-react";

interface AccessProcessSectionProps {
    section: DocsPageSection;
}

const stepIcons = [Key, Download, Shield, Eye, CheckCircle];

export const AccessProcessSection = React.memo<AccessProcessSectionProps>(({ section }) => {
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

            <div className="space-y-8">
                {section.data.map((step, index) => {
                    const IconComponent = stepIcons[index] || Key;
                    return (
                        <div key={index} className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="space-y-3 flex-1">
                                <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                                    {step.title}
                                </div>
                                <div className="space-y-2">
                                    {step.items?.map((item: string, i: number) => (
                                        <div key={i} className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
});

AccessProcessSection.displayName = "AccessProcessSection";