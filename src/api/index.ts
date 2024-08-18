/* eslint-disable @typescript-eslint/promise-function-async */
import { type BaseActivityRequest } from "@/types/activity";
import { type BaseResponse } from "@/types/api";
import { $User } from "@/store/user";
import instance from "./axios";
import { type ActivityEntity } from "@/types/entity/Activity.entity";

const activity = {
  createActivityWithoutImage: (
    r: BaseActivityRequest,
  ): Promise<BaseResponse> => {
    const formData = new FormData();
    Object.keys(r).forEach((key) => {
      const value = r[key];
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      }
      if (value instanceof Number) {
        formData.append(key, value.toString());
      }
      if (typeof value === "string") {
        formData.append(key, value);
      }
    });
    return instance.post("/activity", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  listSelfAll: (): Promise<ActivityEntity> => {
    const params = new URLSearchParams();
    const queryObject = {
      page: 1,
      limit: 100,
    };
    for (const [key, value] of Object.entries(queryObject)) {
      params.append(key, value.toString());
    }

    return instance.get(`/activity/self-all/${$User.get().id}`, { params });
  },
};

export const api = {
  activity,
};
