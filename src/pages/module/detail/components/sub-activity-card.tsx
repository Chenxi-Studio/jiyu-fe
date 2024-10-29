import React, {
  type MouseEventHandler,
  useMemo,
  useState,
  type FC,
} from "react";
import { Progress, Radio } from "@nutui/nutui-react-taro";
import { dateBoundary } from "@/utils/unit";
import { Checked } from "@nutui/icons-react-taro";
import { twMerge } from "tailwind-merge";
import { type SubActivityEntity } from "@/types/entity/SubActivity.entity";

export interface SubActivityCardProps {
  sub: SubActivityEntity;
  key: string;
  remaining: number;
  isSelected?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
  origin?: "home" | "activity" | "detail" | "publish";
  id?: string;
}

export const SubActivityCard: FC<SubActivityCardProps> = ({
  sub,
  key,
  remaining,
  onClick,
  isSelected = false,
  disabled = false,
  origin,
  id,
}) => {
  const [selected, setSelected] = useState(false);
  const time = useMemo(() => {
    return dateBoundary(sub.startTime, sub.endTime);
  }, [sub]);

  const checkInTime = useMemo(() => {
    return dateBoundary(sub.checkInStartTime, sub.checkInEndTime);
  }, [sub]);

  return (
    <div
      onClick={(event) => {
        if (origin !== "home") return;
        if (disabled) return;
        if (!isSelected && onClick !== undefined) onClick(event);
        setSelected(!selected);
      }}
      key={key}
      className={twMerge(
        isSelected
          ? "shadow-[0px_3px_18px_rgba(1,216,26,0.25)]"
          : "shadow-[0px_3px_24px_rgba(25,32,45,0.05)]",
        "rounded-3xl my-4 p-4 bg-white",
        disabled && "shadow-[0px_3px_24px_rgba(25,32,45,0.05)] text-gray-300",
      )}
      id={id}
    >
      <div className="flex justify-between mb-3">
        <div className={twMerge(disabled ? "text-gray-300" : "text-black")}>
          {sub.title}
        </div>
        <div className={twMerge(disabled ? "text-gray-300" : "text-gray-500")}>
          {sub.location}
        </div>
      </div>
      <div className="flex text-sm mb-2">
        <div>报名时间: {time}</div>
      </div>
      <div className="flex text-sm mb-2">
        <div>签到时间: {checkInTime}</div>
      </div>
      <div className="flex text-sm justify-between items-center">
        <div>余量: {remaining}</div>
        <Progress
          className="max-w-[60%]"
          percent={(remaining / sub.capacity) * 100}
          color={
            disabled
              ? "gray"
              : "linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
          }
          animated={!disabled}
        />
        <Radio
          disabled={disabled}
          icon={<Checked size={20} />}
          activeIcon={<Checked style={{ color: "#73c088" }} size={20} />}
          checked={isSelected || selected}
        />
      </div>
    </div>
  );
};
