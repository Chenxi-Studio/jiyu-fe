// 下滑用的小狮子 logo 2
import React, { type FC } from "react";
import { twMerge } from "tailwind-merge";
import "./icon-2.css";

export interface IconProps {
  className?: string;
}
export const Icon2: FC<IconProps> = ({ className }) => {
  return <div className={twMerge("icon-2 bg-cover", className)}></div>;
};
