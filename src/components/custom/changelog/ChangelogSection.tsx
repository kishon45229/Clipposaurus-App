"use client";

import React from "react";
import { ChangelogCategory } from "@/types";
import { CheckCircle2, Wrench, Sparkles } from "lucide-react";

interface ChangelogSectionProps {
    section: ChangelogCategory;
}

export const ChangelogSection: React.FC<ChangelogSectionProps> = ({ section }) => {
    const getCategoryIcon = (category: string) => {
        if (category.toLowerCase().includes("feature")) {
            return <Sparkles className="h-5 w-5 text-green-500" />;
        }
        if (category.toLowerCase().includes("improvement")) {
            return <Wrench className="h-5 w-5 text-blue-500" />;
        }
        if (category.toLowerCase().includes("bug") || category.toLowerCase().includes("fix")) {
            return <CheckCircle2 className="h-5 w-5 text-orange-500" />;
        }
        return <CheckCircle2 className="h-5 w-5 text-gray-500" />;
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                {getCategoryIcon(section.category)}
                <h3 className="text-xl font-semibold text-foreground">
                    {section.category}
                </h3>
            </div>
            <ul className="space-y-3 ml-7">
                {section.items.map((item, index) => (
                    <li key={index} className="space-y-1">
                        <div className="font-medium text-foreground">
                            {item.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {item.description}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
