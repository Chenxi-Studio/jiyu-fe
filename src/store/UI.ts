import { model } from "@/model";
import { type ActivityEntity } from "@/types/entity/Activity.entity";

export interface UIModel {
  selected: number;
  currentActivity: ActivityEntity | undefined;
  showNotify: boolean;
  notifyMsg: string;
  publishRefresh: boolean; // publish 刷新 navigatorTo 可以传递 event navigatorBack 不可以所以使用 store 管理
}

export const $UI = model<UIModel>("UI", {
  selected: 0,
  currentActivity: undefined,
  showNotify: false,
  notifyMsg: "",
  publishRefresh: false,
});
