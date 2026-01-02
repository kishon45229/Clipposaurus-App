import { useState, useCallback } from "react";

export interface Toast {
  id: string;
  title?: string;
  description: string;
  variant?: "default" | "destructive" | "loading";
  duration?: number;
  progress?: number; 
}

let globalToasts: Toast[] = [];
let globalSetToasts: ((toasts: Toast[]) => void) | null = null;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  if (!globalSetToasts) {
    globalSetToasts = setToasts;
    globalToasts = toasts;
  }

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, duration: 5000, ...toast };

    const updatedToasts = [...globalToasts, newToast];
    globalToasts = updatedToasts;

    if (globalSetToasts) {
      globalSetToasts(updatedToasts);
    }

    setTimeout(() => {
      const filteredToasts = globalToasts.filter((t) => t.id !== id);
      globalToasts = filteredToasts;
      if (globalSetToasts) {
        globalSetToasts(filteredToasts);
      }
    }, newToast.duration);

    return id;
  }, []);

  const updateToast = useCallback((id: string, updates: Partial<Toast>) => {
    const toastIndex = globalToasts.findIndex((t) => t.id === id);
    if (toastIndex !== -1) {
      globalToasts[toastIndex] = { ...globalToasts[toastIndex], ...updates };
      if (globalSetToasts) {
        globalSetToasts([...globalToasts]);
      }
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    const filteredToasts = globalToasts.filter((t) => t.id !== id);
    globalToasts = filteredToasts;
    if (globalSetToasts) {
      globalSetToasts(filteredToasts);
    }
  }, []);

  const toast = useCallback(
    (toast: Omit<Toast, "id">) => {
      return addToast(toast);
    },
    [addToast]
  );

  return {
    toasts,
    toast,
    updateToast,
    removeToast,
  };
}

export function toast(toastData: Omit<Toast, "id">) {
  const id = Math.random().toString(36).substr(2, 9);
  const newToast = { id, duration: 5000, ...toastData };

  const updatedToasts = [...globalToasts, newToast];
  globalToasts = updatedToasts;

  if (globalSetToasts) {
    globalSetToasts(updatedToasts);
  }

  if (newToast.variant !== "loading") {
    setTimeout(() => {
      const filteredToasts = globalToasts.filter((t) => t.id !== id);
      globalToasts = filteredToasts;
      if (globalSetToasts) {
        globalSetToasts(filteredToasts);
      }
    }, newToast.duration);
  }

  return id;
}

export function updateToast(id: string, updates: Partial<Toast>) {
  const toastIndex = globalToasts.findIndex((t) => t.id === id);
  if (toastIndex !== -1) {
    globalToasts[toastIndex] = { ...globalToasts[toastIndex], ...updates };
    if (globalSetToasts) {
      globalSetToasts([...globalToasts]);
    }
  }
}

export function removeToast(id: string) {
  const filteredToasts = globalToasts.filter((t) => t.id !== id);
  globalToasts = filteredToasts;
  if (globalSetToasts) {
    globalSetToasts(filteredToasts);
  }
}
