"use client";

import { useMenu } from "@/contexts/MenuContext";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export const MobileMenuFooter = () => {
    const {
        data,
        identifier,
        systemSecret,
        createDropRequestStatus,
        handleCreateDrop,
        handleCloseMobileMenu,
    } = useMenu();

    const { ctaButton } = data;
    const isCreating = createDropRequestStatus === "creating";

    return (
        <div className="flex gap-2 pt-1">
            <Button
                onClick={handleCreateDrop}
                disabled={isCreating || !identifier || !systemSecret}
                type="submit"
                className="flex-1 h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-[clamp(0.8rem,3.5vw,0.9rem)] shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
                {isCreating ? (
                    <>
                        <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent mr-1.5" />
                        Creating...
                    </>
                ) : (
                    <>
                        <Plus className="mr-1.5 w-4 h-4" />
                        {ctaButton}
                    </>
                )}
            </Button>

            <Button
                variant="outline"
                onClick={handleCloseMobileMenu}
                disabled={isCreating}
                className="h-10 px-3 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
                <X className="w-4 h-4" />
            </Button>
        </div>
    );
};
