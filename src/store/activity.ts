import { model } from "@/model";
import {
  type CreateSubActivityRequest,
  type BaseActivityRequest,
} from "@/types/activity";

export interface ActivityModel extends BaseActivityRequest {
  subs: CreateSubActivityRequest[];
}

export const $Activity = model<ActivityModel>("ACTIVITY", {
  title: "",
  startTime: new Date(),
  endTime: new Date(new Date().getTime() + 86400000),
  location: "",
  organizer: "",
  category: "",
  introduction: "",
  contactMan: "",
  contactWay: "",
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
