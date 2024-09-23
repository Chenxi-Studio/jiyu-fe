import { type Degree, type Gender } from "../common";
import { type TagEntity } from "./Tag.entity";

export class UserEntity {
  id: number;
  sid: string;
  name: string;
  gender: Gender;
  degree: Degree;
  grade: string;
  major: string;
  class: string;
  email: string;
  phone: string;
  counselor: string;
  wxOpenID: string;

  // @Column('simple-array')
  // tags_str: string[]; // 用于承载其它tag如某社团、党支部等，只用一个字符串存，是一个故意冗余的属性
  tags: TagEntity[];
  punishEndTime: Date | null;
}
