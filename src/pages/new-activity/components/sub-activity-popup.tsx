import React, { useEffect, useState, type FC } from "react";
import {
  type SubActivity,
  validateCreateSubActivityRequest,
} from "@/types/activity";
import { Button, Input, Popup } from "@nutui/nutui-react-taro";
import { $Activity } from "@/store/activity";
import { TimeInput } from "./time-input";

const defaultCreateSubActivityRequest = {
  title: "",
  registrationStartTime: new Date(),
  registrationEndTime: new Date(),
  studentScope: { degree: [], grade: [], major: [], class: [], tags: [] },
  capacity: 0,
  checkInStartTime: new Date(),
  checkInEndTime: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  location: "",
};

export interface SubActivityPopUpProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  preFill?: SubActivity;
  index?: number;
}

export const SubActivityPopUp: FC<SubActivityPopUpProps> = (
  props,
): JSX.Element => {
  const { show, setShow, preFill, index } = props;
  const [form, setForm] = useState<SubActivity>(
    defaultCreateSubActivityRequest,
  );
  const disabled = !validateCreateSubActivityRequest(form);

  useEffect(() => {
    if (preFill === undefined) {
      setForm(defaultCreateSubActivityRequest);
    } else {
      setForm(preFill);
    }
  }, [preFill]);

  const handleConfirm = (): void => {
    if (index !== undefined) {
      $Activity.update("update sub-activity", (draft) => {
        draft.subActivities = draft.subActivities.map((item, i) => {
          if (i === index) {
            return form;
          }
          return item;
        });
      });
    } else {
      $Activity.update("add new sub-activity", (draft) => {
        draft.subActivities = [...draft.subActivities, form];
      });
    }
    setShow(false);
  };

  return (
    <>
      <Popup
        closeable
        visible={show}
        onClose={() => {
          setShow(false);
        }}
        closeOnOverlayClick={false}
        className="h-[80%] w-[80%] rounded-2xl"
      >
        <div className="px-2">
          <div className="text-gray-400 text-lg flex justify-center w-full py-4">
            添加子活动
          </div>
          <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
            <div className="min-w-16">活动标题</div>
            <Input
              type="text"
              placeholder="请输入标题 ..."
              value={form.title}
              onChange={(val) => {
                setForm((prev) => ({
                  ...prev,
                  title: val,
                }));
              }}
            />
          </div>
          <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
            <div className="min-w-16">活动地点</div>
            <Input
              type="text"
              placeholder="请输入地点 ..."
              value={form.location}
              onChange={(val) => {
                setForm((prev) => ({
                  ...prev,
                  location: val,
                }));
              }}
            />
          </div>
          <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
            <div className="min-w-16">参与人数</div>
            <Input
              type="digit"
              placeholder="请输入人数 ..."
              value={form.capacity.toString()}
              onChange={(val) => {
                if (!Number.isNaN(Number(val))) {
                  setForm((prev) => ({
                    ...prev,
                    capacity: Number(val),
                  }));
                }
              }}
            />
          </div>
          <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
            <div className="min-w-16">参与范围</div>
            <Input
              readOnly
              type="text"
              placeholder="TODO: 暂未支持"
              onChange={(val) => {
                setForm((prev) => ({
                  ...prev,
                }));
              }}
            />
          </div>
          <TimeInput
            title="开始时间"
            value={form.startTime}
            onConfirm={(options, values) => {
              setForm((prev) => ({
                ...prev,
                startTime: new Date(
                  Number(values[0]),
                  Number(values[1]) - 1,
                  Number(values[2]),
                  Number(values[3]),
                  Number(values[4]),
                ),
              }));
            }}
          />
          <TimeInput
            title="结束时间"
            value={form.endTime}
            onConfirm={(options, values) => {
              setForm((prev) => ({
                ...prev,
                endTime: new Date(
                  Number(values[0]),
                  Number(values[1]) - 1,
                  Number(values[2]),
                  Number(values[3]),
                  Number(values[4]),
                ),
              }));
            }}
          />
          <TimeInput
            title="报名开始"
            value={form.registrationStartTime}
            onConfirm={(options, values) => {
              setForm((prev) => ({
                ...prev,
                registrationStartTime: new Date(
                  Number(values[0]),
                  Number(values[1]) - 1,
                  Number(values[2]),
                  Number(values[3]),
                  Number(values[4]),
                ),
              }));
            }}
          />
          <TimeInput
            title="报名结束"
            value={form.registrationEndTime}
            onConfirm={(options, values) => {
              setForm((prev) => ({
                ...prev,
                registrationEndTime: new Date(
                  Number(values[0]),
                  Number(values[1]) - 1,
                  Number(values[2]),
                  Number(values[3]),
                  Number(values[4]),
                ),
              }));
            }}
          />
          <TimeInput
            title="签到开始"
            value={form.checkInStartTime}
            onConfirm={(options, values) => {
              setForm((prev) => ({
                ...prev,
                checkInStartTime: new Date(
                  Number(values[0]),
                  Number(values[1]) - 1,
                  Number(values[2]),
                  Number(values[3]),
                  Number(values[4]),
                ),
              }));
            }}
          />
          <TimeInput
            className="mb-4 border-0"
            title="签到结束"
            value={form.checkInEndTime}
            onConfirm={(options, values) => {
              setForm((prev) => ({
                ...prev,
                checkInEndTime: new Date(
                  Number(values[0]),
                  Number(values[1]) - 1,
                  Number(values[2]),
                  Number(values[3]),
                  Number(values[4]),
                ),
              }));
            }}
          />
        </div>
        <div className="fixed bottom-0 w-full flex items-center justify-center py-6">
          <Button
            disabled={disabled}
            type="primary"
            className="w-[40%]"
            onClick={handleConfirm}
          >
            {preFill === undefined ? "新增" : "保存修改"}
          </Button>
        </div>
      </Popup>
    </>
  );
};
