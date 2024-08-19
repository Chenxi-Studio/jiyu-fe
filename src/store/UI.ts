import { model } from "@/model";
import { type ActivityEntity } from "@/types/entity/Activity.entity";

export interface UIModel {
  selected: number;
  currentActivity: ActivityEntity | undefined;
}

export const $UI = model<UIModel>("UI", {
  selected: 0,
  currentActivity: undefined,
});
