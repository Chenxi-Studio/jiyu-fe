import React, { useMemo } from "react";
import { TabList } from "@/types/tab";
import { switchTab } from "@/utils/navigator";
import { $UI } from "@/store/UI";
import { $User } from "@/store/user";
import { RoleLevel } from "@/types/entity/const";
import { IconsUrl } from "@/utils/icons";
import "./style.scss";
import IconFont from "../iconfont/iconfont";
import { CommonIcon } from "../icon/common-icon";

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
              {item.text === "发布" && <CommonIcon src={IconsUrl.backup} />}
              {item.text === "审批" && <CommonIcon src={IconsUrl.approve} />}
              {item.text === "主页" && <CommonIcon src={IconsUrl.home} />}
              {item.text === "活动" && <CommonIcon src={IconsUrl.list} />}
              {item.text === "个人" && <CommonIcon src={IconsUrl.my} />}
              {/* <div>{item.text}</div> */}
            </div>
          );
        })}
      </div>
    </>
  );
};
