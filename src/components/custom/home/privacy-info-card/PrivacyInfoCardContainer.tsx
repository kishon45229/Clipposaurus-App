"use client";

import React from "react";
import { usePrivacyInfoCard } from "@/contexts/PrivacyInforCardContext";
import { PrivacyInfoContentSkeleton } from "@/components/skeleton/PrivacyInfoContentSkeleton";
import { PrivacyInfoCardContent } from "@/components/custom/home/privacy-info-card/PrivacyInfoCardContent";
import { ComponentError } from "@/components/custom/ComponentError";

const COMPONENT_ID = "PrivacyInfoCardComponent" as const;

/**
 * PrivacyInfoCardContainer component
 * @returns PrivacyInfoCardContainer component
 */
export const PrivacyInfoCardContainer: React.FC = React.memo(() => {
  const { data, isLoading, error } = usePrivacyInfoCard();

  if (isLoading || !data) return <PrivacyInfoContentSkeleton />;
  if (error) return <ComponentError componentId={COMPONENT_ID} />;

  return <PrivacyInfoCardContent />;
});

PrivacyInfoCardContainer.displayName = "PrivacyInfoCardContainer";
