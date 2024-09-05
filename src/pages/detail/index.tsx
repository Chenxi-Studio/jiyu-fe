import React, { useEffect, useState } from "react";
import Taro, { useReady } from "@tarojs/taro";
import { Image } from "@nutui/nutui-react-taro";
import { $UI } from "@/store/UI";
import { navigateBack } from "@/utils/navigator";
import { formatDate, px2rpx, windowHeight } from "@/utils/unit";

const Detail = (): JSX.Element => {
  const currentActivity = $UI.use((state) => state.currentActivity);
  const [offset, setOffset] = useState<number>(0);
  const [minHeight, setMinHeight] = useState<number>(0);

  // TODO: 卡顿？
  useReady(() => {
    // taro 的 view ref 对象未实现 offset 属性 只能使用 createSelectorQuery 方法
    // https://taro-docs.jd.com/docs/ref#在子组件中获取
    Taro.createSelectorQuery()
      .select("#detail-pic")
      .boundingClientRect()
      .exec((res) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-argument
        if (res[0]?.height) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const bodyOffset = px2rpx(res[0].height) - 64; // 最好使用 rpx 而非 px

          setOffset(bodyOffset);
          setMinHeight(px2rpx(windowHeight) - 150);
        }
      });
  });

  useEffect(() => {
    if (currentActivity === undefined) {
      navigateBack();
    }
  }, []);

  return (
    <div className="h-[100vh]">
      <div className="h-48 w-full fixed top-0 z-0" id="detail-pic">
        <Image
          src={`https://${currentActivity?.coverImage}`}
          mode="aspectFill"
        />
      </div>
      <div
        className="bg-[#FCFCFC] rounded-[64rpx] pt-10 px-8 relative z-10 pb-[150rpx]"
        style={{
          top: `${offset}rpx`,
          minHeight: `${minHeight}rpx`,
          transition: "top 1s ease-in-out",
        }}
      >
        <div className="text-4xl font-extrabold mb-4">
          {currentActivity?.title}
        </div>
        <div className="rounded-2xl p-3 border-gray-200 border-2 text-base text-center border-solid text-gray-400 mb-4">
          {currentActivity?.organizer} ·{" "}
          {formatDate(currentActivity?.startTime, false)} -{" "}
          {formatDate(currentActivity?.endTime, false)}
        </div>
        <div className="text-base">{currentActivity?.introduction}</div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex bg-white px-8 justify-between h-[150rpx] items-center z-20">
        <div>Confirm</div>
        <div>Cancel</div>
      </div>
    </div>
  );
};

export default Detail;
