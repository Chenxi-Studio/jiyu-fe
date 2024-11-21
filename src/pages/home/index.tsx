import React, { useEffect, useMemo, useRef, useState } from "react";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { api } from "@/api";
import { $UI } from "@/store/UI";
import { navigateTo } from "@/utils/navigator";
import { PullToRefresh } from "@nutui/nutui-react-taro";
import { TabTour } from "@/components/tours/tab-tour";
import { HomeTour } from "@/components/tours/home-tour";
import { type ActivityWithRemain } from "@/types/api";
import { SearchBar } from "./components/search-bar";
import { BigCard } from "./components/big-card";
import "./style.scss";
import { MiddleCard } from "./components/middle-card";
import { Tag } from "./components/tag";

const TagContent = ["邯郸", "江湾", "学研", "团学联"];
const Home = (): JSX.Element => {
  const [searchContent, setSearchContent] = useState<string>("");
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
        className="max-h-[100vh]"
        style={
          homeTour || navigatorTour
            ? { overflow: "hidden", paddingBottom: "0rpx" }
            : { overflow: "scroll", paddingBottom: "150rpx" }
        }
      >
        <div className="bg-[#FCFCFC] min-h-[100vh]">
          <div className="px-10 mt-4">
            <SearchBar
              value={searchContent}
              onChange={(input) => {
                setSearchContent(input);
              }}
            />
          </div>
          <div className="px-10">
            <div
              className="flex justify-between text-gray-400 text-sm mt-3"
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
          </div>
          <div className="hide-scrollbar py-3 flex gap-6 overflow-x-auto overscroll-y-hidden px-10 mt-3">
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
          <div className="mt-3 px-10 text-base text-gray-800">
            即将到来的活动
          </div>
          <div className="hide-scrollbar py-3 flex gap-6 overflow-x-auto overscroll-y-hidden px-10">
            {upcomingActivities.map((activity, index) => (
              <MiddleCard
                key={`Middle-Card-${index}`}
                activity={activity}
                id={index === 0 ? "home-middle-card" : undefined}
              />
            ))}
          </div>
          <div className="mt-3 px-10 text-base text-gray-800">
            正在进行的活动
          </div>
          <div className="hide-scrollbar py-3 flex gap-6 overflow-x-auto overscroll-y-hidden px-10">
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
