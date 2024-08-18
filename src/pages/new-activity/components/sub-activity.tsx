import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AddCircle } from "@nutui/icons-react-taro";
import { Button, Swipe } from "@nutui/nutui-react-taro";
import { type CreateSubActivityRequest } from "@/types/activity";
import { $Activity } from "@/store/activity";
import { formatDate } from "@/utils/unit";
import { SubActivityPopUp } from "./sub-activity-popup";

export const SubActivity = (): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const [preFill, setPreFill] = useState<CreateSubActivityRequest | undefined>(
    undefined,
  );
  const [index, setIndex] = useState<number | undefined>(undefined);
  const subs = $Activity.use((state) => state.subs);

  return (
    <>
      <div className="px-4 pb-[150rpx]">
        {subs.map((item, i) => (
          <Swipe
            className={twMerge("", i === 0 && "rounded-t-lg")}
            rightAction={
              <Button
                type="primary"
                shape="square"
                onClick={() => {
                  $Activity.update("delete sub activity", (draft) => {
                    draft.subs = subs.filter(
                      (draftItem, draftIndex) => i !== draftIndex,
                    );
                  });
                }}
              >
                删除
              </Button>
            }
            key={`sub-${index}`}
          >
            <div
              className="flex justify-between bg-white border-solid border-0 border-b border-gray-100 p-4"
              onClick={() => {
                setIndex(i);
                setPreFill(item);
                setShow(true);
              }}
            >
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="mb-2">{item.title}</div>
                  <div className="text-gray-500 mb-2">
                    容量: {item.capacity}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">{item.location}</div>
                  <div className="text-sm text-gray-500">
                    {formatDate(item.startTime, false)}-
                    {formatDate(item.endTime, false)}
                  </div>
                </div>
              </div>
            </div>
          </Swipe>
        ))}
        <div
          className={twMerge(
            "flex py-8 text-gray-400 flex-col items-center justify-center bg-white px-3 border-solid border-0 border-b border-gray-100 rounded-b-lg",
            subs.length === 0 && "rounded-t-lg",
          )}
          onClick={() => {
            setIndex(undefined);
            setPreFill(undefined);
            setShow(true);
          }}
        >
          <AddCircle />
          <div>添加子活动</div>
        </div>
        <SubActivityPopUp
          show={show}
          setShow={setShow}
          preFill={preFill}
          index={index}
        />
      </div>
      <div className="flex justify-between items-center fixed bottom-0 h-[150rpx] bg-white w-[calc(100%-64rpx)] px-4">
        <Button type="default" size="large">
          返回并保存
        </Button>
        <Button type="primary" size="large">
          提交
        </Button>
      </div>
    </>
  );
};
