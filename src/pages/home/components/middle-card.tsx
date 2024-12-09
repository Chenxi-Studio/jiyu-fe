import React, { type FC } from "react";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { Image } from "@tarojs/components";
import { formatDate } from "@/utils/unit";
import { Date } from "@nutui/icons-react-taro";
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
        "flex p-2 drop-shadow-base bg-white rounded-2xl max-h-[180rpx] min-w-[380rpx]",
        className,
      )}
      key={key}
      id={id}
      onClick={onClick}
    >
      <div className="h-[148rpx] w-[148rpx] mr-2">
        <Image
          className="rounded-2xl h-[148rpx] w-[148rpx]"
          src={pic2url(activity.coverImage)}
          mode="aspectFill"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex text-sm flex-1 text-gray-800">
          {activity.title}
        </div>
        <div className="flex text-gray-400 text-sm gap-1 items-center">
          <Date size={12} />
          <div>{formatDate(activity.startTime, false)}</div>
        </div>
      </div>
    </div>
  );
};
