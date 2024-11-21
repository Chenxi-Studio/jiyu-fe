import React, { useEffect, useState, type FC } from "react";
import { SearchBar } from "@/pages/home/components/search-bar";
import { $Common } from "@/store/common";
import Taro from "@tarojs/taro";
import { useCurrentPage } from "@/utils/navigator";
import { twMerge } from "tailwind-merge";

export const Header: FC = () => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);
  const searchContent = $Common.use((state) => state.searchContent);
  const setSearchContent = (s: string): void => {
    $Common.update("update search", (draft) => {
      draft.searchContent = s;
    });
  };
  const current = useCurrentPage();

  useEffect(() => {
    setStatusBarHeight(Taro.getSystemInfoSync().statusBarHeight ?? 0);
  }, []);
  return (
    <div>
      <div
        style={{ marginTop: statusBarHeight }}
        className={twMerge(
          "flex items-center w-[100vw] bg-[#FCFCFC] fixed top-0 pl-[52rpx] pr-3 box-border",
          current !== "个人" && "h-9 ",
        )}
      >
        {current === "主页" && (
          <SearchBar
            className="w-[60%]"
            value={searchContent}
            onChange={(input) => {
              setSearchContent(input);
            }}
          />
        )}
        {current !== "主页" && current !== "个人" && <div>{current}</div>}
      </div>

      <div
        style={{ paddingTop: statusBarHeight }}
        className={twMerge(
          "bg-[#FCFCFC] w-[100vw]",
          current !== "个人" && "h-9 ",
        )}
      ></div>
    </div>
  );
};
