import React, { type FC } from "react";
import { $UI } from "@/store/UI";
import { Tour } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import { getTourStorage } from "@/utils/store";

export const HomeTour: FC = () => {
  const showTour = $UI.use((state) => state.homeTour);

  const steps = [
    {
      content: "选择标签可以进行过滤搜索",
      target: "home-tag",
    },
    {
      content: "左滑浏览、参加当前正在报名的活动",
      target: "home-big-card",
    },
    {
      content: "当前正在进行的活动",
      target: "home-middle-card",
    },
  ];

  return (
    <>
      <Tour
        className="nut-custom-tour"
        visible={showTour}
        onClose={() => {
          $UI.update("close home tour", (draft) => {
            draft.homeTour = false;
            const prev = getTourStorage();
            Taro.setStorageSync("tours", {
              ...prev,
              homeTour: false,
            });
          });
        }}
        list={steps}
        location="bottom-start"
      />
    </>
  );
};
