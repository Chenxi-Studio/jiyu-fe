import { type ManageScope } from "../admin";
import { type ActivityEntity } from "./Activity.entity";

export class SubActivityEntity {
  id: number;
  activity: ActivityEntity;
  title: string; // 子活动标题
  registrationStartTime: Date; // 报名开始时间
  registrationEndTime: Date; // 报名截止时间
  studentScope: ManageScope; // 可报名学生范围
  capacity: number; // 活动容量

  // @Column({ nullable: true })
  // requiresCheckIn: boolean; // 是否需要签到
  checkInStartTime: Date; // 签到开始时间
  checkInEndTime: Date; // 签到结束时间

  // 子活动起止时间和地点，如果需要
  startTime: Date;
  endTime: Date;
  location: string;
}
