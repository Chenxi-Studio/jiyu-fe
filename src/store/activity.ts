import { model } from "@/model";
import { type Activity, type SubActivity } from "@/types/activity";

export interface ActivityModel extends Activity {
  subActivities: SubActivity[];
  coverImage: string | undefined;
  deleteList: number[];
}

export const $Activity = model<ActivityModel>("ACTIVITY", {
  title: "",
  coverImage: undefined,
  startTime: new Date(),
  endTime: new Date(new Date().getTime() + 86400000),
  location: "",
  organizer: "",
  category: "",
  introduction: "",
  contactMan: "",
  contactWay: "",
  minSubParticipants: 1,
  maxSubParticipants: 1,
  subActivities: [],
  deleteList: [],
});
