import React from "react";
import { DropSidebarContent } from "@/components/open-drop/sidebar/DropSidebarContent";

export const DropSidebarContainer = React.memo(() => {
    return <DropSidebarContent />;
});

DropSidebarContainer.displayName = "DropSidebarContainer";