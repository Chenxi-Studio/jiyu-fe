import React, { useState } from "react";
import { ArrowSize6 } from "@nutui/icons-react-taro";
import { Avatar } from "./components/avatar";
import "./style.scss";

const Profile = (): JSX.Element => {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  return (
    <div className="text-gray-600">
      <div
        className="fixed w-[100vw] top-0 h-[70vh] z-[-1] comp-blur"
        style={{
          backgroundImage: `url(${avatarUrl})`,
        }}
      />
      <div className="fixed w-[100vw] top-0 h-[100vh] z-[-1] bg-[rgba(255,255,255,0.6)]"></div>

      <div className="flex justify-center w-full pt-8 z-10">
        <Avatar
          onChooseAvatar={(e) => {
            if (typeof e.detail.avatarUrl === "string")
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              setAvatarUrl(e.detail.avatarUrl);
          }}
          avatarUrl={avatarUrl}
        />
      </div>
      <div className="flex justify-center w-full pt-2 z-50">个人设置</div>
      <div className="rounded-xl mt-6 shadow-lg mx-6 bg-[rgba(255,255,255,0.75)] px-4">
        <div className="flex justify-between items-center h-16">
          <div>头像</div>
          <div className="flex items-center justify-center gap-4">
            <Avatar
              onChooseAvatar={(e) => {
                if (typeof e.detail.avatarUrl === "string")
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  setAvatarUrl(e.detail.avatarUrl);
              }}
              avatarUrl={avatarUrl}
              size={48}
            />
            <ArrowSize6 size={12} color="#d1d5db" />
          </div>
        </div>
        <div className="flex justify-between items-center h-14">
          <div>学号</div>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <div>19307110112</div>
            <ArrowSize6 size={12} color="#d1d5db" />
          </div>
        </div>
        <div className="flex justify-between items-center h-14">
          <div>名字</div>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <div>我是一个名字</div>
          </div>
        </div>
        <div className="flex justify-between items-center h-14">
          <div>手机</div>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <div>17236780307</div>
            <ArrowSize6 size={12} color="#d1d5db" />
          </div>
        </div>
        <div className="flex justify-between items-center h-14">
          <div>邮箱</div>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <div>17236780307@fudan.edu.cn</div>
          </div>
        </div>
      </div>
      <div className="rounded-xl mt-6 shadow-lg mx-6 bg-[rgba(255,255,255,0.75)] px-4">
        <div className="flex justify-between items-center h-12">
          <div>解绑微信</div>
          <div className="flex items-center justify-center">
            <ArrowSize6 size={12} color="#d1d5db" />
          </div>
        </div>
        <div className="flex justify-between items-center h-12">
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
