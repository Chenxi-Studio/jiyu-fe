import { type Degree } from "./common";

export interface ManageScope {
  // gender: Gender; 应该没有牵涉到性别的管理范围吧
  degree: Degree[];
  grade: string[];
  major: string[];
  class: string[];
  tags: number[];
}
