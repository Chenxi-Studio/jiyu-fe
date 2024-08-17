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
  subs: [],
});
