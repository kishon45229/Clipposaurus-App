import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";
import { Check, X } from "lucide-react";

interface SharingGuidelinesData {
    recommended: string[];
    avoid: string[];
}

interface SharingGuidelinesSectionProps {
    section: DocsPageSection;
}

export const SharingGuidelinesSection = React.memo<SharingGuidelinesSectionProps>(({ section }) => {
    if (!section.data || !(typeof section.data === "object")) return null;

    const { recommended, avoid } = (section.data as unknown) as SharingGuidelinesData;
    return (
        <section id={section.id} className="space-y-6">
            {/* Guidelines Table */}
            <div className="overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-700">
                            <th className="px-6 py-4 text-lg text-left">
                                <div className="flex items-center gap-3">
                                    <span className="text-emerald-500"><Check /></span>
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-500">
                                        Recommended Channels
                                    </span>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left">
                                <div className="flex items-center gap-3">
                                    <span><X /></span>
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                        Avoid These Channels
                                    </span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Math.max(recommended.length, avoid.length) > 0 &&
                            Array.from({ length: Math.max(recommended.length, avoid.length) }).map((_, index) => (
                                <tr key={index} className="border-b border-zinc-100 dark:border-zinc-800 last:border-b-0">
                                    <td className="px-6 py-4">
                                        {recommended[index] && (
                                            <div className="flex items-start gap-3">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                                                <span className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                                    {recommended[index]}
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {avoid[index] && (
                                            <div className="flex items-start gap-3">
                                                <div className="w-2 h-2 bg-zinc-400 rounded-full mt-2 shrink-0"></div>
                                                <span className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                    {avoid[index]}
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
});

SharingGuidelinesSection.displayName = "SharingGuidelinesSection";