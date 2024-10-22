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
import {
  type PaginationResponse,
  type JWTResponse,
  type RegisterInfoResponse,
  type SignListResponse,
} from "@/types/api";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { type UserEntity } from "@/types/entity/User.entity";
import { type ActivityRegisterStatus } from "@/types/common";
import { type TagEntity } from "@/types/entity/Tag.entity";
import instance, { baseURL, tacInstance } from "./axios";

const activity2formDate = (
  r: BaseActivityRequest,
  coverImage: string | undefined | null = undefined,
  groupImage: string | undefined | null = undefined,
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
  if (coverImage !== undefined && coverImage !== null) {
    formData.appendFile(
      "coverImage",
      coverImage,
      coverImage.replace(/^http:\/\/tmp\//, ""),
    );
  }
  if (groupImage !== undefined && groupImage !== null) {
    formData.appendFile(
      "groupImage",
      groupImage,
      groupImage.replace(/^http:\/\/tmp\//, ""),
    );
  }
  return formData;
};

const login = {
  wxLogout: (): Promise<{ isSuccess: boolean }> =>
    instance.delete(`/auth/wx-logout`),
  wxLogin: (wxCode: string): Promise<{ isSuccess: boolean; jwt: string }> => {
    return instance.post(`/auth/wx-login`, { wxCode });
  },
  tac: (tacCode: string, wxCode: string): Promise<{ jwt: string }> =>
    instance.post(`/auth/tac-wx-login`, { tacCode, wxCode }),
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
  devJWT: (type: "stu" | "admin" | "Ultradamin"): Promise<JWTResponse> => {
    const params = new URLSearchParams();
    const queryObject = {
      type,
    };
    for (const [key, value] of Object.entries(queryObject)) {
      params.append(key, value.toString());
    }
    return instance.get(`/auth/test-login`, {
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
    coverImage: string | undefined = undefined,
    groupImage: string | undefined = undefined,
  ): Promise<ActivityEntity> => {
    const sandData = activity2formDate(r, coverImage, groupImage).getData();

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Taro.request({
        url: baseURL + "/activity",
        method: "POST",
        data: sandData.buffer,
        header: {
          "Content-Type": sandData.contentType,
          Authorization: `Bearer ${$User.get().jwt}`,
        },
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
    return instance.patch(`/activity/${id}/withdrawal`);
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
          header: {
            "Content-Type": sandData.contentType,
            Authorization: `Bearer ${$User.get().jwt}`,
          },
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
  approved: (): Promise<PaginationResponse> => {
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

const sign = {
  list: (): Promise<PaginationResponse> => {
    const params = new URLSearchParams();
    const queryObject = {
      page: 1,
      limit: 100,
    };
    for (const [key, value] of Object.entries(queryObject)) {
      params.append(key, value.toString());
    }
    return instance.get(`/sign-act/available`, {
      params,
    });
  },
  mySignList: (): Promise<SignListResponse[]> =>
    instance.get(`/sign-act/my-sign`),
  // waitList: (): Promise<ActivityEntity[]> => instance.get(`/sign-act/my-wait`),
  revocation: (signID: number) =>
    instance.delete(`/sign-act/sign-revokation`, {
      data: {
        signID,
      },
    }),
  register: (
    actID: number,
    subIDs: number[],
  ): Promise<{
    registerStatus: ActivityRegisterStatus;
    signRecordID: number;
  }> =>
    instance.post(`/sign-act/register`, {
      actID,
      subIDs,
    }),
  registerInfo: (actID: number): Promise<RegisterInfoResponse> =>
    instance.get(`/sign-act/act-subs/${actID}`),
};

const user = {
  profile: (picSrc: string) => {
    const formData = new SimpleFormData();
    if (picSrc !== undefined && picSrc !== null) {
      formData.appendFile(
        "profile",
        picSrc,
        picSrc.replace(/^http:\/\/tmp\//, ""),
      );
    }
    const sandData = formData.getData();
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Taro.request({
        url: baseURL + "/users/profile",
        method: "POST",
        data: sandData.buffer,
        header: {
          "Content-Type": sandData.contentType,
          Authorization: `Bearer ${$User.get().jwt}`,
        },
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
  self: (): Promise<UserEntity> => instance.get(`/users/self`),
};

const tag = {
  basicGet: (
    type: "grade" | "major" | "class",
  ): Promise<Array<{ name: string; id: number }>> => {
    const params = new URLSearchParams();
    const queryObject = {
      type,
    };
    for (const [key, value] of Object.entries(queryObject)) {
      params.append(key, value.toString());
    }
    return instance.get(`/basic-tag`, {
      params,
    });
  },
  tagsGet: (): Promise<TagEntity[]> => instance.get(`/tags`),
};

export const api = {
  login,
  admin,
  activity,
  subActivity,
  approve,
  sign,
  user,
  tag,
};
