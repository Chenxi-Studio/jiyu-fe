export enum Gender {
  Male = 1,
  Female = 2,
}

export const genderNames = (i: Gender): string => {
  if (i === Gender.Male) return "男生";
  if (i === Gender.Female) return "女生";
  return `未知性别标签`;
};

export enum Degree {
  Bachelor = 0,
  Master = 1,
  Doctor = 2,
}

export const degreeNames = (i: Degree): string => {
  if (i === Degree.Bachelor) return "本科生";
  if (i === Degree.Master) return "硕士研究生";
  if (i === Degree.Doctor) return "博士研究生";
  return `未知学位标签`;
};

// 草稿阶段、等待审批阶段、报名阶段、进行阶段、已结束
export enum ActivityStatus {
  Draft = 0,
  Approval = 1,
  Register = 2,
  Ongoing = 3,
  Finished = 4,
}
export const ActivityStatusArray = [
  ActivityStatus.Draft,
  ActivityStatus.Approval,
  ActivityStatus.Register,
  ActivityStatus.Ongoing,
  ActivityStatus.Finished,
];

export const ActStatusMapping = new Map<ActivityStatus, string>([
  [ActivityStatus.Draft, "草稿阶段"],
  [ActivityStatus.Approval, "审批阶段"],
  [ActivityStatus.Register, "报名阶段"],
  [ActivityStatus.Ongoing, "进行阶段"],
  [ActivityStatus.Finished, "结束阶段"],
]);

export enum ActivityPlace {
  JW = "江湾",
  HD = "邯郸",
  ZJ = "张江",
  FL = "枫林",
}

export enum ActivityCategory {
  a = "党旗引领",
  b = "志愿服务",
  c = "学术讲座",
  d = "校园文化",
  e = "文体赛事",
  f = "社会实践",
}

export enum ActivityRelationship {
  // 报名阶段
  AlreadySigned = 0, // 已报名
  SignForbidden = 1, // 不可报名(报名阶段、进行阶段)
  SignAllowed = 2, // 可报名
  WaitListAllowed = 3, // 可候补报名
  WaitListTailAllowed = 4, // 可队尾候补报名
  WaitListing = 5, // 正在候补

  Passed = 6, // 进行中： 已截止报名
  AlreadyFinished = 7, // 已结束:活动也与你无关
  ForgetRegister = 8, // 已结束：报名但未参与签到
  Completed = 9, // 已结束：完成所有签到
}

export enum ActivityRegisterStatus {
  Success = 0, // 报名成功
  WaitListSuccess = 1, // 候补成功
  WaitListTailSucces = 2, // 队尾候补成功
  Fail = 3, // 报名失败
}
