import React, { type MouseEventHandler, type FC } from "react";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { dateBoundary } from "@/utils/unit";
import { Image } from "@tarojs/components";
import { pic2url } from "@/utils/type";
import { StyledCard } from "@/components/styled-card";
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
    <StyledCard size="big" onClick={onClick}>
      <div
        id={id}
        className="drop-shadow-base bg-white rounded-2xl pl-3 pt-3 pr-[36rpx] h-[560rpx] min-w-[400rpx]"
        key={key}
      >
        <Image
          className="w-full h-[60%]"
          src={pic2url(activity.coverImage)}
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
          {/* <div>按钮</div> */}
        </div>
      </div>
    </StyledCard>
  );
};
