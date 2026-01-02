"use client";

import React from "react";
import { ChangelogRelease as ChangelogReleaseType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ChangelogSection } from "./ChangelogSection";

interface ChangelogReleaseProps {
    release: ChangelogReleaseType;
}

export const ChangelogRelease: React.FC<ChangelogReleaseProps> = ({ release }) => {
    const getBadgeVariant = (type: string) => {
        switch (type) {
            case "major":
                return "default";
            case "minor":
                return "secondary";
            case "patch":
                return "outline";
            default:
                return "default";
        }
    };

    return (
        <article className="border-l-4 border-primary/30 pl-6 space-y-4">
            <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-3xl font-bold text-foreground">
                        v{release.version}
                    </h2>
                    <Badge variant={getBadgeVariant(release.type)}>
                        {release.type}
                    </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <time dateTime={release.date}>{release.date}</time>
                    <span>•</span>
                    <span className="font-medium">{release.title}</span>
                </div>
            </div>

            <div className="space-y-6 mt-6">
                {release.changes.map((section, index) => (
                    <ChangelogSection
                        key={`${release.version}-${index}`}
                        section={section}
                    />
                ))}
            </div>
        </article>
    );
};
