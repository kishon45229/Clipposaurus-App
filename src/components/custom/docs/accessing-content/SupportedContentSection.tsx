"use client";

import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface SupportedContentSectionProps {
    section: DocsPageSection;
}

export const SupportedContentSection = React.memo<SupportedContentSectionProps>(({ section }) => {
    if (section.type !== "comparison" || !section.data || typeof section.data !== "object") {
        return null;
    }

    const data = section.data as { headers: string[]; rows: string[][] };

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

            <div className="overflow-x-auto">
                <div className="min-w-full border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
                            <tr>
                                {data.headers?.map((header, index) => (
                                    <th key={index} className="px-6 py-4 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-zinc-900">
                            {data.rows?.map((row, index) => (
                                <tr key={index} className="border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="px-6 py-4 text-sm text-zinc-700 dark:text-zinc-300">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
});

SupportedContentSection.displayName = "SupportedContentSection";