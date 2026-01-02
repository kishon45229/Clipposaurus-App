export const tabList = ["Note", "Code", "File"] as const;

export type TabType = (typeof tabList)[number];
