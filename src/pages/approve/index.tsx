import React, { createRef, useEffect, useRef, useState } from "react";
import {
  Button,
  Collapse,
  Dialog,
  Input,
  PullToRefresh,
  Swipe,
  type SwipeInstance,
} from "@nutui/nutui-react-taro";
import { SmallCard } from "@/components/small-card";
import { ArrowDown } from "@nutui/icons-react-taro";
import { navigateTo } from "@/utils/navigator";
import { api } from "@/api";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { $UI } from "@/store/UI";
import { GlobalNotify } from "@/components/global-notify";
import { TabBar } from "@/components/tab-bar";
import "./style.scss";

const Approve = (): JSX.Element => {
  const refresh = $UI.use((state) => state.approveRefresh);
  const [toApproveList, setToApproveList] = useState<ActivityEntity[]>([]);
  const [approvedList, setApprovedList] = useState<ActivityEntity[]>([]);
  const reason = useRef<string>("");
  const refs = new Array(toApproveList.length)
    .fill(null)
    .map(() => createRef<SwipeInstance>());

  const fetchList = async (): Promise<void> => {
    try {
      const toApproveResponse = await api.approve.toApprove();
      setToApproveList(toApproveResponse);
      const approvedResponse = await api.approve.approved();
      setApprovedList(approvedResponse.data);
    } catch (error) {
      console.error("Error fetching to approve list:", error);
    }
  };

  useEffect(() => {
    if (refresh) {
      void fetchList();
      $UI.update("approve page refresh", (draft) => {
        draft.approveRefresh = false;
      });
    }
  }, [refresh]);

  useEffect(() => {
    void fetchList();
  }, []);

  const handleOnclick = (item: ActivityEntity): void => {
    $UI.update("update current activity", (draft) => {
      draft.currentActivity = item;
    });
    navigateTo(`pages/module/detail/index`);
  };

  return (
    <>
      <PullToRefresh
        onRefresh={async () => {
          await fetchList();
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
        <GlobalNotify />
        <Dialog id="Approve" />
        <div className="pb-[150rpx]">
          <Collapse defaultActiveName={["1", "2"]} expandIcon={<ArrowDown />}>
            <Collapse.Item title="待审核" name="1">
              <div>
                {toApproveList.map((item, index) => (
                  <Swipe
                    ref={refs[index]}
                    rightAction={
                      <>
                        <Button
                          type="success"
                          shape="square"
                          onClick={() => {
                            Dialog.open(`Approve`, {
                              title: `批准提示`,
                              content: `确认批准通过活动 ${item.title} 吗？`,
                              onConfirm: async () => {
                                try {
                                  if (item.id !== undefined) {
                                    await api.approve.approve(item.id);
                                    await fetchList();
                                  }
                                } catch (error) {
                                  // TODO: 错误问题
                                }
                                Dialog.close(`Approve`);
                              },
                              onCancel: () => {
                                Dialog.close(`Approve`);
                              },
                            });
                          }}
                        >
                          批准
                        </Button>
                        <Button
                          type="primary"
                          shape="square"
                          onClick={() => {
                            Dialog.open(`Approve`, {
                              title: `驳回提示`,
                              content: (
                                <>
                                  <div>{`确认驳回活动 ${item.title} 吗？`}</div>
                                  <Input
                                    className="border-b"
                                    placeholder="请输入驳回原因"
                                    onChange={(v) => {
                                      reason.current = v;
                                    }}
                                  />
                                </>
                              ),
                              onConfirm: async () => {
                                if (reason.current === "") return;
                                try {
                                  if (item.id !== undefined) {
                                    await api.approve.disapprove(
                                      item.id,
                                      reason.current,
                                    );
                                    await fetchList();
                                  }
                                } catch (error) {
                                  // TODO: 错误问题
                                }
                                Dialog.close(`Approve`);
                              },
                              onCancel: () => {
                                Dialog.close(`Approve`);
                              },
                            });
                          }}
                        >
                          驳回
                        </Button>
                      </>
                    }
                    key={`Approve-ToApprove-${index}`}
                    onTouchStart={() => {
                      for (const ref of refs) {
                        if (
                          ref !== refs[index] &&
                          ref.current !== null &&
                          typeof ref.current.close === "function"
                        ) {
                          ref.current.close();
                        }
                      }
                    }}
                    onActionClick={() => {
                      if (
                        refs[index].current !== null &&
                        refs[index].current !== undefined &&
                        typeof refs[index].current.close === "function"
                      ) {
                        refs[index].current.close();
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
            <Collapse.Item title="已审核" name="2">
              {approvedList.map((item, index) => (
                <div
                  key={`Approve-Approved-${index}`}
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
            </Collapse.Item>
          </Collapse>
        </div>
      </PullToRefresh>
      <div className="fixed bottom-0 left-0 w-full">
        <TabBar />
      </div>
    </>
  );
};

export default Approve;
