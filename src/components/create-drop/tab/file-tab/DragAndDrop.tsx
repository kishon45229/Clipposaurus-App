"use client";

import React from 'react';
import { Upload } from 'lucide-react';

export const DragAndDrop = React.memo(() => {
    return (
        <div className="flex flex-row items-center justify-center gap-20">
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row text-center gap-2">
                    <Upload aria-hidden="true" />
                    <div className="text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg font-bold">Drop files here</div>
                </div>
                <div className="text-sm">You can drag and drop files anywhere in this area</div>
            </div>
        </div>
    );
});

DragAndDrop.displayName = 'DragAndDrop';
