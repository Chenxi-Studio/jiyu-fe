import { type Gender, type Degree } from "./common";

export interface ManageScope {
  gender: Gender[];
  degree: Degree[];
  grade: string[];
  major: string[];
  class: string[];
  tags: number[];
}
