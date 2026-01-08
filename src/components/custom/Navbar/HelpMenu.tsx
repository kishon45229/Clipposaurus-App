"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, Mail, Bug } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { GITHUB_REPO_URL } from "@/constants/githubConfig";

export const HelpMenu = React.memo(() => {
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
                        Help
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
                                href="/faq"
                                icon={HelpCircle}
                                title="FAQ"
                                description="Common questions and answers"
                            />
                            <NavItem
                                href={GITHUB_REPO_URL + "/issues"}
                                icon={Bug}
                                title="Report an Issue"
                                description="Found a bug? Let us know"
                                external
                            />
                            <NavItem
                                href="mailto:support@clipposaurus.com"
                                icon={Mail}
                                title="Contact Support"
                                description="Get in touch with our team"
                                external
                            />
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
});

HelpMenu.displayName = "HelpMenu";

interface NavItemProps {
    href: string;
    title: string;
    description: string;
    icon: React.ElementType;
    external?: boolean;
}

function NavItem({
    href,
    title,
    description,
    icon: Icon,
    external,
}: NavItemProps) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="
                        group
                        flex
                        flex-col
                        gap-1
                        px-4
                        py-3
                        text-sm
                        rounded-xl
                        text-zinc-700
                        hover:bg-emerald-50
                        dark:text-zinc-300
                        dark:hover:bg-emerald-950/50
                        hover:text-emerald-600
                        dark:hover:text-emerald-400
                        transition-all
                        duration-200
                    "
                >
                    <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="font-semibold">{title}</div>
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-500 ml-6">
                        {description}
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}
