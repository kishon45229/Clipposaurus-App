"use client";

import React from "react";

interface FAQHeaderProps {
    headline: string;
    description: string;
    lastUpdated: string;
}

export const FAQHeader: React.FC<FAQHeaderProps> = ({
    headline,
    description,
    lastUpdated,
}) => {
    return (
        <header className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {headline}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {description}
            </p>
            <p className="text-sm text-muted-foreground/60">
                Last updated: {lastUpdated}
            </p>
        </header>
    );
};
