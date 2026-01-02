import React from "react";
import { DocsSection, ContentData3 } from "@/types/docs";

interface ContentTypesSectionProps {
  section: DocsSection & { data: ContentData3 };
}

export const ContentTypesSection = React.memo<ContentTypesSectionProps>(({ section }) => {
  const contentTypes = section.data as ContentData3;

  return (
    <section id={section.id}>
      <div className="grid md:grid-cols-3 gap-6">
        {contentTypes.map((type, index) => (
          <div key={index}>
            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-200 mb-2">
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
