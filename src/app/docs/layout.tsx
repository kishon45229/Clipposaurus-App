import { Footer } from "@/components/custom/Footer";
import React from "react";

/**
 * Docs Layout - Overrides the root layout to remove global Navbar and Footer
 * The DocsContainer component provides its own DocsNavbar and DocsFooter
 */
export default function DocsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="docs-layout-wrapper">
            {children}
        </div>
    );
}
