import { isValidOrigin } from "@/lib/component-data/config";
import { loadContentData } from "@/lib/component-data/loadContentData";
import getTimeout from "@/lib/timer";
import { validateComponentData } from "@/lib/validation";

export async function getComponentData<T = unknown>(
  componentId: string
): Promise<T> {
  if (!isValidOrigin(componentId))
    throw new Error(`Invalid component origin: ${componentId}`);

  try {
    const timeout: Promise<false> = getTimeout({
      interval: 5000,
      errMsg: `Overall ${componentId} data fetch timeout`,
    });

    const contentData = (await Promise.race([
      loadContentData(componentId),
      timeout,
    ])) as Record<string, unknown> | false;

    if (!contentData) {
      throw new Error(`Fallback data fetch failed for ${componentId}`);
    }

    if (!validateComponentData(contentData, componentId)) {
      throw new Error(`Data validation failed for component: ${componentId}`);
    }

    return contentData as unknown as T;
  } catch (error) {
    throw error;
  }
}
