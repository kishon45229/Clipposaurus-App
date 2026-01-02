"use client";

import { useDropSessionCleanup } from "@/hooks/useDropSessionCleanup";

/**
 * COMPONENT THAT MONITORS NAVIGATION AND CLEARS DROP SESSION STORAGE
 */
export function DropSessionMonitor() {
    useDropSessionCleanup();
    return null;
}