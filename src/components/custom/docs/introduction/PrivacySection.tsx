import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";
import { X, Check } from "lucide-react";

interface PrivacySectionData {
  title: string;
  icon: string;
  items: string[];
}

interface PrivacySectionProps {
  section: DocsPageSection;
}

export const PrivacySection = React.memo<PrivacySectionProps>(({ section }) => {
  if (!section.data || !Array.isArray(section.data)) return null;

  const privacyData = section.data as PrivacySectionData[];

  return (
    <section id={section.id}>
      <div className="grid md:grid-cols-2 gap-8">
        {privacyData.map((panel, index) => (
          <div key={index} className="space-y-3 border-l border-dashed border-zinc-300 dark:border-zinc-700 pl-4">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex h-5 w-5 items-center justify-center text-xs ${panel.icon === "x"
                  ? "text-red-500 dark:text-red-400"
                  : "text-emerald-500 dark:text-emerald-400"
                  }`}
              >
                {panel.icon === "x" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
              </span>
              <div className={`text-base md:text-lg font-semibold ${index === 1 ? "text-emerald-600 dark:text-emerald-500" : "text-zinc-900 dark:text-zinc-100"}`}>
                {panel.title}
              </div>
            </div>

            <ul className="space-y-1.5">
              {panel.items.map((item: string, itemIdx: number) => (
                <li
                  key={itemIdx}
                  className="text-sm md:text-[0.95rem] text-zinc-700 dark:text-zinc-300 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
});

PrivacySection.displayName = "PrivacySection";