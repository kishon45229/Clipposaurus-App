"use client";

import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";
import { Users, GraduationCap, Palette, Shield } from "lucide-react";

interface AccessScenariosSectionProps {
    section: DocsPageSection;
}

const scenarioIcons = [Users, GraduationCap, Palette, Shield];

export const AccessScenariosSection = React.memo<AccessScenariosSectionProps>(({ section }) => {
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
                {section.data.map((scenario, index) => {
                    const IconComponent = scenarioIcons[index] || Users;
                    return (
                        <div key={index} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-zinc-800 hover:shadow-lg transition-all duration-200">
                            <div className="flex items-start space-x-4">
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                                    <IconComponent className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                        {scenario.title}
                                    </div>
                                    <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                        {scenario.quote}
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

AccessScenariosSection.displayName = "AccessScenariosSection";