import React from "react";
import type { DocsSection } from "@/types/docs";
import { DropKeyVisual } from "./DropKeyVisual";

interface CombinedKeyData {
    format: string;
    properties: string[];
}

interface CombinedKeySectionProps {
    section: DocsSection & { data: CombinedKeyData };
}

export const CompleteKeySection = React.memo<CombinedKeySectionProps>(({ section }) => {
    const { data } = section;

    if (!data) return null;

    return (
        <section id={section.id} className="space-y-10">
            {/* Drop Key Visual showing all three words equally */}
            <DropKeyVisual activeSection="identifier" combined={true} />

            {/* Properties List */}
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.properties.map((property: string, index: number) => (
                        <article
                            key={index}
                            className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 p-5 shadow-sm"
                        >
                            <div
                                className="absolute inset-0 bg-gradient-to-b from-emerald-200/50 via-transparent to-transparent -z-10"
                                aria-hidden
                            />
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden />
                            </div>
                            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                {property}
                            </p>
                        </article>
                    ))}
                </div>
            </div>

            {/* Security Notice */}
            <div className="p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <div className="flex items-start gap-3">
                    <div className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                            Critical Security Notice
                        </h4>
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                            The complete drop key is the ONLY way to access your content. If any word is lost or forgotten,
                            your data becomes permanently inaccessible. There is no recovery mechanism by design.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
});

CompleteKeySection.displayName = "CompleteKeySection";