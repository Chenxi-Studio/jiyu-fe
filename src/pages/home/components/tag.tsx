import React, { type MouseEventHandler, useState, type FC } from "react";
import { twMerge } from "tailwind-merge";

export interface TagProps {
  key?: string | number;
  content: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Tag: FC<TagProps> = (props) => {
  const { content, key, onClick } = props;
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <div
      key={key}
      className={twMerge("flex", selected && "text-blue-400")}
      onClick={(e) => {
        setSelected(!selected);
        if (onClick !== undefined) onClick(e);
      }}
    >
      <div>#</div>
      <div>{content}</div>
    </div>
  );
};
