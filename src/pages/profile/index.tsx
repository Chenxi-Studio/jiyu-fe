import React, { useState } from "react";
import { type BaseEventOrig } from "@tarojs/components";
import { ArrowSize6 } from "@nutui/icons-react-taro";
import { api } from "@/api";
import { $User } from "@/store/user";
import { pic2url } from "@/utils/type";
import { Avatar } from "./components/avatar";
import { $Activity } from "@/store/activity";
import { $UI } from "@/store/UI";
import { $Tag } from "@/store/tag";
import { navigateTo } from "@/utils/navigator";
import "./style.scss";

const Profile = (): JSX.Element => {
  const avatarUrl = $User.use((state) => state.profile);
  const setAvatarUrl = (url: string): void => {
    $User.update("set avatar", (draft) => {
      draft.profile = url;
    });
  };
  const sid = $User.use((state) => state.sid);
  const name = $User.use((state) => state.name);
  const email = $User.use((state) => state.email);
  const phone = $User.use((state) => state.phone);

  const handleChooseAvatar = (e: BaseEventOrig<any>): void => {
    if (typeof e.detail.avatarUrl === "string") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setAvatarUrl(e.detail.avatarUrl);
      void api.user.profile(e.detail.avatarUrl as string);
    }
  };

  console.log("avatar", avatarUrl);

  return (
    <div className="text-gray-600">
      <div
        className="fixed w-[100vw] top-0 h-[70vh] z-[-1] comp-blur"
        style={{
          backgroundImage: `url(${pic2url(avatarUrl)})`,
        }}
      />
      <div className="fixed w-[100vw] top-0 h-[100vh] z-[-1] bg-[rgba(255,255,255,0.6)]"></div>

      <div className="flex justify-center w-full pt-8 z-10">
        <Avatar
          onChooseAvatar={handleChooseAvatar}
          avatarUrl={pic2url(avatarUrl)}
        />
      </div>
      <div className="flex justify-center w-full pt-2 z-50">个人设置</div>
      <div className="rounded-xl mt-6 shadow-lg mx-6 bg-[rgba(255,255,255,0.75)] px-4">
        <div className="flex justify-between items-center h-16">
          <div>头像</div>
          <div className="flex items-center justify-center gap-4">
            <Avatar
              onChooseAvatar={handleChooseAvatar}
              avatarUrl={pic2url(avatarUrl)}
              size={48}
            />
            <ArrowSize6 size={12} color="#d1d5db" />
          </div>
        </div>
        <div className="flex justify-between items-center h-14">
          <div>学号</div>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <div>{sid}</div>
            {/* <ArrowSize6 size={12} color="#d1d5db" /> */}
          </div>
        </div>
        <div className="flex justify-between items-center h-14">
          <div>名字</div>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <div>{name}</div>
          </div>
        </div>
        <div className="flex justify-between items-center h-14">
          <div>手机</div>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <div>{phone}</div>
            <ArrowSize6 size={12} color="#d1d5db" />
          </div>
        </div>
        <div className="flex justify-between items-center h-14">
          <div>邮箱</div>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <div>{email}</div>
          </div>
        </div>
      </div>
      <div className="rounded-xl mt-6 shadow-lg mx-6 bg-[rgba(255,255,255,0.75)] px-4">
        <div
          className="flex justify-between items-center h-12"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => {
            const res = await api.login.wxLogout();
            if (!res.isSuccess) {
              $UI.update("wx logout error", (draft) => {
                draft.notifyMsg = "微信解绑失败 请联系管理员";
                draft.showNotify = true;
              });
            } else {
              $User.init();
              $Activity.init();
              $UI.init();
              $Tag.init();
              navigateTo("pages/auth/index");
            }
          }}
        >
          <div>解绑微信</div>
          <div className="flex items-center justify-center">
            <ArrowSize6 size={12} color="#d1d5db" />
          </div>
        </div>
        <div
          className="flex justify-between items-center h-12"
          onClick={() => {
            $User.init();
            $Activity.init();
            $UI.init();
            $Tag.init();
            navigateTo("pages/auth/index");
          }}
        >
          <div>退出登录</div>
          <div className="flex items-center justify-center">
            <ArrowSize6 size={12} color="#d1d5db" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
