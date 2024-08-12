import { type ManageScope } from "./admin";

// 头图专门放在FormData的CoverImage字段里
export interface BaseActivityRequest {
  title: string;
  startTime: Date;
  endTime: Date;
  location: string;
  organizer: string;
  category: string;
  introduction: string;
  contactMan: string;
  contactWay: string;
  minSubParticipants: number;
  maxSubParticipants: number;
}

export interface CreateActivityWithoutImageRequest extends BaseActivityRequest {
  publisherSid: string; // 发布人学工号
}

export interface CreateSubActivityRequest {
  // 至少需要一个标题

  title: string;
  registrationStartTime: Date;
  registrationEndTime: Date;
  studentScope: ManageScope; // 报名权限范围，要么不传，传必须携带ManageScope所有属性
  capacity: number;
  checkInStartTime: Date;
  checkInEndTime: Date; // 签到结束时间
  startTime: Date;
  endTime: Date;
  location: string;
}

export interface UpdateActivityRequest extends BaseActivityRequest {
  coverImage: string;
}

export interface UpdateSubActivityRequest extends CreateSubActivityRequest {
  id: number;
}

export class DisapproveActRequest {
  reason: string; // 驳回活动的理由
}
