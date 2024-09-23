export enum Gender {
  Male = 1,
  Female = 2,
}
export enum Degree {
  Bachelor = 0,
  Master = 1,
  Doctor = 2,
}

export enum OtherTag {
  X_Club = "X社团",
  Y_Club = "Y社团",
  Z_Club = "Z社团",
}

// 草稿阶段、审批阶段、报名阶段、进行阶段、已结束
export enum ActivityStatus {
  Draft = 0,
  Approval = 1,
  Register = 2,
  Ongoing = 3,
  Finished = 4,
}

export const ActStatusMapping = new Map<ActivityStatus, string>([
  [ActivityStatus.Draft, "草稿阶段"],
  [ActivityStatus.Approval, "审批阶段"],
  [ActivityStatus.Register, "报名阶段"],
  [ActivityStatus.Ongoing, "进行阶段"],
  [ActivityStatus.Finished, "结束阶段"],
]);
