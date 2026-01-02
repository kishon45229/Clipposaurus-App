"use client";

import React from 'react';
import { FileX } from 'lucide-react';

export const NoFileInfo = React.memo(() => {
    return (
        <div className="flex flex-row items-center justify-center gap-20">
            <div className="flex flex-col items-center justify-center">
                <FileX className="size-8 xs-min:size-10 mb-4 text-emerald-500" aria-hidden="true" />
                <div className="text-base text-zinc-300 sm:text-lg md:text-lg lg:text-lg xl:text-lg font-bold">No files selected yet</div>
                <div className="text-sm text-zinc-400 text-center">Use the button above to choose files</div>
            </div>
        </div>
    );
});

NoFileInfo.displayName = 'NoFileInfo';
