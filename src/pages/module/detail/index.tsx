import React, {
  type TouchEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Taro from "@tarojs/taro";
import { Dialog, Image } from "@nutui/nutui-react-taro";
import { $UI } from "@/store/UI";
import { navigateBack, navigateTo } from "@/utils/navigator";
import { formatDate, px2rpx, windowHeight } from "@/utils/unit";
import { $Activity } from "@/store/activity";
import { baseActivityRequestIsEmpty } from "@/types/activity";
import { ActivityRegisterStatus, ActivityStatus } from "@/types/common";
import { pic2url } from "@/utils/type";
import { api } from "@/api";
import { $User } from "@/store/user";
import { availableSubIndice } from "@/utils/activity";
import { RegisterTour } from "@/components/tours/register-tour";
import { getTourStorage } from "@/utils/store";
import IconFont from "@/components/iconfont/iconfont";
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
  const registerTour = $UI.use((state) => state.registerTour);
  const lastY = useRef<number>(0);
  const onScroll = useRef<boolean>(false);
  const documentScrollHeight = useRef<number>(0);
  const [scrollToTour, setScrollToTour] = useState<boolean>(false);

  const load = async (withTour: boolean = false): Promise<void> => {
    if (currentActivity?.id !== undefined) {
      const registerInfo = await api.sign.registerInfo(currentActivity?.id);
      setRemainings(registerInfo.remainings);
      if (registerInfo.type === "sign") {
        setSelected(registerInfo.subs);
        if (
          $UI.get().detailOrigin === "home" &&
          registerInfo.subs.length === 0 &&
          withTour
        ) {
          const prev = getTourStorage();
          if (prev?.registerTour === undefined || prev.registerTour) {
            setScrollToTour(true);
            React.createElement("div", {
              className: "nut-tour-masked",
              style: {
                display: scrollToTour ? "block" : "none",
                width: "100vw",
                height: "100vh",
                zIndex: 500,
              },
              catchMove: true,
            });
            setTimeout(() => {
              void Taro.pageScrollTo({
                selector: "#detail-subactivity-card",
              }).then(() => {
                $UI.update("trigger register tour", (draft) => {
                  draft.registerTour = true;
                });
              });
            }, 1500);
          }
        }
      } else {
        if ($UI.get().detailOrigin === "home" && withTour) {
          const prev = getTourStorage();
          if (prev?.registerTour === undefined || prev.registerTour) {
            setScrollToTour(true);
            React.createElement("div", {
              className: "nut-tour-masked",
              style: {
                display: scrollToTour ? "block" : "none",
                width: "100vw",
                height: "100vh",
                zIndex: 500,
              },
              catchMove: true,
            });
            setTimeout(() => {
              void Taro.pageScrollTo({
                selector: "#detail-subactivity-card",
              }).then(() => {
                $UI.update("trigger register tour", (draft) => {
                  draft.registerTour = true;
                });
              });
            }, 1500);
          }
        }
      }
    }
  };

  useEffect(() => {
    // taro 的 view ref 对象未实现 offset 属性 只能使用 createSelectorQuery 方法·
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
    if (currentActivity === undefined) {
      navigateBack();
    }
    const user = $User.get();
    if (currentActivity !== undefined && user !== undefined)
      setAvailables(availableSubIndice(currentActivity, user));
    void load(true);
    getScrollViewHeight();
  }, []);

  const getScrollViewHeight = (): void => {
    Taro.createSelectorQuery()
      .select("#scrollView")
      .boundingClientRect((rect) => {
        if (Array.isArray(rect)) {
          documentScrollHeight.current = rect[0].height;
        } else {
          documentScrollHeight.current = rect.height;
        }
      })
      .exec();
  };

  const handleScroll: TouchEventHandler = (event) => {
    if (registerTour) return;
    const currentY = event.changedTouches[0].clientY;
    if (!onScroll.current) {
      if (lastY.current < currentY) {
        onScroll.current = true;
        void Taro.pageScrollTo({
          scrollTop: 0,
        }).then(() => {
          onScroll.current = false;
        });
      } else {
        onScroll.current = true;
        void Taro.pageScrollTo({
          scrollTop: window.innerHeight,
        }).then(() => {
          onScroll.current = false;
        });
      }
      lastY.current = currentY;
    }
  };
  const handleTouchStart: TouchEventHandler = (event) => {
    if (registerTour) return;
    const currentY = event.changedTouches[0].clientY;
    lastY.current = currentY;
  };

  return (
    <div
      id="scrollView"
      className="h-[100vh] bg-[#FCFCFC]"
      // style={registerTour ? { overflow: "hidden" } : { overflow: "visible" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleScroll}
    >
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
          起止时间 · {formatDate(currentActivity?.startTime, false)} -{" "}
          {formatDate(currentActivity?.endTime, false)}
        </div>
        <div className="p-4 mb-4 rounded-3xl shadow-[0px_3px_24px_rgba(25,32,45,0.05)] bg-white">
          <div className="text-base mb-2">
            举办方：{currentActivity?.organizer}
          </div>
          <div className="text-base mb-4">
            联系人：{currentActivity?.contactMan}
          </div>
          <div className="text-base">{currentActivity?.introduction}</div>
        </div>

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
                id={index === 0 ? "detail-subactivity-card" : undefined}
              />
            );
          })}
        </div>
        {selected.length !== 0 && (
          <div className="p-4 mb-3 rounded-3xl shadow-[0px_3px_24px_rgba(25,32,45,0.05)] bg-white">
            <div className="mb-2">群二维码</div>
            <div className="h-60">
              <Image
                src={pic2url(currentActivity?.groupImage)}
                mode="aspectFit"
                showMenuByLongpress
              ></Image>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex bg-white px-8 justify-between h-[150rpx] items-center z-20">
        <div
          onClick={() => {
            if (editable)
              $UI.update("detail navigate back", (draft) => {
                draft.detailOrigin = "home";
              });
            navigateBack();
          }}
        >
          <IconFont name="icon-tuichu" size={24} />
        </div>
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
            {currentActivity?.status === ActivityStatus.Draft ? (
              <IconFont name="icon-bianji" size={24} />
            ) : (
              "此阶段活动不能修改"
            )}
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
            id="detail-confirm"
          >
            <IconFont name="icon-shangchuan" size={24} />
          </div>
        )}
      </div>
      {scrollToTour && <RegisterTour />}
    </div>
  );
};

export default Detail;
