"use client";

import React from "react";
import { useHeader } from "@/contexts/HeaderContext";
import { MenuKeySection } from "@/components/custom/create-drop/Menu/MenuKeySection";
import { MenuInfo } from "@/components/custom/create-drop/Menu/MenuInfo";
import { MenuRetentionSection } from "@/components/custom/create-drop/Menu/MenuRetentionSection";
import { ChevronDown, Settings } from "lucide-react";

export const CreateDropDrawer = React.memo(() => {
    const { isDrawerOpen, handleDrawerToggle } = useHeader();

    return (
        <>
            {/* Drawer Handle - Always visible on mobile/tablet */}
            <div className="lg:hidden shrink-0">
                <button
                    onClick={handleDrawerToggle}
                    className="
            w-full
            px-4 py-3
            flex items-center justify-between
            bg-linear-to-b from-zinc-50/80 to-white/60
            dark:from-zinc-900/70 dark:to-zinc-950/60
            border-t border-zinc-200/60 dark:border-zinc-800/60
            hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50
            transition-all duration-300
          "
                    aria-label="Toggle advanced options"
                >
                    <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Advanced Options
                        </span>
                    </div>
                    <ChevronDown
                        className={`w-5 h-5 text-zinc-500 dark:text-zinc-400 transition-transform duration-300 ${isDrawerOpen ? 'rotate-180' : ''
                            }`}
                    />
                </button>
            </div>

            {/* Drawer Content */}
            <div
                className={`
          lg:hidden
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${isDrawerOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
        `}
            >
                <div className="
          p-4 
          space-y-4
          bg-linear-to-b from-white/60 to-zinc-50/80
          dark:from-zinc-950/60 dark:to-zinc-900/70
          border-t border-zinc-200/60 dark:border-zinc-800/60
        ">
                    {/* Mobile Retention Section */}
                    <div className="md:hidden">
                        <MenuRetentionSection />
                    </div>

                    {/* Key Section */}
                    <MenuKeySection />

                    {/* Info Section */}
                    <MenuInfo />
                </div>
            </div>

            {/* Desktop Sidebar - Hidden on mobile, visible on lg+ */}
            <div className="hidden lg:block shrink-0 w-full lg:w-[400px] xl:w-[450px]">
                <div className="h-full p-4 rounded-2xl shadow-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-linear-to-b from-zinc-50/80 to-white/60 dark:from-zinc-900/70 dark:to-zinc-950/60 backdrop-blur-2xl transition-all duration-300">
                    <div className="flex flex-col gap-4 h-full">
                        <div className="flex items-center gap-2 pb-2 border-b border-zinc-200/50 dark:border-zinc-800/50">
                            <Settings className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                Drop Settings
                            </h2>
                        </div>

                        <div className="flex-1 overflow-auto space-y-4">
                            <MenuKeySection />
                            <MenuInfo />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

CreateDropDrawer.displayName = "CreateDropDrawer";
