import { px2rpx, windowHeight } from "@/utils/unit";
import { Picker } from "@tarojs/components";
import { getCurrentInstance } from "@tarojs/runtime";
import Taro, { useReady } from "@tarojs/taro";
import React, { useEffect, useState } from "react";

const Detail = (): JSX.Element => {
  const [id, setId] = useState<number>(0);
  const [editable, setEditable] = useState<boolean>(false);
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
    const instance = getCurrentInstance();
    const params = instance.router?.params;
    if (!Number.isNaN(Number(params?.id))) {
      setId(Number(params?.id));
    }
    // eslint-disable-next-line no-extra-boolean-cast
    if (Boolean(params?.editable)) {
      setEditable(Boolean(params?.editable));
    }
  }, []);

  return (
    <div className="h-[100vh]">
      <div className="h-40 bg-blue-200 w-full fixed top-0 z-0" id="detail-pic">
        图片
      </div>
      <div
        className="bg-[#FCFCFC] rounded-[64rpx] pt-10 px-8 relative z-10 pb-[150rpx]"
        style={{
          top: `${offset}rpx`,
          minHeight: `${minHeight}rpx`,
          transition: "top 1s ease-in-out",
        }}
      >
        <div className="text-4xl font-extrabold mb-4">This is Title</div>
        <div className="rounded-2xl p-3 border-gray-200 border-2 text-base text-center border-solid text-gray-400 mb-4">
          Author Name 8.9 · 13.12
        </div>
        <div className="text-base">
          This is content. This is content. This is content. This is content.
          This is content. This is content. This is content. This is content.
          This is content. This is content. This is content. This is content.
          This is Detail. ID: {id}. Editable: {editable ? "true" : "false"}.
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex bg-white px-8 justify-between h-[150rpx] items-center z-20">
        <div>Confirm</div>
        <div>Cancel</div>
      </div>
    </div>
  );
};

export default Detail;
