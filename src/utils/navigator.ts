import Taro from "@tarojs/taro";

export const navigatorTo = (url: string): void => {
  void Taro.navigateTo({ url: `/${url}` });
};

export const switchTab = (url: string): void => {
  console.log("switch url", url);
  void Taro.switchTab({ url: `/${url}` });
};
