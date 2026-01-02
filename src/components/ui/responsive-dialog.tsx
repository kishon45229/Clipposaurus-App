"use client"

import * as React from "react"
import { useScreenSize } from "@/hooks/use-mobile"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface ResponsiveDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    children: React.ReactNode
}

function ResponsiveDialog({ open, onOpenChange, children }: ResponsiveDialogProps) {
    const { isMobile } = useScreenSize()

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={onOpenChange}>
                {children}
            </Sheet>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {children}
        </Dialog>
    )
}

interface ResponsiveDialogContentProps extends React.ComponentProps<typeof DialogContent> {
    className?: string
    children: React.ReactNode
}

function ResponsiveDialogContent({ className, children, ...props }: ResponsiveDialogContentProps) {
    const { isMobile, isTablet } = useScreenSize()

    if (isMobile) {
        return (
            <SheetContent
                side="top"
                className={cn(
                    "max-h-[90vh]",
                    "overflow-y-auto",
                    "px-4",
                    "py-6",
                    "rounded-b-3xl",
                    className
                )}
                {...props}
            >
                {children}
            </SheetContent>
        )
    }

    const responsiveClasses = cn(
        isTablet ? "max-w-xl" : "max-w-2xl",
        "max-h-[85dvh]",
        "overflow-y-auto",
        className
    )

    return (
        <DialogContent className={responsiveClasses} {...props}>
            {children}
        </DialogContent>
    )
}

interface ResponsiveDialogHeaderProps extends React.ComponentProps<typeof DialogHeader> {
    className?: string
    children: React.ReactNode
}

function ResponsiveDialogHeader({ className, children, ...props }: ResponsiveDialogHeaderProps) {
    const { isMobile } = useScreenSize()

    if (isMobile) {
        return (
            <SheetHeader
                className={cn(
                    "text-center",
                    "space-y-2",
                    className
                )}
                {...props}
            >
                {children}
            </SheetHeader>
        )
    }

    return (
        <DialogHeader className={className} {...props}>
            {children}
        </DialogHeader>
    )
}

interface ResponsiveDialogTitleProps extends React.ComponentProps<typeof DialogTitle> {
    className?: string
    children: React.ReactNode
}

function ResponsiveDialogTitle({ className, children, ...props }: ResponsiveDialogTitleProps) {
    const { isMobile, isTablet } = useScreenSize()

    if (isMobile) {
        return (
            <SheetTitle
                className={cn(
                    "text-lg",
                    "font-bold",
                    className
                )}
                {...props}
            >
                {children}
            </SheetTitle>
        )
    }

    const titleClasses = cn(
        isTablet ? "text-lg" : "text-xl",
        className
    )

    return (
        <DialogTitle className={titleClasses} {...props}>
            {children}
        </DialogTitle>
    )
}

interface ResponsiveDialogDescriptionProps extends React.ComponentProps<typeof DialogDescription> {
    className?: string
    children: React.ReactNode
}

function ResponsiveDialogDescription({ className, children, ...props }: ResponsiveDialogDescriptionProps) {
    const { isMobile, isTablet } = useScreenSize()

    if (isMobile) {
        return (
            <SheetDescription
                className={cn(
                    "text-sm",
                    className
                )}
                {...props}
            >
                {children}
            </SheetDescription>
        )
    }

    const descriptionClasses = cn(
        isTablet ? "text-sm" : "text-base",
        className
    )

    return (
        <DialogDescription className={descriptionClasses} {...props}>
            {children}
        </DialogDescription>
    )
}

export {
    ResponsiveDialog,
    ResponsiveDialogContent,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogDescription,
}
