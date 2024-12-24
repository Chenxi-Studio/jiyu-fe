import React, { type FC } from "react";
import { Image } from "@nutui/nutui-react-taro";
import { ActivityStatus, ActStatusMapping } from "@/types/common";
import { pic2url } from "@/utils/type";
import { twMerge } from "tailwind-merge";
import "./style.scss";

export interface SmallCardProps {
  coverImage?: string;
  title?: string;
  organizer?: string;
  startTime?: Date;
  status?: ActivityStatus;
  id?: string;
  disabled?: boolean;
}

export const SmallCard: FC<SmallCardProps> = (props): JSX.Element => {
  const {
    coverImage = "默认 coverImage",
    title = "默认 title",
    organizer = "默认 Author",
    startTime = new Date(),
    status = ActivityStatus.Draft,
    id,
    disabled = false,
  } = props;

  return (
    <div
      className={twMerge(
        "flex h-20 gap-3 items-center bg-white drop-shadow-base p-3 rounded-2xl max-w-full",
      )}
      id={id}
    >
      <div
        className={twMerge(
          "flex justify-center items-center w-20 h-20 rounded-2xl flex-none",
        )}
      >
        {/* {coverImage} */}
        <Image
          className="small-card-image"
          src={pic2url(coverImage)}
          mode="aspectFill"
        ></Image>
      </div>
      <div className="flex flex-col justify-between h-[90%] w-[calc(100%-160rpx-24rpx)]">
        <div className="flex justify-between text-sm text-gray-300">
          <div>{organizer}</div>
          <div
            className={twMerge(disabled ? "text-gray-300" : "text-gray-400")}
          >
            {ActStatusMapping.get(status)}
          </div>
        </div>
        <div
          className={twMerge(
            "text-base text-ellipsis whitespace-nowrap truncate",
            disabled && "text-gray-300",
          )}
        >
          {title}
        </div>
        {startTime !== null && (
          <div
            className={twMerge(
              "flex justify-between text-sm",
              disabled ? "text-gray-300" : "text-gray-400",
            )}
          >
            <div>
              活动开始时间：
              {`${startTime.getMonth() + 1}月${startTime.getDate()}日`}
            </div>
            <div>{`${startTime.getHours().toString().padStart(2, "0")} : ${startTime.getMinutes().toString().padStart(2, "0")}`}</div>
          </div>
        )}
        {startTime === null || (startTime === undefined && <>未配置结束时间</>)}
      </div>
    </div>
  );
};
