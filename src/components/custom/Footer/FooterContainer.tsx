"use client";

import React from "react";
import { FooterCopyright } from "@/components/custom/Footer/FooterCopyright";
import { FooterLinks } from "@/components/custom/Footer/FooterLinks";

export const FooterContainer: React.FC = React.memo(() => {
    return (
        <footer className="
                w-full h-full
                flex items-center
                border-t border-zinc-200 dark:border-zinc-800
                backdrop-blur-md 
            "
            role="contentinfo"
        >
            <div
                className="
                    flex flex-col md:flex-row
                    items-center
                    justify-center md:justify-between
                    w-full max-w-[1920px]
                    mx-auto px-4
                    gap-[clamp(0.5rem,2vw,1rem)]
                "
            >
                <FooterCopyright />
                <FooterLinks />
            </div>
        </footer>
    );
});

FooterContainer.displayName = "FooterContainer";
