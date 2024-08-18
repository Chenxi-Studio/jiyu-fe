import { model } from "@/model";

export interface UserModel {
  id: number;
  sid: string;
}

export const $User = model<UserModel>("USER", {
  id: 4,
  sid: "3292818",
});
