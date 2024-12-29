import React, { createRef, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  PullToRefresh,
  Swipe,
  type SwipeInstance,
} from "@nutui/nutui-react-taro";
import { api } from "@/api";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { SmallCard } from "@/components/small-card";
import { navigateTo } from "@/utils/navigator";
import { $UI } from "@/store/UI";
import { ActivityTour } from "@/components/tours/activity-tour";
import { getTourStorage } from "@/utils/store";
import { pullToRefreshRenderIcon } from "@/utils/ui";
import { ActivityStatus } from "@/types/common";
import Taro from "@tarojs/taro";
import "./style.scss";

const ActivityPage = (): JSX.Element => {
  const refresh = $UI.use((state) => state.activityRefresh);
  const [signStartList, setSignStartList] = useState<
    Array<{ activity: ActivityEntity; signID: number }>
  >([]);
  const [signList, setSignList] = useState<
    Array<{ activity: ActivityEntity; signID: number }>
  >([]);
  const [signEndList, setSignEndList] = useState<
    Array<{ activity: ActivityEntity; signID: number }>
  >([]);
  const [waitList, setWaitList] = useState<
    Array<{ activity: ActivityEntity; waitID: number; isTail: boolean }>
  >([]);
  const signListRefs = new Array(signList.length)
    .fill(null)
    .map(() => createRef<SwipeInstance>());
  const waitListRefs = new Array(waitList.length)
    .fill(null)
    .map(() => createRef<SwipeInstance>());
  const [tourTrigger, setTourTrigger] = useState<boolean>(false);

  const loadData = async (withTour: boolean = false): Promise<void> => {
    const mySignListResponse = await api.sign.mySignList();
    setSignStartList(
      mySignListResponse
        .filter((i) => i.activity.status === ActivityStatus.Ongoing)
        .sort(
          (a, b) =>
            b.activity.startTime.getTime() - a.activity.startTime.getTime(),
        )
        .map((item) => ({
          activity: { subActivities: item.subActivities, ...item.activity },
          signID: item.id,
        })),
    );
    setSignList(
      mySignListResponse
        .filter((i) => i.activity.status === ActivityStatus.Register)
        .sort(
          (a, b) =>
            a.activity.startTime.getTime() - b.activity.startTime.getTime(),
        )
        .map((item) => ({
          activity: { subActivities: item.subActivities, ...item.activity },
          signID: item.id,
        })),
    );
    setSignEndList(
      mySignListResponse
        .filter((i) => i.activity.status === ActivityStatus.Finished)
        .sort(
          (a, b) =>
            b.activity.startTime.getTime() - a.activity.startTime.getTime(),
        )
        .map((item) => ({
          activity: { subActivities: item.subActivities, ...item.activity },
          signID: item.id,
        })),
    );
    if (withTour && mySignListResponse.length !== 0) {
      setTourTrigger(true);
    }
    const waitListResponse = await api.sign.waitList();

    setWaitList(
      waitListResponse
        .sort(
          (a, b) =>
            a.activity.startTime.getTime() - b.activity.startTime.getTime(),
        )
        .map((item) => ({
          activity: { subActivities: item.subActivities, ...item.activity },
          waitID: item.id,
          isTail: item.isTail,
        })),
    );
  };

  useEffect(() => {
    void loadData(true);
  }, []);

  useEffect(() => {
    if (refresh) {
      void loadData();
      $UI.update("activity page refresh", (draft) => {
        draft.activityRefresh = false;
      });
    }
  }, [refresh]);

  useEffect(() => {
    if (tourTrigger) {
      const prev = getTourStorage();
      if (prev?.activityTour === undefined || prev.activityTour) {
        $UI.update("trigger activity tour", (draft) => {
          draft.activityTour = true;
        });
      }
      setTourTrigger(false);
    }
  }, [tourTrigger]);

  const handleOnclick = (item: ActivityEntity): void => {
    $UI.update("update current activity", (draft) => {
      draft.currentActivity = item;
      draft.detailOrigin = "activity";
    });
    navigateTo(`pages/module/detail/index`);
  };

  return (
    <>
      <PullToRefresh
        onRefresh={async () => {
          await loadData();
        }}
        renderIcon={pullToRefreshRenderIcon}
        completeDelay={750}
        className="bg-[#FCFCFC] pb-[150rpx] h-[100vh] overflow-y-auto"
      >
        <Dialog id="Activity" />

        <div className="hide-scrollbar py-3 flex flex-col gap-6 overflow-y-auto overscroll-x-hidden px-[52rpx] drop-shadow-base">
          {signStartList.map((item, index) => (
            <div
              key={`Activity-${item.signID}`}
              className="rounded-2xl overflow-hidden drop-shadow-base"
            >
              <div
                onClick={() => {
                  handleOnclick(item.activity);
                }}
              >
                <SmallCard
                  title={item.activity.title}
                  coverImage={item.activity.coverImage}
                  organizer={item.activity.organizer}
                  startTime={item.activity.startTime}
                  status={item.activity.status}
                  id={index === 0 ? "activity-small-card" : undefined}
                  disabled={item.activity.status === ActivityStatus.Finished}
                ></SmallCard>
              </div>
            </div>
          ))}
          {signList.map((item, index) => (
            <Swipe
              ref={signListRefs[index]}
              rightAction={
                <>
                  {item.activity.status === ActivityStatus.Register &&
                    item.activity.registrationEndTime.getTime() >=
                      new Date().getTime() && (
                      <Button
                        type="primary"
                        shape="square"
                        id={index === 0 ? "activity-cancel" : undefined}
                        onClick={() => {
                          void Taro.vibrateLong();
                          Dialog.open(`Activity`, {
                            title: `取消报名提示`,
                            content: `确认取消报名活动 ${item.activity.title} 吗？`,
                            onConfirm: async () => {
                              try {
                                await Taro.vibrateLong();
                                await api.sign.revocation(item.signID);
                                await loadData();
                              } catch (error) {
                                // TODO: 错误问题
                              }
                              Dialog.close(`Activity`);
                            },
                            onCancel: () => {
                              Dialog.close(`Activity`);
                            },
                          });
                        }}
                      >
                        取消报名
                      </Button>
                    )}
                </>
              }
              key={`Activity-${item.signID}`}
              onTouchStart={() => {
                for (const ref of signListRefs) {
                  if (
                    ref !== signListRefs[index] &&
                    ref.current !== null &&
                    typeof ref.current.close === "function"
                  ) {
                    ref.current.close();
                  }
                }
              }}
              onActionClick={() => {
                if (
                  signListRefs[index].current !== null &&
                  signListRefs[index].current !== undefined &&
                  typeof signListRefs[index].current.close === "function"
                ) {
                  signListRefs[index].current.close();
                }
              }}
              className="rounded-2xl overflow-hidden drop-shadow-base"
            >
              <div
                onClick={() => {
                  handleOnclick(item.activity);
                }}
              >
                <SmallCard
                  title={item.activity.title}
                  coverImage={item.activity.coverImage}
                  organizer={item.activity.organizer}
                  startTime={item.activity.startTime}
                  status={item.activity.status}
                  id={index === 0 ? "activity-small-card" : undefined}
                  disabled={item.activity.status === ActivityStatus.Finished}
                  statusText="已报名"
                ></SmallCard>
              </div>
            </Swipe>
          ))}
          {waitList.map((item, index) => (
            <Swipe
              ref={waitListRefs[index]}
              rightAction={
                <>
                  {item.activity.status !== ActivityStatus.Finished && (
                    <Button
                      type="primary"
                      shape="square"
                      id={index === 0 ? "activity-cancel" : undefined}
                      onClick={() => {
                        void Taro.vibrateLong();
                        Dialog.open(`Activity`, {
                          title: `取消候补提示`,
                          content: `确认取消候补活动 ${item.activity.title} 吗？`,
                          onConfirm: async () => {
                            try {
                              await Taro.vibrateLong();
                              await api.sign.waitRevocation(item.waitID);
                              await loadData();
                            } catch (error) {
                              // TODO: 错误问题
                            }
                            Dialog.close(`Activity`);
                          },
                          onCancel: () => {
                            Dialog.close(`Activity`);
                          },
                        });
                      }}
                    >
                      取消候补
                    </Button>
                  )}
                </>
              }
              key={`Activity-${item.waitID}`}
              onTouchStart={() => {
                for (const ref of waitListRefs) {
                  if (
                    ref !== waitListRefs[index] &&
                    ref.current !== null &&
                    typeof ref.current.close === "function"
                  ) {
                    ref.current.close();
                  }
                }
              }}
              onActionClick={() => {
                if (
                  waitListRefs[index].current !== null &&
                  waitListRefs[index].current !== undefined &&
                  typeof waitListRefs[index].current.close === "function"
                ) {
                  waitListRefs[index].current.close();
                }
              }}
              className="rounded-2xl overflow-hidden drop-shadow-base"
            >
              <div
                onClick={() => {
                  handleOnclick(item.activity);
                }}
              >
                <SmallCard
                  title={item.activity.title}
                  coverImage={item.activity.coverImage}
                  organizer={item.activity.organizer}
                  startTime={item.activity.startTime}
                  status={item.activity.status}
                  id={index === 0 ? "activity-small-card" : undefined}
                  disabled={item.activity.status === ActivityStatus.Finished}
                  statusText={item.isTail ? "爽约候补" : "已候补"}
                ></SmallCard>
              </div>
            </Swipe>
          ))}
          {signEndList.map((item, index) => (
            <div
              key={`Activity-${item.signID}`}
              className="rounded-2xl overflow-hidden drop-shadow-base"
            >
              <div
                onClick={() => {
                  handleOnclick(item.activity);
                }}
              >
                <SmallCard
                  title={item.activity.title}
                  coverImage={item.activity.coverImage}
                  organizer={item.activity.organizer}
                  startTime={item.activity.startTime}
                  status={item.activity.status}
                  id={index === 0 ? "activity-small-card" : undefined}
                  disabled={item.activity.status === ActivityStatus.Finished}
                ></SmallCard>
              </div>
            </div>
          ))}
        </div>
      </PullToRefresh>

      <ActivityTour
        swipeOpen={() => {
          signListRefs[0].current?.open("right");
        }}
        swipeClose={() => {
          signListRefs[0].current?.close();
        }}
      />
    </>
  );
};

export default ActivityPage;
