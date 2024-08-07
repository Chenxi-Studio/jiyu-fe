import { ExcludedTabList, TabList } from "./types/tab";

export default defineAppConfig({
  pages: [
    ...TabList.map((item) => item.pagePath),
    ...ExcludedTabList.map((item) => item.pagePath),
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
});
