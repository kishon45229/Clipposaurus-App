import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface UseCaseSectionData {
  title: string;
  quote: string;
}

interface UseCaseSectionProps {
  section: DocsPageSection;
}

export const UseCaseSection = React.memo<UseCaseSectionProps>(({ section }) => {
  if (!section || !(Array.isArray(section.data))) return null;

  const data = section.data as UseCaseSectionData[];

  return (
    <section id={section.id}>
      <div className="space-y-6">
        {data.map((usecase, index) => (
          <div key={index} className="border-l-2 border-zinc-700 pl-6">
            <div className="text-lg font-semibold text-emerald-500 mb-2">
              {usecase.title}
            </div>
            <div className="text-zinc-400 text-base md:text-base italic ">
              &ldquo;{usecase.quote}&rdquo;
            </div>
          </div>
        )
        )}
      </div>
    </section>
  );
});

UseCaseSection.displayName = "UseCaseSection";