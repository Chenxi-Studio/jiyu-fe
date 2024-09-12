import React from "react";
import {
  AddRectangle,
  Category,
  Home,
  Received,
  User,
} from "@nutui/icons-react-taro";
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
            className={"tab-bar-item " + (selected === index ? "selected" : "")}
          >
            {item.text === "publish" && <AddRectangle size={18} />}
            {item.text === "approve" && <Received size={18} />}
            {item.text === "home" && <Home size={18} />}
            {item.text === "activity" && <Category size={18} />}
            {item.text === "profile" && <User size={18} />}
            <div>{item.text}</div>
          </div>
        ))}
      </div>
    </>
  );
};
