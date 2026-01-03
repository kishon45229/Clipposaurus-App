"use client";

import React from "react";

interface FAQCategoryHeaderProps {
    title: string;
    description?: string;
}

export const FAQCategoryHeader = React.memo<FAQCategoryHeaderProps>(({ title, description }) => {
    return (
        <div className="space-y-2">
            <div className="text-2xl font-semibold text-emerald-600 dark:text-emerald-500">
                {title}
            </div>
            {description && (
                <div className="text-sm text-muted-foreground">
                    {description}
                </div>
            )}
        </div>
    );
});

FAQCategoryHeader.displayName = "FAQCategoryHeader";