import React from "react";

interface SectionTitleProps {
    title: string;
}

export const SectionTitle = React.memo<SectionTitleProps>(({ title }) => (
    <div className="flex items-center gap-3">
        <div className="h-[0.5px] w-12 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {title}
        </h3>
    </div>
));

SectionTitle.displayName = "SectionTitle";