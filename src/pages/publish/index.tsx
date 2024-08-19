import { SmallCard } from "@/components/small-card";
import { navigateTo } from "@/utils/navigator";
import React, { useEffect, useState } from "react";
import { ArrowDown, Edit } from "@nutui/icons-react-taro";
import { Collapse, PullToRefresh } from "@nutui/nutui-react-taro";
import { api } from "@/api";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { $UI } from "@/store/UI";

const Publish = (): JSX.Element => {
  const [beforeApprovedList, setBeforeApprovedList] = useState<
    ActivityEntity[]
  >([]);
  const [afterApprovedList, setAfterApprovedList] = useState<ActivityEntity[]>(
    [],
  );

  useEffect(() => {
    void api.activity.beforeApproved().then((res) => {
      setBeforeApprovedList(res);
    });
    void api.activity.afterApproved().then((res) => {
      setAfterApprovedList(res);
    });
  }, []);

  const handleOnclick = (item: ActivityEntity): void => {
    $UI.update("update current activity", (draft) => {
      draft.currentActivity = item;
    });
    navigateTo(`pages/detail/index`);
  };

  return (
    <PullToRefresh
      onRefresh={async () =>
        await api.activity
          .beforeApproved()
          .then(async (res) => {
            setBeforeApprovedList(res);
            return await api.activity.afterApproved(); // 返回第二个Promise
          })
          .then(async (res) => {
            setAfterApprovedList(res);
            return await new Promise((resolve) => {
              resolve("done");
            });
          })
      }
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
        <Collapse defaultActiveName={["1", "2"]} expandIcon={<ArrowDown />}>
          <Collapse.Item title="未发布" name="1">
            <div>
              {beforeApprovedList.map((item, index) => (
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
          <Collapse.Item title="已发布" name="2">
            <div>
              {afterApprovedList.map((item, index) => (
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
        </Collapse>

        <div
          onClick={() => {
            navigateTo("pages/new-activity/index");
          }}
          className="fixed h-12 w-12 rounded-full bg-blue-200 right-5 bottom-[190rpx] flex justify-center items-center"
        >
          <Edit color="white" width={24} height={24} />
        </div>
      </div>
    </PullToRefresh>
  );
};

export default Publish;
