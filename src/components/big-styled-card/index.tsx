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
import { px2rpx } from "@/utils/unit";
import { v4 as uuidv4 } from "uuid";
import { BigStyledCardBackground } from "./big-styled-card-background";

interface BigStyledCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const BigStyledCard: FC<BigStyledCardProps> = (props) => {
  const { children, className, ...rest } = props;
  const id = uuidv4();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    Taro.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec((res) => {
        console.log("???", res, id, `#${id}`);

        if (res[0]?.height && dimensions.width !== res[0].width) {
          console.log("changed", res[0].width, dimensions.width);

          setDimensions({
            width: px2rpx(res[0].width),
            height: Math.floor(px2rpx(res[0].height)),
          });
        }
      });
  }, []);

  console.log("dimensions", dimensions);

  return (
    <div className={twMerge("relative", className)} {...rest} id={id}>
      <BigStyledCardBackground
        className="absolute top-0 left-0"
        {...dimensions}
      />
      {children}
    </div>
  );
};
