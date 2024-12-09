import React, { type HTMLAttributes, type FC } from "react";
import Taro from "@tarojs/taro";
import { audio } from "@/utils/audio";

export interface InteractiveDivProps extends HTMLAttributes<HTMLDivElement> {
  onClickVibrate?: boolean;
  onClickSound?: boolean;
  onClickSoundSrc?: string;
}

export const InteractiveDiv: FC<InteractiveDivProps> = (props) => {
  const {
    onClickVibrate = false,
    onClickSound = false,
    onClickSoundSrc,
    onClick,
    ...rest
  } = props;
  return (
    <div
      {...rest}
      onClick={(e) => {
        if (onClickVibrate) {
          void Taro.vibrateLong().then((res) => {
            console.log("vibrate: ", res);
          });
        }
        if (onClickSound && onClickSoundSrc !== undefined) {
          audio.play(onClickSoundSrc);
        }
        if (onClick !== undefined) onClick(e);
      }}
    ></div>
  );
};
