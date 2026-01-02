import React from "react";
import type { DocsSection, ContentData25 } from "@/types/docs.d";

interface NoBackupsSectionProps {
    section: DocsSection & { data: ContentData25 };
}

export const NoBackupsSection = React.memo<NoBackupsSectionProps>(({ section }) => {
    const data = section.data as ContentData25;
    if (!data) return null;

    const { items, analogy } = data as ContentData25;

    return (
        <section id={section.id} className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-16 max-w-4xl">
                {items.map((item, index) => (
                    <div key={index} className="relative space-y-2">
                        <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-500">
                            {item.label}
                        </div>

                        <div className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-xl p-6 md:p-8 bg-gradient-to-r from-emerald-50 to-zinc-100 dark:from-emerald-950/20 dark:to-zinc-900 border border-emerald-200/40 dark:border-emerald-800/30">
                <div className="text-base font-semibold text-zinc-900 dark:text-zinc-300 mb-3">
                    Please note:
                </div>
                <div className="text-sm md:text-base text-zinc-700 dark:text-zinc-400 leading-relaxed">
                    {analogy}
                </div>
            </div>
        </section>
    );
});

NoBackupsSection.displayName = "NoBackupsSection";
