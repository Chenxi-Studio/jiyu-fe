import { px2rpx, rpx2str } from "@/utils/unit";
import React, { type HTMLAttributes, type FC } from "react";
import { twMerge } from "tailwind-merge";

interface StyledButtonProps extends HTMLAttributes<HTMLDivElement> {
  height: number;
}

const originWidth = 355;
const originHeight = 179;

export const StyledButton: FC<StyledButtonProps> = (props) => {
  const { height, children, className, style, ...rest } = props;
  return (
    <div
      className={twMerge("relative", className)}
      style={{
        height: rpx2str(px2rpx(height)),
        minWidth: rpx2str(px2rpx((height / originHeight) * originWidth)),
        ...style,
      }}
      {...rest}
    >
      <div
        className="absolute top-0 left-0 h-full w-full bg-contain bg-no-repeat z-[1]"
        style={{
          backgroundImage:
            "url('https://jiyu-1306028870.cos.ap-shanghai.myqcloud.com/wxapp/ui/button.png')",
        }}
      />
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
