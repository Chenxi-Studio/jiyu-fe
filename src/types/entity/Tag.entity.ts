import { type UserEntity } from "./User.entity";

export class TagEntity {
  id: number;
  tagName: string;
  users: UserEntity[];
}
