import React, { type MouseEventHandler, type FC } from "react";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { formatDate } from "@/utils/unit";
import { Image } from "@tarojs/components";
import { pic2url } from "@/utils/type";
import { ActStatusMapping } from "@/types/common";
import "./style.scss";

export interface BigCardProps {
  key?: string | number;
  activity: ActivityEntity;
  onClick?: MouseEventHandler<HTMLDivElement>;
  id?: string;
}

export const BigCard: FC<BigCardProps> = (props) => {
  const { activity, key, onClick, id } = props;

  return (
    <div
      id={id}
      onClick={onClick}
      className="drop-shadow-base bg-white rounded-2xl p-3 h-[560rpx] min-w-[400rpx]"
      key={key}
    >
      <Image
        className="rounded-2xl w-full h-[60%]"
        src={pic2url(activity.coverImage)}
        mode="aspectFill"
      />
      <div className="mt-2 min-h-[15%] text-base">{activity.title}</div>
      <div className="flex mt-2 text-xs justify-between w-full">
        <div className="w-full">
          <div className="flex items-center justify-between text-sm mb-1 w-full">
            <div>{activity.organizer}</div>
            <div>{activity.category}</div>
          </div>
          <div className="flex items-center justify-between text-gray-400">
            <div>截止：{formatDate(activity.registrationEndTime)}</div>
            <div>{ActStatusMapping.get(activity.status)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
