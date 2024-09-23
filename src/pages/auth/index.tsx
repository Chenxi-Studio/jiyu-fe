import React, { useEffect, useState } from "react";
import { $User } from "@/store/user";
import { navigateTo, switchTab } from "@/utils/navigator";
import { api } from "@/api";
import Taro from "@tarojs/taro";
import { Loading } from "@nutui/icons-react-taro";

const Auth = (): JSX.Element => {
  const stateCallback = $User.use((state) => state.state);
  const stateLocal = $User.use((state) => state.state_key);
  const scope = $User.use((state) => state.scope);
  const code = $User.use((state) => state.code);
  const clientId = $User.use((state) => state.clientId);
  const [msg, setMsg] = useState<string>("登录中");
  const [buttonContent, setButtonContent] = useState<string>("UIS 登录");

  const handleTacAuth = async (): Promise<void> => {
    try {
      const res = await api.login.tac(clientId, code);
      if (
        res.error !== undefined &&
        res.error !== null &&
        res.error_description !== undefined
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setMsg(res.error_description);
      } else if (res.access_token !== undefined) {
        setMsg("tac 登陆成功");
        console.log(res.access_token);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const info = await api.login.info(res.access_token);
        console.log(info);
        const loginRes = await Taro.login();
        console.log(loginRes);
        if (loginRes.errMsg.endsWith("ok")) {
          console.log("success");
          switchTab("pages/home/index");
        } else {
          throw Error(`登录失败 ${loginRes.errMsg}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (stateCallback !== undefined && stateCallback !== stateLocal) {
      setMsg("非法请求: CSRF");
      return;
    }
    if (stateCallback === stateLocal) {
      void handleTacAuth();
    }
  }, [code, clientId, scope, stateCallback, stateLocal]);

  return (
    <>
      <div
        onClick={() => {
          setButtonContent("登录中");
          navigateTo("pages/login/index");
        }}
        className="fixed bottom-[12%] px-8 w-[calc(100%-128rpx)]"
      >
        <div className="flex items-center justify-center px-2 py-3 border-[6rpx] border-solid rounded-full font-bold gap-3">
          {buttonContent === "登录中" && <Loading size={20} />}
          {buttonContent}
        </div>
      </div>
    </>
  );
};

export default Auth;
