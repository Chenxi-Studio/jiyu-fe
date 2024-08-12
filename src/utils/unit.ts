import Taro from "@tarojs/taro";

export const windowWidth = Taro.getSystemInfoSync().windowWidth;
export const windowHeight = Taro.getSystemInfoSync().windowHeight;

export const rpx2px = (rpx: number): number => rpx * (windowWidth / 750);

export const px2rpx = (px: number): number => px * (750 / windowWidth);

export const formatDate = (startTime: Date): string => {
  const options = {
    year: "numeric" as const,
    month: "2-digit" as const,
    day: "2-digit" as const,
  };
  const formatter = new Intl.DateTimeFormat("ch", options);
  const formattedDate = formatter.format(startTime);

  return formattedDate;
};
