"use client";

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X, AlertCircle, Upload, CheckCircle } from 'lucide-react';
import { useToast, type Toast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';

interface ToasterProps {
    className?: string;
}

export default function Toaster({ className }: ToasterProps) {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className={cn(
            "fixed top-4 right-4 z-50 flex flex-col gap-2 w-96 max-w-[calc(100vw-2rem)]",
            className
        )}>
            {toasts.map((toast) => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    onRemove={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
}

interface ToastItemProps {
    toast: Toast;
    onRemove: () => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
    const getIcon = () => {
        switch (toast.variant) {
            case 'loading':
                return <Upload className="h-4 w-4 animate-pulse" />;
            case 'destructive':
                return <AlertCircle className="h-4 w-4" />;
            default:
                return <CheckCircle className="h-4 w-4" />;
        }
    };

    return (
        <Alert
            variant={toast.variant || 'default'}
            className="relative shadow-lg border animate-in slide-in-from-right-full duration-300"
        >
            {getIcon()}
            <div className="flex-1 pr-8">
                {toast.title && (
                    <AlertTitle className="mb-1">
                        {toast.title}
                    </AlertTitle>
                )}
                <AlertDescription>
                    {toast.description}
                </AlertDescription>
                {toast.variant === 'loading' && typeof toast.progress === 'number' && (
                    <div className="mt-2">
                        <div className="w-full bg-muted rounded-full h-2">
                            <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out" 
                                style={{ width: `${Math.min(100, Math.max(0, toast.progress))}%` }}
                            />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                            {Math.round(toast.progress)}%
                        </div>
                    </div>
                )}
            </div>
            {toast.variant !== 'loading' && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-background/80"
                    onClick={onRemove}
                >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Close</span>
                </Button>
            )}
        </Alert>
    );
}
