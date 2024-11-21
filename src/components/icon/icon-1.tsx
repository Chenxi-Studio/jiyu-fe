// 下滑用的小狮子 logo 1
import React, { type FC } from "react";
import { twMerge } from "tailwind-merge";
import "./icon-1.css";

export interface IconProps {
  className?: string;
}
export const Icon1: FC<IconProps> = ({ className }) => {
  return <div className={twMerge("icon-1 bg-cover", className)}></div>;
};
