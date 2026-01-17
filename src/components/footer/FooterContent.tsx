"use client";

import { useFooter } from "@/contexts/FooterContext";
import { FooterBrand } from "@/components/footer/FooterBrand";
import { FooterBottomBar } from "@/components/footer/FooterBottomBar";
import { FooterColumn } from "@/components/footer/FooterColumn";

export const FooterContent = () => {
    const { data, handleRedirectToDocs, handleRedirectToChangelog, handleRedirectToTermsOfService, handleRedirectToGitHub, handleRedirectToFAQ, handleContactUs, handleRedirectToGitHubDiscussions, handleRedirectToCreateDrop, handleRedirectToUnlockDrop } = useFooter();
    const { columns } = data;
    const redirectHandlers = {
        "Create Drop": handleRedirectToCreateDrop,
        "Unlock Drop": handleRedirectToUnlockDrop,
        "Documentation": handleRedirectToDocs,
        "Changelog": handleRedirectToChangelog,
        "FAQ": handleRedirectToFAQ,
        "GitHub": handleRedirectToGitHub,
        "Terms of Service": handleRedirectToTermsOfService,
        "GitHub Discussions": handleRedirectToGitHubDiscussions,
    };

    return (
        <footer className="w-full border-t-2 border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-black" role="contentinfo">
            <div className="w-full max-w-7xl mx-auto py-[clamp(3rem,6vw,4rem)]">
                <div className="grid grid-rows-[auto_1fr] lg:grid-cols-[1fr_2fr] gap-4">
                    {/* BRAND SECTION */}
                    <div className="mb-[clamp(2rem,4vw,3rem)] w-full">
                        <FooterBrand />
                    </div>

                    {/* COLUMNS SECTION */}
                    <div className="grid grid-cols-4 mb-12 mx-auto px-2 lg:px-6 w-full">
                        {/* PRODUCT COLUMN */}
                        <FooterColumn column={columns[0]} redirectHandlers={redirectHandlers} />

                        {/* RESOURCES COLUMN */}
                        <FooterColumn column={columns[1]} redirectHandlers={redirectHandlers} />

                        {/* LEGAL COLUMN */}
                        <FooterColumn column={columns[2]} redirectHandlers={redirectHandlers} />

                        {/* COMMUNITY COLUMN */}
                        <FooterColumn column={columns[3]} redirectHandlers={redirectHandlers} />
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <FooterBottomBar />
            </div>
        </footer>
    );
};

