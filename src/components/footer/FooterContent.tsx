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
            <div className="w-full max-w-7xl mx-auto py-16">
                {/* MAIN CONTENT */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
                    {/* BRAND COLUMN */}
                    <FooterBrand />

                    {/* PRODUCT COLUMN */}
                    <FooterColumn column={columns[0]} redirectHandlers={redirectHandlers} />

                    {/* RESOURCES COLUMN */}
                    <FooterColumn column={columns[1]} redirectHandlers={redirectHandlers} />

                    {/* LEGAL COLUMN */}
                    <FooterColumn column={columns[2]} redirectHandlers={redirectHandlers} />
                </div>

                {/* BOTTOM BAR */}
                <FooterBottomBar />
            </div>
        </footer>
    );
};

