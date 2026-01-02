import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import {
  validateTabList,
  getDefaultTabFromUrl,
} from "@/components/custom/create-drop/tab/Tab.utils";
import { tabList } from "@/components/custom/create-drop/tab/Tab.config";

export const useTabNavigation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  validateTabList(tabList);

  const defaultTab = getDefaultTabFromUrl(searchParams);

  React.useEffect(() => {
    if (!searchParams.get("tab")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", "note");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router]);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return { defaultTab, handleTabChange };
};
