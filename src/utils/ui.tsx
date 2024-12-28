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
  "#89CAD8",
];

export const getThemeNumber = (): number => {
  const weekday = getDayAsNumber();
  return weekday;
};
export const getThemeColor = (): string => {
  return backgroundColors[getThemeNumber() - 1];
};

export function truncateString(str: string, maxLength: number): string {
  let totalLength = 0;
  let truncatedStr = "";

  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);

    if (isEnglishOrDigitOrHalfWidth(char)) {
      totalLength += 0.5;
    } else {
      totalLength += 1;
    }

    if (totalLength > maxLength) {
      return truncatedStr + "...";
    }

    truncatedStr += char;
  }

  return truncatedStr;
}

export function isEnglishOrDigitOrHalfWidth(char: string): boolean {
  const code = char.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) || // 0-9
    (code >= 65 && code <= 90) || // A-Z
    (code >= 97 && code <= 122) || // a-z
    (code >= 33 && code <= 47) || // 常见半角符号
    (code >= 58 && code <= 64) || // 常见半角符号
    (code >= 91 && code <= 96) || // 常见半角符号
    (code >= 123 && code <= 126) // 常见半角符号
  );
}
