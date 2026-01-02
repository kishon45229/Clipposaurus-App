"use client";

import React from "react";

interface ChangelogHeaderProps {
    headline: string;
    description: string;
}

export const ChangelogHeader: React.FC<ChangelogHeaderProps> = ({
    headline,
    description,
}) => {
    return (
        <header className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {headline}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {description}
            </p>
        </header>
    );
};
