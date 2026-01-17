"use client";

import dynamic from "next/dynamic";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { tabList } from "@/components/create-drop/tab/Tab.config";
import { TextTabProvider } from "@/contexts/TextTabContext";
import { CodeTabProvider } from "@/contexts/CodeTabContext";
import { useTabNavigation } from "@/hooks/useTabNavigation";
import { HeaderDropKeyPreview } from "@/components/create-drop/header-menu/HeaderDropKeyPreview";
import { useMenu } from "@/contexts/MenuContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TextTabSkeleton } from "@/components/skeleton/TextTabSkeleton";
import { CodeTabSkeleton } from "@/components/skeleton/CodeTabSkeleton";

const TextTab = dynamic(
    () =>
        import("@/components/create-drop/tab/text-tab").then((m) => ({
            default: m.TextTab,
        })),
    { loading: () => <TextTabSkeleton /> }
);

const CodeTab = dynamic(
    () =>
        import("@/components/create-drop/tab/code-tab").then((m) => ({
            default: m.CodeTab,
        })),
    { loading: () => <CodeTabSkeleton /> }
);

export const TabContainer = () => {
    const { defaultTab, handleTabChange } = useTabNavigation();
    const { handleMobileMenuOpen } = useMenu();

    return (
        <Tabs
            value={defaultTab}
            onValueChange={handleTabChange}
            className="flex h-full w-full flex-col"
        >
            {/* TAB LIST */}
            <div className="flex w-full items-center justify-between shrink-0 pb-2">
                <TabsList className="flex w-fit items-center rounded-2xl p-1 bg-gradient-to-b from-zinc-100/70 to-zinc-50/50 dark:from-zinc-900/70 dark:to-zinc-950/50 border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner backdrop-blur-xl">
                    {tabList.map((tab) => (
                        <TabsTrigger
                            key={tab}
                            value={tab.toLowerCase()}
                            className="relative cursor-target font-semibold capitalize rounded-2xl transition-all duration-300 data-[state=active]:bg-emerald-500 dark:data-[state=active]:bg-emerald-400 data-[state=active]:text-zinc-950 dark:data-[state=active]:text-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-800 text-[clamp(0.75rem,2.5vw,1.125rem)] px-[clamp(0.75rem,3vw,1.25rem)] py-[clamp(0.25rem,1.5vw,0.6rem)]"
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* DESKTOP: HEADER */}
                <div className="hidden lg:block">
                    <HeaderDropKeyPreview />
                </div>

                {/* MOBILE: SHOW PLUS ICON ONLY */}
                <Button
                    onClick={handleMobileMenuOpen}
                    className="lg:hidden flex sm:hidden items-center justify-center h-10 w-10 p-0 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-colors cursor-target"
                    aria-label="Create drop"
                >
                    <Plus className="w-5 h-5" />
                </Button>

                {/* TABLET: PLUS ICON WITH TEXT */}
                <Button
                    onClick={handleMobileMenuOpen}
                    className="hidden sm:flex lg:hidden items-center gap-2 h-10 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-colors cursor-target"
                    aria-label="Create drop"
                >
                    <Plus className="w-5 h-5" />
                    <span className="text-sm font-semibold">I&apos;m ready to create drop</span>
                </Button>
            </div>

            {/* TAB CONTENT */}
            <div className="relative flex-1 min-h-0">
                <TabsContent value="note" className="absolute inset-0 flex flex-col">
                    <TextTabProvider>
                        <TextTab />
                    </TextTabProvider>
                </TabsContent>

                <TabsContent value="code" className="absolute inset-0 flex flex-col">
                    <CodeTabProvider>
                        <CodeTab />
                    </CodeTabProvider>
                </TabsContent>
            </div>
        </Tabs >
    );
};