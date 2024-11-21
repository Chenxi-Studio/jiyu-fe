import { $UI } from "@/store/UI";
import { $User } from "@/store/user";
import { RoleLevel } from "@/types/entity/const";
import { TabList } from "@/types/tab";
import Taro from "@tarojs/taro";

export const navigateTo = (url: string): void => {
  void Taro.navigateTo({ url: `/${url}` });
};

export const switchTab = (url: string): void => {
  console.log("switch url", url);
  if (url === "pages/router/index") {
    void Taro.navigateTo({ url: `/${url}` });
    return;
  }
  const roleLevel = $User.get().roleLevel;
  const availableTabList = TabList.filter((item) => {
    if (
      roleLevel !== undefined &&
      roleLevel < RoleLevel.Admin &&
      item.text === "发布"
    ) {
      return false;
    }
    if (
      roleLevel !== undefined &&
      roleLevel < RoleLevel.SuperAdmin &&
      item.text === "审批"
    ) {
      return false;
    }
    return true;
  });

  $UI.update("switch tab", (draft) => {
    draft.selected = availableTabList.findIndex(
      (item) => item.pagePath === url,
    );
  });
  // void Taro.switchTab({ url: `/${url}` });
};

export const navigateBack = (delta: number = 1): void => {
  void Taro.navigateBack({ delta });
};
