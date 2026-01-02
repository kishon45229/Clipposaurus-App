"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useMenu } from "@/contexts/MenuContext";

export const MenuFooter = React.memo(() => {
  const { handleCreateDrop, createDropRequestStatus, data } = useMenu();
  const ctaLabel = data.ctaButton;

  const isCreating = createDropRequestStatus === "creating";

  return (
    <Button
      onClick={handleCreateDrop}
      disabled={isCreating}
      size="lg"
      type="submit"
      className="
        w-full
        bg-emerald-500 text-zinc-50 font-semibold rounded-2xl 
        text-[clamp(0.875rem,2vw,1rem)] 
        py-[clamp(0.75rem,1.5vw,1.25rem)] mx-auto
        hover:scale-[1.02] 
        shadow-lg shadow-emerald-600/30 
        transition-all duration-300 
        hover:-translate-y-1 hover:shadow-xl 
        disabled:opacity-70
      "
    >
      {isCreating ? (
        <span className="flex items-center justify-center gap-2">
          <Loader className="h-[clamp(1rem,2vw,1.25rem)] w-[clamp(1rem,2vw,1.25rem)] animate-spin" />
          Creating...
        </span>
      ) : (
        ctaLabel
      )}
    </Button>
  );
});

MenuFooter.displayName = "MenuFooter";
