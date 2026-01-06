import React from "react";
import { useChangelog } from "@/contexts/ChangelogContext";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ChangelogHeader } from "@/components/custom/changelog/ChangelogHeader";
import { ChangelogRelease } from "@/components/custom/changelog/ChangelogRelease";
import { StickyTOC } from "@/components/custom/StickyTOC";

export const ChangelogContent = React.memo(() => {
    const { data } = useChangelog();
    const { releases } = data;

    const releaseIds = React.useMemo(() =>
        releases.map(release => `release-${release.version}`),
        [releases]
    );

    const items = React.useMemo(() =>
        releases.map(release => ({ id: `release-${release.version}`, label: `v${release.version}` })),
        [releases]
    );

    const activeSection = useScrollSpy(releaseIds, 120);

    return (
        <div className="mx-auto max-w-480px-4 py-2 grid grid-cols-1 lg:grid-cols-[240px_auto] gap-[clamp(2rem,5vw,2.5rem)]">
            {/* Sticky TOC — Desktop only */}
            <StickyTOC title="Releases" items={items} activeSection={activeSection} />

            {/* Main content */}
            <div className="max-w-7xl border-l border-zinc-200 dark:border-zinc-800 pl-6">
                <ChangelogHeader />
                <ChangelogRelease />
            </div>
        </div>
    );
});

ChangelogContent.displayName = "ChangelogContent";