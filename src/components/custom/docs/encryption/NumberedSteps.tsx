import React from 'react';
import { SectionTitle } from './SectionTitle';

interface NumberedStepsProps {
    title: string;
    items: string[];
}

export const NumberedSteps = React.memo<NumberedStepsProps>(({ title, items }) => {
    return (
        <div className="space-y-6">
            <SectionTitle title={title} />

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="hidden lg:block absolute top-5 left-0 right-0 h-px bg-emerald-300/40 dark:bg-emerald-700/40" />

                {items.map((item, index) => (
                    <div key={index} className="relative flex flex-col items-start">
                        <div className="relative z-10 w-8 h-8 mb-3 flex items-center justify-center bg-emerald-500 text-zinc-100 text-base rounded-full font-semibold shadow-sm">
                            {index + 1}
                        </div>

                        <div className="hidden lg:block absolute top-5 left-5 w-2 h-2 rounded-full bg-emerald-500" />

                        <div className="text-sm md:text-base text-zinc-700 dark:text-zinc-400 leading-relaxed">
                            {item}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

NumberedSteps.displayName = 'NumberedSteps';
