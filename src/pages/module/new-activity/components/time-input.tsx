import { dateFormatter, formatDate } from "@/utils/unit";
import { DatePicker, Input, type PickerOption } from "@nutui/nutui-react-taro";
import React, { useState, type FC } from "react";
import { twMerge } from "tailwind-merge";

export interface TimeInputProps {
  title: string;
  value: Date;
  onConfirm: (options: PickerOption[], values: Array<string | number>) => void;
  className?: string;
}

export const TimeInput: FC<TimeInputProps> = (props): JSX.Element => {
  const { title, value, onConfirm, className = "" } = props;
  const [show, setShow] = useState<boolean>(false);
  return (
    <div
      className={twMerge(
        "flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100",
        className,
      )}
    >
      <div className="min-w-16">{title}</div>
      <Input
        readOnly
        type="text"
        placeholder="请输入时间 ..."
        value={formatDate(value)}
        onClick={() => {
          setShow(true);
        }}
      />
      <DatePicker
        title={`${title}选择`}
        type="datetime"
        visible={show}
        defaultValue={value}
        formatter={dateFormatter}
        onClose={() => {
          setShow(false);
        }}
        onConfirm={onConfirm}
      />
    </div>
  );
};
