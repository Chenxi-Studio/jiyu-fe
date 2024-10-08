/* eslint-disable @typescript-eslint/promise-function-async */
import Taro from "@tarojs/taro";
import {
  type CreateActivityWithoutImageRequest,
  type BaseActivityRequest,
  type CreateSubActivityRequest,
  type Activity,
  type SubActivity,
} from "@/types/activity";
import { $User } from "@/store/user";
import { $UI } from "@/store/UI";
import SimpleFormData from "@/utils/FormData";
import { type TacResponse, type ApprovedPaginationResponse } from "@/types/api";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { type UserEntity } from "@/types/entity/User.entity";
import instance, { baseURL, tacInstance } from "./axios";

// TODO: 需要环境判断 不然H5无法上线
const activity2formDate = (
  r: BaseActivityRequest,
  picSrc: string | undefined | null = undefined,
): SimpleFormData => {
  const formData = new SimpleFormData();
  const rWithSid: CreateActivityWithoutImageRequest = {
    ...r,
    publisherSid: $User.get().sid,
  };
  Object.keys(rWithSid).forEach((key) => {
    const value = rWithSid[key];
    if (key.startsWith("coverImage")) {
      return;
    }
    if (value instanceof Date) {
      formData.append(key, value.toISOString());
    }
    if (value instanceof Number) {
      formData.append(key, value.toString());
    }
    if (typeof value === "string") {
      formData.append(key, value);
    }
    if (typeof value === "number") {
      formData.append(key, value.toString());
    }
  });
  if (picSrc !== undefined && picSrc !== null) {
    formData.appendFile(
      "coverImage",
      picSrc,
      picSrc.replace(/^http:\/\/tmp\//, ""),
    );
  }
  return formData;
};

const login = {
  tac: (clientId: string, code: string): Promise<TacResponse> =>
    instance.post(`/auth/tac`, { clientId, code }),
  info: (accessToken: string) => {
    const params = new URLSearchParams();
    const queryObject = {
      access_token: accessToken,
    };
    for (const [key, value] of Object.entries(queryObject)) {
      params.append(key, value.toString());
    }
    return tacInstance.get(`/resource/userinfo.act`, {
      params,
    });
  },
};

const admin = {
  super: (): Promise<UserEntity[]> => instance.get(`/admin/super`),
};

const activity = {
  createActivity: (
    r: BaseActivityRequest,
    picSrc: string | undefined = undefined,
  ): Promise<ActivityEntity> => {
    const sandData = activity2formDate(r, picSrc).getData();

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Taro.request({
        url: baseURL + "/activity",
        method: "POST",
        data: sandData.buffer,
        header: { "Content-Type": sandData.contentType },
        success: (res) => {
          const data = res.data;
          if (data.statusCode < 200 || data.statusCode >= 400) {
            $UI.update("upload fail", (draft) => {
              draft.notifyMsg = data.message;
              draft.showNotify = true;
            });
            reject(data);
          }
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
    return instance.delete(`/activity/${id}`);
  },
  toApprove: (id: number, sid: string) => {
    return instance.post(`/activity/send-for-approval`, {
      id,
      sid,
    });
  },
  withdrawApprove: (id: number) => {
    return instance.patch(`/activity/${id}/withdrawal/${$User.get().id}`);
  },
  update: (a: Activity, picSrc: string | undefined | null) => {
    if (a.id !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const formData = activity2formDate(a, picSrc);
      const sandData = formData.getData();

      return new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        Taro.request({
          url: baseURL + "/activity/" + `${a.id}`,
          method: "PATCH",
          data: sandData.buffer,
          header: { "Content-Type": sandData.contentType },
          success: (res) => {
            const data = res.data;
            if (data.statusCode < 200 || data.statusCode >= 400) {
              $UI.update("upload fail", (draft) => {
                draft.notifyMsg = data.message;
                draft.showNotify = true;
              });
              reject(data);
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            resolve(data); // 使用resolve来传递成功的结果
          },
          fail: (err) => {
            reject(err); // 使用reject来传递失败的错误
          },
        });
      });
    } else {
      return Promise.reject(new Error("Activity update: 参数不存在 id"));
    }
  },
};

const subActivity = {
  add: (subs: CreateSubActivityRequest[], actId: number) => {
    return instance.post(`/subactivity/${actId}/many`, {
      subs,
    });
  },
  update: (subs: SubActivity[]) => {
    if (subs.every((i) => i.id !== undefined)) {
      return instance.patch(`/subactivity/many`, { subs });
    } else {
      return Promise.reject(new Error("SubActivity update: 参数不存在 id"));
    }
  },
  delete: (ids: number[]) => {
    return instance.delete(`/subactivity/many`, {
      data: { ids },
      headers: { "Content-Type": "application/json" },
    });
  },
};

const approve = {
  toApprove: (): Promise<ActivityEntity[]> => {
    return instance.get(`/activity/${$User.get().id}/to-approve`);
  },
  approve: (actID: number) => {
    return instance.post(`/activity/approve/${actID}`);
  },
  disapprove: (actID: number, reason: string) => {
    return instance.post(`/activity/disapprove/${actID}`, { reason });
  },
  approved: (): Promise<ApprovedPaginationResponse> => {
    const params = new URLSearchParams();
    const queryObject = {
      page: 1,
      limit: 100,
      type: "yet",
    };
    for (const [key, value] of Object.entries(queryObject)) {
      params.append(key, value.toString());
    }
    return instance.get(`/activity/my-resp-approval/${$User.get().id}`, {
      params,
    });
  },
};

export const api = {
  login,
  admin,
  activity,
  subActivity,
  approve,
};
