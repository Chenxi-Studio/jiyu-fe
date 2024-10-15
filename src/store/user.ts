import { model } from "@/model";
import { UserEntity } from "@/types/entity/User.entity";
import { generateRandomString } from "@/utils/uis";

export interface UserModel {
  id: number;
  sid: string;
  state_key: string;
  code: string;
  scope: string;
  state: string | undefined;
  clientId: string;
  jwt: string;
  profile: string;
}

export const $User = model<UserModel>("USER", {
  id: 8, // 10
  sid: "admin122", // superadmin
  state_key: generateRandomString(16),
  code: "",
  scope: "",
  state: undefined,
  clientId: "",
  jwt: "",
  profile: "",
});
