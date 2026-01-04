import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface PlatformSectionProps {
  section: DocsPageSection;
}

export const PlatformSection = React.memo<PlatformSectionProps>(({ section }) => {
  if (!section.data || !(typeof section.data === "object")) return null;

  const platformEntries = Object.entries(section.data) as [string, string[]][];

  return (
    <section id={section.id}>
      <div className="space-y-4">
        {platformEntries.map(([platform, devices], index) => (
          <div key={index} className="flex items-baseline gap-4">
            <span className="text-sm md:text-base font-bold text-zinc-600 dark:text-emerald-500 min-w-[100px]">
              {platform}:
            </span>
            <span className="text-zinc-400 text-sm md:text-base">{devices.join(", ")}</span>
          </div>
        ))}
      </div>
    </section>
  );
});

PlatformSection.displayName = "PlatformSection";
