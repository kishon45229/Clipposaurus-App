import { cache } from "react";
import loadJsonFile from "@/lib/jsonUtils";
import getTimeout from "@/lib/timer";

export const loadContentData = cache(async (componentId: string): Promise<unknown> => {
  if (!componentId || typeof componentId !== "string" || componentId.trim() === "") {
    throw new Error(`Invalid componentId: "${componentId}" received`);
  }

  try {
    const findJsonTimeout: Promise<false> = getTimeout({
      interval: 3000,
      errMsg: "JSON file search timeout",
    });

    const jsonData: object | false = (await Promise.race([
      loadJsonFile(`${componentId}.json`),
      findJsonTimeout,
    ])) as object | false;

    if (!jsonData || typeof jsonData !== "object") {
      throw new Error(
        `Failed to load fallback JSON file or file is invalid for ${componentId}`
      );
    }

    return jsonData;
  } catch (error: unknown) {
    throw error;
  }
});
