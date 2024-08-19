import React from "react";
import { Button } from "@nutui/nutui-react-taro";
import { Title } from "@/components/title";
import { navigateBack } from "@/utils/navigator";
import { $Activity } from "@/store/activity";
import { type BaseActivityRequest } from "@/types/activity";
import { api } from "@/api";
import { MainActivity } from "./components/main-activity";
import { SubActivity } from "./components/sub-activity";

import "./style.scss";

export interface SelectDate {
  start: string | undefined;
  end: string | undefined;
}

const NewActivity = (): JSX.Element => {
  return (
    <div className="bg-[#F7F8FA] pb-[150rpx]">
      <div className="py-2">
        <Title content="活动信息" />
      </div>
      <MainActivity />

      <div className="py-2">
        <Title content="子活动" />
      </div>
      <SubActivity />
      <div className="flex justify-between items-center fixed bottom-0 h-[150rpx] bg-white w-[calc(100%-64rpx)] px-4">
        <Button
          type="default"
          size="large"
          onClick={() => {
            navigateBack();
          }}
        >
          返回并保存
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            const newValue: BaseActivityRequest = $Activity.get();
            void api.activity
              .createActivityWithoutImage(newValue)
              .then((res) => {
                console.log(res);
                navigateBack();
              });
          }}
        >
          提交
        </Button>
      </div>
    </div>
  );
};

export default NewActivity;
