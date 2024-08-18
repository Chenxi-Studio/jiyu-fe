export const isArrayAllNumbers = (
  arr: Array<string | number>,
): arr is number[] => {
  return arr.every((item) => typeof item === "number");
};
