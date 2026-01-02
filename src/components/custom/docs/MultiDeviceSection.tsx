import React from "react";
import type { DocsSection, ContentData24 } from "@/types/docs";

interface MultiDeviceSectionProps {
    section: DocsSection;
}

export const MultiDeviceSection: React.FC<MultiDeviceSectionProps> = React.memo(({ section }) => {
    const data = section.data as ContentData24;
    if (!data) return null;

    return (
        <section id={section.id} className="py-10">
            <div className="grid md:grid-cols-2 gap-10">

                {data.map((platform, index) => (
                    <div key={index} className="space-y-2 relative">
                        <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            {platform.label}
                        </div>

                        <div className="w-12 h-0.5 bg-emerald-500/60 rounded-full mb-2" />

                        <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {platform.text}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

MultiDeviceSection.displayName = "MultiDeviceSection";
