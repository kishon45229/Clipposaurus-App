"use client";

import {
    ResponsiveDialog,
    ResponsiveDialogHeader,
    ResponsiveDialogContent,
} from "@/components/ui/responsive-dialog";
import { MobileMenuHeader } from "@/components/create-drop/mobile-menu/MobileMenuHeader";
import { MobileMenuKeySection } from "@/components/create-drop/mobile-menu/MobileMenuKeySection";
import { MobileMenuRetentionCard } from "@/components/create-drop/mobile-menu/MobileMenuRetentionCard";
import { MobileMenuInfoSection } from "@/components/create-drop/mobile-menu/MobileMenuInfoSection";
import { MobileMenuFooter } from "@/components/create-drop/mobile-menu/MobileMenuFooter";
import { useMenu } from "@/contexts/MenuContext";
import { AmbientGlow } from "@/components/ui/ambient-glow";

export const MobileMenuContent = () => {
    const { isMobileMenuOpen, setIsMobileMenuOpen, createDropRequestStatus } = useMenu();

    return (
        <ResponsiveDialog open={isMobileMenuOpen && createDropRequestStatus === "idle"} onOpenChange={setIsMobileMenuOpen}>
            <ResponsiveDialogContent className="flex flex-col max-h-[clamp(65dvh,75dvh,85dvh)] gap-2 p-3 border border-zinc-200/70 dark:border-zinc-800/70 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl rounded-b-3xl md:rounded-3xl overflow-y-auto">
                <AmbientGlow />

                <ResponsiveDialogHeader>
                    <MobileMenuHeader />
                </ResponsiveDialogHeader>

                <div className="flex flex-col gap-2">
                    <MobileMenuKeySection />
                    <MobileMenuRetentionCard />
                    <MobileMenuInfoSection />
                    <MobileMenuFooter />
                </div>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    );
};
