import { $Activity } from "@/store/activity";
import { $Tag } from "@/store/tag";
import { $UI, type Tours } from "@/store/UI";
import { $User } from "@/store/user";
import Taro from "@tarojs/taro";

export const clearStore = (): void => {
  $User.init();
  $Activity.init();
  $UI.init();
  $Tag.init();
};

export const getTourStorage = (): Tours | undefined => {
  const value = Taro.getStorageSync<Tours | string>("tours");
  if (typeof value === "string") {
    return undefined;
  }
  return value;
};
