import React, { useEffect, useState } from "react";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { api } from "@/api";
import { SearchBar } from "./components/search-bar";
import { BigCard } from "./components/big-card";
import "./style.scss";
import { MiddleCard } from "./components/middle-card";

const TagContent = ["邯郸", "江湾", "学研", "团学联"];
const Home = (): JSX.Element => {
  const [searchContent, setSearchContent] = useState<string>("");
  const [activities, setActivities] = useState<ActivityEntity[]>([]);

  const load = async (): Promise<void> => {
    const res = await api.activity.listSelfAll(); // 暂时 mock
    setActivities(res.data);
  };

  useEffect(() => {
    console.log("start.");
    void load();
  }, []);

  return (
    <div className="bg-[#FCFCFC] min-h-[100vh]">
      <div className="px-10 mt-4">
        <SearchBar
          value={searchContent}
          onChange={(input) => {
            console.log(input);
            setSearchContent(input);
          }}
        />
      </div>
      <div className="px-10">
        <div className="flex justify-between text-gray-400 text-sm mt-3">
          {TagContent.map((item, index) => (
            <div
              key={`tag-${item}-${index}`}
              className="flex"
              onClick={() => {
                setSearchContent(item);
              }}
            >
              <div>#</div>
              <div>{item}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hide-scrollbar py-3 flex gap-6 overflow-x-auto overscroll-y-hidden px-10 mt-3">
        {activities.map((activity, index) => (
          <BigCard key={`Big-Card-${index}`} activity={activity} />
        ))}
      </div>
      <div className="mt-3 px-10 text-xl text-gray-800">即将到来的活动</div>
      <div className="hide-scrollbar py-3 flex gap-6 overflow-x-auto overscroll-y-hidden px-10">
        {activities.map((activity, index) => (
          <MiddleCard key={`Middle-Card-${index}`} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default Home;
