import React from "react";
import type { ActiveSection } from "@/types/docs";
import { useDocsComponent } from "@/contexts/ComponentDataContext";

interface DropKeyVisualProps {
    activeSection: ActiveSection;
    combined?: boolean;
}

export const DropKeyVisual = React.memo<DropKeyVisualProps>(({ activeSection, combined = false }) => {
    const { data: docsData } = useDocsComponent();

    // Get words and labels from DocsComponent.json
    const getDropKeyData = () => {
        if (!docsData) {
            // Fallback to hardcoded values if data not loaded
            return {
                words: {
                    identifier: "apple",
                    "system-secret": "beer",
                    "user-secret": "ocean"
                },
                labels: {
                    identifier: { name: "Identifier", type: "Public" },
                    "system-secret": { name: "System Secret", type: "Auto-generated" },
                    "user-secret": { name: "User Secret", type: "User-chosen" }
                }
            };
        }

        const dropKeyPage = docsData.pages.find(page => page.id === "drop-key-system");
        if (!dropKeyPage) return null;

        const words: Record<string, string> = {};
        const labels: Record<string, { name: string; type: string }> = {};

        dropKeyPage.sections.forEach(section => {
            if (section.data && typeof section.data === 'object' && 'word' in section.data) {
                const sectionData = section.data as { name: string; type: string; word: string };
                words[section.id] = sectionData.word;
                labels[section.id] = { name: sectionData.name, type: sectionData.type };
            }
        });

        return { words, labels };
    };

    const dropKeyData = getDropKeyData();
    if (!dropKeyData) return null;

    const { words, labels } = dropKeyData;

    const getWordStyle = (section: keyof typeof words) => {
        const isActive = combined || activeSection === section;
        return `font-mono transition-all duration-300 leading-none ${isActive
            ? "text-3xl font-bold text-emerald-600 dark:text-emerald-400 scale-110"
            : "text-2xl text-zinc-500 dark:text-zinc-400 opacity-60"
            }`;
    };

    const getLabelStyle = (section: keyof typeof words) => {
        const isActive = combined || activeSection === section;
        return `flex flex-col items-center transition-all duration-300 ${isActive ? "opacity-100" : "opacity-50"
            }`;
    };

    const getIndicatorStyle = (section: keyof typeof words) => {
        const isActive = combined || activeSection === section;
        return `h-4 w-px mb-2 transition-all duration-300 ${isActive
            ? "bg-emerald-500 scale-110"
            : "bg-zinc-400"
            }`;
    };

    return (
        <div className="text-center">
            {/* Drop Key Display */}
            <div className="inline-flex items-baseline gap-3 px-8 py-6 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/60 backdrop-blur-lg shadow-lg">

                {/* Identifier (Word 1) */}
                <span className={getWordStyle("identifier")}>
                    {words.identifier}
                </span>

                <span className="text-zinc-400 text-xl leading-none">-</span>

                {/* System Secret (Word 2) */}
                <span className={getWordStyle("system-secret")}>
                    {words["system-secret"]}
                </span>

                <span className="text-zinc-400 text-xl leading-none">-</span>

                {/* User Secret (Word 3) */}
                <span className={getWordStyle("user-secret")}>
                    {words["user-secret"]}
                </span>
            </div>

            {/* Labels */}
            <div className="mt-6 flex justify-center gap-12 text-sm text-zinc-600 dark:text-zinc-400">
                <div className={getLabelStyle("identifier")}>
                    <span className={getIndicatorStyle("identifier")}></span>
                    <span className="font-medium">{labels.identifier?.name}</span>
                    <span className="text-xs opacity-75 mt-1">{labels.identifier?.type}</span>
                </div>
                <div className={getLabelStyle("system-secret")}>
                    <span className={getIndicatorStyle("system-secret")}></span>
                    <span className="font-medium">{labels["system-secret"]?.name}</span>
                    <span className="text-xs opacity-75 mt-1">{labels["system-secret"]?.type}</span>
                </div>
                <div className={getLabelStyle("user-secret")}>
                    <span className={getIndicatorStyle("user-secret")}></span>
                    <span className="font-medium">{labels["user-secret"]?.name}</span>
                    <span className="text-xs opacity-75 mt-1">{labels["user-secret"]?.type}</span>
                </div>
            </div>
        </div>
    );
});

DropKeyVisual.displayName = "DropKeyVisual";