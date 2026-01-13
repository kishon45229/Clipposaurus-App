"use client";

import React from 'react';
import { FileTile } from '@/components/create-drop/tab/file-tab/FileTile';
import { useFileTab } from '@/contexts/FileTabContext';

export const FileTilesGrid = React.memo((): React.ReactElement | null => {
    const { files } = useFileTab();

    if (files.length === 0) {
        return null;
    }

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {files.map((fileItem) => (
                    <FileTile
                        key={fileItem.id}
                        fileItem={fileItem}
                    />
                ))}
            </div>
        </div>
    );
});

FileTilesGrid.displayName = 'FileTileGrid';
