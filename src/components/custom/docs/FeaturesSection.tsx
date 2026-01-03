import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface FeaturesSectionData {
    title: string;
    items: string[];
}

interface FeaturesSectionProps {
    section: DocsPageSection;
}

export const FeaturesSection = React.memo<FeaturesSectionProps>(({ section }) => {
    if (!section.data || !Array.isArray(section.data)) return null;

    const features = section.data as FeaturesSectionData[];

    return (
        <section id={section.id}>
            <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div key={index} className="space-y-3 p-6 border-e border-zinc-200 dark:border-zinc-800">
                        <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-500">
                            {feature.title}
                        </div>
                        <ul className="space-y-2">
                            {feature.items.map((item, i) => (
                                <li key={i} className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                                    <span className="text-base text-zinc-700 dark:text-zinc-400">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
});

FeaturesSection.displayName = "FeaturesSection";