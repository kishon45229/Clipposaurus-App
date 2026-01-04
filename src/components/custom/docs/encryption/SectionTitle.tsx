import React from "react";

interface SectionTitleProps {
    title: string;
}

export const SectionTitle = React.memo<SectionTitleProps>(({ title }) => (
    <div className="flex items-center gap-3">
        <div className="h-[1px] w-12 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
        <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {title}
        </div>
    </div>
));

SectionTitle.displayName = "SectionTitle";