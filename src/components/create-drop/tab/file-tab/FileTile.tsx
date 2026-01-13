import React from 'react';
import type { FileItem } from '@/types';
import { Card, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';
import FilePreview from '@/components/common/FilePreview';
import { useFileTab } from '@/contexts/FileTabContext';

interface Props {
    fileItem: FileItem;
}

export const FileTile = ({ fileItem }: Props) => {
    const { removeFile } = useFileTab();

    return (
        <Card className="relative h-[150px] group overflow-hidden border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0">
                <FilePreview
                    fileItem={fileItem}
                    className="w-full h-full"
                    maxTextLength={60}
                />
            </div>

            <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(fileItem.id)}
                className="absolute top-2 right-2 h-7 w-7 p-0 text-white hover:text-red-200 bg-black/40 hover:bg-red-500/80 opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 rounded-full backdrop-blur-sm"
            >
                <X className="h-4 w-4" />
            </Button>

            <CardFooter className="absolute bottom-0 left-0 right-0 px-0 p-3 bg-linear-to-t from-black/80 via-black/60 to-transparent backdrop-blur-sm rounded-bl-lg rounded-br-lg">
                <div className="flex flex-col w-full space-y-1">
                    <div className="text-xs font-semibold text-white truncate" title={fileItem.name}>
                        {fileItem.name}
                    </div>
                    <div className="text-xs text-white/70 font-medium">
                        {formatFileSize(fileItem.size)}
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}

FileTile.displayName = "FileTile";