import { api } from "@/api";
import instance from "@/api/axios";
import { $Tag } from "@/store/tag";
import { $User } from "@/store/user";
import { RoleLevel } from "@/types/entity/const";

export const setDevJWT = async (
  type: "stu" | "admin" | "Ultradamin",
): Promise<void> => {
  const jwt = await api.login.devJWT(type);
  console.log("jwt", jwt);
  if (jwt.isSuccess) {
    instance.defaults.headers.common.Authorization = `Bearer ${jwt.jwt}`;
    $User.update("dev jwt", (draft) => {
      draft.jwt = jwt.jwt;
    });
    const self = await api.user.self();
    $User.update("update avatar", (draft) => {
      draft = {
        ...draft,
        ...self,
      };
      return draft;
    });
    console.log("self", self, $User.get());
    if (self.roleLevel !== undefined && self.roleLevel >= RoleLevel.Admin) {
      const classes = await api.tag.basicGet("class");
      const majors = await api.tag.basicGet("major");
      const grades = await api.tag.basicGet("grade");
      const tags = await api.tag.tagsGet();
      $Tag.update("fetch tag", (draft) => {
        draft.classes = classes.map((item) => item.name);
        draft.grades = grades.map((item) => item.name);
        draft.majors = majors.map((item) => item.name);
        draft.tags = tags;
      });
      console.log(tags, grades, majors, classes);
    }
  }
};
