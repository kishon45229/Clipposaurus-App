// TEMPORARILY DISABLED

// "use client";

// import React, { createContext, useContext } from "react";
// import type { FileItem } from "@/types";
// import { useCreateDrop } from "./CreateDropContext";
// import { useFileProcessor } from "@/hooks/useFileProcessor";
// import { useDragAndDrop } from "@/hooks/useDragAndDrop";

// interface FileTabContextValue {
//     // File state
//     files: FileItem[];
//     setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;

//     // File processing
//     currentTotalSize: number;
//     isOverLimit: boolean;
//     removeFile: (id: string) => void;
//     fileInputRef: React.RefObject<HTMLInputElement | null>;
//     handleError: (error: string) => void;

//     // Drag and drop
//     handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
//     handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
//     handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
//     handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
//     handlePaste: (e: React.ClipboardEvent<HTMLDivElement>) => void;
//     handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>, ref: React.RefObject<HTMLInputElement | null>) => void;
//     isDragOver: boolean;
// }

// const FileTabContext = createContext<FileTabContextValue | null>(null);

// interface FileTabProviderProps {
//     children: React.ReactNode;
// }

// export function FileTabProvider({ children }: FileTabProviderProps): React.ReactElement {
//     const { dropData, setFiles } = useCreateDrop();
//     const files = dropData.files;

//     // File processing hook
//     const {
//         currentTotalSize,
//         isOverLimit,
//         handleError,
//         fileInputRef,
//         removeFile,
//     } = useFileProcessor(files, setFiles);

//     // Drag and drop hook
//     const {
//         handleDragEnter,
//         handleDragLeave,
//         handleDragOver,
//         handleDrop,
//         handlePaste,
//         handleFileSelect,
//         isDragOver,
//     } = useDragAndDrop({
//         currentTotalSize,
//         setFiles,
//         onError: handleError,
//     });

//     const contextValue: FileTabContextValue = React.useMemo(() => ({
//         // File state
//         files,
//         setFiles,

//         // File processing
//         currentTotalSize,
//         isOverLimit,
//         removeFile,
//         fileInputRef,
//         handleError,

//         // Drag and drop
//         handleDragEnter,
//         handleDragLeave,
//         handleDragOver,
//         handleDrop,
//         handlePaste,
//         handleFileSelect,
//         isDragOver,
//     }), [
//         files,
//         setFiles,
//         currentTotalSize,
//         isOverLimit,
//         removeFile,
//         fileInputRef,
//         handleError,
//         handleDragEnter,
//         handleDragLeave,
//         handleDragOver,
//         handleDrop,
//         handlePaste,
//         handleFileSelect,
//         isDragOver,
//     ]);

//     return (
//         <FileTabContext.Provider value={contextValue}>
//             {children}
//         </FileTabContext.Provider>
//     );
// };

// /**
//  * Custom hook to use FileTab context
//  * @returns FileTabContextValue
//  * @throws Error if used outside FileTabProvider
//  */
// export const useFileTab = (): FileTabContextValue => {
//     const context = useContext(FileTabContext);
//     if (!context) {
//         throw new Error("useFileTab must be used within a FileTabProvider");
//     }
//     return context;
// };