import React from "react";
import { type BaseEventOrig } from "@tarojs/components";
import { ArrowSize6 } from "@nutui/icons-react-taro";
import { api } from "@/api";
import { $User } from "@/store/user";
import { pic2url } from "@/utils/type";
import { $UI } from "@/store/UI";
import { navigateTo } from "@/utils/navigator";
import { ProfileTour } from "@/components/tours/profile-tour";
import Taro from "@tarojs/taro";
import { StyledCard } from "@/components/styled-card";
import { Avatar } from "./components/avatar";
import "./style.scss";
import { CommonIcon } from "@/components/icon/common-icon";
import { IconsUrl } from "@/utils/icons";

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

  return (
    <div className="relative text-gray-600 pb-5">
      {/* <div
        className="absolute w-[100vw] top-0 h-[70vh] z-[-1] comp-blur"
        style={{
          backgroundImage: `url(${pic2url(avatarUrl)})`,
        }}
      /> */}
      {/* <div className="absolute w-[100vw] top-0 h-[100vh] z-[-1] bg-[rgba(255,255,255,0.6)]"></div> */}
      <div className="pl-4 pr-2 pt-14">
        <StyledCard size="medium">
          <div className="flex items-center gap-4">
            <div className="pl-8">
              <Avatar
                onChooseAvatar={handleChooseAvatar}
                avatarUrl={pic2url(avatarUrl)}
                id="profile-big-avatar"
              />
            </div>
            <div>
              <div className="text-lg font-bold">{name}</div>
              <div>{sid}</div>
            </div>
          </div>
        </StyledCard>
      </div>
      <div className="pl-4 pr-2 mt-6">
        <StyledCard size="medium">
          <div className="pl-8 pr-12">
            <div className="flex justify-between items-center h-14">
              <div className="flex items-center gap-4">
                <CommonIcon src={IconsUrl.tel} className="h-8 min-w-8" />
                <div>学号</div>
              </div>
              <div className="flex items-center justify-center gap-4 text-gray-500">
                <div>{sid}</div>
              </div>
            </div>
            <div className="flex justify-between items-center h-14">
              <div className="flex items-center gap-4">
                <CommonIcon src={IconsUrl.profile} className="h-8 min-w-8" />
                <div>姓名</div>
              </div>
              <div className="flex items-center justify-center gap-4 text-gray-500">
                <div>{name}</div>
              </div>
            </div>
            <div className="flex justify-between items-center h-14">
              <div className="flex items-center gap-4">
                <CommonIcon src={IconsUrl.phone} className="h-8 min-w-8" />
                <div>手机</div>
              </div>
              <div className="flex items-center justify-center gap-4 text-gray-500">
                <div>{phone}</div>
                {/* <ArrowSize6 size={12} color="#d1d5db" /> */}
              </div>
            </div>
            {/* <div className="flex justify-between items-center h-14">
              <div>邮箱</div>
              <div className="flex items-center justify-center gap-4 text-gray-500">
                <div>{email}</div>
              </div>
            </div> */}
            <div
              className="flex justify-between items-center h-14"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                const res = await api.login.wxLogout();
                if (!res.isSuccess) {
                  $UI.update("wx logout error", (draft) => {
                    draft.notifyMsg = "微信解绑失败 请联系管理员";
                    draft.showNotify = true;
                  });
                } else {
                  navigateTo("pages/auth/index");
                }
              }}
              id="profile-unbind"
            >
              <div className="flex items-center gap-4">
                <CommonIcon src={IconsUrl.unlink} className="h-8 min-w-8" />
                <div>解绑微信</div>
              </div>
              <div className="flex items-center justify-center">
                <ArrowSize6 size={12} color="#d1d5db" />
              </div>
            </div>
            <div
              className="flex justify-between items-center h-14"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                Taro.setStorageSync("tours", {});
                $UI.update("clear storage", (draft) => {
                  draft.notifyMsg = "清理缓存成功";
                  draft.showNotify = true;
                });
              }}
            >
              <div className="flex items-center gap-4">
                <CommonIcon src={IconsUrl.delete} className="h-8 min-w-8" />
                <div>清理缓存</div>
              </div>
              <div className="flex items-center justify-center">
                <ArrowSize6 size={12} color="#d1d5db" />
              </div>
            </div>
            <div
              className="flex justify-between items-center h-14"
              onClick={() => {
                navigateTo("pages/auth/index");
              }}
            >
              <div className="flex items-center gap-4">
                <CommonIcon src={IconsUrl.exit} className="h-8 min-w-8" />
                <div>退出登录</div>
              </div>
              <div className="flex items-center justify-center">
                <ArrowSize6 size={12} color="#d1d5db" />
              </div>
            </div>
          </div>
        </StyledCard>
      </div>

      <ProfileTour />
    </div>
  );
};

export default Profile;
