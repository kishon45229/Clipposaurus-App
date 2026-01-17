import { tabList } from "./Tab.config";

export const validateTabList = (list: readonly string[]) => {
  if (!list || list.length !== 2 /* list.length !== 3 */) {
    throw new Error("tabList prop must be an array of two strings.");
  }
};

export const getValidTabs = (list: readonly string[]) =>
  list.map((tab) => tab.toLowerCase());

export const getDefaultTab = (tabFromUrl: string | null, validTabs: string[]) =>
  validTabs.includes(tabFromUrl || "") ? (tabFromUrl as string) : "note";

export const getDefaultTabFromUrl = (searchParams: URLSearchParams) => {
  const tabFromUrl = searchParams.get("tab");
  const validTabs = getValidTabs(tabList);
  return getDefaultTab(tabFromUrl, validTabs);
};
