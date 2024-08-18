import { type ActivityEntity } from "./Activity.entity";

export class FailRecordEntity {
  id: number;
  activity: ActivityEntity;
  reason: string;
  failDate: Date;
}
