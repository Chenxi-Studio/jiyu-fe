import React, { useEffect, useState } from "react";

import { Title } from "@/components/title";
import { $Activity } from "@/store/activity";
import { formatDate } from "@/utils/unit";

import { Input, TextArea } from "@nutui/nutui-react-taro";
import "./style.scss";

export interface SelectDate {
  start: string | undefined;
  end: string | undefined;
}

const NewActivity = (): JSX.Element => {
  const {
    title,
    startTime,
    endTime,
    location,
    organizer,
    category,
    introduction,
    contactMan,
    contactWay,
    minSubParticipants,
    maxSubParticipants,
    subs,
  } = $Activity.use((state) => state);
  const [selectDate, setSelectDate] = useState<SelectDate>({
    start: undefined,
    end: undefined,
  });
  const [confirmedDisable, setConfirmedDisable] = useState<boolean>(false);

  useEffect(() => {
    if (selectDate.start === undefined || selectDate.end === undefined) {
      setConfirmedDisable(true);
    } else {
      setConfirmedDisable(false);
    }
  }, [selectDate]);

  return (
    <div className="bg-[#F7F8FA]">
      <div className="py-2">
        <Title content="活动信息" />
      </div>
      <div className="px-4">
        <div className="flex items-center bg-white px-3 rounded-t-lg border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">活动标题</div>
          <Input
            type="text"
            placeholder="请输入标题 ..."
            defaultValue={title}
            onChange={(val) => {
              $Activity.update("Update activity title", (draft) => {
                draft.title = val.toString();
              });
            }}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">活动时间</div>
          <Input
            type="text"
            placeholder="请输入时间 ..."
            value={`${formatDate(startTime)} - ${formatDate(endTime)}`}
            onClick={() => {}}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">活动地点</div>
          <Input
            type="text"
            placeholder="请输入地点 ..."
            value={location}
            onChange={(val) => {
              $Activity.update("Update activity location", (draft) => {
                draft.location = val.toString();
              });
            }}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">组织者</div>
          <Input
            type="text"
            placeholder="请输入组织者 ..."
            value={organizer}
            onChange={(val) => {
              $Activity.update("Update activity organizer", (draft) => {
                draft.organizer = val.toString();
              });
            }}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">活动分类</div>
          <Input
            type="text"
            placeholder="请输入分类 ..."
            value={category}
            onChange={(val) => {
              $Activity.update("Update activity category", (draft) => {
                draft.category = val.toString();
              });
            }}
          />
        </div>
        <div className="flex bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16 py-[20rpx]">活动简介</div>

          <TextArea
            showCount
            maxLength={200}
            placeholder="请输入简介 ..."
            value={introduction}
            onChange={(val) => {
              $Activity.update("Update activity introduction", (draft) => {
                draft.introduction = val.toString();
              });
            }}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">联系人</div>
          <Input
            type="text"
            placeholder="请输入联系人 ..."
            value={contactMan}
            onChange={(val) => {
              $Activity.update("Update activity contactMan", (draft) => {
                draft.contactMan = val.toString();
              });
            }}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">联系方式</div>
          <Input
            type="text"
            placeholder="请输入联系方式 ..."
            value={contactWay}
            onChange={(val) => {
              $Activity.update("Update activity contactWay", (draft) => {
                draft.contactWay = val.toString();
              });
            }}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">最少参与子活动数</div>
          <Input
            type="digit"
            placeholder=""
            value={minSubParticipants.toString()}
            onChange={(val) => {
              if (!Number.isNaN(Number(val))) {
                $Activity.update(
                  "Update activity minSubParticipants",
                  (draft) => {
                    draft.minSubParticipants = Number(val);
                  },
                );
              }
            }}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100 rounded-b-lg">
          <div className="min-w-16">最多参与子活动数</div>
          <Input
            type="digit"
            placeholder=""
            value={maxSubParticipants.toString()}
            onChange={(val) => {
              if (!Number.isNaN(Number(val)))
                $Activity.update(
                  "Update activity maxSubParticipants",
                  (draft) => {
                    draft.maxSubParticipants = Number(val);
                  },
                );
            }}
          />
        </div>
      </div>

      <div className="pt-3">
        <Title content="子活动" />
      </div>
    </div>
  );
};

export default NewActivity;
