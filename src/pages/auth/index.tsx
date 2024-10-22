import React, { useEffect, useState } from "react";
import { $User } from "@/store/user";
import { navigateTo, switchTab } from "@/utils/navigator";
import { api } from "@/api";
import Taro from "@tarojs/taro";
import { Loading } from "@nutui/icons-react-taro";
import { setDevJWT } from "@/utils/dev";
import { setJWT } from "@/utils/unit";

const Auth = (): JSX.Element => {
  const stateCallback = $User.use((state) => state.state);
  const stateLocal = $User.use((state) => state.state_key);
  const scope = $User.use((state) => state.scope);
  const code = $User.use((state) => state.code);
  const clientId = $User.use((state) => state.clientId);
  const [buttonContent, setButtonContent] = useState<string>("UIS 登录");
  const [wxButtonContent, setWxButtonContent] = useState<string>("微信登录");

  const handleTacAuth = async (): Promise<void> => {
    try {
      const loginRes = await Taro.login(); // wx login
      console.log(loginRes);
      if (loginRes.errMsg.endsWith("ok")) {
        const tacLoginRes = await api.login.tac(code, loginRes.code);
        // const wxLoginRes = await api.login.wxLogin(loginRes.code);
        console.log("tacLoginRes", tacLoginRes);
        await setJWT(tacLoginRes.jwt);
        switchTab("pages/home/index");
      } else {
        throw Error(`登录失败 ${loginRes.errMsg}`);
      }
    } catch (error) {
      setButtonContent("登录失败请联系管理员");
      console.log(error);
    }
  };

  const handleWxAuth = async (): Promise<void> => {
    try {
      const loginRes = await Taro.login(); // wx login
      console.log(loginRes);
      if (loginRes.errMsg.endsWith("ok")) {
        const wxLoginRes = await api.login.wxLogin(loginRes.code);
        console.log("wxLoginRes", wxLoginRes);
        if (wxLoginRes.isSuccess) {
          await setJWT(wxLoginRes.jwt);
          switchTab("pages/home/index");
        } else {
          throw Error(`登录失败`);
        }
      } else {
        throw Error(`登录失败 ${loginRes.errMsg}`);
      }
    } catch (error) {
      setWxButtonContent("登录失败请使用 UIS 登录");
      console.log(error);
    }
  };

  useEffect(() => {
    if (stateCallback !== undefined && stateCallback !== stateLocal) {
      setButtonContent("非法请求: CSRF");
      return;
    }
    if (stateCallback === stateLocal) {
      void handleTacAuth();
    }
  }, [code, clientId, scope, stateCallback, stateLocal]);

  const devLogin = async (
    type: "stu" | "admin" | "Ultradamin",
  ): Promise<void> => {
    await setDevJWT(type);
    switchTab("pages/home/index");
  };

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
      <div
        onClick={() => {
          setWxButtonContent("登录中");
          void handleWxAuth();
        }}
        className="fixed bottom-[20%] px-8 w-[calc(100%-128rpx)]"
      >
        <div className="flex items-center justify-center px-2 py-3 border-[6rpx] border-solid rounded-full font-bold gap-3">
          {wxButtonContent === "登录中" && <Loading size={20} />}
          {wxButtonContent}
        </div>
      </div>
      <div
        onClick={() => {
          void devLogin("stu");
        }}
        className="fixed bottom-[44%] px-8 w-[calc(100%-128rpx)]"
      >
        <div className="flex items-center justify-center px-2 py-3 border-[6rpx] border-solid rounded-full font-bold gap-3">
          Stu 测试登录
        </div>
      </div>
      <div
        onClick={() => {
          void devLogin("admin");
        }}
        className="fixed bottom-[36%] px-8 w-[calc(100%-128rpx)]"
      >
        <div className="flex items-center justify-center px-2 py-3 border-[6rpx] border-solid rounded-full font-bold gap-3">
          Admin 测试登录
        </div>
      </div>
      <div
        onClick={() => {
          void devLogin("Ultradamin");
        }}
        className="fixed bottom-[28%] px-8 w-[calc(100%-128rpx)]"
      >
        <div className="flex items-center justify-center px-2 py-3 border-[6rpx] border-solid rounded-full font-bold gap-3">
          UltraAdmin 测试登录
        </div>
      </div>
    </>
  );
};

export default Auth;
