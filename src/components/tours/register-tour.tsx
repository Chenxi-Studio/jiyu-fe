import React, { type FC } from "react";
import { $UI } from "@/store/UI";
import { Tour } from "@nutui/nutui-react-taro";
import { getTourStorage } from "@/utils/store";
import Taro from "@tarojs/taro";

export const RegisterTour: FC = () => {
  const showTour = $UI.use((state) => state.registerTour);
  const steps = [
    {
      content: "点击选择想要报名的系列活动",
      target: "detail-subactivity-card",
    },
    {
      content: "选择所有想参加的系列活动后，点击提交报名",
      target: "detail-confirm",
      location: "top-end",
    },
  ];

  return (
    <>
      <Tour
        className="nut-custom-tour"
        visible={showTour}
        onClose={() => {
          $UI.update("close register tour", (draft) => {
            draft.registerTour = false;
            const prev = getTourStorage();
            Taro.setStorageSync("tours", {
              ...prev,
              registerTour: false,
            });
          });
        }}
        list={steps}
        location="top-start"
      />
    </>
  );
};
