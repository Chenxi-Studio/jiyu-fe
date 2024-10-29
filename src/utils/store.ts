import { $Activity } from "@/store/activity";
import { $Tag } from "@/store/tag";
import { $UI } from "@/store/UI";
import { $User } from "@/store/user";

export const clearStore = (): void => {
  $User.init();
  $Activity.init();
  $UI.init();
  $Tag.init();
};
