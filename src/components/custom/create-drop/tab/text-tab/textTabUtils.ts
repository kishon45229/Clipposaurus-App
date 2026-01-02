const countChars = (text: string) => {
  if (!text) return 0;
  return text.length;
};

const truncateToChars = (text: string, max: number) => {
  if (!text) return text;
  if (text.length <= max) return text;
  return text.slice(0, max);
};

export { countChars, truncateToChars };
