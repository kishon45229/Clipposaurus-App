"use client";

import React from "react";
import {
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";

interface NavItemProps {
    onClick: () => void;
    title: string;
    description: string;
    icon: React.ElementType;
    highlight?: boolean;
}

export const NavItem = ({
    onClick,
    title,
    description,
    icon: Icon,
    highlight = false,
}: NavItemProps) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <button
                    onClick={onClick}
                    className={`group flex flex-col gap-1 w-full px-4 py-3 text-sm rounded-xl transition-all duration-200 cursor-target ${highlight ? "bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 dark:from-emerald-500/20 dark:to-emerald-600/20 border-2 border-emerald-500/30 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:border-emerald-500/50 dark:hover:border-emerald-500/60" : "text-zinc-700 hover:bg-emerald-50 dark:text-zinc-300 dark:hover:bg-emerald-950/50 hover:text-emerald-600 dark:hover:text-emerald-400 w-full text-left"}`}
                >
                    <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 transition-opacity ${highlight ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} />
                        <div className="font-semibold">{title}</div>
                    </div>
                    <div className={`text-xs text-left ml-6 ${highlight ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500 dark:text-zinc-500'}`}>
                        {description}
                    </div>
                </button>
            </NavigationMenuLink>
        </li>
    );
};