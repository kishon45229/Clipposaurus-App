import React from "react";
import type { DocsSection, ContentData5 } from "@/types/docs";

interface PlatformSectionProps {
  section: DocsSection & { data: ContentData5 };
}

export const PlatformSection = React.memo<PlatformSectionProps>(({ section }) => {
  const platformEntries = Object.entries(section.data) as [string, string[]][];

  return (
    <section id={section.id}>
      <div className="space-y-4">
        {platformEntries.map(([platform, devices], idx) => (
          <div key={idx} className="flex items-baseline gap-4">
            <span className="text-sm md:text-base font-bold text-zinc-300 min-w-[100px]">
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
