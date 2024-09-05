import React, { useState } from "react";
import { Button } from "@nutui/nutui-react-taro";
import { GlobalNotify } from "@/components/global-notify";
import { Title } from "@/components/title";
import { navigateBack } from "@/utils/navigator";
import { $Activity } from "@/store/activity";
import { type BaseActivityRequest } from "@/types/activity";
import { api } from "@/api";
import { $UI } from "@/store/UI";
import { MainActivity } from "./components/main-activity";
import { SubActivity } from "./components/sub-activity";

import "./style.scss";

export interface SelectDate {
  start: string | undefined;
  end: string | undefined;
}

const NewActivity = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [submitText, setSubmitText] = useState<string>("提交");

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
      <div className="flex justify-between items-center fixed bottom-0 h-[150rpx] bg-white w-[calc(100%-64rpx)] px-4 z-50">
        <Button
          type="default"
          size="large"
          onClick={() => {
            navigateBack();
          }}
          loading={loading}
        >
          返回并保存
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            const newValue: BaseActivityRequest = $Activity.get();
            setLoading(true);
            setSubmitText("上传活动图片");
            void api.activity
              .createActivity(newValue, $Activity.get().picSrc)
              .then((res) => {
                setLoading(false);
                setSubmitText("上传完毕");
                $UI.update("load new publish activity", (draft) => {
                  draft.publishRefresh = true;
                });
                console.log(res);
                navigateBack();
              });
          }}
          loading={loading}
        >
          {submitText}
        </Button>
      </div>
      <GlobalNotify />
    </div>
  );
};

export default NewActivity;
