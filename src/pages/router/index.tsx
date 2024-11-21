import React, { type FC } from "react";
import ActivityPage from "@/pages/activity";
import Approve from "@/pages/approve";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import Publish from "@/pages/publish";
import { $UI } from "@/store/UI";
import { $User } from "@/store/user";
import { RoleLevel } from "@/types/entity/const";
import { TabList } from "@/types/tab";
import { TabBar } from "@/components/tab-bar";
import { GlobalNotify } from "@/components/global-notify";

const Router: FC = () => {
  const current = $UI.use((state) => state.selected);
  const roleLevel = $User.use((state) => state.roleLevel);
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

  console.log("current", current);

  return (
    <>
      <GlobalNotify />
      {availableTabList[current].text === "主页" && <Home />}
      {availableTabList[current].text === "个人" && <Profile />}
      {availableTabList[current].text === "发布" && <Publish />}
      {availableTabList[current].text === "审批" && <Approve />}
      {availableTabList[current].text === "活动" && <ActivityPage />}

      <div className="fixed bottom-0 left-0 w-full">
        <TabBar />
      </div>
    </>
  );
};

export default Router;
