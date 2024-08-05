import { TabList } from "./types/tab";

export default defineAppConfig({
  pages: ["pages/home/index", "pages/activity/index", "pages/profile/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: true,
    list: TabList,
  },
});
