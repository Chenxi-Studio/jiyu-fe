import { $UI } from "@/store/UI";
import { TabList } from "@/types/tab";
import Taro from "@tarojs/taro";

export const navigateTo = (url: string): void => {
  void Taro.navigateTo({ url: `/${url}` });
};

export const switchTab = (url: string): void => {
  console.log("switch url", url);
  $UI.update("switch tab", (draft) => {
    draft.selected = TabList.findIndex((item) => item.pagePath === url);
  });
  void Taro.switchTab({ url: `/${url}` });
};

export const navigateBack = (delta: number = 1): void => {
  void Taro.navigateBack({ delta });
};
