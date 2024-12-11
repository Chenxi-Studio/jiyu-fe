/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, {
  type HTMLAttributes,
  type FC,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import Taro from "@tarojs/taro";
import { approximatelyEqual, px2rpx, rpx2str } from "@/utils/unit";
import { useId } from "@/utils/store";
import { StyledCardBackground } from "./styled-card-background";
import { StyledImageProps } from "./config";

interface StyledCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  size: "big" | "medium";
}

export const StyledCard: FC<StyledCardProps> = (props) => {
  const { children, className, style, size, ...rest } = props;
  const id = useId("big-styled-card");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { originWidth, originBottomHeight, originHeaderHeight } =
    StyledImageProps[size];

  useEffect(() => {
    Taro.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec((res) => {
        if (
          res[0]?.height &&
          (!approximatelyEqual(dimensions.width, res[0].width, 1e-5) ||
            !approximatelyEqual(dimensions.height, res[0].height, 1e-5))
        ) {
          console.log("changed", res[0].width, dimensions.width);

          setDimensions({
            width: px2rpx(res[0].width),
            height: Math.floor(px2rpx(res[0].height)),
          });
        }
      });
  }, []);

  console.log("now", dimensions.width, dimensions.height, style);

  return (
    <div
      className={twMerge("relative", className)}
      {...rest}
      id={id}
      style={{
        paddingTop: rpx2str(
          (dimensions.width / originWidth) * originHeaderHeight,
        ),
        paddingBottom: rpx2str(
          (dimensions.width / originWidth) * originBottomHeight,
        ),
        ...style,
      }}
    >
      {children}
      <StyledCardBackground
        size={size}
        className="absolute top-0 left-0"
        originWidth={originWidth}
        originHeaderHeight={originHeaderHeight}
        originBottomHeight={originBottomHeight}
        width={dimensions.width}
        height={
          dimensions.height +
          (dimensions.width / originWidth) *
            (originHeaderHeight + originBottomHeight)
        }
      />
    </div>
  );
};
