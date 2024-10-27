import React, { useEffect, useRef, useState } from "react";
import Taro, { useReady } from "@tarojs/taro";
import { Dialog, Image } from "@nutui/nutui-react-taro";
import { $UI } from "@/store/UI";
import { navigateBack, navigateTo } from "@/utils/navigator";
import { formatDate, px2rpx, windowHeight } from "@/utils/unit";
import { $Activity } from "@/store/activity";
import { baseActivityRequestIsEmpty } from "@/types/activity";
import { ActivityRegisterStatus, ActivityStatus } from "@/types/common";
import { pic2url } from "@/utils/type";
import { Logout, PackageAdd } from "@nutui/icons-react-taro";
import { api } from "@/api";
import { GlobalNotify } from "@/components/global-notify";
import { $User } from "@/store/user";
import { availableSubIndice } from "@/utils/activity";
import { SubActivityCard } from "./components/sub-activity-card";

const Detail = (): JSX.Element => {
  const currentActivity = $UI.use((state) => state.currentActivity);
  const origin = $UI.use((state) => state.detailOrigin);
  const editable = origin === "publish";
  const confirm = origin === "home";
  const [offset, setOffset] = useState<number>(0);
  const [minHeight, setMinHeight] = useState<number>(0);
  const subIDs = useRef<number[]>([]);
  const [remainings, setRemainings] = useState<
    Array<{ subID: number; remaining: number }>
  >([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [availables, setAvailables] = useState<number[]>([]);

  // TODO: 卡顿？
  useReady(() => {
    // taro 的 view ref 对象未实现 offset 属性 只能使用 createSelectorQuery 方法
    // https://taro-docs.jd.com/docs/ref#在子组件中获取
    Taro.createSelectorQuery()
      .select("#detail-pic")
      .boundingClientRect()
      .exec((res) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-argument
        if (res[0]?.height) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const bodyOffset = px2rpx(res[0].height) - 64; // 最好使用 rpx 而非 px

          setOffset(bodyOffset);
          setMinHeight(px2rpx(windowHeight) - 150);
        }
      });
  });

  const load = async (): Promise<void> => {
    if (currentActivity?.id !== undefined) {
      const registerInfo = await api.sign.registerInfo(currentActivity?.id);
      console.log(registerInfo);
      setRemainings(registerInfo.remainings);
      if (registerInfo.type === "sign") {
        setSelected(registerInfo.subs);
      }
    }
  };

  useEffect(() => {
    if (currentActivity === undefined) {
      navigateBack();
    }
    const user = $User.get();
    if (currentActivity !== undefined && user !== undefined)
      setAvailables(availableSubIndice(currentActivity, user, true));
    void load();
  }, []);

  return (
    <div className="h-[100vh] bg-[#FCFCFC]">
      <GlobalNotify />
      <Dialog id="Detail" />
      <div className="h-48 w-full fixed top-0 z-0" id="detail-pic">
        <Image src={pic2url(currentActivity?.coverImage)} mode="aspectFill" />
      </div>
      <div
        className="bg-[#FCFCFC] rounded-[64rpx] pt-10 px-8 relative z-10 pb-[150rpx]"
        style={{
          top: `${offset}rpx`,
          minHeight: `${minHeight}rpx`,
          transition: "top 1s ease-in-out",
        }}
      >
        <div className="text-4xl font-extrabold mb-4">
          {currentActivity?.title}
        </div>
        <div className="rounded-2xl p-3 border-gray-200 border-2 text-base text-center border-solid text-gray-400 mb-4">
          {currentActivity?.organizer} ·{" "}
          {formatDate(currentActivity?.startTime, false)} -{" "}
          {formatDate(currentActivity?.endTime, false)}
        </div>
        <div className="text-base">{currentActivity?.introduction}</div>
        <div>
          {currentActivity?.subActivities.map((item, index) => {
            return (
              <SubActivityCard
                disabled={!availables.includes(index)}
                sub={item}
                remaining={
                  remainings.find((i) => i.subID === item.id)?.remaining ??
                  item.capacity
                }
                isSelected={
                  item.id === undefined ? false : selected.includes(item.id)
                }
                key={`sub-activity-${index}`}
                origin={origin}
                onClick={() => {
                  if (
                    item.id !== undefined &&
                    subIDs.current.includes(item.id)
                  ) {
                    subIDs.current = subIDs.current.filter(
                      (id) => id !== item.id,
                    );
                  }
                  if (
                    item.id !== undefined &&
                    !subIDs.current.includes(item.id)
                  ) {
                    subIDs.current.push(item.id);
                  }
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex bg-white px-8 justify-between h-[150rpx] items-center z-20">
        {editable && (
          <div
            onClick={() => {
              if (currentActivity === undefined) {
                return;
              }
              if (currentActivity.status !== ActivityStatus.Draft) {
                return;
              }
              const crt = $Activity.get();
              if (
                crt.subActivities.length > 0 ||
                !baseActivityRequestIsEmpty(crt)
              ) {
                Dialog.open(`Detail`, {
                  title: `编辑提示`,
                  content: `编辑活动会使之前保存的草稿消失哦`,
                  onConfirm: () => {
                    $Activity.update("edit activity", (draft) => {
                      draft = {
                        ...draft,
                        ...currentActivity,
                      };
                      return draft;
                    });
                    navigateTo("pages/module/new-activity/index");
                    Dialog.close(`Detail`);
                  },
                  onCancel: () => {
                    Dialog.close(`Detail`);
                  },
                });
              }
            }}
          >
            {currentActivity?.status === ActivityStatus.Draft
              ? "Edit"
              : "此阶段活动不能修改"}
          </div>
        )}
        {confirm && selected.length === 0 && (
          <div
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => {
              try {
                if (currentActivity?.id !== undefined) {
                  const res = await api.sign.register(
                    currentActivity?.id,
                    subIDs.current,
                  );

                  if (res.registerStatus === ActivityRegisterStatus.Success) {
                    $UI.update("register success refresh", (draft) => {
                      draft.activityRefresh = true;
                    });
                    navigateBack();
                  }
                  if (res.registerStatus === ActivityRegisterStatus.Fail) {
                    $UI.update("register error notify", (draft) => {
                      draft.showNotify = true;
                      draft.notifyMsg = "报名失败: 不满足报名条件";
                    });
                  }
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <PackageAdd />
          </div>
        )}
        <div
          onClick={() => {
            if (editable)
              $UI.update("detail navigate back", (draft) => {
                draft.detailOrigin = "home";
              });
            navigateBack();
          }}
        >
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Detail;
