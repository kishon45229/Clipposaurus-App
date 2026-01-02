import React from "react";
import { useDocs } from "@/contexts/DocsContext";
import type { DocsPage, DocsSection, ContentData1, ContentData9, ContentData18, ContentData19, ContentData20 } from "@/types/docs.d";
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

    const { sections } = currentPage as DocsPage & { sections: DocsSection[] } & { data: ContentData1 | ContentData9 | ContentData18 | ContentData19 | ContentData20 };

    return (

        <div className="space-y-16">
            {sections.map((section) => {
                switch (section.id) {
                    case "key-derivation":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <EncryptionSectionTemplate key={section.id} section={section as DocsSection & { data: ContentData18 }} />
                            </div>);
                    case "aes":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <EncryptionSectionTemplate key={section.id} section={section as DocsSection & { data: ContentData18 }} />
                            </div>);
                    case "local-encryption":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <LocalEncryptionSection key={section.id} section={section as DocsSection & { data: ContentData19 }} />
                            </div>);
                    case "local-decryption":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData1 }} />
                                <LocalDecryptionSection key={section.id} section={section as DocsSection & { data: ContentData20 }} />
                            </div>);
                    case "cta":
                        return (
                            <div key={section.id} className="space-y-8">
                                <SectionHeadline section={section as DocsSection & { data: ContentData9 }} />
                                <CTASection section={section as DocsSection & { data: ContentData9 }} />
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