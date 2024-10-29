export const convertNameToTitle = (name: string): string => {
  const words = name
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1));

  return words.join(" ");
};
