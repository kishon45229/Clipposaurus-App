"use client";

import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";
import { Monitor, Smartphone, Globe, WifiOff } from "lucide-react";

interface MultiDeviceAccessSectionProps {
    section: DocsPageSection;
}

const platformIcons = {
    "Desktop Access": Monitor,
    "Mobile Access": Smartphone,
    "Cross-Browser": Globe,
    "Offline Capability": WifiOff,
};

export const MultiDeviceAccessSection = React.memo<MultiDeviceAccessSectionProps>(({ section }) => {
    if (section.type !== "platform" || !section.data || typeof section.data !== "object") {
        return null;
    }

    const data = section.data as { platforms: Record<string, string> };

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
                {Object.entries(data.platforms || {}).map(([platform, description]) => {
                    const IconComponent = platformIcons[platform as keyof typeof platformIcons] || Monitor;
                    return (
                        <div key={platform} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-zinc-800 hover:shadow-lg transition-all duration-200">
                            <div className="flex items-start space-x-4">
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg shrink-0">
                                    <IconComponent className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                        {platform}
                                    </div>
                                    <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        {description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
});

MultiDeviceAccessSection.displayName = "MultiDeviceAccessSection";