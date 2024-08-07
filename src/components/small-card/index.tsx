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
    <div className="flex h-20">
      <div className="w-20 h-full bg-red-500 rounded-2xl">{photoUrl}</div>
      <div>
        <div>{title}</div>
        <div className="flex">
          <div>{author}</div>
          <div>{date.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};
