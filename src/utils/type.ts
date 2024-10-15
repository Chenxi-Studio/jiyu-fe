export const isArrayAllNumbers = (
  arr: Array<string | number>,
): arr is number[] => {
  return arr.every((item) => typeof item === "number");
};

export const pic2url = (picSrc: string | undefined): string => {
  return picSrc !== undefined && picSrc?.startsWith("http")
    ? picSrc
    : `https://${picSrc}`;
};
