import { type ManageScope } from "../admin";
import { type ActivityEntity } from "./Activity.entity";
import { type RoleLevel } from "./const";
import { type TagEntity } from "./Tag.entity";

export class UserEntity {
  id?: number;
  sid?: string;
  name?: string;
  roleLevel?: RoleLevel;
  punishEndTime?: Date;
  punishNum?: number;
  wxOpenID?: string;
  phone?: string;
  email?: string;
  counselor?: string;
  notes?: string;
  selfScope?: ManageScope;
  manageScope?: ManageScope;
  activities?: ActivityEntity[];
  tags?: TagEntity[];
  profile?: string;
}
