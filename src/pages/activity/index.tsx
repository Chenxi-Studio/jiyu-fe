import React, { createRef, useEffect, useState } from "react";
import { ArrowDown, Edit } from "@nutui/icons-react-taro";
import {
  Button,
  Collapse,
  Dialog,
  PullToRefresh,
  Swipe,
  type SwipeInstance,
} from "@nutui/nutui-react-taro";
import { api } from "@/api";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { GlobalNotify } from "@/components/global-notify";
import { SmallCard } from "@/components/small-card";
import { navigateTo } from "@/utils/navigator";
import { $UI } from "@/store/UI";
import { $Activity } from "@/store/activity";
import { ActivityStatus } from "@/types/common";
import "./style.scss";

const Activity = (): JSX.Element => {
  const refresh = $UI.use((state) => state.activityRefresh);
  const [signList, setSignList] = useState<ActivityEntity[]>([]);
  const [waitList, setWaitList] = useState<ActivityEntity[]>([]);
  const beforeApprovedListRefs = new Array(signList.length)
    .fill(null)
    .map(() => createRef<SwipeInstance>());

  const loadData = async (): Promise<void> => {
    const mySignListResponse = await api.sign.mySignList();
    console.log(mySignListResponse);

    setSignList(mySignListResponse);
    const waitListResponse = await api.sign.waitList();
    setWaitList(waitListResponse);
  };

  useEffect(() => {
    void loadData();
  }, []);

  useEffect(() => {
    if (refresh) {
      void loadData();
      $UI.update("activity page refresh", (draft) => {
        draft.activityRefresh = false;
      });
    }
  }, [refresh]);

  const handleOnclick = (item: ActivityEntity): void => {
    $UI.update("update current activity", (draft) => {
      draft.currentActivity = item;
      draft.detailOrigin = "activity";
    });
    navigateTo(`pages/module/detail/index`);
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await loadData();
      }}
      renderIcon={(status) => {
        return (
          <>
            {(status === "pulling" || status === "complete") && 1}
            {(status === "canRelease" || status === "refreshing") && 2}
          </>
        );
      }}
    >
      <Dialog id="Activity" />

      <div className="pb-[150rpx]">
        <Collapse defaultActiveName={["1", "2"]} expandIcon={<ArrowDown />}>
          <Collapse.Item title="已报名" name="1">
            <div>
              {signList.map((item, index) => (
                <Swipe
                  ref={beforeApprovedListRefs[index]}
                  rightAction={
                    <>
                      {item.status === ActivityStatus.Draft && (
                        <Button
                          type="primary"
                          shape="square"
                          onClick={() => {
                            Dialog.open(`Activity`, {
                              title: `取消报名提示`,
                              content: `确认取消报名活动 ${item.title} 吗？`,
                              onConfirm: async () => {
                                try {
                                  alert("todo");
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
                          删除
                        </Button>
                      )}
                    </>
                  }
                  key={`Activity-${index}`}
                  onTouchStart={() => {
                    for (const ref of beforeApprovedListRefs) {
                      if (
                        ref !== beforeApprovedListRefs[index] &&
                        ref.current !== null &&
                        typeof ref.current.close === "function"
                      ) {
                        ref.current.close();
                      }
                    }
                  }}
                  onActionClick={() => {
                    if (
                      beforeApprovedListRefs[index].current !== null &&
                      beforeApprovedListRefs[index].current !== undefined &&
                      typeof beforeApprovedListRefs[index].current.close ===
                        "function"
                    ) {
                      beforeApprovedListRefs[index].current.close();
                    }
                  }}
                >
                  <div
                    className="mt-2 px-[52rpx]"
                    onClick={() => {
                      handleOnclick(item);
                    }}
                  >
                    <SmallCard
                      title={item.title}
                      coverImage={item.coverImage}
                      organizer={item.organizer}
                      endTime={item.endTime}
                      status={item.status}
                    ></SmallCard>
                  </div>
                </Swipe>
              ))}
            </div>
          </Collapse.Item>
          <Collapse.Item title="候补中" name="2">
            <div>
              {waitList.map((item, index) => (
                <div
                  key={`Wait-${index}`}
                  className="mt-2 px-[52rpx]"
                  onClick={() => {
                    handleOnclick(item);
                  }}
                >
                  <SmallCard
                    title={item.title}
                    coverImage={item.coverImage}
                    organizer={item.organizer}
                    endTime={item.endTime}
                    status={item.status}
                  ></SmallCard>
                </div>
              ))}
            </div>
          </Collapse.Item>
        </Collapse>

        <div
          onClick={() => {
            if ($Activity.get().id !== undefined) {
              $Activity.init();
            }
            navigateTo("pages/module/new-activity/index");
          }}
          className="fixed h-12 w-12 rounded-full bg-blue-200 right-5 bottom-[190rpx] flex justify-center items-center"
        >
          <Edit color="white" width={24} height={24} />
        </div>
      </div>
      <GlobalNotify />
    </PullToRefresh>
  );
};

export default Activity;
