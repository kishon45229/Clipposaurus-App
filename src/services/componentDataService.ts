import { validateComponentData } from "@/lib/validation";
import { sanitizeObject } from "@/lib/sanitization";
import { isValidOrigin } from "@/lib/page-data/config";
import { loadFallbackData } from "@/lib/page-data/fallbackData";
import getTimeout from "@/lib/timer";

export async function getComponentData<T = unknown>(
  componentId: string
): Promise<T> {
  if (!isValidOrigin(componentId)) throw new Error(`Invalid component origin: ${componentId}`);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`/api/component-data/${componentId}`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    const data = await response.json();
    if (!validateComponentData(data, componentId))
      throw new Error(`Data validation failed for ${componentId}`);

    const sanitizedData = sanitizeObject(data);
    return sanitizedData as unknown as T;
  } catch {
    const fallbackTimeout: Promise<false> = getTimeout({
      interval: 5000,
      errMsg: `Overall ${componentId} data fetch timeout`,
    });

    const fallbackData = (await Promise.race([
      loadFallbackData(componentId),
      fallbackTimeout,
    ])) as Record<string, unknown> | false;

    if (!fallbackData) {
      throw new Error(`Fallback data fetch failed for ${componentId}`);
    }

    return fallbackData as unknown as T;
  }
}
