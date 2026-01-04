"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsPageSection } from "@/types/contentData-types/docs-types";
import { ComparisonSection } from "@/components/custom/docs/introduction/ComparisonSection";
import { DesignSection } from "@/components/custom/docs/introduction/DesignSection";
import { ContentTypesSection } from "@/components/custom/docs/introduction/ContentTypesSection";
import { PrivacySection } from "@/components/custom/docs/introduction/PrivacySection";
import { PlatformSection } from "@/components/custom/docs/introduction/PlatformSection";
import { UseCaseSection } from "@/components/custom/docs/UseCaseSection";
import { CTASection } from "@/components/custom/docs/CTASection";
import { SectionHeadline } from "@/components/custom/docs/SectionHeadline";
import { PageHelpful } from "@/components/custom/docs/PageHelpful";

export const IntroductionContainer = React.memo(() => {
  const { currentPage } = useDocs();

  if (!currentPage || !currentPage.sections) {
    return null;
  }

  const { sections } = currentPage as DocsPage & { sections: DocsPageSection[] };

  return (
    <div className="space-y-16">
      {sections.map((section) => {
        switch (section.id) {
          case "comparison":
            return (
              <div key={section.id} className="space-y-8">
                <SectionHeadline section={section as DocsPageSection} />
                <ComparisonSection section={section as DocsPageSection} />
              </div>);
          case "design":
            return (
              <div key={section.id} className="space-y-8">
                <SectionHeadline section={section as DocsPageSection} />
                <DesignSection section={section as DocsPageSection} />
              </div>);
          case "content-types":
            return (
              <div key={section.id} className="space-y-8">
                <SectionHeadline section={section as DocsPageSection} />
                <ContentTypesSection section={section as DocsPageSection} />
              </div>);
          case "privacy":
            return (
              <div key={section.id} className="space-y-8">
                <SectionHeadline section={section as DocsPageSection} />
                <PrivacySection section={section as DocsPageSection} />
              </div>
            )
          case "cross-platform":
            return (
              <div key={section.id} className="space-y-8">
                <SectionHeadline section={section as DocsPageSection} />
                <PlatformSection section={section as DocsPageSection} />
              </div>
            );
          case "use-cases":
            return (
              <div key={section.id} className="space-y-8">
                <SectionHeadline section={section as DocsPageSection} />
                <UseCaseSection section={section as DocsPageSection} />
              </div>
            );
          case "cta":
            return (
              <div key={section.id} className="space-y-8">
                <SectionHeadline section={section as DocsPageSection} />
                <CTASection section={section as DocsPageSection} />
                <PageHelpful />
              </div>
            )
          default:
            return null;
        }
      })}
    </div>
  );
});

IntroductionContainer.displayName = 'IntroductionContainer';
