import React, { type FC } from "react";
import { Image } from "@nutui/nutui-react-taro";
import { ActivityStatus, ActStatusMapping } from "@/types/common";
import { pic2url } from "@/utils/type";
import "./style.scss";

export interface SmallCardProps {
  coverImage?: string;
  title?: string;
  organizer?: string;
  endTime?: Date;
  status?: ActivityStatus;
}

export const SmallCard: FC<SmallCardProps> = (props): JSX.Element => {
  const {
    coverImage = "Unknown",
    title = "Title Title Title Title",
    organizer = "Author",
    endTime = new Date(),
    status = ActivityStatus.Draft,
  } = props;

  return (
    <div className="flex h-20 gap-5 items-center">
      <div className="flex justify-center items-center w-20 h-20 bg-white rounded-2xl flex-none shadow-sm">
        {/* {coverImage} */}
        <Image
          className="small-card-image"
          src={pic2url(coverImage)}
          mode="aspectFill"
        ></Image>
      </div>
      <div className="flex flex-col justify-between flex-grow w-[90%] h-[90%]">
        <div className="flex justify-between text-sm text-gray-300">
          <div>{organizer}</div>{" "}
          <div className="text-gray-400">{ActStatusMapping.get(status)}</div>
        </div>
        <div className="text-lg">{title}</div>
        {endTime !== null && (
          <div className="flex justify-between text-gray-400 text-sm">
            <div>{`${endTime.getMonth() + 1}月${endTime.getDate()}日`}</div>
            <div>{`${endTime.getHours().toString().padStart(2, "0")} : ${endTime.getMinutes().toString().padStart(2, "0")}`}</div>
          </div>
        )}
        {endTime === null && <>未配置结束时间</>}
      </div>
    </div>
  );
};
