import React from "react";
import { TabList } from "@/types/tab";
import { switchTab } from "@/utils/navigator";
import { $UI } from "@/store/UI";
import "./style.css";

export const TabBar = (): JSX.Element => {
  const selected = $UI.use((state) => state.selected);
  return (
    <>
      <div className="wrapper">
        {TabList.map((item, index) => (
          <div
            key={item.text}
            onClick={() => {
              $UI.update("switch tab", (draft) => {
                draft.selected = index;
              });
              switchTab(item.pagePath);
            }}
            className={selected === index ? "selected" : ""}
          >
            {item.text}
          </div>
        ))}
      </div>
    </>
  );
};
