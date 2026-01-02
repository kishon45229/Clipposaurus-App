"use client";

import React from "react";
import { useTermsOfService } from "@/contexts/TermsOfServiceContext";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export const TermsOfServiceContent = React.memo(() => {
    const { data } = useTermsOfService();
    const { sections } = data;

    // Create section IDs for scroll spy
    const sectionIds = React.useMemo(() =>
        sections.map(section => `section-${section.id}`),
        [sections]
    );

    const activeSection = useScrollSpy(sectionIds, 120);

    return (
        <div
            className="mx-auto max-w-7xl px-4 py-2 grid grid-cols-1 lg:grid-cols-[240px_auto]"
            style={{ gap: "clamp(2rem, 5vw, 2.5rem)" }}
        >
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center print:hidden">
                <div className="absolute top-24 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />
            </div>

            {/* Sticky TOC — Desktop only */}
            <aside className="hidden lg:block print:hidden">
                <nav
                    className="sticky top-24"
                    style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)" }}
                >
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                        On this page
                    </div>

                    <ul className="border-l border-zinc-200 dark:border-zinc-800 pl-4 space-y-2">
                        {sections.map((section) => {
                            const sectionId = `section-${section.id}`;
                            const isActive = activeSection === sectionId;
                            return (
                                <li key={section.id}>
                                    <a
                                        href={`#${sectionId}`}
                                        className={`block transition-colors ${isActive
                                                ? "text-emerald-600 dark:text-emerald-400 font-medium"
                                                : "text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                                            }`}
                                    >
                                        {section.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <div className="max-w-3xl">
                {/* Header */}
                <header
                    className="mb-12 z-50"
                    style={{ gap: "clamp(0.75rem, 2vw, 1rem)" }}
                >
                    <div
                        className="font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                        style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }}
                    >
                        {data.headline}
                    </div>

                    <div
                        className="text-zinc-500 dark:text-zinc-400"
                        style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)" }}
                    >
                        Last updated{" "}
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            {data.lastUpdated}
                        </span>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
                </header>

                {/* Sections */}
                <section style={{ gap: "clamp(2rem, 5vw, 3rem)" }} className="flex flex-col">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            id={`section-${section.id}`}
                            className="scroll-mt-28"
                        >
                            <div
                                className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2"
                                style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.25rem)" }}
                            >
                                {section.id}. {section.title}
                            </div>

                            <div
                                className="text-zinc-700 dark:text-zinc-400 leading-relaxed"
                                style={{ fontSize: "clamp(0.9rem, 1.6vw, 1rem)" }}
                            >
                                {section.description}
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
});

TermsOfServiceContent.displayName = "TermsOfServiceContent";
