import React from "react";
import type { DragAndDropOptions } from "@/types";
import { processFileWithSizeCheck } from "@/lib/fileSizeCheck";

class DragAndDropError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DragAndDropError";
  }
}

export function useDragAndDrop({
  processFile,
  currentTotalSize,
  setFiles,
  onError,
}: Omit<DragAndDropOptions, "setIsDragOver" | "fileInputRef">) {
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false);

  const fileProcessor = React.useMemo(() => {
    return (
      processFile ||
      ((file: File) => processFileWithSizeCheck(currentTotalSize || 0, file))
    );
  }, [processFile, currentTotalSize]);

  const handleDragEnter = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver?.(true);
    },
    [setIsDragOver]
  );

  const handleDragLeave = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver?.(false);
    },
    [setIsDragOver]
  );

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = React.useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver?.(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length > 0) {
        try {
          for (const file of droppedFiles) {
            try {
              const processedFile = await fileProcessor(file);
              setFiles((prev) => [...prev, processedFile]);
            } catch (error) {
              throw new DragAndDropError(
                error instanceof Error
                  ? error.message
                  : `Failed to process ${file.name}`
              );
            }
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to process dropped files";
          onError?.(errorMessage);
        }
      }
    },
    [fileProcessor, setFiles, setIsDragOver, onError]
  );

  const handlePaste = React.useCallback(
    async (e: React.ClipboardEvent) => {
      const items = Array.from(e.clipboardData.items);
      const filesToProcess: File[] = [];

      for (const item of items) {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) {
            filesToProcess.push(file);
          }
        }
      }

      if (filesToProcess.length > 0) {
        e.preventDefault();
        try {
          for (const file of filesToProcess) {
            try {
              const processedFile = await fileProcessor(file);
              setFiles((prev) => [...prev, processedFile]);
            } catch (error) {
              console.error(`Error processing file ${file.name}:`, error);
              throw new DragAndDropError(
                error instanceof Error
                  ? error.message
                  : `Failed to process ${file.name}`
              );
            }
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to process pasted files";
          onError?.(errorMessage);
          throw new DragAndDropError(errorMessage);
        }
      }
    },
    [fileProcessor, setFiles, onError]
  );

  const handleFileSelect = React.useCallback(
    async (
      e: React.ChangeEvent<HTMLInputElement>,
      fileInputRef?: React.RefObject<HTMLInputElement | null>
    ) => {
      const selectedFiles = Array.from(e.target.files || []);
      if (selectedFiles.length > 0) {
        try {
          for (const file of selectedFiles) {
            try {
              const processedFile = await fileProcessor(file);
              setFiles((prev) => [...prev, processedFile]);
            } catch (error: unknown) {
              throw new DragAndDropError(
                error instanceof Error
                  ? error.message
                  : `Failed to process ${file.name}`
              );
            }
          }
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to process selected files";
          onError?.(errorMessage);
          throw new DragAndDropError(errorMessage);
        }
      }

      if (fileInputRef?.current) {
        fileInputRef.current.value = "";
      }
    },
    [fileProcessor, setFiles, onError]
  );

  return {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handlePaste,
    handleFileSelect,
    isDragOver,
  };
}
