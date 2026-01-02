"use client";

import React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useDropSidebar } from "@/contexts/DropSidebarContext";

export const DropSidebarContentItems = React.memo(() => {
  const {
    isCollapsed,
    availableContentTypes,
    selectedContentType,
    setSelectedContentType,
    contentTypeIcons,
  } = useDropSidebar();

  return (
    <SidebarMenu>
      {availableContentTypes.map((contentType) => {
        const Icon = contentTypeIcons[contentType.type];
        const isSelected = selectedContentType === contentType.type;

        const iconClasses = cn(
          "shrink-0",
          "size-[clamp(0.875rem,2.5vw,1rem)]",
          isSelected
            ? "text-primary"
            : "text-zinc-500 dark:text-zinc-400"
        );

        return (
          <SidebarMenuItem key={contentType.type}>
            <SidebarMenuButton
              isActive={isSelected}
              onClick={() => setSelectedContentType(contentType.type)}
              className={cn(
                "w-full transition-all duration-200",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <div className="flex items-center gap-[clamp(0.5rem,2vw,0.75rem)]">
                {isCollapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Icon className={iconClasses} />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={6}>
                      {`View ${contentType.label}`}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Icon className={iconClasses} />
                )}

                <span className="sr-only">{contentType.label}</span>

                {!isCollapsed && (
                  <span
                    className="
                      truncate font-medium
                      text-[clamp(0.875rem,2.5vw,1rem)]
                      text-zinc-800 dark:text-emerald-500
                    "
                  >
                    {contentType.label}
                  </span>
                )}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
});

DropSidebarContentItems.displayName = "DropSidebarContentItems";
