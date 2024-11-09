import React, { useEffect, useState, type FC } from "react";
import { $UI } from "@/store/UI";
import { Tour } from "@nutui/nutui-react-taro";

export interface PublishTourProps {
  swipeOpen?: () => void;
  swipeClose?: () => void;
}

export const PublishTour: FC<PublishTourProps> = ({
  swipeOpen,
  swipeClose,
}) => {
  const showTour = $UI.use((state) => state.publishTour);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const showPublish = $UI.use((state) => state.publishButtonTour);

  useEffect(() => {
    if (showTour && !showPublish)
      setTimeout(() => {
        setShowCard(true);
      }, 100);
  }, [showTour, showPublish]);

  return (
    <>
      <Tour
        className="nut-custom-tour"
        visible={showPublish}
        type="tile"
        onClose={() => {
          $UI.update("close publishButtonTour", (draft) => {
            draft.publishButtonTour = false;
          });
          if (showTour) setShowCard(true);
        }}
        list={[
          {
            content: "新增活动的地方 ~",
            target: "publish-button",
            location: "left",
          },
        ]}
        location="left"
      />
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
            content: "点击查看、修改布活动信息",
            target: "publish-small-card",
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
          $UI.update("close publishTour", (draft) => {
            draft.publishTour = false;
          });
          if (swipeClose !== undefined) swipeClose();
        }}
        list={[
          {
            content: "左划删除活动、提交活动审批",
            target: "publish-swipe-button",
            location: "left",
          },
        ]}
        location="left"
      />
    </>
  );
};
