import { pic2url } from "@/utils/type";
import React, { type FC } from "react";

const baseUrl =
  "https://jiyu-1306028870.cos.ap-shanghai.myqcloud.com/wxapp/ui/";

const backgroundImage = pic2url(baseUrl + "403-background.jpg");

export const Page403: FC = () => {
  return (
    <div
      className="fixed h-screen w-screen z-[999999] flex items-center justify-center  bg-cover bg-no-repeat"
      style={{ backgroundImage: `url("${backgroundImage}")` }}
    >
      <div className="flex items-center flex-col justify-center rounded-lg bg-black px-2 py-3 border-[6rpx] border-solid text-white shadow-[0_8rpx] font-bold text-lg">
        <div>Oops!</div>
        <div>计遇小程序暂时仅对计算机师生开放</div>
      </div>
    </div>
  );
};
