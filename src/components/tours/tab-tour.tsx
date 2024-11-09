import { $UI } from "@/store/UI";
import { $User } from "@/store/user";
import { RoleLevel } from "@/types/entity/const";
import { TabList } from "@/types/tab";
import { getTourStorage } from "@/utils/store";
import { Tour } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import React, { useMemo, type FC } from "react";

export const TabTour: FC = () => {
  const showTour = $UI.use((state) => state.navigatorTour);
  const roleLevel = $User.use((state) => state.roleLevel);

  const availableTabList = useMemo(
    () =>
      TabList.filter((item) => {
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
      }),
    [roleLevel],
  );
  const steps = useMemo(
    () =>
      availableTabList.map((item, index) => {
        const location =
          index < Math.floor(availableTabList.length / 2)
            ? undefined
            : "top-end";
        if (item.text === "主页")
          return {
            content: "浏览、报名已发布的活动",
            target: `tab-bar-${index}`,
            location,
          };
        if (item.text === "个人")
          return {
            content: "展示个人信息、修改头像",
            target: `tab-bar-${index}`,
            location,
          };
        if (item.text === "发布")
          return {
            content: "新建活动、管理自己发布的活动",
            target: `tab-bar-${index}`,
            location,
          };
        if (item.text === "审批")
          return {
            content: "超级管理员审批活动",
            target: `tab-bar-${index}`,
            location,
          };
        if (item.text === "活动")
          return {
            content: "管理已报名的活动",
            target: `tab-bar-${index}`,
            location,
          };
        return {
          content: "",
          target: "",
        };
      }),
    [availableTabList],
  );
  return (
    <>
      <Tour
        className="nut-custom-tour"
        visible={showTour}
        onClose={() => {
          $UI.update("close navigator tour", (draft) => {
            draft.navigatorTour = false;
            const prev = getTourStorage();
            draft.homeTour = true;
            Taro.setStorageSync("tours", {
              ...prev,
              navigatorTour: false,
            });
          });
        }}
        list={steps}
        location="top-start"
        offset={[0, 0]}
        maskWidth={60}
        maskHeight={50}
      />
    </>
  );
};
