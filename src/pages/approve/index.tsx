import React, { useEffect, useState } from "react";
import { Collapse } from "@nutui/nutui-react-taro";
import { SmallCard } from "@/components/small-card";
import { ArrowDown } from "@nutui/icons-react-taro";
import { navigateTo } from "@/utils/navigator";
import { api } from "@/api";
import { type ActivityEntity } from "@/types/entity/Activity.entity";
import { $UI } from "@/store/UI";

const Approve = (): JSX.Element => {
  const [toApproveList, setToApproveList] = useState<ActivityEntity[]>([]);

  useEffect(() => {
    void api.approve.toApprove().then((res) => {
      setToApproveList(res);
    });
  }, []);

  const handleOnclick = (item: ActivityEntity): void => {
    $UI.update("update current activity", (draft) => {
      draft.currentActivity = item;
    });
    navigateTo(`pages/detail/index`);
  };

  return (
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
  );
};

export default Approve;
