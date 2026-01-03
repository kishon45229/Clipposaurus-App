import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsPageSection } from "@/types/contentData-types/docs-types";
import { EncryptionSectionTemplate } from "@/components/custom/docs/encryption/EncryptionSectionTemplate";
import { LocalEncryptionSection } from "@/components/custom/docs/encryption/LocalEncryptionSection";
import { LocalDecryptionSection } from "@/components/custom/docs/encryption/LocalDecryptionSection";
import { CTASection } from "@/components/custom/docs/CTASection";
import { SectionHeadline } from "@/components/custom/docs/SectionHeadline";
import { PageHelpful } from "@/components/custom/docs/PageHelpful";

export const EncryptionContainer = React.memo(() => {
    const { currentPage } = useDocs();

    if (!currentPage || !currentPage.sections) {
        return null;
    }

    const { sections } = currentPage as DocsPage & { sections: DocsPageSection[] };

    return (

        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.id) {
                    case "key-derivation":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <EncryptionSectionTemplate key={section.id} section={section as DocsPageSection} />
                            </div>);
                    case "aes":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <EncryptionSectionTemplate key={section.id} section={section as DocsPageSection} />
                            </div>);
                    case "local-encryption":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <LocalEncryptionSection key={section.id} section={section as DocsPageSection} />
                            </div>);
                    case "local-decryption":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <LocalDecryptionSection key={section.id} section={section as DocsPageSection} />
                            </div>);
                    case "cta":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsPageSection} />
                                <CTASection section={section as DocsPageSection} />
                                <PageHelpful />
                            </div>);
                    default:
                        return null;
                }
            })}
        </div>
    );
});

EncryptionContainer.displayName = "EncryptionContainer";