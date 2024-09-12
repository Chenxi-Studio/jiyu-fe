import { TabBar } from "@/components/tab-bar";
import React from "react";

const CustomTabBar = (): JSX.Element => {
  return <TabBar></TabBar>;
};

CustomTabBar.options = {
  addGlobalClass: true,
};

export default CustomTabBar;
