import React, { useEffect, useMemo, useRef, useState } from "react";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { api } from "@/api";
import { $UI } from "@/store/UI";
import { navigateTo } from "@/utils/navigator";
import { PullToRefresh } from "@nutui/nutui-react-taro";
import { TabTour } from "@/components/tours/tab-tour";
import { HomeTour } from "@/components/tours/home-tour";
import { type ActivityWithRemain } from "@/types/api";
import { $Common } from "@/store/common";
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
];
const Home = (): JSX.Element => {
  const searchContent = $Common.use((state) => state.searchContent);

  const [activities, setActivities] = useState<ActivityEntity[]>([]);
  const homeTour = $UI.use((state) => state.homeTour);
  const navigatorTour = $UI.use((state) => state.navigatorTour);

  const filteredActivities = useMemo(() => {
    return activities.filter(
      (item) =>
        item.title.includes(searchContent) ||
        (item.introduction !== null &&
          item.introduction.includes(searchContent)) ||
        (item.organizer !== null && item.organizer.includes(searchContent)),
    );
  }, [activities, searchContent]);
  const [ongoingActivities, setOngoingActivities] = useState<
    ActivityWithRemain[]
  >([]);
  const [upcomingActivities, setUpcomingActivities] = useState<
    ActivityWithRemain[]
  >([]);

  const tags = useRef<string[]>([]);

  const load = async (): Promise<void> => {
    const res = await api.sign.list();
    setActivities(res.data);
    const ongoingRes = await api.show.ongoing();
    setOngoingActivities(ongoingRes);
    const upcomingRes = await api.show.upcoming();
    setUpcomingActivities(upcomingRes);
  };

  useEffect(() => {
    console.log("start.");
    void load();
  }, []);

  return (
    <>
      <PullToRefresh
        onRefresh={async () => {
          await load();
        }}
        renderIcon={(status) => {
          return (
            <>
              {(status === "pulling" || status === "complete") && 1}
              {(status === "canRelease" || status === "refreshing") && 2}
            </>
          );
        }}
        className="max-h-full"
        style={
          homeTour || navigatorTour
            ? { overflow: "hidden", paddingBottom: "0rpx" }
            : { overflow: "scroll", paddingBottom: "150rpx" }
        }
      >
        <div className="bg-[#FCFCFC] min-h-[100vh]">
          <div className="hide-scrollbar pb-3 flex gap-6 overflow-x-auto overscroll-y-hidden px-10 pt-6">
            {(searchContent === "" ? activities : filteredActivities).map(
              (activity, index) => (
                <BigCard
                  key={`Big-Card-${index}`}
                  id={index === 0 ? "home-big-card" : undefined}
                  activity={activity}
                  onClick={() => {
                    $UI.update("from home", (draft) => {
                      draft.currentActivity = activity;
                      draft.detailOrigin = "home";
                    });
                    navigateTo(`pages/module/detail/index`);
                  }}
                />
              ),
            )}
          </div>

          <div
            className="flex justify-between text-gray-400 text-sm hide-scrollbar py-3 gap-4 overflow-x-auto overscroll-y-hidden px-10"
            id="home-tag"
          >
            {TagContent.map((item, index) => (
              <Tag
                key={`tag-${item}-${index}`}
                content={item}
                onClick={() => {
                  if (tags.current.includes(item))
                    tags.current = tags.current.filter((tag) => tag !== item);
                  else {
                    tags.current.push(item);
                  }
                }}
              />
            ))}
          </div>

          <div className="hide-scrollbar py-3 flex flex-col gap-6 overflow-x-auto overscroll-y-hidden px-10">
            {upcomingActivities.map((activity, index) => (
              <MiddleCard
                key={`Middle-Card-${index}`}
                activity={activity}
                id={index === 0 ? "home-middle-card" : undefined}
              />
            ))}
          </div>
          <div className="hide-scrollbar py-3 flex-col gap-6 overflow-x-auto overscroll-y-hidden px-10">
            {ongoingActivities.map((activity, index) => (
              <MiddleCard
                key={`Middle-Card-${index}`}
                activity={activity}
                id={index === 0 ? "home-middle-card" : undefined}
              />
            ))}
          </div>
        </div>
      </PullToRefresh>
      <TabTour />
      <HomeTour />
    </>
  );
};

export default Home;
