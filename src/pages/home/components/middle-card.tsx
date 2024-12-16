import React, { type FC } from "react";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { Image } from "@tarojs/components";
import { formatDate } from "@/utils/unit";
import { Date } from "@nutui/icons-react-taro";
import { twMerge } from "tailwind-merge";
import { pic2url } from "@/utils/type";
import { StyledCard } from "@/components/styled-card";

export interface MiddleCardProps {
  key?: string | number;
  activity: ActivityEntity;
  className?: string;
  id?: string;
  onClick?: () => void;
}

export const MiddleCard: FC<MiddleCardProps> = (props) => {
  const { key, activity, className, id, onClick } = props;
  return (
    <StyledCard size="medium">
      <div
        className={twMerge(
          "flex px-4 max-h-[180rpx] min-w-[380rpx]",
          className,
        )}
        key={key}
        id={id}
        onClick={onClick}
      >
        <div className="h-[148rpx] w-[148rpx] mr-2">
          <Image
            className="h-[148rpx] w-[148rpx]"
            src={pic2url(activity.coverImage)}
            mode="aspectFill"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 pr-4">
          <div className="flex text-sm flex-1 text-gray-800">
            {activity.title}
          </div>
          <div>{activity.organizer}</div>
          <div className="flex items-center justify-between">
            <div className="flex text-gray-400 text-sm gap-1 items-center">
              <Date size={12} />
              <div>{formatDate(activity.startTime, false)}</div>
            </div>
            <div>{activity.category}</div>
          </div>
        </div>
      </div>
    </StyledCard>
  );
};
