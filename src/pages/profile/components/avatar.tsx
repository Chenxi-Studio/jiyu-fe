import React, { type FC } from "react";
import { Button, type CommonEventFunction } from "@tarojs/components";
import { Image } from "@nutui/nutui-react-taro";

export interface AvatarProps {
  onChooseAvatar: CommonEventFunction;
  avatarUrl: string;
  size?: number;
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { onChooseAvatar: handleChooseAvatar, avatarUrl, size = 80 } = props;
  return (
    <Button
      className="rounded-full flex items-center justify-center border-2 border-solid border-white"
      style={{ width: size, height: size }}
      openType="chooseAvatar"
      onChooseAvatar={handleChooseAvatar}
    >
      <Image
        src={avatarUrl}
        mode="aspectFit"
        width={size}
        height={size}
        radius="50%"
      />
    </Button>
  );
};
