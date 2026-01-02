'use client';

import React, { useState, useCallback } from 'react';
import { FileItem } from '@/types';
import {
    getFileTypeInfo,
    isImageFile,
    isTextBasedFile,
    extractTextFromDataUrl,
    truncateText
} from '@/lib/fileTypeUtils';
import { cn } from '@/lib/utils';
import {
    File,
    Image as ImageIcon,
    Video,
    Music,
    FileText,
    Code,
    Database,
    Archive,
    Sheet,
    Presentation
} from 'lucide-react';

const iconMap = {
    File,
    Image: ImageIcon,
    Video,
    Music,
    FileText,
    Code,
    Database,
    Archive,
    Sheet,
    Presentation,
};

const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || File;
};

interface FilePreviewProps {
    fileItem: FileItem;
    className?: string;
    showFileName?: boolean;
    maxTextLength?: number;
}

interface PreviewState {
    hasError: boolean;
    isLoading: boolean;
}

export function FilePreview({
    fileItem,
    className,
    showFileName = false,
    maxTextLength = 80
}: FilePreviewProps) {
    const [previewState, setPreviewState] = useState<PreviewState>({
        hasError: false,
        isLoading: false
    });

    const fileTypeInfo = getFileTypeInfo(fileItem.file.name);
    const IconComponent = getIconComponent(fileTypeInfo.icon);

    const handleImageError = useCallback(() => {
        setPreviewState(prev => ({ ...prev, hasError: true }));
    }, []);

    const handleImageLoad = useCallback(() => {
        setPreviewState(prev => ({ ...prev, isLoading: false }));
    }, []);

    const ImagePreview = () => {
        if (previewState.hasError || !fileItem.content) {
            return <IconFallback />;
        }

        return (
            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={fileItem.content}
                    alt={fileItem.file.name}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/5"></div>
            </div>
        );
    };

    const TextPreview = () => {
        const textContent = extractTextFromDataUrl(fileItem.content);

        if (!textContent) {
            return <IconFallback />;
        }

        const truncatedText = truncateText(textContent, maxTextLength);
        const isCode = fileTypeInfo.category === 'code';

        return (
            <div className="w-full h-full flex flex-col justify-center p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center mb-3">
                        <IconComponent className="h-6 w-6 text-blue-600/80" />
                    </div>
                    <div
                        className={cn(
                            "text-xs text-slate-700 leading-relaxed px-2",
                            isCode ? "font-mono bg-slate-100/80 rounded px-2 py-1" : "font-sans"
                        )}
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 6,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: '1.3'
                        }}
                    >
                        {truncatedText}
                    </div>
                </div>
            </div>
        );
    };

    const IconFallback = () => (
        <div className="w-full h-full pt-4 flex flex-col items-center justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="relative flex flex-col items-start">
                <div className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg mb-2">
                    <IconComponent className="h-8 w-8 text-zinc-600" />
                </div>
                {/* <div className="text-xs text-slate-600 font-semibold uppercase tracking-wide">
                    {fileTypeInfo.category}
                </div> */}
            </div>
        </div>
    );

    const renderPreview = () => {
        if (isImageFile(fileItem.file.name) && fileItem.content) {
            return <ImagePreview />;
        }

        if (isTextBasedFile(fileItem.file.name) && fileItem.content) {
            return <TextPreview />;
        }

        return <IconFallback />;
    };

    return (
        <div className={cn("relative", className)}>
            {renderPreview()}
            {/* {showFileName && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-zinc-900 text-xs p-1 rounded-b-md">
                    <div className="truncate">
                        {fileItem.file.name}
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default FilePreview;