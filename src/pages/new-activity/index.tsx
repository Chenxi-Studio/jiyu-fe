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
  const id = $Activity.use((state) => state.id);
  const editable = id !== undefined;

  const handleSubmit = async (): Promise<void> => {
    const aid = $Activity.get().id;

    if (aid === undefined) {
      try {
        // 新增活动
        const newValue: BaseActivityRequest = $Activity.get();
        setLoading(true);
        setSubmitText("上传活动图片");
        const response = await api.activity.createActivity(
          newValue,
          $Activity.get().coverImage,
        );

        setSubmitText("上传子活动");
        if (response.id !== undefined) {
          await api.subActivity.add($Activity.get().subActivities, response.id);
        } else {
          throw new Error("创建活动异常");
        }

        setLoading(false);
        setSubmitText("上传完毕");
        $UI.update("load new publish activity", (draft) => {
          draft.publishRefresh = true;
        });
        navigateBack();
      } catch (error) {
        setLoading(false);
        setSubmitText("出错了");
        $UI.update("new activity err", (draft) => {
          draft.notifyMsg = error.message;
          draft.showNotify = true;
        });
      }
    } else {
      // 更新活动
      setLoading(true);
      setSubmitText("修改上传中");
      try {
        await api.activity.update(
          $Activity.get(),
          $Activity.get().coverImage !== undefined &&
            $Activity.get().coverImage?.match(/^http:\/\/tmp/) !== null
            ? $Activity.get().coverImage
            : undefined,
        );

        if (
          $Activity.get().subActivities.filter((item) => item.id !== undefined)
            .length > 0
        ) {
          await api.subActivity.update(
            $Activity
              .get()
              .subActivities.filter((item) => item.id !== undefined),
          );
        }
        if (
          $Activity.get().subActivities.filter((item) => item.id === undefined)
            .length > 0
        ) {
          await api.subActivity.add(
            $Activity
              .get()
              .subActivities.filter((item) => item.id === undefined),
            aid,
          );
        }
        if ($Activity.get().deleteList.length > 0) {
          await api.subActivity.delete($Activity.get().deleteList);
        }

        setLoading(false);
        setSubmitText("上传完毕");
        $Activity.init();
        $UI.update("load new edited publish activity", (draft) => {
          draft.publishRefresh = true;
        });
        navigateBack(2);
      } catch (error) {
        setLoading(false);
        setSubmitText("出错啦");
        $UI.update("new activity err", (draft) => {
          draft.notifyMsg = error.message;
          draft.showNotify = true;
        });
      }
    }
  };

  return (
    <div className="bg-[#F7F8FA] pb-[150rpx]">
      <GlobalNotify />
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
            if ($Activity.get().id !== undefined) {
              $Activity.init();
            }
            navigateBack();
          }}
          loading={loading}
        >
          {editable ? "返回" : "返回并保存"}
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            void handleSubmit();
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
