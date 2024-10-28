import React, { createRef, useEffect, useRef, useState } from "react";
import { ArrowDown, Edit } from "@nutui/icons-react-taro";
import {
  Button,
  Collapse,
  Dialog,
  Picker,
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
import { type UserEntity } from "@/types/entity/User.entity";
import { TabBar } from "@/components/tab-bar";
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
  const [adminPickerVisible, setAdminPickerVisible] = useState(false);
  const [admins, setAdmins] = useState<UserEntity[]>([]);
  const [chosenAdmin, setChosenAdmin] = useState<string>("");
  const chosenAdminSid = useRef<string>("");
  const [submitApproveVisible, setSubmitApproveVisible] =
    useState<boolean>(false);
  const [submitApproveActivity, setSubmitApproveActivity] = useState<
    ActivityEntity | undefined
  >(undefined);

  const loadData = async (): Promise<void> => {
    const beforeApprovedResponse = await api.activity.beforeApproved();
    setBeforeApprovedList(beforeApprovedResponse);
    const afterApprovedResponse = await api.activity.afterApproved();
    setAfterApprovedList(afterApprovedResponse);
    const superAdmins = await api.admin.super();
    setAdmins(superAdmins);

    setChosenAdmin(superAdmins[0].name ?? "");
    chosenAdminSid.current = superAdmins[0].sid ?? "";
  };

  useEffect(() => {
    void loadData();
  }, []);

  useEffect(() => {
    if (refresh) {
      void loadData();
      $UI.update("publish page refresh", (draft) => {
        draft.publishRefresh = false;
      });
    }
  }, [refresh]);

  const handleOnclick = (item: ActivityEntity): void => {
    $UI.update("update current activity", (draft) => {
      draft.currentActivity = item;
      draft.detailOrigin = "publish";
    });
    navigateTo(`pages/module/detail/index`);
  };

  return (
    <>
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
        <Dialog id="Publish" />
        <Dialog
          visible={submitApproveVisible}
          title="审核提示"
          onConfirm={async () => {
            try {
              if (submitApproveActivity?.id !== undefined) {
                await api.activity.toApprove(
                  submitApproveActivity.id,
                  chosenAdminSid.current,
                );
                $UI.update("trigger approve refresh", (draft) => {
                  draft.approveRefresh = true;
                });
                const response = await api.activity.beforeApproved();
                setBeforeApprovedList(response);
              }
            } catch (error) {
              // TODO: 错误问题
            }
            setSubmitApproveVisible(false);
          }}
          onCancel={() => {
            setSubmitApproveVisible(false);
          }}
        >
          <div>确认提交审核活动 {submitApproveActivity?.title} 吗？</div>
          <div
            className="mt-2 p-2 bg-white border border-solid rounded-lg"
            onClick={() => {
              setAdminPickerVisible(true);
            }}
          >
            {chosenAdmin === "" ? "请选择审核老师" : chosenAdmin}
          </div>
        </Dialog>
        <Picker
          popupProps={{ zIndex: 9999 }}
          title="请选择审核老师"
          visible={adminPickerVisible}
          options={admins.map((admin) => ({
            text: admin.name ?? "未知管理员名字",
            value: admin.sid ?? "未知管理员 sid",
          }))}
          onConfirm={(selectedOptions, selectedValue) => {
            setChosenAdmin(selectedOptions[0].text.toString());
            chosenAdminSid.current = selectedValue[0].toString();
          }}
          onClose={() => {
            setAdminPickerVisible(false);
          }}
        />

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
                              Dialog.open(`Publish`, {
                                title: `删除提示`,
                                content: `确认删除活动 ${item.title} 吗？`,
                                onConfirm: async () => {
                                  try {
                                    if (item.id !== undefined) {
                                      await api.activity.delete(item.id);
                                      const response =
                                        await api.activity.beforeApproved();
                                      setBeforeApprovedList(response);
                                    }
                                  } catch (error) {
                                    // TODO: 错误问题
                                  }
                                  Dialog.close(`Publish`);
                                },
                                onCancel: () => {
                                  Dialog.close(`Publish`);
                                },
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
                              setSubmitApproveVisible(true);
                              setSubmitApproveActivity(item);
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
                              Dialog.open(`Publish`, {
                                title: `审核提示`,
                                content: `确认撤回审核活动 ${item.title} 吗？`,
                                onConfirm: async () => {
                                  try {
                                    if (item.id !== undefined) {
                                      await api.activity.withdrawApprove(
                                        item.id,
                                      );
                                      $UI.update(
                                        "trigger approve refresh",
                                        (draft) => {
                                          draft.approveRefresh = true;
                                        },
                                      );
                                      const response =
                                        await api.activity.beforeApproved();
                                      setBeforeApprovedList(response);
                                    }
                                  } catch (error) {
                                    // TODO: 错误问题
                                  }

                                  Dialog.close(`Publish`);
                                },
                                onCancel: () => {
                                  Dialog.close(`Publish`);
                                },
                              });
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
      <div className="fixed bottom-0 left-0 w-full">
        <TabBar />
      </div>
    </>
  );
};

export default Publish;
