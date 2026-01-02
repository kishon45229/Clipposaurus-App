"use client";

import React from "react";
import { ChangelogCategory } from "@/types";
import { CheckCircle2, Wrench, Sparkles } from "lucide-react";

interface ChangelogSectionProps {
    section: ChangelogCategory;
}

export const ChangelogSection: React.FC<ChangelogSectionProps> = React.memo(({ section }) => {
    const { category } = section;
    const items = section.items;

    return (
        <div className="space-y-3">
            <div className="text-xl font-semibold text-foreground">
                {category}
            </div>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="space-y-1">
                        <div className="font-medium text-foreground">
                           {index + 1}. {item.title}
                        </div>
                        <div className="text-sm text-muted-foreground ml-7">
                            {item.description}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
});

ChangelogSection.displayName = "ChangelogSection";
