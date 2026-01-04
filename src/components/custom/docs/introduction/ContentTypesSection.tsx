import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface ContentTypesSectionData {
  title: string;
  items: string[];
}

interface ContentTypesSectionProps {
  section: DocsPageSection;
}

export const ContentTypesSection = React.memo<ContentTypesSectionProps>(({ section }) => {
  if (!section.data || !Array.isArray(section.data)) return null;

  const contentTypes = section.data as ContentTypesSectionData[];

  return (
    <section id={section.id}>
      <div className="grid md:grid-cols-3 gap-6">
        {contentTypes.map((type, index) => (
          <div key={index}>
            <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-500 mb-2">
              {type.title}
            </div>

            <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-700 dark:text-zinc-400">
              {type.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
});

ContentTypesSection.displayName = "ContentTypesSection";
