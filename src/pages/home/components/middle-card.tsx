import React, { type FC } from "react";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { Image } from "@tarojs/components";
import { formatDate } from "@/utils/unit";
import { twMerge } from "tailwind-merge";
import { pic2url } from "@/utils/type";

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
    <div
      className={twMerge(
        "flex p-3 drop-shadow-base bg-white rounded-2xl max-h-[220rpx] min-w-[380rpx]",
        className,
      )}
      key={key}
      id={id}
      onClick={onClick}
    >
      <div className="h-[172rpx] w-[172rpx] mr-3">
        <Image
          className="rounded-2xl h-[172rpx] w-[172rpx]"
          src={pic2url(activity.coverImage)}
          mode="aspectFill"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex text-base flex-1 text-gray-800">
          {activity.title}
        </div>
        <div className="text-gray-800 text-sm mb-1">{activity.organizer}</div>
        <div className="flex text-gray-400 text-xs gap-1 items-center">
          <div>截止：</div>
          <div>{formatDate(activity.startTime, false)}</div>
        </div>
      </div>
    </div>
  );
};
