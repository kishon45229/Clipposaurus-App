"use client";

import React from "react";
import { useChangelog } from "@/contexts/ChangelogContext";
import { ChangelogSection } from "@/components/custom/changelog/ChangelogSection";
import { ChangelogReleaseHeader } from "./ChangelogReleaseHeader";

export const ChangelogRelease = React.memo(() => {
    const { data } = useChangelog();
    const { releases } = data;

    return (
        <div className="space-y-12">
            {releases.map((release, index) => (
                <div key={index} id={`release-${release.version}`} className="scroll-mt-28">
                    <ChangelogReleaseHeader release={release} />

                    <div className="space-y-6 mt-6">
                        {release.changes.map((section, index) => (
                            <ChangelogSection
                                key={`${release.version}-${index}`}
                                section={section}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
});

ChangelogRelease.displayName = "ChangelogRelease";
