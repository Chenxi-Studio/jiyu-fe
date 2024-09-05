import { model } from "@/model";
import {
  type CreateSubActivityRequest,
  type BaseActivityRequest,
} from "@/types/activity";

export interface ActivityModel extends BaseActivityRequest {
  subs: CreateSubActivityRequest[];
  picSrc: string;
}

export const $Activity = model<ActivityModel>("ACTIVITY", {
  title: "测试新增活动",
  picSrc: "",
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
  subs: [
    {
      title: "测试标题",
      registrationStartTime: new Date(),
      registrationEndTime: new Date(),
      studentScope: { degree: [], grade: [], major: [], class: [], tags: [] },
      capacity: 100,
      checkInStartTime: new Date(),
      checkInEndTime: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      location: "测试地点",
    },
  ],
});
