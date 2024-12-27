import { model } from "@/model";
import { type Activity, type SubActivity } from "@/types/activity";

export interface ActivityModel extends Activity {
  subActivities: SubActivity[];
  coverImage: string | undefined;
  groupImage: string | undefined;
  deleteList: number[];
}

export const $Activity = model<ActivityModel>("ACTIVITY", {
  id: undefined,
  title: "",
  coverImage: undefined,
  groupImage: undefined,
  startTime: new Date(new Date().getTime()),
  endTime: new Date(new Date().getTime()),
  registrationStartTime: new Date(),
  registrationEndTime: new Date(new Date().getTime()),
  location: "",
  organizer: "",
  category: "",
  introduction: "",
  contactMan: "",
  contactWay: "",
  minSubParticipants: 0,
  maxSubParticipants: 0,
  subActivities: [],
  deleteList: [],
});
