import React from "react";
import type { DocsSection, ContentData1 } from "@/types/docs";

interface ComparisonSectionProps {
  section: DocsSection & { data: ContentData1 };
}

export const ComparisonSection = React.memo<ComparisonSectionProps>(({ section }) => {
  const tableData = section.data as ContentData1;

  return (
    <section id={section.id}>
      <div className="overflow-x-auto rounded-xl border text-center border-zinc-200 dark:border-zinc-800">
        <table className="w-full border-collapse">
          <thead className="bg-zinc-100/50 dark:bg-zinc-900/30">
            <tr className="border-b border-zinc-300 dark:border-zinc-700 text-base md:text-lg">
              {tableData.headers.map((header: string, idx: number) => (
                <th
                  key={idx}
                  className="p-3 font-semibold text-zinc-900 dark:text-zinc-300 w-1/2"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {tableData.rows.map((row: string[], idx: number) => (
              <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 text-sm md:text-base">
                <td className="p-3 text-zinc-700 dark:text-zinc-400 text">{row[0]}</td>
                <td className="p-3 font-medium text-zinc-900 dark:text-zinc-300">
                  {row[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
});

ComparisonSection.displayName = 'ComparisonSection';
