"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { BookOpen, Star } from "lucide-react";
import { useGitHubStars } from "@/hooks/useGitHubStars";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { ResourcesMenu } from "./ResourcesMenu";
import { HelpMenu } from "./HelpMenu";
import { useRedirects } from "@/hooks/useRedirect";

export const NavbarLinks = () => {
  const stars = useGitHubStars();
  const { handleRedirectToDocs, handleRedirectToGitHub } = useRedirects();

  return (
    <nav className="hidden sm:flex items-center gap-1.5" role="navigation" aria-label="Main navigation">
      {/* Docs */}
      <Button
        variant="ghost"
        onClick={handleRedirectToDocs}
        className="h-10 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-200 cursor-target"
      >
        <BookOpen className="w-4 h-4 mr-2" />
        <span>Docs</span>
      </Button>

      {/* GitHub */}
      <Button
        variant="ghost"
        onClick={handleRedirectToGitHub}
        className="h-10 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-200 cursor-target"
      >
        <FontAwesomeIcon icon={faGithub} className="w-4 h-4 mr-2" />
        <Star className="w-3.5 h-3.5 mr-1 fill-yellow-500 text-yellow-500" />
        <span>{stars}</span>
      </Button>

      {/* Resources Menu */}
      <ResourcesMenu />

      {/* Help Menu */}
      <HelpMenu />

      {/* Divider */}
      <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1" />

      {/* Theme Toggle */}
      <AnimatedThemeToggler className="h-10 w-10 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-200 cursor-target" />
    </nav>
  );
};