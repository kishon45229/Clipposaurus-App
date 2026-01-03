import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface ExpirationDeletionOptionsSectionData {
    label: string;
    text: string;
}

interface ExpirationDeletionOptionsSectionProps {
    section: DocsPageSection;
}

export const ExpirationDeletionOptionsSection = React.memo<ExpirationDeletionOptionsSectionProps>(({ section }) => {
    if (!section.data || !(Array.isArray(section.data))) return null;

    const items = section.data as ExpirationDeletionOptionsSectionData[];

    return (
        <section id={section.id}>
            {/* Desktop: Horizontal Timeline */}
            <div className="hidden md:block">
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300 dark:from-emerald-600 dark:via-emerald-500 dark:to-emerald-400" />

                    <div className="grid grid-cols-3 gap-8">
                        {items.map((item, index) => {
                            return (
                                <div key={index} className="relative">
                                    {/* Icon Circle */}
                                    <div className="flex justify-center mb-6">
                                        <div className="relative flex items-center justify-center w-fit h-12 px-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 border-4 border-emerald-500 shadow-lg">
                                            {item.label}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="text-base text-center text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {item.text}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile: Vertical Stack */}
            <div className="md:hidden space-y-6">
                {items.map((item, index) => {
                    return (
                        <div key={index} className="relative">
                            <div className="flex gap-4">
                                {/* Icon */}
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border-3 border-emerald-500 flex items-center justify-center text-sm font-semibold">
                                        {index + 1}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                                        {item.label}
                                    </div>
                                    <div className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {item.text}
                                    </div>
                                </div>
                            </div>

                            {/* Connector line for mobile (except last item) */}
                            {index < items.length - 1 && (
                                <div className="absolute left-4 top-8 w-0.5 h-6 bg-gradient-to-b from-emerald-500 to-emerald-300 dark:from-emerald-600 dark:to-emerald-400" />
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    )
});

ExpirationDeletionOptionsSection.displayName = "ExpirationDeletionOptionsSection";