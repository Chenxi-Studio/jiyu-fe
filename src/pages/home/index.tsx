import React, { act, useEffect, useMemo, useState } from "react";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { api } from "@/api";
import { $UI } from "@/store/UI";
import { navigateTo } from "@/utils/navigator";
import { PullToRefresh } from "@nutui/nutui-react-taro";
import { TabTour } from "@/components/tours/tab-tour";
import { HomeTour } from "@/components/tours/home-tour";
import { type ActivityWithRemain } from "@/types/api";
import { $Common } from "@/store/common";
import { pullToRefreshRenderIcon } from "@/utils/ui";
import Taro from "@tarojs/taro";
import { BigCard } from "./components/big-card";
import "./style.scss";
import { MiddleCard } from "./components/middle-card";
import { Tag } from "./components/tag";

const TagContent = [
  "党旗引领",
  "志愿服务",
  "学术讲座",
  "校园文化",
  "文体赛事",
  "社会实践",
  "邯郸校区",
  "江湾校区",
  "枫林校区",
  "张江校区",
];
const Home = (): JSX.Element => {
  const searchContent = $Common.use((state) => state.searchContent).trim();

  const [activities, setActivities] = useState<ActivityEntity[]>([]);
  const homeTour = $UI.use((state) => state.homeTour);
  const navigatorTour = $UI.use((state) => state.navigatorTour);
  const [tags, setTags] = useState<string[]>([]);
  const [signList, setSignList] = useState<Array<number | undefined>>([]);
  const filtered = useMemo(
    () => searchContent !== "" || tags.length > 0,
    [searchContent, tags],
  );

  const filteredActivities = useMemo(() => {
    return activities.filter(
      (item) =>
        (item.title.includes(searchContent) ||
          (item.introduction !== null &&
            item.introduction.includes(searchContent)) ||
          (item.organizer !== null &&
            item.organizer.includes(searchContent))) &&
        tags.every((value) => item.category.split(" ").includes(value)),
    );
  }, [activities, searchContent, tags]);

  const [ongoingActivities, setOngoingActivities] = useState<
    ActivityWithRemain[]
  >([]);

  const [upcomingAvailableActivities, setUpcomingAvailableActivities] =
    useState<ActivityWithRemain[]>([]);
  const [upcomingNotAvailableActivities, setUpcomingNotAvailableActivities] =
    useState<ActivityWithRemain[]>([]);
  const [hotSpotActivities, setHotSpotActivities] = useState<
    ActivityWithRemain[]
  >([]);

  const load = async (): Promise<void> => {
    const res = await api.sign.list();
    setActivities(res.data);
    const hotSpotRes = await api.show.hotSpot();
    setHotSpotActivities(hotSpotRes);
    const ongoingRes = await api.show.ongoing();
    setOngoingActivities(ongoingRes);
    const upcomingRes = await api.show.upcoming();
    setUpcomingAvailableActivities(
      upcomingRes
        .filter((i) => i.registrationEndTime.getTime() >= new Date().getTime())
        .sort(
          (a, b) =>
            a.registrationEndTime.getTime() - b.registrationEndTime.getTime(),
        ),
    );
    setUpcomingNotAvailableActivities(
      upcomingRes
        .filter((i) => i.registrationEndTime.getTime() < new Date().getTime())
        .sort(
          (a, b) =>
            a.registrationEndTime.getTime() - b.registrationEndTime.getTime(),
        ),
    );
    const mySignListResponse = await api.sign.mySignList();
    setSignList(mySignListResponse.map((item) => item.activity.id));
  };

  useEffect(() => {
    // // console.log("start.");
    void load();
  }, []);

  return (
    <>
      <div
        className="sticky top-0 flex justify-between text-gray-400 text-sm hide-scrollbar py-2 pb-4 gap-4 overflow-x-auto overflow-y-hidden pl-[52rpx] pr-2 z-[1000] bg-[#FCFCFC]"
        id="home-tag"
      >
        {TagContent.map((item, index) => (
          <Tag
            key={`tag-${item}-${index}`}
            content={item}
            onClick={() => {
              void Taro.vibrateShort();
              if (tags.includes(item))
                setTags(tags.filter((tag) => tag !== item));
              else {
                setTags((prevTags) => [...prevTags, item]);
              }
            }}
          />
        ))}
      </div>
      <PullToRefresh
        onRefresh={async () => {
          await load();
        }}
        completeDelay={750}
        renderIcon={pullToRefreshRenderIcon}
        className="max-h-full"
        style={
          homeTour || navigatorTour
            ? { overflow: "hidden", paddingBottom: "0rpx" }
            : { overflow: "scroll", paddingBottom: "150rpx" }
        }
      >
        <div className="bg-[#FCFCFC] min-h-[100vh]">
          {filtered ? (
            <div className="hide-scrollbar pb-3 flex flex-col gap-6 px-[52rpx] pt-2">
              {filteredActivities.map((activity, index) => (
                <BigCard
                  key={`Big-Card-${index}`}
                  id={index === 0 ? "home-big-card" : undefined}
                  activity={activity}
                  onClick={() => {
                    $UI.update("from home", (draft) => {
                      draft.currentActivity = activity;
                      draft.detailOrigin = "home";
                    });
                    navigateTo(`pages/module/detail/index?id=${activity.id}`);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="hide-scrollbar pb-3 flex gap-6 overflow-x-auto overscroll-y-hidden px-[52rpx] pt-2">
              {(hotSpotActivities.length > 0
                ? hotSpotActivities
                : activities
              ).map((activity, index) => (
                <BigCard
                  key={`Big-Card-${index}`}
                  id={index === 0 ? "home-big-card" : undefined}
                  activity={activity}
                  onClick={() => {
                    $UI.update("from home", (draft) => {
                      draft.currentActivity = activity;
                      draft.detailOrigin = "home";
                    });
                    navigateTo(`pages/module/detail/index?id=${activity.id}`);
                  }}
                />
              ))}
            </div>
          )}

          {!filtered && (
            <div className="hide-scrollbar py-3 flex flex-col gap-6 overflow-x-auto overscroll-y-hidden px-[52rpx]">
              {upcomingAvailableActivities.map((activity, index) => (
                <MiddleCard
                  key={`Middle-Card-${index}`}
                  activity={activity}
                  id={index === 0 ? "home-middle-card" : undefined}
                  onClick={() => {
                    $UI.update("from home", (draft) => {
                      draft.currentActivity = activity;
                      draft.detailOrigin = "home";
                    });
                    navigateTo(`pages/module/detail/index?id=${activity.id}`);
                  }}
                  selected={
                    activity.id === undefined
                      ? false
                      : signList.includes(activity.id)
                  }
                />
              ))}
              {upcomingNotAvailableActivities.map((activity, index) => (
                <MiddleCard
                  key={`Middle-Card-${index}`}
                  activity={activity}
                  id={index === 0 ? "home-middle-card" : undefined}
                  onClick={() => {
                    $UI.update("from home", (draft) => {
                      draft.currentActivity = activity;
                      draft.detailOrigin = "home";
                    });
                    navigateTo(`pages/module/detail/index?id=${activity.id}`);
                  }}
                  selected={
                    activity.id === undefined
                      ? false
                      : signList.includes(activity.id)
                  }
                />
              ))}
              {ongoingActivities.map((activity, index) => (
                <MiddleCard
                  key={`Middle-Card-${index}`}
                  activity={activity}
                  id={index === 0 ? "home-middle-card" : undefined}
                  onClick={() => {
                    $UI.update("from home", (draft) => {
                      draft.currentActivity = activity;
                      draft.detailOrigin = "home";
                    });
                    navigateTo(`pages/module/detail/index?id=${activity.id}`);
                  }}
                  selected={
                    activity.id === undefined
                      ? false
                      : signList.includes(activity.id)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </PullToRefresh>
      {/* <TabTour /> */}
      {/* <HomeTour /> */}
    </>
  );
};

export default Home;
