import { getThemeColor } from "@/utils/ui";
import React, { type MouseEventHandler, useState, type FC } from "react";
import { twMerge } from "tailwind-merge";

export interface TagProps {
  key?: string | number;
  content: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  id?: string;
}

const themeColor = getThemeColor();

export const Tag: FC<TagProps> = (props) => {
  const { content, key, onClick, id } = props;
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <div
      key={key}
      className={twMerge(
        "text-xs min-w-[144rpx] h-6 rounded-full border border-solid flex items-center justify-center",
        selected && "text-white",
      )}
      style={{
        transitionProperty:
          "color, background-color, border-color, text-decoration-color, fill, stroke",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "150ms",
        ...(selected
          ? {
              backgroundColor: themeColor,
              borderColor: themeColor,
            }
          : {}),
      }}
      onClick={(e) => {
        setSelected(!selected);
        if (onClick !== undefined) onClick(e);
      }}
      id={id}
    >
      <div>{content}</div>
    </div>
  );
};
