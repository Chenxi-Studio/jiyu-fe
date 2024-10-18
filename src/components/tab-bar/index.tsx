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

const iconSize = 22;

export const TabBar = (): JSX.Element => {
  const selected = $UI.use((state) => state.selected);
  return (
    <>
      <div className="wrapper">
        {TabList.map((item, index) => (
          <div
            key={item.text}
            onClick={() => {
              switchTab(item.pagePath);
            }}
            className={"tab-bar-item " + (selected === index ? "selected" : "")}
          >
            {item.text === "发布" && <AddRectangle size={iconSize} />}
            {item.text === "审批" && <Received size={iconSize} />}
            {item.text === "主页" && <Home size={iconSize} />}
            {item.text === "活动" && <Category size={iconSize} />}
            {item.text === "个人" && <User size={iconSize} />}
            {/* <div>{item.text}</div> */}
          </div>
        ))}
      </div>
    </>
  );
};
