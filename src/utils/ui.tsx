import React from "react";
import { Icon1 } from "@/components/icon/icon-1";
import { Icon2 } from "@/components/icon/icon-2";
import { type PullStatus } from "@nutui/nutui-react-taro";

export const pullToRefreshRenderIcon: (
  status: PullStatus,
) => React.ReactNode = (status) => {
  return (
    <>
      {(status === "pulling" || status === "complete") && (
        <Icon1 className="w-8 h-8 mb-1" />
      )}
      {(status === "canRelease" || status === "refreshing") && (
        <Icon2 className="w-8 h-8 mb-1" />
      )}
    </>
  );
};

export function getDayAsNumber(): number {
  const date = new Date();
  const day = date.getDay();
  return day === 0 ? 7 : day;
}

const backgroundColors = [
  "#feb1a2",
  "#ffce81",
  "#a6c189",
  "#a5c3f6",
  "#d8ceff",
  "#ffc4c8",
];

export const getThemeNumber = (): number => {
  const weekday = getDayAsNumber();
  return weekday === 7 ? 1 : weekday;
};
export const getThemeColor = (): string => {
  return backgroundColors[getThemeNumber() - 1];
};
