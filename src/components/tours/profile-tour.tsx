import React, { type FC } from "react";
import { $UI } from "@/store/UI";
import { Tour } from "@nutui/nutui-react-taro";
import { getTourStorage } from "@/utils/store";
import Taro from "@tarojs/taro";

export const ProfileTour: FC = () => {
  const showTour = $UI.use((state) => state.profileTour);

  const steps = [
    {
      content: "点击这里也可以更换头像 ~",
      target: "profile-big-avatar",
    },
    {
      content: "如果需要更换微信号，请提前解绑 ~",
      target: "profile-unbind",
      location: "top-start",
    },
  ];

  return (
    <>
      <Tour
        className="nut-custom-tour"
        visible={showTour}
        onClose={() => {
          const prev = getTourStorage();
          $UI.update("close home tour", (draft) => {
            draft.profileTour = false;
            Taro.setStorageSync("tours", {
              ...prev,
              profileTour: false,
            });
          });
        }}
        list={steps}
        location="bottom-start"
      />
    </>
  );
};