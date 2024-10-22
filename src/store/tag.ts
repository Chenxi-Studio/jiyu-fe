import { model } from "@/model";
import { type TagEntity } from "@/types/entity/Tag.entity";

export interface TagModel {
  grades: string[];
  majors: string[];
  classes: string[];
  tags: TagEntity[];
}

export const $Tag = model<TagModel>("TAG", {
  grades: [],
  majors: [],
  classes: [],
  tags: [],
});
