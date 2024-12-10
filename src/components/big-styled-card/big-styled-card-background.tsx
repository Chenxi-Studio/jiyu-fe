import { pic2url } from "@/utils/type";
import React, { type HTMLAttributes, type FC } from "react";

const baseUrl =
  "https://jiyu-1306028870.cos.ap-shanghai.myqcloud.com/wxapp/ui/";

const originWidth = 1800;
const originBottomHeight = 404;
const originHeaderHeight = 203;

interface BigStyledCardBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
}

export const BigStyledCardBackground: FC<BigStyledCardBackgroundProps> = (
  props,
) => {
  const { width, height, ...rest } = props;
  return (
    <div style={{ height: `${height}rpx`, width: `${width}rpx` }} {...rest}>
      <div
        className="w-full"
        style={{
          height: `${(width / originWidth) * originHeaderHeight}rpx`,
          background: `url('${pic2url(baseUrl + "big-header.png")}')`,
          backgroundSize: "100% auto",
        }}
      />
      <div
        className="w-full"
        style={{
          height: `${
            height -
            (width / originWidth) * (originHeaderHeight + originBottomHeight)
          }rpx`,
          background: `url('${pic2url(baseUrl + "big-middle.png")}') repeat-y`,
          backgroundSize: "100% auto",
        }}
      />
      <div
        className="w-full"
        style={{
          height: `${(width / originWidth) * originBottomHeight}rpx`,
          background: `url('${pic2url(baseUrl + "big-bottom.png")}')`,
          backgroundSize: "100% auto",
        }}
      />
    </div>
  );
};
