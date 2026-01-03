"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { TabsSkeleton } from "@/components/skeleton/TabsSkeleton";
import { tabList } from "@/components/custom/create-drop/tab/Tab.config";
import { TextTabProvider } from "@/contexts/TextTabContext";
import { CodeTabProvider } from "@/contexts/CodeTabContext";
import { FileTabProvider } from "@/contexts/FileTabContext";
import { MobileCreateDropButton } from "@/components/custom/create-drop/MobileMenu/MobileCreateDropButton";
import { MobileMenu } from "@/components/custom/create-drop/MobileMenu";
import { useTabNavigation } from "@/hooks/useTabNavigation";
import { CreateDropDialogBox } from "@/components/custom/create-drop/dialog-box";

const TextTab = dynamic(
    () =>
        import("@/components/custom/create-drop/tab/text-tab").then((m) => ({
            default: m.TextTab,
        })),
    { loading: () => <TabsSkeleton type="note" /> }
);

const CodeTab = dynamic(
    () =>
        import("@/components/custom/create-drop/tab/code-tab").then((m) => ({
            default: m.CodeTab,
        })),
    { loading: () => <TabsSkeleton type="code" /> }
);

const FileTab = dynamic(
    () =>
        import("@/components/custom/create-drop/tab/file-tab").then((m) => ({
            default: m.FileTab,
        })),
    { loading: () => <TabsSkeleton type="file" /> }
);

export const TabContainer = React.memo(() => {
    const { defaultTab, handleTabChange } = useTabNavigation();

    return (
        <Tabs
            value={defaultTab}
            onValueChange={handleTabChange}
            className="flex h-full w-full flex-col"
        >
            {/* Header */}
            <div className="flex w-full items-center justify-between shrink-0">
                <TabsList
                    className="
            flex w-fit items-center rounded-2xl p-1
            bg-linear-to-b from-zinc-100/70 to-zinc-50/50
            dark:from-zinc-900/70 dark:to-zinc-950/50
            border border-zinc-200/50 dark:border-zinc-800/50
            shadow-inner backdrop-blur-xl
          "
                >
                    {tabList.map((tab) => (
                        <TabsTrigger
                            key={tab}
                            value={tab.toLowerCase()}
                            className="
                                relative cursor-target font-semibold capitalize rounded-2xl transition-all duration-300
                                data-[state=active]:bg-emerald-500 dark:data-[state=active]:bg-emerald-400
                                data-[state=active]:text-zinc-950 dark:data-[state=active]:text-zinc-900
                                text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-800
                                text-[clamp(0.75rem,2.5vw,1.125rem)]
                                px-[clamp(0.75rem,3vw,1.25rem)]
                                py-[clamp(0.25rem,1.5vw,0.6rem)]
              "
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Mobile actions */}
                <div className="flex flex-1 justify-end xl:hidden">
                    < MobileCreateDropButton />
                    <MobileMenu />
                </div>
            </div>

            {/* Content */}
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

                <TabsContent value="file" className="absolute inset-0 flex flex-col">
                    <FileTabProvider>
                        <FileTab />
                    </FileTabProvider>
                </TabsContent>
            </div>

            <CreateDropDialogBox />
        </Tabs >
    );
});

TabContainer.displayName = "TabContainer";
