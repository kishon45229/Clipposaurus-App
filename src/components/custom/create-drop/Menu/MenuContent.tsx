import React from "react";
import { MenuHeader } from "@/components/custom/create-drop/Menu/MenuHeader";
import { MenuKeySection } from "@/components/custom/create-drop/Menu/MenuKeySection";
import { MenuRetentionSection } from "@/components/custom/create-drop/Menu/MenuRetentionSection";
import { MenuFooter } from "@/components/custom/create-drop/Menu/MenuFooter";
import { MenuInfo } from "@/components/custom/create-drop/Menu/MenuInfo";

export const MenuContent = React.memo(() => {
    return (
        <div className="flex flex-col justify-evenly shrink-0 h-full p-2 rounded-2xl shadow-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-b from-zinc-50/80 to-white/60 dark:from-zinc-900/70 dark:to-zinc-950/60 backdrop-blur-2xl transition-all duration-300">
            <MenuHeader />
            <MenuKeySection />
            <MenuRetentionSection />
            <MenuInfo />
            <MenuFooter />
        </div>
    );
});

MenuContent.displayName = "MenuContent";