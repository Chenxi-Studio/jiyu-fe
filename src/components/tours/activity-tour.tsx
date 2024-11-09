import React, { useEffect, useState, type FC } from "react";
import { $UI } from "@/store/UI";
import { Tour } from "@nutui/nutui-react-taro";
import { getTourStorage } from "@/utils/store";
import Taro from "@tarojs/taro";

export interface ActivityTourProps {
  swipeOpen?: () => void;
  swipeClose?: () => void;
}

export const ActivityTour: FC<ActivityTourProps> = ({
  swipeOpen,
  swipeClose,
}) => {
  const showTour = $UI.use((state) => state.activityTour);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    if (showTour)
      setTimeout(() => {
        setShowCard(true);
      }, 100);
  }, [showTour]);

  return (
    <>
      <Tour
        className="nut-custom-tour"
        visible={showCard}
        onClose={() => {
          if (swipeOpen !== undefined) swipeOpen();
          setTimeout(() => {
            setShowButton(true);
          }, 1000);
        }}
        list={[
          {
            content: "点击查看报名情况，群二维码",
            target: "activity-small-card",
          },
        ]}
        type="tile"
        location="bottom-start"
      />
      <Tour
        className="nut-custom-tour"
        visible={showButton}
        type="tile"
        onClose={() => {
          const prev = getTourStorage();
          $UI.update("close activityTour", (draft) => {
            draft.activityTour = false;
            Taro.setStorageSync("tours", {
              ...prev,
              activityTour: false,
            });
          });
          if (swipeClose !== undefined) swipeClose();
        }}
        list={[
          {
            content: "左划取消活动报名",
            target: "activity-cancel",
            location: "left",
          },
        ]}
        location="left"
      />
    </>
  );
};
