"use client";

import React from "react";
import { Hourglass, Smile } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useDropSidebar } from "@/contexts/DropSidebarContext";

export const DropSidebarCountdown = React.memo(() => {
  const {
    timeRemainingLabel,
    expiredMessage,
    autoDeleteMessage,
    deleteAfterAccessMessage,
    isCollapsed,
    isExpired,
    deleteOnAccess,
    timeLeft,
  } = useDropSidebar();

  const timerTextClasses = cn(
    "font-mono font-bold text-center",
    isExpired
      ? "text-red-500"
      : "text-emerald-600 dark:text-emerald-500",
    "text-[clamp(1rem,4vw,1.5rem)]"
  );

  const subTextClasses = "text-[clamp(0.75rem,2.5vw,1rem)] text-zinc-500 dark:text-zinc-400 text-center mt-1";

  const iconClasses = "mx-auto mb-2 text-[clamp(1rem,3vw,1.5rem)]";

  return (
    <SidebarGroup className="border-b border-zinc-200/60 dark:border-zinc-800/60 p-4">
      {!isCollapsed ? (
        <>
          <SidebarGroupLabel className="text-[clamp(0.75rem,2.5vw,0.875rem)] font-medium uppercase tracking-wide text-zinc-800 dark:text-zinc-200">
            {timeRemainingLabel}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <div className="p-2 rounded-2xl bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-emerald-950/10 dark:to-emerald-900/10 border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner">
              <div className="text-center">
                {!deleteOnAccess ? (
                  <>
                    <div className={timerTextClasses}>{timeLeft}</div>
                    <div className={subTextClasses}>
                      {isExpired ? expiredMessage : autoDeleteMessage}
                    </div>
                  </>
                ) : (
                  <>
                    <Smile className={cn(iconClasses, "text-green-500")} />
                    <div className={subTextClasses}>{deleteAfterAccessMessage}</div>
                  </>
                )}
              </div>
            </div>
          </SidebarGroupContent>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Hourglass className="size-[clamp(1rem,3vw,1.25rem)]" />
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>
              You have {timeLeft} left
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </SidebarGroup>
  );
});

DropSidebarCountdown.displayName = "DropSidebarCountdown";