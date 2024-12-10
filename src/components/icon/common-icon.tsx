import React, { type FC } from "react";
import { Image } from "@nutui/nutui-react-taro";
import { pic2url } from "@/utils/type";

interface CommonIconProps {
  src: string;
}

export const CommonIcon: FC<CommonIconProps> = (props) => {
  const { src } = props;

  return (
    <div className="h-6 min-w-6">
      <Image src={pic2url(src)} mode="aspectFit"></Image>
    </div>
  );
};
