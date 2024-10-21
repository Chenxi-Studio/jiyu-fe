import { model } from "@/model";
import { type UserEntity } from "@/types/entity/User.entity";
import { generateRandomString } from "@/utils/uis";

export interface UserModel extends UserEntity {
  // UIS
  id: number;
  sid: string;
  state_key: string;
  code: string;
  scope: string;
  state: string | undefined;
  clientId: string;
  jwt: string;
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
});
