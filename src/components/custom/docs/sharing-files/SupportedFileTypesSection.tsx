import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface SupportedFileTypesSectionData {
    headers: string[];
    rows: string[][];
}

interface SupportedFileTypesSectionProps {
    section: DocsPageSection;
}

export const SupportedFileTypesSection = React.memo<SupportedFileTypesSectionProps>(({ section }) => {
    if (!section.data || typeof section.data !== "object") return null;

    const { headers, rows } = section.data as SupportedFileTypesSectionData;

    return (
        <section id={section.id}>
            <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-zinc-50 dark:bg-zinc-800">
                            <tr>
                                {headers.map((header: string, index: number) => (
                                    <th key={index} className="px-6 py-4 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
                            {rows.map((row: string[], index: number) => (
                                <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors duration-150">
                                    {row.map((cell: string, cellIndex: number) => (
                                        <td key={cellIndex} className={`px-6 py-4 text-sm ${cellIndex === 0
                                            ? "font-medium text-zinc-900 dark:text-zinc-100"
                                            : "text-zinc-700 dark:text-zinc-300 font-mono text-xs"
                                            }`}>
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

SupportedFileTypesSection.displayName = "SupportedFileTypesSection";