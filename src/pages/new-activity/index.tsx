import React, { useState } from "react";
import {
  AtCalendar,
  AtInput,
  AtModal,
  AtModalAction,
  AtModalContent,
  AtModalHeader,
} from "taro-ui";
import { Title } from "@/components/title";
import { $Activity } from "@/store/activity";
import { formatDate } from "@/utils/unit";
import { Button } from "@tarojs/components";

import "./style.scss";

export interface SelectDate {
  start: string | null;
  end: string | null;
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
  const [showModel, setShowModel] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<SelectDate>({
    start: null,
    end: null,
  });
  const confirmedDisable = selectDate.start === null || selectDate.end === null;

  const handleModelCancel = (): void => {
    setShowModel(false);
  };

  const handleModelConfirm = (): void => {
    if (!confirmedDisable) {
      setShowModel(false);
    }
  };

  return (
    <>
      <Title content="活动信息" />
      <div className="pr-4">
        <AtInput
          name="value"
          title="活动标题"
          type="text"
          placeholder=""
          value={title}
          onChange={(val) => {
            $Activity.update("Update activity title", (draft) => {
              draft.title = val.toString();
            });
          }}
        />
        <AtInput
          editable={false}
          name="value"
          title="活动时间"
          type="text"
          placeholder=""
          value={`${formatDate(startTime)} - ${formatDate(endTime)}`}
          onClick={() => {
            setShowModel(true);
          }}
        />
      </div>

      <Title content="子活动" />

      <AtModal isOpened={showModel} onClose={handleModelCancel}>
        <AtModalHeader>标题</AtModalHeader>
        <AtModalContent>
          <AtCalendar
            isMultiSelect
            isVertical
            currentDate={{
              start: formatDate(startTime),
              end: formatDate(endTime),
            }}
            onSelectDate={(v: React.SetStateAction<SelectDate>) => {
              setSelectDate(v);
              console.log(v);
            }}
          />
        </AtModalContent>
        <AtModalAction>
          <Button onClick={handleModelCancel}>取消</Button>
          <Button disabled={confirmedDisable} onClick={handleModelConfirm}>
            确定
          </Button>
        </AtModalAction>
      </AtModal>
    </>
  );
};

export default NewActivity;
