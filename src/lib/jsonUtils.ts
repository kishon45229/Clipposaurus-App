import getTimeout from "./timer";

/**
 * Imports a JSON file from /component data.
 * @param fileName JSON file name.
 */
export default async function loadJsonFile(
  fileName: string
): Promise<object | false> {
  if (!fileName || typeof fileName !== "string") return false;
  if (!fileName.endsWith(".json")) return false;

  try {
    const readTimeout: Promise<false> = getTimeout({
      interval: 2000,
      errMsg: "File import operation timed out",
    });

    const jsonModulePromise = import(`@/data/${fileName}`);
    const jsonModule = await Promise.race([jsonModulePromise, readTimeout]);

    if (!jsonModule || typeof jsonModule !== "object") return false;

    const jsonData = JSON.parse(JSON.stringify(jsonModule.default));

    if (typeof jsonData !== "object" || jsonData === null) return false;

    return jsonData;
  } catch (error) {
    throw error;
  }
}
