"use client";

import React from "react";
import { useMenu } from "@/contexts/MenuContext";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

export const MobileMenuFooter = React.memo(() => {
    const {
        data,
        createDropRequestStatus,
        handleCreateDrop,
        handleCloseMobileMenu,
    } = useMenu();

    const { ctaButton } = data;

    return (
        <div className="flex gap-[clamp(0.5rem,3vw,0.75rem)] p-2">
            <Button
                onClick={handleCreateDrop}
                disabled={createDropRequestStatus === "creating"}
                type="submit"
                className="
          flex-1
          rounded-2xl
          py-[clamp(0.75rem,3.5vw,1.25rem)]
          bg-emerald-600 hover:bg-emerald-500
          text-white font-semibold
          text-[clamp(0.875rem,3.5vw,1.125rem)]
          shadow-lg shadow-emerald-600/30
          transition-all duration-300
          hover:-translate-y-0.5 hover:shadow-xl
          disabled:opacity-70
        "
            >
                <Save className="mr-2 size-[clamp(1rem,4vw,1.25rem)]" />
                {createDropRequestStatus === "creating" ? "Saving..." : ctaButton}
            </Button>

            <Button
                variant="outline"
                onClick={handleCloseMobileMenu}
                className="
          rounded-2xl
          px-3
          py-[clamp(0.75rem,3.5vw,1.25rem)]
        "
            >
                <X className="size-[clamp(1rem,4vw,1.25rem)]" />
            </Button>
        </div>
    );
});

MobileMenuFooter.displayName = "MobileMenuFooter";
