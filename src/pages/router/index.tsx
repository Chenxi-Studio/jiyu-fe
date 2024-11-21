import React, { type FC } from "react";
import ActivityPage from "@/pages/activity";
import Approve from "@/pages/approve";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import Publish from "@/pages/publish";
import { TabBar } from "@/components/tab-bar";
import { GlobalNotify } from "@/components/global-notify";
import { Header } from "@/components/header";
import { useCurrentPage } from "@/utils/navigator";

const Router: FC = () => {
  const currentPage = useCurrentPage();

  return (
    <div className="overflow-hidden max-h-[100vh] flex flex-col">
      <Header />
      <GlobalNotify />
      {currentPage === "主页" && <Home />}
      {currentPage === "个人" && <Profile />}
      {currentPage === "发布" && <Publish />}
      {currentPage === "审批" && <Approve />}
      {currentPage === "活动" && <ActivityPage />}

      <div className="fixed bottom-0 left-0 w-full">
        <TabBar />
      </div>
    </div>
  );
};

export default Router;
