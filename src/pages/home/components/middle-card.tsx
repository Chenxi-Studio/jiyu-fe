import React, { type FC } from "react";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { Image } from "@tarojs/components";
import { formatDate } from "@/utils/unit";
import { twMerge } from "tailwind-merge";
import { pic2url } from "@/utils/type";
import { ActStatusMapping } from "@/types/common";
import { getThemeNumber, truncateString } from "@/utils/ui";

export interface MiddleCardProps {
  key?: string | number;
  activity: ActivityEntity;
  className?: string;
  id?: string;
  onClick?: () => void;
  selected?: boolean;
}

const themeNumber = getThemeNumber();

export const MiddleCard: FC<MiddleCardProps> = (props) => {
  const { key, activity, className, id, onClick, selected = false } = props;
  return (
    <div
      className={twMerge(
        "flex p-3 bg-white rounded-2xl max-h-[220rpx] min-w-[380rpx]",
        selected ? `drop-shadow-${themeNumber}` : "drop-shadow-base",
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
      <div className="flex flex-col justify-between flex-1">
        <div className="flex text-base flex-1 text-gray-800">
          {truncateString(activity.title, 25)}
        </div>
        <div className="text-gray-800 text-sm mb-1">{activity.organizer}</div>
        <div className="flex text-gray-400 text-xs gap-1 items-center justify-between">
          <div className="flex items-center justify-center">
            <div>报名截止:&nbsp;</div>
            <div>
              {formatDate(activity.registrationEndTime, true, true, true)}
            </div>
          </div>
          <div>{ActStatusMapping.get(activity.status)}</div>
        </div>
      </div>
    </div>
  );
};
