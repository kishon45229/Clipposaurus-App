"use client";

import React from "react";
import { DocsSection } from "@/types/docs";
import { Shield, Wifi, Download, Eye, Lock, LucideIcon } from "lucide-react";

interface AccessTipsSectionProps {
    section: DocsSection;
}

const iconMap: Record<string, LucideIcon> = {
    Shield,
    Wifi,
    Download,
    Eye,
    Lock,
};

export const AccessTipsSection: React.FC<AccessTipsSectionProps> = React.memo(({ section }) => {
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
                {section.data.map((tip, index) => {
                    const IconComponent = iconMap[tip.icon] || Shield;
                    return (
                        <div key={index} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-zinc-800 hover:shadow-lg transition-all duration-200">
                            <div className="flex items-start space-x-4">
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg shrink-0">
                                    <IconComponent className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                        {tip.title}
                                    </div>
                                    <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        {tip.description}
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

AccessTipsSection.displayName = "AccessTipsSection";