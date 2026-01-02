export interface LineNumbersResult {
  numbers: number[];
  count: number;
  maxDigits: number;
}

export function computeLineNumbers(
  codeContent: string,
  MAX_LINES: number = 2000
): LineNumbersResult {
  const lines = codeContent.split("\n");
  const count = Math.max(lines.length, 1);
  const capped = Math.min(count, MAX_LINES);
  const numbers = Array.from({ length: capped }, (_, i) => i + 1);
  const maxDigits =
    numbers.length > 0 ? (numbers[numbers.length - 1] + "").length : 1;
  return { numbers, count, maxDigits };
}
