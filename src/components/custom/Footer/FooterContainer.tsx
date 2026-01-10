"use client";

import React from "react";
import { FooterBrand } from "./FooterBrand";
import { FooterColumn } from "./FooterColumn";
import { footerLinks } from "./FooterLinksData";
import { useRedirects } from "@/hooks/useRedirect";

export const FooterContainer = React.memo(() => {
    const { handleRedirectToDocs, handleRedirectToChangelog, handleRedirectToTermsOfService, handleRedirectToGitHub, handleRedirectToFAQ, handleContactUs, handleRedirectToFeatures, handleRedirectToHowItWorks, handleRedirectToSecurity, handleRedirectToPrivacyPolicy, handleRedirectToCookiePolicy, handleRedirectToAcceptableUse, handleRedirectToApiReference, handleRedirectToGitHubDiscussions, handleRedirectToDiscord, handleRedirectToTwitter } = useRedirects();


    const redirectHandlers = {
        "Changelog": handleRedirectToChangelog,
        "Documentation": handleRedirectToDocs,
        "API Reference": handleRedirectToApiReference,
        "GitHub": handleRedirectToGitHub,
        "GitHub Discussions": handleRedirectToGitHubDiscussions,
        "Terms of Service": handleRedirectToTermsOfService,
        "Features": handleRedirectToFeatures,
        "How It Works": handleRedirectToHowItWorks,
        "Security": handleRedirectToSecurity,
        "FAQ": handleRedirectToFAQ,
        "Privacy Policy": handleRedirectToPrivacyPolicy,
        "Cookie Policy": handleRedirectToCookiePolicy,
        "Acceptable Use": handleRedirectToAcceptableUse,
        "Discord": handleRedirectToDiscord,
        "Twitter": handleRedirectToTwitter,
        "Contact": handleContactUs,
    };

    return (
        <footer className="w-full border-t-2 border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-black" role="contentinfo">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
                    {/* Brand Column */}
                    <FooterBrand />

                    {/* Product Column */}
                    <FooterColumn title="Product" links={footerLinks.product} redirectHandlers={redirectHandlers} />

                    {/* Resources Column */}
                    <FooterColumn title="Resources" links={footerLinks.resources} redirectHandlers={redirectHandlers} />

                    {/* Legal Column */}
                    <FooterColumn title="Legal" links={footerLinks.legal} redirectHandlers={redirectHandlers} />
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-center gap-4">
                    {/* Copyright */}
                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <span>© {new Date().getFullYear()}</span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-200">Clipposaurus</span>
                        <span>· All rights reserved</span>
                    </div>
                </div>
            </div>
        </footer>
    );
});

FooterContainer.displayName = "FooterContainer";

