"use client";

import React from "react";
import { useChangelogPage } from "@/contexts/ComponentDataContext";
import { ComponentError } from "@/components/custom/ComponentError";
import { ChangelogHeader } from "./ChangelogHeader";
import { ChangelogRelease } from "./ChangelogRelease";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const COMPONENT_ID = "ChangelogPage" as const;

export const ChangelogContainer: React.FC = () => {
    const { data, isLoading, error } = useChangelogPage();

    // Create section IDs for releases
    const releaseIds = React.useMemo(() =>
        data?.releases.map(release => `release-${release.version}`) || [],
        [data?.releases]
    );

    const activeSection = useScrollSpy(releaseIds, 120);

    if (error) return <ComponentError componentId={COMPONENT_ID} />;
    if (isLoading || !data) return <ChangelogContainerSkeleton />;

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
                            Releases
                        </div>

                        <ul className="border-l border-zinc-200 dark:border-zinc-800 pl-4 space-y-2">
                            {data.releases.map((release) => {
                                const sectionId = `release-${release.version}`;
                                const isActive = activeSection === sectionId;
                                return (
                                    <li key={release.version}>
                                        <a
                                            href={`#${sectionId}`}
                                            className={`block transition-colors ${isActive
                                                    ? "text-emerald-600 dark:text-emerald-400 font-medium"
                                                    : "text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                                                }`}
                                        >
                                            v{release.version}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </aside>

                {/* Main content */}
                <div className="max-w-3xl">
                    <ChangelogHeader
                        headline={data.headline}
                        description={data.description}
                    />
                    <div className="mt-12 space-y-12">
                        {data.releases.map((release) => (
                            <div
                                key={release.version}
                                id={`release-${release.version}`}
                                className="scroll-mt-28"
                            >
                                <ChangelogRelease release={release} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChangelogContainerSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-2/3" />
                    <Skeleton className="h-6 w-full" />
                </div>
                <div className="mt-12 space-y-12">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="h-10 w-1/2" />
                            <Skeleton className="h-6 w-1/3" />
                            <div className="space-y-2">
                                <Skeleton className="h-32 w-full" />
                                <Skeleton className="h-32 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
