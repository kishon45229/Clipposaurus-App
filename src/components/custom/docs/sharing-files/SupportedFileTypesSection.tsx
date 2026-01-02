import React from "react";
import type { DocsSection, ContentData1 } from "@/types/docs";

interface SupportedFileTypesSectionProps {
    section: DocsSection & { data: ContentData1 };
}

export const SupportedFileTypesSection: React.FC<SupportedFileTypesSectionProps> = React.memo(({ section }) => {
    const data = section.data as ContentData1;
    if (!data) return null;

    const { headers, rows } = data;

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