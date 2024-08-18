import { type PickerOption } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";

export const windowWidth = Taro.getSystemInfoSync().windowWidth;
export const windowHeight = Taro.getSystemInfoSync().windowHeight;

export const rpx2px = (rpx: number): number => rpx * (windowWidth / 750);

export const px2rpx = (px: number): number => px * (750 / windowWidth);

export const formatDate = (startTime, withMinute = true) => {
  const year = startTime.getFullYear();
  const month = ("0" + (startTime.getMonth() + 1)).slice(-2); // 月份从0开始，所以需要+1
  const day = ("0" + startTime.getDate()).slice(-2);
  let formattedDate = `${year}-${month}-${day}`;

  if (withMinute) {
    const hour = ("0" + startTime.getHours()).slice(-2);
    const minute = ("0" + startTime.getMinutes()).slice(-2);
    formattedDate += ` ${hour}:${minute}`;
  }

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
