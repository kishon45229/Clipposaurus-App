"use client";

import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";
import { Shield, MessageSquare, Clock, Code, CheckCircle } from "lucide-react";

interface CodeBestPracticesSectionProps {
    section: DocsPageSection;
}

const getIcon = (iconName: string) => {
    switch (iconName) {
        case "Shield":
            return Shield;
        case "MessageSquare":
            return MessageSquare;
        case "Clock":
            return Clock;
        case "Code":
            return Code;
        case "CheckCircle":
            return CheckCircle;
        default:
            return Code;
    }
};

export const CodeBestPracticesSection = React.memo<CodeBestPracticesSectionProps>(({ section }) => {
    if (section.type !== "design" || !Array.isArray(section.data)) {
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.data.map((practice, index) => {
                    const IconComponent = getIcon(practice.icon);
                    return (
                        <div key={index} className="space-y-4 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800 hover:shadow-lg transition-all duration-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <IconComponent className="w-5 h-5 text-primary" />
                                </div>
                                <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                    {practice.title}
                                </div>
                            </div>

                            <div className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                {practice.description}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
});

CodeBestPracticesSection.displayName = "CodeBestPracticesSection";