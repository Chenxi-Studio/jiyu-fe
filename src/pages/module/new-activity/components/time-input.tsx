import { dateFormatter, formatDate } from "@/utils/unit";
import {
  Calendar,
  DatePicker,
  Input,
  type PickerOption,
} from "@nutui/nutui-react-taro";
import React, { useState, type FC } from "react";
import { twMerge } from "tailwind-merge";
import "./time-input.scss";

export interface TimeInputProps {
  title: string;
  value: Date;
  onConfirmMinute: (
    options: PickerOption[],
    values: Array<string | number>,
  ) => void;
  onConfirmDate: (param: string[]) => void;
  className?: string;
}

export const TimeInput: FC<TimeInputProps> = (props): JSX.Element => {
  const {
    title,
    value,
    onConfirmMinute,
    className = "",
    onConfirmDate,
  } = props;
  const [show, setShow] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  return (
    <div
      className={twMerge(
        "flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100",
        className,
      )}
    >
      <div className="min-w-16">{title}</div>
      <div className="time-input-left">
        <Input
          readOnly
          type="text"
          style={{ paddingRight: 0 }}
          placeholder="请选择日期"
          value={formatDate(value, false)}
          onClick={() => {
            setShowCalendar(true);
          }}
        />
      </div>
      <div className="time-input-right">
        <Input
          readOnly
          type="text"
          placeholder="请选择时间"
          style={{ paddingLeft: 0 }}
          value={formatDate(value, true, false)}
          onClick={() => {
            setShow(true);
          }}
        />
      </div>
      <DatePicker
        title={`${title}选择`}
        type="hour-minutes"
        visible={show}
        defaultValue={value}
        formatter={dateFormatter}
        onClose={() => {
          setShow(false);
        }}
        onConfirm={onConfirmMinute}
      />
      <Calendar
        visible={showCalendar}
        showTitle={false}
        defaultValue={value.toString()}
        onClose={() => {
          setShowCalendar(false);
        }}
        onConfirm={onConfirmDate}
      />
    </div>
  );
};
