import { model } from "@/model";
import { generateRandomString } from "@/utils/uis";

export interface UserModel {
  id: number;
  sid: string;
  state_key: string;
  code: string;
  scope: string;
  state: string | undefined;
  clientId: string;
}

export const $User = model<UserModel>("USER", {
  id: 8,
  sid: "admin122",
  state_key: generateRandomString(16),
  code: "",
  scope: "",
  state: undefined,
  clientId: "",
});
