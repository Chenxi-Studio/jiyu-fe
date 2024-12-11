import { pic2url } from "@/utils/type";
import { rpx2str } from "@/utils/unit";
import React, { type HTMLAttributes, type FC } from "react";

const baseUrl =
  "https://jiyu-1306028870.cos.ap-shanghai.myqcloud.com/wxapp/ui/";

interface BigStyledCardBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
  originWidth: number;
  originBottomHeight: number;
  originHeaderHeight: number;
}

export const BigStyledCardBackground: FC<BigStyledCardBackgroundProps> = (
  props,
) => {
  const {
    width,
    height,
    originWidth,
    originBottomHeight,
    originHeaderHeight,
    ...rest
  } = props;
  return (
    <div style={{ height: rpx2str(height), width: rpx2str(width) }} {...rest}>
      <div
        className="w-full"
        style={{
          height: rpx2str((width / originWidth) * originHeaderHeight),
          background: `url('${pic2url(baseUrl + "big-header.png")}')`,
          backgroundSize: "100% auto",
        }}
      />
      <div
        className="w-full"
        style={{
          height: rpx2str(
            height -
              (width / originWidth) * (originHeaderHeight + originBottomHeight),
          ),
          background: `url('${pic2url(baseUrl + "big-middle.png")}') repeat-y`,
          backgroundSize: "100% auto",
        }}
      />
      <div
        className="w-full"
        style={{
          height: rpx2str((width / originWidth) * originBottomHeight),
          background: `url('${pic2url(baseUrl + "big-bottom.png")}')`,
          backgroundSize: "100% auto",
        }}
      />
    </div>
  );
};
