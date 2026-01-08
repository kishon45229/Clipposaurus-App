"use client";

import React from "react";
import Link from "next/link";
import { ScrollText, FileText, HeartHandshake } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { GITHUB_SPONSOR_URL } from "@/constants/githubConfig";

export const ResourcesMenu = React.memo(() => {
    return (
        <NavigationMenu viewport={false} className="relative z-50">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="
                        h-10
                        px-4
                        text-sm
                        font-semibold
                        text-zinc-700
                        dark:text-zinc-300
                        hover:text-emerald-600
                        dark:hover:text-emerald-500
                        hover:bg-emerald-50
                        dark:hover:bg-emerald-950
                        transition-all
                        duration-200
                        bg-transparent
                    ">
                        Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                        className="
                            z-50
                            left-auto
                            right-0
                            bg-white/95
                            backdrop-blur-xl
                            shadow-xl
                            border-2
                            border-zinc-200
                            dark:bg-zinc-900/95
                            dark:border-zinc-800
                            rounded-2xl
                        "
                    >
                        <ul className="w-64 p-2 space-y-1">
                            <NavItem
                                href="/changelog"
                                icon={ScrollText}
                                title="Changelog"
                                description="See what's new and improved"
                            />
                            <NavItem
                                href="/terms-of-service"
                                icon={FileText}
                                title="Terms of Service"
                                description="Read our terms and conditions"
                            />
                            <li className="h-px my-2 bg-zinc-200 dark:bg-zinc-800" />
                            <NavItem
                                href={GITHUB_SPONSOR_URL}
                                icon={HeartHandshake}
                                title="Support the Project"
                                description="Help keep Clipposaurus free"
                                external
                                highlight
                            />
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
});

ResourcesMenu.displayName = "ResourcesMenu";

interface NavItemProps {
    href: string;
    title: string;
    description: string;
    icon: React.ElementType;
    external?: boolean;
    highlight?: boolean;
}

function NavItem({
    href,
    title,
    description,
    icon: Icon,
    external,
    highlight,
}: NavItemProps) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={`
                        group
                        flex
                        flex-col
                        gap-1
                        px-4
                        py-3
                        text-sm
                        rounded-xl
                        transition-all
                        duration-200
                        ${highlight
                            ? "bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 dark:from-emerald-500/20 dark:to-emerald-600/20 border-2 border-emerald-500/30 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:border-emerald-500/50 dark:hover:border-emerald-500/60"
                            : "text-zinc-700 hover:bg-emerald-50 dark:text-zinc-300 dark:hover:bg-emerald-950/50 hover:text-emerald-600 dark:hover:text-emerald-400"}
                    `}
                >
                    <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 transition-opacity ${highlight ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} />
                        <div className="font-semibold">{title}</div>
                    </div>
                    <div className={`text-xs ml-6 ${highlight ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500 dark:text-zinc-500'}`}>
                        {description}
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}
