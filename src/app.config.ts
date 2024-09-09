import { ExcludedTabList, TabList } from "./types/tab";

export default defineAppConfig({
  pages: [
    ...ExcludedTabList.map((item) => item.pagePath),
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
});
