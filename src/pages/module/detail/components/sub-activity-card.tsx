import React, { useMemo, useState, type FC } from "react";
import { Progress, Radio } from "@nutui/nutui-react-taro";
import { useSpring, animated } from "@react-spring/web";
import { type SubActivity } from "@/types/activity";
import { dateBoundary } from "@/utils/unit";
import { Checklist } from "@nutui/icons-react-taro";

export interface SubActivityCardProps {
  sub: SubActivity;
  key: string;
}

export const SubActivityCard: FC<SubActivityCardProps> = ({ sub, key }) => {
  const [selected, setSelected] = useState(false);
  const time = useMemo(() => {
    return dateBoundary(sub.startTime, sub.endTime);
  }, [sub]);

  const checkInTime = useMemo(() => {
    return dateBoundary(sub.checkInStartTime, sub.checkInEndTime);
  }, [sub]);

  const currentSelected = Math.round(Math.random() * sub.capacity);

  const springs = useSpring({
    from: {
      boxShadow: "0px 3px 24px rgba(25,32,45,0.05)",
    },
    to: {
      boxShadow:
        "0px 3px 24px rgba(25,32,45,0.05), inset 0px 0px 24px 5px rgba(253, 160, 133, 0.5)",
    },
  });

  return (
    <animated.div
      //   style={{ ...springs }}
      onClick={() => {
        setSelected(!selected);
      }}
      key={key}
      className="rounded-3xl shadow-[0px_3px_24px_rgba(25,32,45,0.05)] my-4 p-4 bg-white btn btn-border-drawing"
    >
      <div className="flex justify-between mb-3">
        <div className="text-black">{sub.title}</div>
        <div className="text-gray-500">{sub.location}</div>
      </div>
      <div className="flex text-sm mb-2">
        <div>活动时间: {time}</div>
      </div>
      <div className="flex text-sm mb-2">
        <div>签到时间: {checkInTime}</div>
      </div>
      <div className="flex text-sm justify-between items-center">
        <div>余量: {sub.capacity - currentSelected}</div>
        <Progress
          className="max-w-[60%]"
          percent={((sub.capacity - currentSelected) / sub.capacity) * 100}
          color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
          animated
        />
        <Radio
          icon={<Checklist size={28} />}
          activeIcon={<Checklist style={{ color: "#73c088" }} size={28} />}
          checked={selected}
        />
      </div>
    </animated.div>
  );
};
