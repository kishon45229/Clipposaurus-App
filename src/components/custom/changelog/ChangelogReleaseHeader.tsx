import React from "react";
import { Badge } from "@/components/ui/badge";

interface ChangelogReleaseHeaderProps {
    release: {
        version: string;
        type: string;
        date: string;
        title: string;
    };
}

export const ChangelogReleaseHeader = React.memo<ChangelogReleaseHeaderProps>(({ release }) => {
    const { version, type, date, title } = release;

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
        <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
                <div className="text-3xl font-bold text-emerald-500">
                    v{version}
                </div>
                <Badge variant={getBadgeVariant(type)}>
                    {type}
                </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time dateTime={date}>{date}</time>
                <span>•</span>
                <span className="font-medium">{title}</span>
            </div>
        </div>
    );
});

ChangelogReleaseHeader.displayName = "ChangelogReleaseHeader";