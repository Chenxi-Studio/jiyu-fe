import { api } from "@/api";
import instance from "@/api/axios";
import { $Tag } from "@/store/tag";
import { $User } from "@/store/user";
import { RoleLevel } from "@/types/entity/const";
import { type PickerOption } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";

export const windowWidth = Taro.getSystemInfoSync().windowWidth;
export const windowHeight = Taro.getSystemInfoSync().windowHeight;

export const rpx2px = (rpx: number): number => rpx * (windowWidth / 750);

export const px2rpx = (px: number): number => px * (750 / windowWidth);

export const formatDate = (
  startTime: Date | undefined | null,
  withMinute = true,
  withYear = true,
): string => {
  if (startTime === null) return "未配置时间";
  if (startTime === undefined) return "未配置时间";
  let formattedDate = "";
  if (withYear) {
    const year = startTime.getFullYear();
    const month = ("0" + (startTime.getMonth() + 1)).slice(-2); // 月份从0开始，所以需要+1
    const day = ("0" + startTime.getDate()).slice(-2);
    formattedDate += `${year}/${month}/${day}`;
  }

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

export const convertDates = (obj: any): any => {
  // 如果 obj 是 null 或不是对象，则直接返回
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 初始化返回结果，如果是数组则初始化为空数组，否则为空对象
  const result = Array.isArray(obj) ? [] : {};

  // 如果 obj 是数组，遍历数组中的每个元素
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      result[index] = convertDates(item);
    });
  } else {
    // 如果 obj 是对象，遍历其所有属性
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      // 如果属性名包含 "Time" 并且属性值是字符串，尝试转换为 Date 对象
      if (key.includes("Time") && typeof value === "string") {
        const dateValue = new Date(value);
        // 检查转换是否成功（即字符串是否代表有效的日期）
        if (!Number.isNaN(dateValue.getTime())) {
          result[key] = dateValue;
        } else {
          // 如果转换失败，保持原样
          result[key] = value;
        }
      } else {
        // 否则，递归调用转换函数
        result[key] = convertDates(value);
      }
    });
  }

  return result;
};

export const dateBoundary = (start: Date, end: Date): string => {
  const startTime = formatDate(start);
  const endTime = formatDate(end);
  const startTimeMatch = startTime.match(/^[0-9]*\/[0-9]*\/[0-9]*/);
  const endTimeMatch = endTime.match(/^[0-9]*\/[0-9]*\/[0-9]*/);
  if (
    startTimeMatch !== null &&
    endTimeMatch !== null &&
    startTime[0] === endTime[0]
  ) {
    return `${startTime}-${endTime.replace(/^[0-9]*\/[0-9]*\/[0-9]*[\s]/, "")}`;
  }
  return `${startTime}-${endTime}`;
};

export const setJWT = async (jwt: string): Promise<void> => {
  instance.defaults.headers.common.Authorization = `Bearer ${jwt}`;
  $User.update("prod jwt", (draft) => {
    draft.jwt = jwt;
  });
  const self = await api.user.self();
  $User.update("update avatar", (draft) => {
    draft = {
      ...draft,
      ...self,
    };
    return draft;
  });
  console.log("self", self, $User.get());
  if (self.roleLevel !== undefined && self.roleLevel >= RoleLevel.Admin) {
    const classes = await api.tag.basicGet("class");
    const majors = await api.tag.basicGet("major");
    const grades = await api.tag.basicGet("grade");
    const tags = await api.tag.tagsGet();
    $Tag.update("fetch tag", (draft) => {
      draft.classes = classes.map((item) => item.name);
      draft.grades = grades.map((item) => item.name);
      draft.majors = majors.map((item) => item.name);
      draft.tags = tags;
    });
    console.log(tags, grades, majors, classes);
  }
};

export const rpx2str = (rpx: number): string => {
  return `${rpx}rpx`;
};

export function approximatelyEqual(
  a: number,
  b: number,
  epsilon: number = Number.EPSILON,
): boolean {
  return Math.abs(a - b) < epsilon;
}
