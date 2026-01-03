"use client";

import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";
import { Monitor, Smartphone, Globe, Code } from "lucide-react";

interface CodeMultiDeviceSectionProps {
    section: DocsPageSection;
}

const getPlatformIcon = (title: string) => {
    if (title.includes("Desktop")) return Monitor;
    if (title.includes("Mobile")) return Smartphone;
    if (title.includes("Cross-Platform")) return Globe;
    return Code;
};

export const CodeMultiDeviceSection = React.memo<CodeMultiDeviceSectionProps>(({ section }) => {
    if (section.type !== "platform" || !section.data?.platforms) {
        return null;
    }

    const { platforms } = section.data;

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
                {Object.entries(platforms).map(([title, description], index) => {
                    const IconComponent = getPlatformIcon(title);
                    return (
                        <div key={index} className="flex items-start space-x-4 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800 hover:shadow-lg transition-all duration-200">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                <IconComponent className="w-6 h-6 text-primary" />
                            </div>

                            <div className="space-y-2">
                                <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                    {title}
                                </div>
                                <div className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                    {String(description)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
});

CodeMultiDeviceSection.displayName = "CodeMultiDeviceSection";