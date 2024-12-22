import { model } from "@/model";

export interface CameraModel {
  subId: number | undefined;
}

export const $Camera = model<CameraModel>("CAMERA", {
  subId: undefined,
});
