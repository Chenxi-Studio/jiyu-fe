import { model } from "@/model";
import { type Activity, type SubActivity } from "@/types/activity";

export interface ActivityModel extends Activity {
  subActivities: SubActivity[];
  coverImage: string | undefined;
  deleteList: number[];
}

export const $Activity = model<ActivityModel>("ACTIVITY", {
  title: "测试新增活动",
  coverImage: undefined,
  startTime: new Date(),
  endTime: new Date(new Date().getTime() + 86400000),
  location: "测试地址",
  organizer: "测试组织",
  category: "测试分类",
  introduction: "测试简介",
  contactMan: "测试联系人",
  contactWay: "测试",
  minSubParticipants: 1,
  maxSubParticipants: 100,
  subActivities: [
    {
      title: "测试子活动标题1",
      registrationStartTime: new Date(),
      registrationEndTime: new Date(new Date().getTime() + 100000),
      studentScope: {
        gender: [1, 2],
        degree: [],
        grade: [],
        major: [],
        class: [],
        tags: [],
      },
      capacity: 100,
      checkInStartTime: new Date(new Date().getTime() + 200000),
      checkInEndTime: new Date(new Date().getTime() + 300000),
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 96400000),
      location: "测试地点",
    },
    {
      title: "测试子活动标题2",
      registrationStartTime: new Date(),
      registrationEndTime: new Date(new Date().getTime() + 100000),
      studentScope: {
        gender: [1, 2],
        degree: [],
        grade: [],
        major: [],
        class: [],
        tags: [],
      },
      capacity: 100,
      checkInStartTime: new Date(new Date().getTime() + 200000),
      checkInEndTime: new Date(new Date().getTime() + 300000),
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 96400000),
      location: "测试地点",
    },
  ],
  deleteList: [],
});
