import React, { useEffect, useState, type FC } from "react";
import {
  type SubActivity,
  validateCreateSubActivityRequest,
} from "@/types/activity";
import { Button, Input, Popup } from "@nutui/nutui-react-taro";
import { $Activity } from "@/store/activity";
import { TimeInput } from "./time-input";
import { TagPopup } from "./tag-popup";

const defaultCreateSubActivityRequest = {
  title: "",
  registrationStartTime: new Date(),
  registrationEndTime: new Date(),
  studentScope: {
    gender: [],
    degree: [],
    grade: [],
    major: [],
    class: [],
    tags: [],
  },
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
  const [showTag, setShowTag] = useState<boolean>(false);

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
          if (preFill === undefined) {
            setForm(defaultCreateSubActivityRequest);
          } else {
            setForm(preFill);
          }
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
              value="点击选择参与范围标签"
              onClick={() => {
                setShowTag(true);
              }}
            />
          </div>
          <TimeInput
            title="报名开始"
            value={form.registrationStartTime}
            onConfirmMinute={(options, values) => {
              setForm((prev) => ({
                ...prev,
                registrationStartTime: new Date(
                  prev.registrationStartTime.getFullYear(),
                  prev.registrationStartTime.getMonth(),
                  prev.registrationStartTime.getDate(),
                  Number(values[0]),
                  Number(values[1]),
                ),
              }));
            }}
            onConfirmDate={(param) => {
              setForm((prev) => ({
                ...prev,
                registrationStartTime: new Date(
                  Number(param[0]),
                  Number(param[1]) - 1,
                  Number(param[2]),
                  prev.registrationStartTime.getHours(),
                  prev.registrationStartTime.getMinutes(),
                ),
              }));
            }}
          />
          <TimeInput
            title="报名结束"
            value={form.registrationEndTime}
            onConfirmMinute={(options, values) => {
              setForm((prev) => ({
                ...prev,
                registrationEndTime: new Date(
                  prev.registrationEndTime.getFullYear(),
                  prev.registrationEndTime.getMonth(),
                  prev.registrationEndTime.getDate(),
                  Number(values[0]),
                  Number(values[1]),
                ),
              }));
            }}
            onConfirmDate={(param) => {
              setForm((prev) => ({
                ...prev,
                registrationEndTime: new Date(
                  Number(param[0]),
                  Number(param[1]) - 1,
                  Number(param[2]),
                  prev.registrationEndTime.getHours(),
                  prev.registrationEndTime.getMinutes(),
                ),
              }));
            }}
          />
          <TimeInput
            title="签到开始"
            value={form.checkInStartTime}
            onConfirmMinute={(options, values) => {
              setForm((prev) => ({
                ...prev,
                checkInStartTime: new Date(
                  prev.checkInStartTime.getFullYear(),
                  prev.checkInStartTime.getMonth(),
                  prev.checkInStartTime.getDate(),
                  Number(values[0]),
                  Number(values[1]),
                ),
              }));
            }}
            onConfirmDate={(param) => {
              setForm((prev) => ({
                ...prev,
                checkInStartTime: new Date(
                  Number(param[0]),
                  Number(param[1]) - 1,
                  Number(param[2]),
                  prev.checkInStartTime.getHours(),
                  prev.checkInStartTime.getMinutes(),
                ),
              }));
            }}
          />
          <TimeInput
            className="mb-4 border-0"
            title="签到结束"
            value={form.checkInEndTime}
            onConfirmMinute={(options, values) => {
              setForm((prev) => ({
                ...prev,
                checkInEndTime: new Date(
                  prev.checkInEndTime.getFullYear(),
                  prev.checkInEndTime.getMonth(),
                  prev.checkInEndTime.getDate(),
                  Number(values[0]),
                  Number(values[1]),
                ),
              }));
            }}
            onConfirmDate={(param) => {
              setForm((prev) => ({
                ...prev,
                checkInEndTime: new Date(
                  Number(param[0]),
                  Number(param[1]) - 1,
                  Number(param[2]),
                  prev.checkInEndTime.getHours(),
                  prev.checkInEndTime.getMinutes(),
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
      <TagPopup
        visible={showTag}
        onClose={() => {
          setShowTag(false);
        }}
        defaultValue={form.studentScope}
        onChange={(value, tag, type) => {
          if (value) {
            setForm((prev) => {
              if (type === "class" && typeof tag === "string")
                prev.studentScope.class.push(tag);
              if (type === "degree" && typeof tag === "number")
                prev.studentScope.degree.push(tag);
              if (type === "gender" && typeof tag === "number")
                prev.studentScope.gender.push(tag);
              if (type === "grade" && typeof tag === "string")
                prev.studentScope.grade.push(tag);
              if (type === "major" && typeof tag === "string")
                prev.studentScope.major.push(tag);
              if (type === "tags" && typeof tag === "number")
                prev.studentScope.tags.push(tag);
              return prev;
            });
          } else {
            setForm((prev) => {
              if (type === "class" && typeof tag === "string")
                prev.studentScope[type] = prev.studentScope.class.filter(
                  (item) => item !== tag,
                );
              if (type === "degree" && typeof tag === "number")
                prev.studentScope[type] = prev.studentScope.degree.filter(
                  (item) => item !== tag,
                );
              if (type === "gender" && typeof tag === "number")
                prev.studentScope[type] = prev.studentScope.gender.filter(
                  (item) => item !== tag,
                );
              if (type === "grade" && typeof tag === "string")
                prev.studentScope[type] = prev.studentScope.grade.filter(
                  (item) => item !== tag,
                );
              if (type === "major" && typeof tag === "string")
                prev.studentScope[type] = prev.studentScope.major.filter(
                  (item) => item !== tag,
                );
              if (type === "tags" && typeof tag === "number")
                prev.studentScope[type] = prev.studentScope.tags.filter(
                  (item) => item !== tag,
                );
              return prev;
            });
          }
        }}
      />
    </>
  );
};
