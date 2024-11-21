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
