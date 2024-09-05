import React, { createRef, useEffect, useState } from "react";
import { ArrowDown, Edit } from "@nutui/icons-react-taro";
import {
  Button,
  Collapse,
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
import { ActivityStatus } from "@/types/common";
import "./style.scss";

const Publish = (): JSX.Element => {
  const refresh = $UI.use((state) => state.publishRefresh);
  const [beforeApprovedList, setBeforeApprovedList] = useState<
    ActivityEntity[]
  >([]);
  const [afterApprovedList, setAfterApprovedList] = useState<ActivityEntity[]>(
    [],
  );
  const beforeApprovedListRefs = new Array(beforeApprovedList.length)
    .fill(null)
    .map(() => createRef<SwipeInstance>());

  useEffect(() => {
    void api.activity.beforeApproved().then((res) => {
      setBeforeApprovedList(res);
    });
    void api.activity.afterApproved().then((res) => {
      setAfterApprovedList(res);
    });
  }, []);

  useEffect(() => {
    if (refresh) {
      void api.activity.beforeApproved().then((res) => {
        setBeforeApprovedList(res);
      });
      void api.activity.afterApproved().then((res) => {
        setAfterApprovedList(res);
      });
      $UI.update("publish page refresh", (draft) => {
        draft.publishRefresh = false;
      });
    }
  }, [refresh]);

  const handleOnclick = (item: ActivityEntity): void => {
    $UI.update("update current activity", (draft) => {
      draft.currentActivity = item;
    });
    navigateTo(`pages/detail/index`);
  };

  return (
    <PullToRefresh
      onRefresh={async () =>
        await api.activity
          .beforeApproved()
          .then(async (res) => {
            setBeforeApprovedList(res);
            return await api.activity.afterApproved(); // 返回第二个Promise
          })
          .then(async (res) => {
            setAfterApprovedList(res);
            return await new Promise((resolve) => {
              resolve("done");
            });
          })
      }
      renderIcon={(status) => {
        return (
          <>
            {(status === "pulling" || status === "complete") && 1}
            {(status === "canRelease" || status === "refreshing") && 2}
          </>
        );
      }}
    >
      <div className="pb-[150rpx]">
        <Collapse defaultActiveName={["1", "2"]} expandIcon={<ArrowDown />}>
          <Collapse.Item title="未发布" name="1">
            <div>
              {beforeApprovedList.map((item, index) => (
                <Swipe
                  ref={beforeApprovedListRefs[index]}
                  rightAction={
                    <>
                      {item.status === ActivityStatus.Draft && (
                        <Button
                          type="primary"
                          shape="square"
                          onClick={() => {
                            void api.activity.delete(item.id).then(() => {
                              // TODO: 错误问题
                              void api.activity.beforeApproved().then((res) => {
                                setBeforeApprovedList(res);
                              });
                            });
                          }}
                        >
                          删除
                        </Button>
                      )}
                      {item.status === ActivityStatus.Draft && (
                        <Button
                          type="info"
                          shape="square"
                          onClick={() => {
                            void api.activity.toApprove(item.id).then(() => {
                              // TODO: 提示
                              void api.activity.beforeApproved().then((res) => {
                                setBeforeApprovedList(res);
                              });
                            });
                          }}
                        >
                          提交审核
                        </Button>
                      )}
                      {item.status === ActivityStatus.Approval && (
                        <Button
                          type="warning"
                          shape="square"
                          onClick={() => {
                            // api.activity.delete()
                          }}
                        >
                          撤回审核
                        </Button>
                      )}
                    </>
                  }
                  key={`Publish-${index}`}
                  onTouchStart={() => {
                    for (const ref of beforeApprovedListRefs) {
                      if (
                        ref.current !== null &&
                        typeof ref.current.close === "function"
                      ) {
                        ref.current.close();
                      }
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
          <Collapse.Item title="已发布" name="2">
            <div>
              {afterApprovedList.map((item, index) => (
                <div
                  key={`Published-${index}`}
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
            navigateTo("pages/new-activity/index");
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

export default Publish;
