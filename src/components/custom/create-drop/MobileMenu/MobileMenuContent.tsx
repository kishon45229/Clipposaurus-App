"use client";

import React from "react";
import {
    ResponsiveDialog,
    ResponsiveDialogHeader,
    ResponsiveDialogContent,
} from "@/components/ui/responsive-dialog";
import { MobileMenuHeader } from "./MobileMenuHeader";
import { MobileMenuKeySection } from "./MobileMenuKeySection";
import { MobileMenuRetentionCard } from "./MobileMenuRetentionCard";
import { MobileMenuInfoSection } from "./MobileMenuInfoSection";
import { MobileMenuFooter } from "./MobileMenuFooter";
import { useMenu } from "@/contexts/MenuContext";
import { AmbientGlow } from "@/components/ui/ambient-glow";

export const MobileMenuContent: React.FC = React.memo(() => {
    const { isMobileMenuOpen, setIsMobileMenuOpen, createDropRequestStatus } =
        useMenu();

    return (
        <ResponsiveDialog
            open={isMobileMenuOpen && createDropRequestStatus === "idle"}
            onOpenChange={setIsMobileMenuOpen}
        >
            <ResponsiveDialogContent
                className="
          flex flex-col
          max-h-[clamp(65dvh,75dvh,80dvh)]
          gap-[clamp(0.5rem,1.5vw,1rem)]
          p-[clamp(0.5rem,2vw,1.25rem)]
          border border-zinc-200/70 dark:border-zinc-800/70
          bg-white/70 dark:bg-zinc-900/70
          backdrop-blur-xl shadow-xl
          rounded-b-[clamp(1.5rem,4vw,2.5rem)]
          md:rounded-[clamp(1.5rem,3vw,2.5rem)]
          overflow-y-auto
        "
            >
                <AmbientGlow />

                <ResponsiveDialogHeader>
                    <MobileMenuHeader />
                </ResponsiveDialogHeader>

                <div className="flex flex-col gap-[clamp(0.5rem,1.5vw,1rem)]">
                    <MobileMenuKeySection />
                    <MobileMenuRetentionCard />
                    <MobileMenuInfoSection />
                    <MobileMenuFooter />
                </div>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    );
});

MobileMenuContent.displayName = "MobileMenuContent";
