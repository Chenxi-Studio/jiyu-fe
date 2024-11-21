import { model } from "@/model";

export interface CommonModel {
  searchContent: string;
}

export const $Common = model<CommonModel>("COMMON", {
  searchContent: "",
});
