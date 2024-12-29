import { model } from "@/model";
import { type Activity, type SubActivity } from "@/types/activity";
import { roundUpToNextFiveMinutes } from "@/utils/unit";

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
  startTime: roundUpToNextFiveMinutes(new Date()),
  endTime: roundUpToNextFiveMinutes(new Date()),
  registrationStartTime: roundUpToNextFiveMinutes(new Date()),
  registrationEndTime: roundUpToNextFiveMinutes(new Date()),
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
