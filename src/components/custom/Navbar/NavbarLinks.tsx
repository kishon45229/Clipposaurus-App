"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { BookOpen, Star } from "lucide-react";
import { useGitHubStars } from "@/hooks/useGitHubStars";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { GITHUB_REPO_URL } from "@/constants/githubConfig";
import { MoreMenu } from "./MoreMenu";

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3001";

export const NavbarLinks = React.memo(() => {
  const stars = useGitHubStars();

  return (
    <nav className="hidden sm:flex items-center gap-2" role="navigation" aria-label="Main navigation">
      {/* Docs */}
      < Button
        variant="ghost"
        onClick={() => window.open(DOCS_URL)}
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

      <MoreMenu />

      {/* Theme Toggle */}
      < AnimatedThemeToggler className="ml-1 text-zinc-900 transition-colors hover:text-emerald-600 dark:text-zinc-200 dark:hover:text-emerald-400" />
    </nav >
  );
});

NavbarLinks.displayName = "NavbarLinks";