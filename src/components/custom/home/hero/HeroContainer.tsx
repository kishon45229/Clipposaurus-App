"use client";

import React from "react";
import { useHero } from "@/contexts/HeroContext";
import { HeroSkeleton } from "@/components/skeleton/HeroSkeleton";
import { HeroContent } from "@/components/custom/home/hero/HeroContent";
import { ComponentError } from "@/components/custom/ComponentError";

const COMPONENT_ID = "HeroComponent" as const;

/**
 * HeroContainer component
 * @returns HeroContainer component
 */
export const HeroContainer: React.FC = React.memo(() => {
  const { data, isLoading, error } = useHero();

  if (isLoading || !data) return <HeroSkeleton />;
  if (error) return <ComponentError componentId={COMPONENT_ID} />;

  return <HeroContent />;
});

HeroContainer.displayName = "HeroContainer";
