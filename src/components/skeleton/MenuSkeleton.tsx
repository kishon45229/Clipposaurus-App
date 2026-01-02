import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const MenuSkeleton: React.FC = React.memo(() => {
    return (
        <aside className="hidden xl:flex h-full">
            <div className="w-full h-full flex flex-col py-auto">
                <Card
                    className="flex-1 grid grid-rows-[auto] shrink-0 gap-2 px-0 rounded-2xl shadow-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-b from-zinc-50/80 to-white/60 dark:from-zinc-900/70 dark:to-zinc-950/60 backdrop-blur-2xl transition-all duration-300"
                >
                    <CardHeader className="border-zinc-200/40 dark:border-zinc-800/40 space-y-0.5">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                    </CardHeader>

                    <CardContent className="flex flex-col gap-4">
                        {/* Key Section */}
                        <div className="p-2 rounded-lg bg-linear-to-br from-zinc-100/70 to-zinc-50/50 dark:from-zinc-900/70 dark:to-zinc-950/60 border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner">
                            <Skeleton className="h-5 w-1/2 mb-3" />
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-[49%] flex flex-col">
                                    <Skeleton className="h-4 w-1/3 mb-1" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <div className="w-[49%] flex flex-col">
                                    <Skeleton className="h-4 w-1/3 mb-1" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>
                            <Skeleton className="h-4 w-2/3 mx-auto" />
                        </div>

                        {/* Retention Section */}
                        <div className="rounded-lg p-2 gap-2 bg-linear-to-b from-zinc-100/70 to-zinc-50/40 dark:from-zinc-900/70 dark:to-zinc-950/60 border border-zinc-200/50 dark:border-zinc-800/50">
                            <Skeleton className="h-5 w-1/2 mb-3" />
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            </div>
                        </div>

                        {/* MenuInfo Section */}
                        <div className="border rounded-lg text-center border-zinc-200/50 dark:border-zinc-800/50">
                            <Skeleton className="h-4 w-3/4 mx-auto" />
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </CardFooter>
                </Card>
            </div>
        </aside>
    );
});

MenuSkeleton.displayName = "MenuSkeleton";