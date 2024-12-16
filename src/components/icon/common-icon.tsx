import React, { type FC } from "react";
import { Image } from "@nutui/nutui-react-taro";
import { pic2url } from "@/utils/type";
import { twMerge } from "tailwind-merge";

interface CommonIconProps {
  src: string;
  selected?: boolean;
  className?: string;
}

export const CommonIcon: FC<CommonIconProps> = (props) => {
  const { src, selected = true, className } = props;

  return (
    <div className={twMerge("h-6 min-w-6", className)}>
      <Image
        src={pic2url(selected ? src : src.slice(0, -4) + "-unselected.png")}
        mode="aspectFit"
      ></Image>
    </div>
  );
};
