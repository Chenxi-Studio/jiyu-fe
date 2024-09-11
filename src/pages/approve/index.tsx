import React, { useEffect, useState } from "react";
import { Collapse, PullToRefresh } from "@nutui/nutui-react-taro";
import { SmallCard } from "@/components/small-card";
import { ArrowDown } from "@nutui/icons-react-taro";
import { navigateTo } from "@/utils/navigator";
import { api } from "@/api";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { $UI } from "@/store/UI";

const Approve = (): JSX.Element => {
  const refresh = $UI.use((state) => state.approveRefresh);
  const [toApproveList, setToApproveList] = useState<ActivityEntity[]>([]);

  const fetchToApproveList = async (): Promise<void> => {
    try {
      const res = await api.approve.toApprove();
      setToApproveList(res);
    } catch (error) {
      console.error("Error fetching to approve list:", error);
    }
  };

  useEffect(() => {
    if (refresh) {
      void fetchToApproveList();
      $UI.update("approve page refresh", (draft) => {
        draft.approveRefresh = false;
      });
    }
  }, [refresh]);

  useEffect(() => {
    void fetchToApproveList();
  }, []);

  const handleOnclick = (item: ActivityEntity): void => {
    $UI.update("update current activity", (draft) => {
      draft.currentActivity = item;
    });
    navigateTo(`pages/module/detail/index`);
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await fetchToApproveList();
      }}
      renderIcon={(status) => {
        return (
          <>
            {(status === "pulling" || status === "complete") && 1}
            {(status === "canRelease" || status === "refreshing") && 2}
          </>
        );
      }}
    >
      <div className="pb-[150rpx]">
        <Collapse defaultActiveName={["1"]} expandIcon={<ArrowDown />}>
          <Collapse.Item title="待审核" name="1">
            <div>
              {toApproveList.map((item, index) => (
                <div
                  key={`Publish-${index}`}
                  className="mt-2"
                  onClick={() => {
                    handleOnclick(item);
                  }}
                >
                  <SmallCard
                    title={item.title}
                    coverImage={item.coverImage}
                    organizer={item.organizer}
                    endTime={item.endTime}
                  ></SmallCard>
                </div>
              ))}
            </div>
          </Collapse.Item>
          <Collapse.Item title="已审核" name="2">
            <div>TODO: 已审核</div>
          </Collapse.Item>
        </Collapse>
      </div>
    </PullToRefresh>
  );
};

export default Approve;
