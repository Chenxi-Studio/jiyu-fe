import { api } from "@/api";
import instance from "@/api/axios";
import { $User } from "@/store/user";

export const setDevJWT = async (): Promise<void> => {
  const jwt = await api.login.devJWT("admin");
  console.log("jwt", jwt);
  if (jwt.isSuccess) {
    instance.defaults.headers.common.Authorization = `Bearer ${jwt.jwt}`;
    $User.update("dev jwt", (draft) => {
      draft.jwt = jwt.jwt;
    });
    const self = await api.user.self();
    $User.update("update avatar", (draft) => {
      draft.profile = self.profile;
      draft.sid = self.sid;
      draft.name = self.name;
      draft.phone = self.phone;
      draft.email = self.email;
    });
    console.log("self", self);
  }
};
