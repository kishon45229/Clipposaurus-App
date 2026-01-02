"use client";

import React from "react";
import { useFAQPage } from "@/contexts/ComponentDataContext";
import { ComponentError } from "@/components/custom/ComponentError";
import { FAQHeader } from "./FAQHeader";
import { FAQCategory } from "./FAQCategory";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const COMPONENT_ID = "FAQPage" as const;

export const FAQContainer: React.FC = () => {
    const { data, isLoading, error } = useFAQPage();

    // Create section IDs for categories
    const categoryIds = React.useMemo(() =>
        data?.categories.map(category => `category-${category.id}`) || [],
        [data?.categories]
    );

    const activeSection = useScrollSpy(categoryIds, 120);

    if (error) return <ComponentError componentId={COMPONENT_ID} />;
    if (isLoading || !data) return <FAQContainerSkeleton />;

    return (
        <div className="min-h-screen bg-background">
            <div
                className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-1 lg:grid-cols-[240px_auto]"
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
                            Categories
                        </div>

                        <ul className="border-l border-zinc-200 dark:border-zinc-800 pl-4 space-y-2">
                            {data.categories.map((category) => {
                                const sectionId = `category-${category.id}`;
                                const isActive = activeSection === sectionId;
                                return (
                                    <li key={category.id}>
                                        <a
                                            href={`#${sectionId}`}
                                            className={`block transition-colors ${isActive
                                                    ? "text-emerald-600 dark:text-emerald-400 font-medium"
                                                    : "text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                                                }`}
                                        >
                                            {category.category}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </aside>

                {/* Main content */}
                <div className="max-w-3xl">
                    <FAQHeader
                        headline={data.headline}
                        description={data.description}
                        lastUpdated={data.lastUpdated}
                    />
                    <div className="mt-12 space-y-8">
                        {data.categories.map((category) => (
                            <div
                                key={category.id}
                                id={`category-${category.id}`}
                                className="scroll-mt-28"
                            >
                                <FAQCategory category={category} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FAQContainerSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
                <div className="mt-12 space-y-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-8 w-1/3" />
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
