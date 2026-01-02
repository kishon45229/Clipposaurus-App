"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CollapsibleContextValue {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | undefined>(undefined);

interface CollapsibleProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
}

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
    ({ open: controlledOpen, onOpenChange, children, className, ...props }, ref) => {
        const [internalOpen, setInternalOpen] = React.useState(false);

        const open = controlledOpen ?? internalOpen;
        const handleOpenChange = onOpenChange ?? setInternalOpen;

        const contextValue = React.useMemo(
            () => ({ open, onOpenChange: handleOpenChange }),
            [open, handleOpenChange]
        );

        return (
            <CollapsibleContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={cn("space-y-2", className)}
                    {...props}
                >
                    {children}
                </div>
            </CollapsibleContext.Provider>
        );
    }
);
Collapsible.displayName = "Collapsible";

const CollapsibleTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<"button">
>(({ children, onClick, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext);

    if (!context) {
        throw new Error("CollapsibleTrigger must be used within a Collapsible");
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        context.onOpenChange(!context.open);
        onClick?.(event);
    };

    return (
        <button
            ref={ref}
            onClick={handleClick}
            aria-expanded={context.open}
            {...props}
        >
            {children}
        </button>
    );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext);

    if (!context) {
        throw new Error("CollapsibleContent must be used within a Collapsible");
    }

    if (!context.open) {
        return null;
    }

    return (
        <div
            ref={ref}
            className={cn(
                "animate-in slide-in-from-top-1 duration-200",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };