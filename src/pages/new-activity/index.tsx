import React from "react";
import { Title } from "@/components/title";
import { MainActivity } from "./components/main-activity";

import "./style.scss";
import { SubActivity } from "./components/sub-activity";

export interface SelectDate {
  start: string | undefined;
  end: string | undefined;
}

const NewActivity = (): JSX.Element => {
  return (
    <div className="bg-[#F7F8FA] pb-[150rpx]">
      <div className="py-2">
        <Title content="活动信息" />
      </div>
      <MainActivity />

      <div className="py-2">
        <Title content="子活动" />
      </div>
      <SubActivity />
    </div>
  );
};

export default NewActivity;
