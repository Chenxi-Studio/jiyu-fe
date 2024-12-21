import React, { useEffect, useState } from "react";
import { $UI } from "@/store/UI";
import { getThemeColor } from "@/utils/ui";
import { twMerge } from "tailwind-merge";

const themeColor = getThemeColor();

export const GlobalNotify = (): JSX.Element => {
  const showNotify = $UI.use((state) => state.showNotify);
  const notifyMsg = $UI.use((state) => state.notifyMsg);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (showNotify) {
      setShow(true);
      setTimeout(() => {
        $UI.update("close notify", (draft) => {
          draft.showNotify = false;
        });
      }, 2000);
      setTimeout(() => {
        setShow(false);
      }, 2150);
    }
  }, [showNotify]);

  return (
    <>
      {show && (
        <div
          className={twMerge(
            "fixed h-screen w-screen bg-transparent z-[99999] flex justify-center text-black opacity-100",
            !showNotify && "opacity-0",
          )}
          style={{
            transitionProperty: "opacity",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "150ms",
          }}
        >
          <div
            className="mt-[25%] h-5 w-[80%] rounded-full flex items-center justify-center p-3 border-[6rpx] font-bold border-solid border-black"
            style={{ backgroundColor: themeColor }}
          >
            {notifyMsg}
          </div>
        </div>
      )}
    </>
  );
};
