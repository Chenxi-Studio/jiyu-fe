import React, { type FC } from "react";
import { Image } from "@nutui/nutui-react-taro";
import { pic2url } from "@/utils/type";

interface CommonIconProps {
  src: string;
  selected?: boolean;
}

export const CommonIcon: FC<CommonIconProps> = (props) => {
  const { src, selected = true } = props;

  return (
    <div className="h-6 min-w-6">
      <Image
        src={pic2url(selected ? src : src.slice(0, -4) + "-unselected.png")}
        mode="aspectFit"
      ></Image>
    </div>
  );
};
