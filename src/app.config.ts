import { ExcludedTabList, TabList } from "./types/tab";

export default defineAppConfig({
  pages: [
    // ...ExcludedTabList.map((item) => item.pagePath),
    ...TabList.map((item) => item.pagePath),
  ],
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
  subpackages: [
    // 仅支持字面量
    {
      root: "pages/module/detail",
      pages: ["index"],
    },
    {
      root: "pages/module/new-activity",
      pages: ["index"],
    },
  ],
});
