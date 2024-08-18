import { type PickerOption } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";

export const windowWidth = Taro.getSystemInfoSync().windowWidth;
export const windowHeight = Taro.getSystemInfoSync().windowHeight;

export const rpx2px = (rpx: number): number => rpx * (windowWidth / 750);

export const px2rpx = (px: number): number => px * (750 / windowWidth);

export const formatDate = (
  startTime: Date,
  withMinute: boolean = true,
): string => {
  const options = withMinute
    ? {
        year: "numeric" as const,
        month: "2-digit" as const,
        day: "2-digit" as const,
        hour: "2-digit" as const,
        minute: "2-digit" as const,
      }
    : {
        year: "numeric" as const,
        month: "2-digit" as const,
        day: "2-digit" as const,
      };
  const formatter = new Intl.DateTimeFormat("ch", options);
  const formattedDate = formatter.format(startTime);

  return formattedDate;
};

export const dateFormatter = (
  type: string,
  option: PickerOption,
): PickerOption => {
  switch (type) {
    case "year":
      option.text += "";
      break;
    case "month":
      option.text += "月";
      break;
    case "day":
      option.text += "日";
      break;
    case "hour":
      option.text += "时";
      break;
    case "minute":
      option.text += "分";
      break;
    default:
      option.text += "";
  }
  return option;
};
