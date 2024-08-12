import { type PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";

import "./icon.scss";
import "./app.css";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const App = ({ children }: PropsWithChildren<any>) => {
  useLaunch(() => {
    console.log("App launched.", document.defaultView);
  });

  // children 是将要会渲染的页面
  return children;
};

export default App;
