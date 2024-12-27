import { type Gender, type Degree } from "./common";

export class ManageScope {
  gender: Gender[];
  degree: Degree[];
  grade: string[];
  major: string[];
  class: string[];
  tags: number[];
}

export const getManageScopeSize = (v: ManageScope): number => {
  return (
    v.gender.length +
    v.degree.length +
    v.grade.length +
    v.major.length +
    v.class.length +
    v.tags.length
  );
};
