import React from "react";
import { FileItem } from "@/types";
import { toast, updateToast, removeToast } from "./useToast";
import {
  getCurrentTotalSize,
  isOverLimit,
  processFileWithSizeCheck,
} from "@/lib/fileSizeCheck";

const handleError = (error: string) => {
  toast({
    variant: "destructive",
    title: "File Upload Error",
    description: error,
  });
};

export class FileProcessorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FileProcessorError";
  }
}

export function useFileProcessor(
  files: FileItem[],
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>
) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const currentTotalSize = React.useMemo(
    () => getCurrentTotalSize(files),
    [files]
  );

  const overLimit = React.useMemo(
    () => isOverLimit(currentTotalSize),
    [currentTotalSize]
  );

  const processFile = React.useCallback(
    async (
      file: File,
      onProgress?: (progress: number) => void
    ): Promise<FileItem> => {
      const toastId = toast({
        title: "Uploading File",
        description: `Processing ${file.name}...`,
        variant: "loading",
        progress: 0,
        duration: 0,
      });

      try {
        onProgress?.(10);
        updateToast(toastId, { progress: 10 });

        const processedFile = await processFileWithSizeCheck(
          currentTotalSize,
          file
        );

        onProgress?.(80);
        updateToast(toastId, { progress: 80 });

        onProgress?.(100);
        updateToast(toastId, { progress: 100 });

        setTimeout(() => {
          removeToast(toastId);
          toast({
            title: "Upload Complete",
            description: `Uploaded file '${file.name}'`,
            variant: "default",
            duration: 3000,
          });
        }, 500);

        return processedFile;
      } catch (error: unknown) {
        removeToast(toastId);
        toast({
          title: "Upload Failed",
          description: `Failed to process ${file.name}`,
          variant: "destructive",
          duration: 5000,
        });

        throw new FileProcessorError(
          error instanceof Error ? error.message : String(error)
        );
      }
    },
    [currentTotalSize]
  );

  const removeFile = React.useCallback(
    (id: string) => {
      setFiles((prev) => prev.filter((f) => f.id !== id));
    },
    [setFiles]
  );

  return {
    processFile,
    currentTotalSize,
    isOverLimit: overLimit,
    handleError,
    fileInputRef,
    removeFile,
  };
}
