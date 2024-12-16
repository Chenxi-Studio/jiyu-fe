import { type SubActivityEntity } from "./SubActivity.entity";
import { type ActivityStatus } from "../common";

export class ActivityEntity {
  id?: number;
  title: string; // 活动标题
  startTime: Date; // 活动开始时间
  endTime: Date; // 活动结束时间
  registrationStartTime: Date;
  registrationEndTime: Date;
  location: string; // 活动地点
  coverImage?: string; // 活动头图
  groupImage?: string; // 二维码
  organizer: string; // 主办单位
  category: string; // 活动类别
  introduction: string; // 活动简介
  contactMan: string; // 活动联系人
  contactWay: string; // 活动联系方式
  subActivities: SubActivityEntity[];

  // 活动状态，可以定义为枚举类型
  status: ActivityStatus; // 草稿、审批、报名、进行、已结束

  // 子活动的最少和最多参加数
  minSubParticipants: number;
  maxSubParticipants: number;
  // publisher: AdminEntity;

  // 被退回审批历史
  // failRecords: FailRecordEntity[];
}
