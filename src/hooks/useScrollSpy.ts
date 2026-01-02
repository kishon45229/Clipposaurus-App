"use client";

import { useEffect, useState } from "react";

export const useScrollSpy = (
  sectionIds: string[],
  offset: number = 100,
  containerId?: string
) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const container = containerId
      ? (document.getElementById(containerId) as HTMLElement | null)
      : null;
    const target: HTMLElement | Window = container || window;

    const getScrollPosition = () => {
      if (container) return container.scrollTop + offset;
      return window.scrollY + offset;
    };

    const getElementTop = (el: HTMLElement) => {
      if (!container) return el.offsetTop;
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      return elRect.top - containerRect.top + container.scrollTop;
    };

    const handleScroll = () => {
      const scrollPosition = getScrollPosition();

      const elems = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (elems.length === 0) return;

      let current = "";

      // Find the last element that is above the scroll position
      for (let i = elems.length - 1; i >= 0; i--) {
        const el = elems[i];
        if (el && getElementTop(el) <= scrollPosition) {
          current = el.id;
          break;
        }
      }

      if (!current && sectionIds.length > 0) {
        current = sectionIds[0];
      }

      setActiveSection(current);
    };

    // Initial check
    handleScroll();

    const opts: AddEventListenerOptions | boolean = { passive: true };
    target.addEventListener("scroll", handleScroll, opts);
    if (target === window) {
      window.addEventListener("resize", handleScroll as EventListener, opts);
    }

    return () => {
      target.removeEventListener("scroll", handleScroll, opts);
      if (target === window) {
        window.removeEventListener(
          "resize",
          handleScroll as EventListener,
          opts
        );
      }
    };
  }, [sectionIds, offset, containerId]);

  return activeSection;
};
