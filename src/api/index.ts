/* eslint-disable @typescript-eslint/promise-function-async */
import {
  type CreateActivityWithoutImageRequest,
  type BaseActivityRequest,
} from "@/types/activity";
import { type BaseResponse } from "@/types/api";
import { $User } from "@/store/user";
import Taro from "@tarojs/taro";
import SimpleFormData from "@/utils/FormData";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import instance, { baseURL } from "./axios";

// TODO: 需要环境判断 不然H5无法上线

const activity = {
  createActivityWithoutImage: (
    r: BaseActivityRequest,
  ): Promise<BaseResponse> => {
    const formData = new SimpleFormData();
    const rWithSid: CreateActivityWithoutImageRequest = {
      ...r,
      publisherSid: $User.get().sid,
    };
    Object.keys(rWithSid).forEach((key) => {
      const value = rWithSid[key];
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
    const sandData = formData.getData();
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Taro.request({
        url: baseURL + "/activity",
        method: "POST",
        data: sandData.buffer,
        header: { "Content-Type": sandData.contentType },
        success: (res) => {
          const data = res.data;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          resolve(data); // 使用resolve来传递成功的结果
        },
        fail: (err) => {
          reject(err); // 使用reject来传递失败的错误
        },
      });
    });
  },
  listSelfAll: (): Promise<{ data: ActivityEntity[]; total: number }> => {
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
  beforeApproved: (): Promise<ActivityEntity[]> => {
    return instance.get(`/activity/before-approved/${$User.get().id}`);
  },
  afterApproved: (): Promise<ActivityEntity[]> => {
    return instance.get(`/activity/after-approved/${$User.get().id}`);
  },
  delete: (id: number) => {
    return instance.delete(`/api/activity/${id}`);
  },
};

const approve = {
  toApprove: (): Promise<ActivityEntity[]> => {
    return instance.get(`/activity/${$User.get().id}/to-approve`);
  },
};

export const api = {
  activity,
  approve,
};
