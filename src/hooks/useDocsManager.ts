"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDocsComponent } from "@/contexts/ComponentDataContext";
import {
  DocsComponent,
  DocsPage,
  DocsPageSection,
} from "@/types/contentData-types/docs-types";

interface Step {
  title: string;
}

interface Heading {
  id: string;
  title: string;
  level: number;
  offset: number;
}

export interface UseDocsManagerReturn {
  // Data
  data: DocsComponent | undefined;
  currentPageId: string;
  currentPage: DocsPage | undefined;

  // States
  isLoading: boolean;
  error: Error | null;

  // Table of contents (headings)
  headings: Array<{
    id: string;
    title: string;
    level: number;
    offset: number;
  }>;
  activeId: string;

  // Feedback
  isSubmittingFeedback: boolean;

  // Language styles for SupportedLanguagesSection
  languageStyles: Array<{
    lang: string;
    fontSize: number;
    opacity: number;
    emerald: boolean;
  }>;

  // TOC actions
  scrollToHeading: (id: string) => void;

  // Navigation functions
  navigateToPage: (pageId: string) => void;
  navigateToNext: () => void;
  navigateToPrevious: () => void;

  // Feedback functions
  submitFeedback: (type: "like" | "dislike") => Promise<void>;

  // Helper functions
  getPageById: (pageId: string) => DocsPage | undefined;
  getAllPages: () => DocsPage[];
}

export const useDocsManager = (): UseDocsManagerReturn => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = searchParams?.get("page");

  const { data, isLoading, error } = useDocsComponent();

  const defaultPageId = pageFromUrl || data?.defaultPage || "introduction";
  const [currentPageId, setCurrentPageId] = React.useState(defaultPageId);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = React.useState(false);
  const [headings, setHeadings] = React.useState<Heading[]>([]);

  const [activeId, setActiveId] = React.useState<string>("");

  // Update currentPageId when URL changes or data loads
  React.useEffect(() => {
    if (pageFromUrl && pageFromUrl !== currentPageId) {
      setCurrentPageId(pageFromUrl);
    } else if (
      !pageFromUrl &&
      data?.defaultPage &&
      currentPageId !== data.defaultPage
    ) {
      setCurrentPageId(data.defaultPage);
    }
  }, [pageFromUrl, data?.defaultPage, currentPageId]);

  // Get current page data
  const currentPage = React.useMemo(() => {
    return data?.pages?.find((page) => page.id === currentPageId);
  }, [data?.pages, currentPageId]);

  // Navigation function
  const navigateToPage = React.useCallback(
    (pageId: string) => {
      setCurrentPageId(pageId);
      router.push(`/docs?page=${pageId}`, { scroll: false });
    },
    [router]
  );

  // Navigate to next page
  const navigateToNext = React.useCallback(() => {
    if (!data?.pages) return;
    const currentIndex = data.pages.findIndex(
      (page) => page.id === currentPageId
    );
    if (currentIndex >= 0 && currentIndex < data.pages.length - 1) {
      const nextPage = data.pages[currentIndex + 1];
      navigateToPage(nextPage.id);
    }
  }, [data?.pages, currentPageId, navigateToPage]);

  // Navigate to previous page
  const navigateToPrevious = React.useCallback(() => {
    if (!data?.pages) return;
    const currentIndex = data.pages.findIndex(
      (page) => page.id === currentPageId
    );
    if (currentIndex > 0) {
      const previousPage = data.pages[currentIndex - 1];
      navigateToPage(previousPage.id);
    }
  }, [data?.pages, currentPageId, navigateToPage]);

  // Helper function to get page by ID
  const getPageById = React.useCallback(
    (pageId: string) => {
      return data?.pages?.find((page) => page.id === pageId);
    },
    [data?.pages]
  );

  // Helper function to get all pages
  const getAllPages = React.useCallback(() => {
    return data?.pages || [];
  }, [data?.pages]);

  // Language styles for SupportedLanguagesSection
  const [languageStyles, setLanguageStyles] = React.useState<
    Array<{
      lang: string;
      fontSize: number;
      opacity: number;
      emerald: boolean;
    }>
  >([]);

  React.useEffect(() => {
    // Find the supported languages section in the current page
    const supportedLanguagesSection = currentPage?.sections?.find(
      (section: DocsPageSection) => section.id === "supported-languages"
    );

    if (!supportedLanguagesSection?.data?.languages) {
      setLanguageStyles([]);
      return;
    }

    const languages = supportedLanguagesSection.data.languages as string[];
    const shuffled = [...languages].sort(() => Math.random() - 0.5);

    const styles = shuffled.map((lang: string) => ({
      lang,
      fontSize:
        Math.random() < 0.15
          ? Math.random() * (1.2 - 0.7) + 1
          : Math.random() < 0.5
          ? Math.random() * (2.2 - 1.2) + 1
          : Math.random() * (4.5 - 2.2) + 1,
      opacity: Math.random() * (1 - 0.65) + 0.65,
      emerald: Math.random() > 0.7,
    }));

    setLanguageStyles(styles);
  }, [currentPage]);

  // Extract headings from currentPage sections
  React.useEffect(() => {
    if (!currentPage) {
      setHeadings([]);
      return;
    }

    const extracted: typeof headings = [];

    currentPage.sections.forEach((section: DocsPageSection, index: number) => {
      if (section.title) {
        const id = section.id
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-");

        extracted.push({
          id,
          title: section.title,
          level: 2,
          offset: index * 1000,
        });
      }

      // Quick-start steps - extract step headings if section has step-based data
      if (
        currentPage.id === "quick-start" &&
        section.data &&
        Array.isArray(section.data)
      ) {
        section.data.forEach((step: Step, stepIndex: number) => {
          if (step.title) {
            const stepId = step.title
              .toLowerCase()
              .replace(/^step \d+:\s*/i, "")
              .replace(/[^a-z0-9\s]/g, "")
              .replace(/\s+/g, "-");

            extracted.push({
              id: stepId,
              title: step.title.replace(/^Step \d+:\s*/i, ""),
              level: 3,
              offset: index * 1000 + stepIndex * 100,
            });
          }
        });
      }
    });

    setHeadings(extracted);
  }, [currentPage]);

  // Scroll handling to set active heading
  React.useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      const elems = headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean) as HTMLElement[];

      if (elems.length === 0) return;

      let current = "";

      for (let i = elems.length - 1; i >= 0; i--) {
        const el = elems[i];
        if (el && el.offsetTop <= scrollPosition) {
          current = el.id;
          break;
        }
      }

      if (!current && headings.length > 0) {
        current = headings[0].id;
      }

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [headings]);

  const scrollToHeading = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const submitFeedback = React.useCallback(
    async (type: "like" | "dislike") => {
      if (!currentPageId || isSubmittingFeedback) return;

      setIsSubmittingFeedback(true);

      try {
        const response = await fetch("/api/docs-feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pageId: currentPageId,
            type,
          }),
        });
      } catch (error) {
        console.error("Error submitting feedback:", error);
      } finally {
        setIsSubmittingFeedback(false);
      }
    },
    [currentPageId, isSubmittingFeedback]
  );

  return {
    // Data
    data,
    currentPageId,
    currentPage,

    // States
    isLoading,
    error,

    // Table of contents
    headings,
    activeId,

    // Feedback
    isSubmittingFeedback,

    // Language styles
    languageStyles,

    // TOC actions
    scrollToHeading,

    // Navigation functions
    navigateToPage,
    navigateToNext,
    navigateToPrevious,

    // Feedback functions
    submitFeedback,

    // Helper functions
    getPageById,
    getAllPages,
  };
};
