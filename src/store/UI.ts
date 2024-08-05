import { model } from "@/model";

export interface UIModel {
  selected: number;
}

export const $UI = model<UIModel>("UI", {
  selected: 0,
});
