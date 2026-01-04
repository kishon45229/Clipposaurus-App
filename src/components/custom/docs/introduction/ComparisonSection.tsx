import React from "react";
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface ComparisonSectionData {
  headers: string[];
  rows: string[][];
}

interface ComparisonSectionProps {
  section: DocsPageSection;
}

export const ComparisonSection = React.memo<ComparisonSectionProps>(({ section }) => {
  if (!section.data || !(typeof section.data === "object")) return null;

  const tableData = (section.data as unknown) as ComparisonSectionData;
  const { headers, rows } = tableData;

  return (
    <section id={section.id}>
      <div className="overflow-x-auto rounded-xl text-center">
        <table className="w-full border-collapse">
          <thead className="bg-zinc-100/50 dark:bg-zinc-900/30">
            <tr className="border-b border-zinc-300 dark:border-zinc-700 text-base md:text-lg">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`p-3 font-semibold w-1/2 ${index === 1 ? 'text-emerald-600 dark:text-emerald-500' : 'text-zinc-900 dark:text-zinc-300'}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 text-sm md:text-base">
                <td className="p-3 text-zinc-700 dark:text-zinc-400 text">{row[0]}</td>
                <td className="p-3 font-medium text-emerald-600 dark:text-emerald-600">
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
