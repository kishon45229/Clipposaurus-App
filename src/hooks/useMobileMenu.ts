"use client";

import React from "react";
import { useCreateDrop } from "@/contexts/CreateDropContext";

interface MobileMenuReturn {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleMobileMenuOpen: () => void;
  handleCloseMobileMenu: () => void;
}

export function useMobileMenu(): MobileMenuReturn {
  const { dropData, setCreateDropRequestStatus } = useCreateDrop();
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    React.useState<boolean>(false);

  const isNoContent =
    !dropData.textContent &&
    !dropData.codeContent /*&&
    dropData.files.length === 0*/;  // --> TEMPORARILY DISABLED

  const handleMobileMenuOpen = React.useCallback(() => {
    if (isNoContent) {
      setCreateDropRequestStatus("empty");
    } else {
      setIsMobileMenuOpen(true);
    }
  }, [isNoContent, setCreateDropRequestStatus]);

  const handleCloseMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    handleMobileMenuOpen,
    handleCloseMobileMenu,
  };
}
