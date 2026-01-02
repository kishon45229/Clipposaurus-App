import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const TabsSkeleton = React.memo(({ type }: { type: string }) => {
    if (type === "note") {
        return (
            <Card className="flex flex-col h-full w-full xl:w-2/3 py-2 gap-2 border-0
                bg-linear-to-b from-zinc-100/70 to-zinc-50/50
              dark:from-zinc-900/70 dark:to-zinc-950/50
                shadow-inner border-zinc-200/50 dark:border-zinc-800/50
                backdrop-blur-xl transition-all duration-300 shrink-0">
                <CardHeader className="flex items-center justify-between px-2 py-0 shrink-0">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                </CardHeader>
                <CardContent className="flex-1 flex flex-col px-2 py-0 min-h-0">
                    <Skeleton className="h-full w-full rounded-md" />
                </CardContent>
            </Card>
        );
    }

    if (type === "code") {
        return (
            <Card className="flex flex-col h-full py-2 gap-2 border-0 
             bg-linear-to-b from-zinc-100/70 to-zinc-50/50 
              dark:from-zinc-900/70 dark:to-zinc-950/50 
             shadow-inner border-zinc-200/50 dark:border-zinc-800/50 
              backdrop-blur-xl transition-all duration-300 shrink-0">
                <CardHeader className="flex items-center justify-between px-2 py-0">
                    <div className="flex justify-start w-1/3">
                        <Skeleton className="h-6 w-16" />
                    </div>
                    <div className="flex justify-center w-1/3">
                        <Skeleton className="h-8 w-20" />
                    </div>
                    <div className="flex justify-end w-1/3">
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col px-2 py-0">
                    <div className="relative flex-1 flex flex-col border-0">
                        <div className="flex rounded-md flex-1 overflow-hidden">
                            <Skeleton className="px-2 min-w-12 h-full" />
                            <Skeleton className="flex-1 h-full rounded-md" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (type === "file") {
        return (
            <Card className="flex flex-col h-full py-2 gap-2 border-0
                bg-linear-to-b from-zinc-100/70 to-zinc-50/50 
              dark:from-zinc-900/70 dark:to-zinc-950/50 
                shadow-inner border-zinc-200/50 dark:border-zinc-800/50 
                backdrop-blur-xl transition-all duration-300 shrink-0">
                <CardHeader className="flex items-center justify-between px-2 py-0">
                    <div className="flex justify-start w-1/2">
                        <Skeleton className="h-6 w-20" />
                    </div>
                    <div className="flex justify-end w-1/2 gap-3">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col px-2 py-0 min-h-0">
                    <Skeleton className="border-2 border-dashed rounded-lg p-6 h-full w-full" />
                </CardContent>
            </Card>
        );
    }
});

TabsSkeleton.displayName = "TabsSkeleton";