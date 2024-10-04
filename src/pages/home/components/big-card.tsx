import React, { type FC } from "react";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { dateBoundary } from "@/utils/unit";
import { Image } from "@tarojs/components";
import "./style.scss";

export interface BigCardProps {
  key?: string | number;
  activity: ActivityEntity;
}

export const BigCard: FC<BigCardProps> = (props) => {
  const { activity, key } = props;

  return (
    <div
      className="drop-shadow-base bg-white rounded-2xl p-3 h-[560rpx] min-w-[400rpx]"
      key={key}
    >
      <Image
        className="rounded-2xl w-full h-[60%]"
        src={`https://${activity.coverImage}`}
        mode="aspectFill"
      />
      <div className="mt-2 min-h-[15%]">{activity.title}</div>
      <div className="flex mt-2 text-xs justify-between">
        <div>
          <div className="text-sm mb-1">{activity.organizer}</div>
          <div className="text-gray-400">
            {dateBoundary(activity.startTime, activity.endTime)}
          </div>
        </div>
        <div>按钮</div>
      </div>
    </div>
  );
};
