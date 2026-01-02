"use client";

import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsSection, ContentData1, ContentData2, ContentData3, ContentData4, ContentData5, ContentData6, ContentData9 } from "@/types/docs";
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

  const { sections } = currentPage as DocsPage & { sections: DocsSection[] } & { data: ContentData1 | ContentData2 | ContentData3 | ContentData4 | ContentData5 | ContentData6 | ContentData9 };

  return (
    <div className="space-y-16">
      {sections.map((section) => {
        switch (section.type) {
          case "comparison":
            return (
              <div key={section.id} className="space-y-8">
                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                <ComparisonSection section={section as DocsSection & { data: ContentData1 }} />
              </div>);
          case "design":
            return (
              <div key={section.id} className="space-y-8">
                <SectionHeadline section={section as DocsSection & { data: ContentData2 }} />
                <DesignSection section={section as DocsSection & { data: ContentData2 }} />
              </div>);
          case "content-types":
            return (
              <div key={section.id} className="space-y-8">
                <SectionHeadline section={section as DocsSection & { data: ContentData3 }} />
                <ContentTypesSection section={section as DocsSection & { data: ContentData3 }} />
              </div>);
          case "privacy":
            return (
              <div key={section.id} className="space-y-8">
                <SectionHeadline section={section as DocsSection & { data: ContentData4 }} />
                <PrivacySection section={section as DocsSection & { data: ContentData4 }} />
              </div>
            )
          case "platform":
            return (
              <div key={section.id} className="space-y-8">
                <SectionHeadline section={section as DocsSection & { data: ContentData5 }} />
                <PlatformSection section={section as DocsSection & { data: ContentData5 }} />
              </div>
            );
          case "use-cases":
            return (
              <div key={section.id} className="space-y-8">
                <SectionHeadline section={section as DocsSection & { data: ContentData6 }} />
                <UseCaseSection section={section as DocsSection & { data: ContentData6 }} />
              </div>
            );
          case "cta":
            return (
              <div key={section.id} className="space-y-8">
                <SectionHeadline section={section as DocsSection & { data: ContentData9 }} />
                <CTASection section={section as DocsSection & { data: ContentData9 }} />
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
