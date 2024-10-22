import { type ManageScope } from "@/types/admin";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { type UserEntity } from "@/types/entity/User.entity";

export type basicTag = "major" | "class" | "grade";

export const availableSubIndice = (
  act: ActivityEntity,
  user: UserEntity,
  needCheckTime = false,
): number[] => {
  // 返回下标而非 id
  const result: number[] = [];
  let index = 0;
  for (const subAct of act.subActivities) {
    const scope = subAct.studentScope;
    //   确保基本属性匹配，若为空数组则代表不做要求、任意匹配
    const attrArr = [
      "major",
      "degree",
      "class",
      "grade",
      "gender",
      "tags",
    ] as Array<basicTag | "gender" | "tags">;
    const attrMatch = attrArr.every((attr) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tagMatch(attr, scope, user.selfScope!),
    );

    const now = new Date();
    let availFlag = attrMatch;
    if (needCheckTime) {
      availFlag &&=
        subAct.registrationStartTime <= now &&
        now <= subAct.registrationEndTime;
    }
    if (availFlag) {
      result.push(index);
    }
    index++;
  }
  return result;

  function tagMatch(
    b: basicTag | "gender" | "tags",
    requireScope: ManageScope,
    userScope: ManageScope,
  ): boolean {
    // 当要求标签为空数组（无要求）或者用户标签满足要求标签数组中的一项
    const rs = requireScope[b];
    const us = userScope[b];
    return rs.length === 0 || us.some((bt: never) => rs.includes(bt));
  }
};
