"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Star, HeartHandshake, Bug, ScrollText, HelpCircle, Mail, FileText } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useGitHubStars } from "@/hooks/useGitHubStars";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { GITHUB_REPO_URL, GITHUB_SPONSOR_URL } from "@/constants/githubConfig";

export const NavbarLinks = React.memo(() => {
  const stars = useGitHubStars();

  return (
    <nav
      className="hidden sm:flex items-center gap-2"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Docs */}
      < Button
        variant="ghost"
        onClick={() => window.open("/docs")}
        className="navbar-button"
      >
        <BookOpen className="mr-1 navbar-icon" />
        <span className=" text-[clamp(1rem, 2vw, 1.25rem)]">Docs</span>
      </Button >
      {/* GitHub */}
      < Button
        variant="ghost"
        onClick={() => window.open(GITHUB_REPO_URL, "_blank")}
        className="navbar-button"
      >
        <FontAwesomeIcon icon={faGithub} className="mr-2 navbar-icon" />
        <Star className="-mr-0.5 navbar-icon" />
        <span className="font-medium text-[clamp(0.875rem, 2vw, 1.25rem)]">{stars}</span>
      </Button >
      {/* More Menu */}
      < NavigationMenu viewport={false} className="relative z-50" >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="navbar-button bg-transparent text-[clamp(1.125rem, 2vw, 1.375rem)]">
              More
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className="
                z-50 left-auto right-0
                bg-white/95
                backdrop-blur-xl shadow-xl
                border border-zinc-200
                dark:bg-zinc-900/95 dark:border-zinc-800
              "
            >
              <ul className="w-56 p-2 space-y-1">
                <NavItem
                  href="/faq"
                  icon={HelpCircle}
                  title="FAQ"
                  description="Common questions and answers"
                />
                <NavItem
                  href="/changelog"
                  icon={ScrollText}
                  title="Changelog"
                  description="See what's new and improved"
                />
                <NavItem
                  href={GITHUB_REPO_URL + "/issues"}
                  icon={Bug}
                  title="Report an Issue"
                  description="Found a bug? Let us know"
                  external
                />
                <NavItem
                  href="/terms-of-service"
                  icon={FileText}
                  title="Terms of Service"
                  description="Read our terms and conditions"
                />
                <NavItem
                  href="mailto:support@clipposaurus.com"
                  icon={Mail}
                  title="Contact Us"
                  description="Get in touch with support"
                  external
                />
                <li className="
                  h-px
                  my-2
                  bg-zinc-200
                  dark:bg-zinc-800
                " />
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
      </NavigationMenu >
      {/* Theme Toggle */}
      < AnimatedThemeToggler className="ml-1 text-zinc-900 transition-colors hover:text-emerald-600 dark:text-zinc-200 dark:hover:text-emerald-400" />
    </nav >
  );
});

NavbarLinks.displayName = "NavbarLinks";

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
            flex z-50
            gap-3 px-3 py-2
            text-sm
            rounded-xl
            transition-colors
            ${highlight
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
              : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60"}
          `}
        >
          <div className="flex flex-row gap-2">
            <Icon className="
            shrink-0
            h-4 w-4
            mt-0.5
            opacity-80
          " />
            <div className="font-medium">{title}</div>
          </div>
          <div>
            <div className="
              text-xs
              opacity-30
            ">{description}
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}