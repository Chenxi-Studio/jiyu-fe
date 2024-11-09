import React, { useMemo } from "react";
import { TabList } from "@/types/tab";
import { switchTab } from "@/utils/navigator";
import { $UI } from "@/store/UI";
import { $User } from "@/store/user";
import { RoleLevel } from "@/types/entity/const";
import "./style.scss";
import IconFont from "../iconfont/iconfont";

const iconSize = 24;

export const TabBar = (): JSX.Element => {
  const selected = $UI.use((state) => state.selected);
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

  return (
    <>
      <div className="tab-bar-wrapper">
        {availableTabList.map((item, index) => {
          return (
            <div
              key={item.text}
              onClick={() => {
                switchTab(item.pagePath);
              }}
              className={
                "tab-bar-item " +
                (selected === index ? "tab-bar-selected" : "grayscale")
              }
              id={`tab-bar-${index}`}
            >
              {item.text === "发布" && (
                <IconFont
                  name="icon-beifen"
                  size={iconSize}
                  customClassName="grayscale"
                />
              )}
              {item.text === "审批" && (
                <IconFont name="icon-shenhe" size={iconSize} />
              )}
              {item.text === "主页" && (
                <IconFont name="icon-zhuye2" size={iconSize} />
              )}
              {item.text === "活动" && (
                <IconFont name="icon-liebiao" size={iconSize} />
              )}
              {item.text === "个人" && (
                <IconFont name="icon-wode" size={iconSize} />
              )}
              {/* <div>{item.text}</div> */}
            </div>
          );
        })}
      </div>
    </>
  );
};
