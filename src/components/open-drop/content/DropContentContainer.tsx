import React from "react";
import { DropActionBar } from "../actionbar";
import { DropTextContent } from "@/components/open-drop/content/DropTextContent";
import { DropCodeContent } from "@/components/open-drop/content/DropCodeContent";

export const DropContentContainer = () => {
    return (
        <div className="flex flex-col h-full">
            {/* ACTION BAR */}
            <DropActionBar />

            {/* CONTENT AREA */}
            <div className="flex-1 min-h-0 relative bg-gradient-to-br from-zinc-50/60 to-white/30 dark:from-zinc-900/50 dark:to-zinc-950/30">
                <DropTextContent />
                <DropCodeContent />
            </div>
        </div>
    );
};