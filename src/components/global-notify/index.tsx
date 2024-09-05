import React from "react";
import { Notify } from "@nutui/nutui-react-taro";
import { $UI } from "@/store/UI";

export const GlobalNotify = (): JSX.Element => {
  const showNotify = $UI.use((state) => state.showNotify);
  const notifyMsg = $UI.use((state) => state.notifyMsg);
  return (
    <Notify
      id="test"
      visible={showNotify}
      type="danger"
      onClose={() => {
        $UI.update("close notify", (draft) => {
          draft.showNotify = false;
        });
      }}
      onClick={() => {
        console.log("click");
      }}
    >
      {notifyMsg}
    </Notify>
  );
};
