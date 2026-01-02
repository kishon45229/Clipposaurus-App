import React from "react";
import type { DocsSection, ContentData19 } from "@/types/docs";
import { NumberedSteps } from "./NumberedSteps";
import { Check, X } from "lucide-react";

interface LocalEncryptionSectionProps {
    section: DocsSection & { data: ContentData19 };
}

export const LocalEncryptionSection = React.memo<LocalEncryptionSectionProps>(({ section }) => {
    const data = section.data as ContentData19;
    if (!data) return null;

    const { flow, weReceive, weNeverReceive } = data;

    const DataSection = ({ title, items, icon: Icon, bulletColor }: {
        title: string;
        items: string[];
        icon: React.ComponentType<{ className?: string }>;
        bulletColor: string;
    }) => (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-300">
                    {title}
                </div>
            </div>

            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index} className="relative pl-6">
                        <div className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full ${bulletColor}`} />
                        <span className="text-sm md:text-base text-zinc-700 dark:text-zinc-400">
                            {item}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <section id={section.id} className="space-y-16">
            <NumberedSteps title={flow.title} items={flow.items} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <DataSection
                    title={weReceive.title}
                    items={weReceive.items}
                    icon={Check}
                    bulletColor="bg-emerald-500"
                />

                <DataSection
                    title={weNeverReceive.title}
                    items={weNeverReceive.items}
                    icon={X}
                    bulletColor="bg-zinc-500 dark:bg-zinc-400"
                />
            </div>
        </section>
    );
});

LocalEncryptionSection.displayName = "LocalEncryptionSection";
