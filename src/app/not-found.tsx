"use client";

import { Button } from "@/components/ui/button";
import { Home, SearchX } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center h-[84dvh] px-4 text-center overflow-hidden">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <SearchX className="h-7 w-7" />
      </div>

      <div className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
        Oops… We couldn&apos;t find this page.
      </div>

      <div className="max-w-md text-base leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8">
        Just like a Clipposaurus drop, this page is no longer available. It may have moved, expired, or never existed at all.
      </div>

      <Button
        size="lg"
        onClick={() => router.push("/")}
        className="min-w-[220px] rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <Home className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
        Take me home
      </Button>
    </div>
  );
}
