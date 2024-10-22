export const isArrayAllNumbers = (
  arr: Array<string | number>,
): arr is number[] => {
  return arr.every((item) => typeof item === "number");
};

export const pic2url = (picSrc: string | undefined): string => {
  if (picSrc === null) return "https://null"; // 默认图
  if (picSrc !== undefined && picSrc.startsWith("wxfile")) return picSrc;
  return picSrc !== undefined && picSrc?.startsWith("http")
    ? picSrc
    : `https://${picSrc}`;
};
