/**
 * Utility functions for showcase content management
 */

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  return date.toLocaleString();
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getCodeFromUrl = (): string | null => {
  if (typeof window === "undefined") return null;

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("code");
};

export const downloadFileWithFallback = async (
  url: string,
  fileName: string,
  dropKey?: string
): Promise<void> => {
  // For our encrypted files, use proxy download method first if drop key is provided
  if (dropKey) {
    try {
      const proxyResponse = await fetch("/api/proxy-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, fileName, dropKey }),
      });

      if (proxyResponse.ok) {
        const blob = await proxyResponse.blob();
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = fileName;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
          window.URL.revokeObjectURL(downloadUrl);
        }, 100);

        return; // Success, exit early
      } else {
        throw new Error(
          `Proxy download failed with status: ${proxyResponse.status}`
        );
      }
    } catch (proxyError) {
      console.error(
        "Proxy download failed, trying direct approach:",
        proxyError
      );
    }
  }

  // Fallback: Direct fetch (for non-encrypted files or if proxy fails)
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      window.URL.revokeObjectURL(downloadUrl);
    }, 100);
  } catch (error) {
    console.error("Both download methods failed:", error);

    // Final fallback: Open in new tab
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) {
      newWindow.document.title = `Download: ${fileName}`;
    }
  }
};

export const copyTextToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy text to clipboard:", error);
    return false;
  }
};
