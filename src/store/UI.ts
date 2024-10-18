import { model } from "@/model";
import { type ActivityEntity } from "@/types/entity/Activity.entity";

export interface UIModel {
  // nav bar
  selected: number;
  // detail
  currentActivity: ActivityEntity | undefined;
  detailOrigin: "activity" | "detail" | "publish" | "home";
  // global notify
  showNotify: boolean;
  notifyMsg: string;
  // publish
  publishRefresh: boolean; // publish 刷新 navigatorTo 可以传递 event navigatorBack 不可以所以使用 store 管理
  // approve
  approveRefresh: boolean;
  // activity
  activityRefresh: boolean;
}

export const $UI = model<UIModel>("UI", {
  selected: 0,
  currentActivity: undefined,
  detailOrigin: "home",
  showNotify: false,
  notifyMsg: "",
  publishRefresh: false,
  approveRefresh: false,
  activityRefresh: false,
});
