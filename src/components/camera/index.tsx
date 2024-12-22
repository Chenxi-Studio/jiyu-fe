import React, { useRef, useState, type FC } from "react";
import { Camera } from "@tarojs/components";
import Taro, { type CameraContext } from "@tarojs/taro";
import { Image } from "@nutui/nutui-react-taro";
import { pic2url } from "@/utils/type";
import { $UI } from "@/store/UI";
import { api } from "@/api";
import { $Camera } from "@/store/camera";

export const CameraComponent: FC = () => {
  const cameraContext = useRef<CameraContext>(Taro.createCameraContext());
  const [image, setImage] = useState<string>("");

  return (
    <div className="fixed h-screen w-screen bg-black z-[9999] flex flex-col items-center justify-center">
      <div className="w-full px-4 h-[70%]">
        {image === "" ? (
          <Camera className="w-full h-full" />
        ) : (
          <Image
            className="w-full h-full"
            src={pic2url(image)}
            mode="aspectFit"
          />
        )}
      </div>
      <div className="flex items-center justify-evenly w-full mt-8">
        <div
          onClick={() => {
            $UI.update("close camera", (draft) => {
              draft.cameraShow = false;
            });
          }}
          className="text-white text-xl"
        >
          返回
        </div>
        <div
          className="rounded-full w-16 h-16 bg-white"
          onClick={() => {
            if (image === "") {
              cameraContext.current.takePhoto({
                quality: "high",
                success: ({ tempImagePath }) => {
                  setImage(tempImagePath);
                },
                fail: ({ errMsg }) => {
                  $UI.update("camera failed", (draft) => {
                    draft.cameraShow = false;
                    draft.notifyMsg = errMsg;
                    draft.showNotify = true;
                  });
                },
              });
            } else {
              setImage("");
            }
          }}
        />
        <div
          className="text-white text-xl"
          onClick={() => {
            if (image === "") {
              $UI.update("empty image", (draft) => {
                draft.notifyMsg = "还没有拍照哦～";
                draft.showNotify = true;
              });
              return;
            }
            const subId = $Camera.get().subId;
            if (image !== "" && subId !== undefined)
              void api.checkIn.checkIn(image, 0, 0, subId).then((res) => {
                if (typeof res.checkinDate === "object") {
                  $UI.update("camera success", (draft) => {
                    draft.cameraShow = false;
                    draft.notifyMsg = "成功提交签到";
                    draft.showNotify = true;
                  });
                }
              });
          }}
        >
          提交
        </div>
      </div>
    </div>
  );
};
