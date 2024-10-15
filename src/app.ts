import { type PropsWithChildren } from "react";
import { useLaunch, useLoad } from "@tarojs/taro";

import "./app.css";
import { setDevJWT } from "./utils/dev";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const App = ({ children }: PropsWithChildren<any>) => {
  useLoad(() => {
    console.log("onLoad");
  });
  useLaunch(() => {
    console.log("App launched.");
    void setDevJWT();
  });

  // children 是将要会渲染的页面
  return children;
};

export default App;
