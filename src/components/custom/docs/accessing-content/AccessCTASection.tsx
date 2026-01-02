"use client";

import React from "react";
import { DocsSection } from "@/types/docs";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

interface AccessCTASectionProps {
    section: DocsSection;
}

export const AccessCTASection: React.FC<AccessCTASectionProps> = React.memo(({ section }) => {
    if (section.type !== "cta" || !section.data || typeof section.data !== "object") {
        return null;
    }

    const data = section.data as { links: Array<{ text: string; href: string; style: string }> };

    return (
        <section id={section.id} className="space-y-8">
            <div className="text-center space-y-4">
                <div className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {section.title}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {data.links?.map((link, index) => {
                    const isPrimary = link.style === "primary";
                    return (
                        <Link
                            key={index}
                            href={link.href}
                            className={`
                                inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
                                ${isPrimary
                                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg hover:scale-105"
                                    : "border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                                }
                            `}
                        >
                            <span>{link.text}</span>
                            {isPrimary ? (
                                <ArrowRight className="w-4 h-4" />
                            ) : (
                                <ExternalLink className="w-4 h-4" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
});

AccessCTASection.displayName = "AccessCTASection";