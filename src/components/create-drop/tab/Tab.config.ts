export const tabList = ["Note", "Code"] as const;

export type TabType = (typeof tabList)[number];
