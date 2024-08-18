import { type ManageScope } from "../admin";
import { type Gender } from "../common";
import { type ActivityEntity } from "./Activity.entity";

export class AdminEntity {
  id: number;
  sid: string;
  name: string;
  gender: Gender;
  wxOpenID: string;
  notes: string;
  supervisorSid: string | null;
  supervisor: AdminEntity;
  manageScope: ManageScope;
  activities: ActivityEntity[];
}
