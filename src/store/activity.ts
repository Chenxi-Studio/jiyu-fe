import { model } from "@/model";
import { type Activity, type SubActivity } from "@/types/activity";

export interface ActivityModel extends Activity {
  subActivities: SubActivity[];
  coverImage: string | undefined;
  groupImage: string | undefined;
  deleteList: number[];
}

export const $Activity = model<ActivityModel>("ACTIVITY", {
  title: "测试新增活动",
  coverImage: undefined,
  groupImage: undefined,
  startTime: new Date(new Date().getTime() + 864000001),
  endTime: new Date(new Date().getTime() + 864000001 + 86400000),
  location: "测试地址",
  organizer: "测试组织",
  category: "测试分类",
  introduction: "测试简介",
  contactMan: "测试联系人",
  contactWay: "测试",
  minSubParticipants: 1,
  maxSubParticipants: 2,
  subActivities: [
    {
      title: "测试子活动标题1",
      registrationStartTime: new Date(),
      registrationEndTime: new Date(new Date().getTime() + 864000000),
      studentScope: {
        gender: [],
        degree: [],
        grade: [],
        major: [],
        class: [],
        tags: [],
      },
      capacity: 100,
      checkInStartTime: new Date(new Date().getTime() + 864000001),
      checkInEndTime: new Date(new Date().getTime() + 864000001 + 8640000),
      location: "测试地点",
    },
    {
      title: "测试子活动标题2",
      registrationStartTime: new Date(),
      registrationEndTime: new Date(new Date().getTime() + 864000000),
      studentScope: {
        gender: [],
        degree: [],
        grade: [],
        major: [],
        class: [],
        tags: [],
      },
      capacity: 100,
      checkInStartTime: new Date(new Date().getTime() + 864000001),
      checkInEndTime: new Date(new Date().getTime() + 864000001 + 86400000),
      location: "测试地点",
    },
  ],
  deleteList: [],
});
