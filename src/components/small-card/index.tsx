import React, { type FC } from "react";

export interface SmallCardProps {
  photoUrl?: string;
  title?: string;
  author?: string;
  date?: Date;
}

export const SmallCard: FC<SmallCardProps> = (props): JSX.Element => {
  const {
    photoUrl = "Unknown",
    title = "Title Title Title Title",
    author = "Author",
    date = new Date(),
  } = props;
  return (
    <div className="flex h-20 gap-5 items-center">
      <div className="flex justify-center items-center w-20 h-20 bg-white rounded-2xl flex-none shadow-sm">
        <div className="bg-red-50 rounded-2xl w-[90%] h-[90%]">{photoUrl}</div>
      </div>
      <div className="flex flex-col justify-between flex-grow w-[90%] h-[90%]">
        <div className="text-sm text-gray-300">{author}</div>
        <div className="text-lg">{title}</div>
        <div className="flex justify-between text-gray-400 text-sm">
          <div>{`${date.getMonth() + 1}月${date.getDate()}日`}</div>
          <div>{`${date.getHours().toString().padStart(2, "0")} : ${date.getMinutes().toString().padStart(2, "0")}`}</div>
        </div>
      </div>
    </div>
  );
};
