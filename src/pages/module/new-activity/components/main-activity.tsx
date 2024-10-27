import React from "react";
import Taro from "@tarojs/taro";
import { $Activity } from "@/store/activity";
import { $UI } from "@/store/UI";
import { Image, Input, TextArea } from "@nutui/nutui-react-taro";
import { pic2url } from "@/utils/type";
import { TimeInput } from "./time-input";

export const MainActivity = (): JSX.Element => {
  const {
    title,
    coverImage,
    groupImage,
    startTime,
    endTime,
    location,
    organizer,
    category,
    introduction,
    contactMan,
    contactWay,
    minSubParticipants,
    maxSubParticipants,
  } = $Activity.use((state) => state);

  return (
    <>
      <div className="px-4">
        <div className="flex items-center bg-white px-3 rounded-t-lg border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">活动标题</div>
          <Input
            type="text"
            placeholder="请输入标题 ..."
            defaultValue={title}
            onChange={(val) => {
              $Activity.update("Update activity title", (draft) => {
                draft.title = val.toString();
              });
            }}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">活动头图</div>
          <div
            className="px-[50rpx] py-[20rpx] w-full h-32"
            onClick={() => {
              void Taro.chooseImage({
                count: 1, // 默认9
                sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ["album"], // 可以指定来源是相册 album 还是相机 camera，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
              }).then((res) => {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths;
                Taro.getFileSystemManager().readFile({
                  filePath: tempFilePaths[0],
                  encoding: "base64",
                  success: (rst) => {
                    // 极为离谱的设计 成功返回的 errMsg 为 chooseImage:ok
                    if (rst.errMsg.endsWith("ok")) {
                      $Activity.update("change picture", (draft) => {
                        draft.coverImage = tempFilePaths[0];
                      });
                    } else {
                      $UI.update("select image err", (draft) => {
                        draft.notifyMsg = rst.errMsg;
                        draft.showNotify = true;
                      });
                    }
                  },
                });
              });
            }}
          >
            <Image src={pic2url(coverImage)} mode="aspectFit" />
          </div>
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">群二维码</div>
          <div
            className="px-[50rpx] py-[20rpx] w-full h-32"
            onClick={() => {
              void Taro.chooseImage({
                count: 1, // 默认9
                sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ["album"], // 可以指定来源是相册 album 还是相机 camera，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
              }).then((res) => {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths;
                Taro.getFileSystemManager().readFile({
                  filePath: tempFilePaths[0],
                  encoding: "base64",
                  success: (rst) => {
                    // 极为离谱的设计 成功返回的 errMsg 为 chooseImage:ok
                    if (rst.errMsg.endsWith("ok")) {
                      $Activity.update("change group image", (draft) => {
                        draft.groupImage = tempFilePaths[0];
                      });
                    } else {
                      $UI.update("select image err", (draft) => {
                        draft.notifyMsg = rst.errMsg;
                        draft.showNotify = true;
                      });
                    }
                  },
                });
              });
            }}
          >
            <Image src={pic2url(groupImage)} mode="aspectFit" />
          </div>
        </div>
        <TimeInput
          title="开始时间"
          value={startTime}
          onConfirmMinute={(options, values) => {
            $Activity.update("update new startTime", (draft) => {
              draft.startTime = new Date(
                draft.startTime.getFullYear(),
                draft.startTime.getMonth(),
                draft.startTime.getDate(),
                Number(values[0]),
                Number(values[1]),
              );
            });
          }}
          onConfirmDate={(param) => {
            $Activity.update("update new startTime", (draft) => {
              draft.startTime = new Date(
                Number(param[0]),
                Number(param[1]) - 1,
                Number(param[2]),
                draft.startTime.getHours(),
                draft.startTime.getMinutes(),
              );
            });
          }}
        />
        <TimeInput
          title="结束时间"
          value={endTime}
          onConfirmMinute={(options, values) => {
            $Activity.update("update new endTime", (draft) => {
              draft.endTime = new Date(
                draft.endTime.getFullYear(),
                draft.endTime.getMonth(),
                draft.endTime.getDate(),
                Number(values[0]),
                Number(values[1]),
              );
            });
          }}
          onConfirmDate={(param) => {
            $Activity.update("update new endTime", (draft) => {
              draft.endTime = new Date(
                Number(param[0]),
                Number(param[1]) - 1,
                Number(param[2]),
                draft.endTime.getHours(),
                draft.endTime.getMinutes(),
              );
            });
          }}
        />
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">活动地点</div>
          <Input
            type="text"
            placeholder="请输入地点 ..."
            value={location}
            onChange={(val) => {
              $Activity.update("Update activity location", (draft) => {
                draft.location = val.toString();
              });
            }}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">组织者</div>
          <Input
            type="text"
            placeholder="请输入组织者 ..."
            value={organizer}
            onChange={(val) => {
              $Activity.update("Update activity organizer", (draft) => {
                draft.organizer = val.toString();
              });
            }}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">活动分类</div>
          <Input
            type="text"
            placeholder="请输入分类 ..."
            value={category}
            onChange={(val) => {
              $Activity.update("Update activity category", (draft) => {
                draft.category = val.toString();
              });
            }}
          />
        </div>
        <div className="flex bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16 py-[20rpx]">活动简介</div>

          <TextArea
            showCount
            maxLength={200}
            placeholder="请输入简介 ..."
            value={introduction}
            onChange={(val) => {
              $Activity.update("Update activity introduction", (draft) => {
                draft.introduction = val.toString();
              });
            }}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">联系人</div>
          <Input
            type="text"
            placeholder="请输入联系人 ..."
            value={contactMan}
            onChange={(val) => {
              $Activity.update("Update activity contactMan", (draft) => {
                draft.contactMan = val.toString();
              });
            }}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">联系方式</div>
          <Input
            type="text"
            placeholder="请输入联系方式 ..."
            value={contactWay}
            onChange={(val) => {
              $Activity.update("Update activity contactWay", (draft) => {
                draft.contactWay = val.toString();
              });
            }}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100">
          <div className="min-w-16">最少参与子活动数</div>
          <Input
            type="digit"
            placeholder=""
            value={minSubParticipants.toString()}
            onChange={(val) => {
              if (!Number.isNaN(Number(val))) {
                $Activity.update(
                  "Update activity minSubParticipants",
                  (draft) => {
                    draft.minSubParticipants = Number(val);
                  },
                );
              }
            }}
          />
        </div>
        <div className="flex items-center bg-white px-3 border-solid border-0 border-b border-gray-100 rounded-b-lg">
          <div className="min-w-16">最多参与子活动数</div>
          <Input
            type="digit"
            placeholder=""
            value={maxSubParticipants.toString()}
            onChange={(val) => {
              if (!Number.isNaN(Number(val)))
                $Activity.update(
                  "Update activity maxSubParticipants",
                  (draft) => {
                    draft.maxSubParticipants = Number(val);
                  },
                );
            }}
          />
        </div>
      </div>
    </>
  );
};
