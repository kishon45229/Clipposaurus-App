import React from "react";
import { DocsSection, ContentData4 } from "@/types/docs";
import { X, Check } from "lucide-react";

interface PrivacySectionProps {
  section: DocsSection & { data: ContentData4 };
}

export const PrivacySection = React.memo<PrivacySectionProps>(({ section }) => {
  const privacyData = section.data as ContentData4;

  return (
    <section id={section.id}>
      <div className="grid md:grid-cols-2 gap-8">
        {privacyData.map((panel, panelIdx) => (
          <div key={panelIdx} className="space-y-3 border-l border-dashed border-zinc-300 dark:border-zinc-700 pl-4">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex h-5 w-5 items-center justify-center text-xs ${
                  panel.icon === "x"
                    ? "text-red-500 dark:text-red-400"
                    : "text-emerald-500 dark:text-emerald-400"
                }`}
              >
                {panel.icon === "x" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
              </span>
              <h3 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {panel.title}
              </h3>
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