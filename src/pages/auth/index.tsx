import React, { useEffect, useRef, useState } from "react";
import { $User } from "@/store/user";
import { navigateTo, switchTab } from "@/utils/navigator";
import { api } from "@/api";
import Taro from "@tarojs/taro";
import { Loading } from "@nutui/icons-react-taro";
import { setDevJWT } from "@/utils/dev";
import { setJWT } from "@/utils/unit";
import { clearStore, getLoginStorage } from "@/utils/store";
import { Logo } from "@/components/logo";
import { twMerge } from "tailwind-merge";
import { InteractiveDiv } from "@/components/interactive-div";
import { AudioSrc } from "@/utils/audio";
import { pic2url } from "@/utils/type";
import { getThemeColor, getThemeNumber } from "@/utils/ui";
import { GlobalNotify } from "@/components/global-notify";
import { Page403 } from "@/components/403";
import { $UI } from "@/store/UI";

const baseUrl =
  "https://jiyu-1306028870.cos.ap-shanghai.myqcloud.com/wxapp/ui/";

const Auth = (): JSX.Element => {
  const stateCallback = $User.use((state) => state.state);
  const stateLocal = $User.use((state) => state.state_key);
  const scope = $User.use((state) => state.scope);
  const code = $User.use((state) => state.code);
  const clientId = $User.use((state) => state.clientId);
  const show403 = $UI.use((state) => state.show403);
  const [buttonContent, setButtonContent] = useState<string>("UIS 登录");
  const [wxButtonContent, setWxButtonContent] = useState<string>("微信登录");

  const [themeNumber] = useState(getThemeNumber());
  const backgroundImage = pic2url(
    baseUrl + themeNumber.toString() + "-background.jpg",
  );
  const lionImage = pic2url(baseUrl + themeNumber.toString() + "-lion.png");
  const buttonColor = getThemeColor();

  const debounce = useRef<boolean>(false);

  const handleTacAuth = async (): Promise<void> => {
    try {
      const loginRes = await Taro.login(); // wx login
      // // console.log(loginRes);
      if (loginRes.errMsg.endsWith("ok")) {
        const tacLoginRes = await api.login.tac(code, loginRes.code);
        // const wxLoginRes = await api.login.wxLogin(loginRes.code);
        // // console.log("tacLoginRes", tacLoginRes);
        await setJWT(tacLoginRes.jwt);
        Taro.setStorageSync("jwt", tacLoginRes.jwt);
        switchTab("pages/router/index", true);
      } else {
        throw Error(`登录失败 ${loginRes.errMsg}`);
      }
    } catch (error) {
      setButtonContent("登录失败请联系管理员");
      // // console.log(error);
    }
  };

  const handleWxAuth = async (): Promise<void> => {
    try {
      const loginRes = await Taro.login(); // wx login
      // // console.log(loginRes);
      if (loginRes.errMsg.endsWith("ok")) {
        const wxLoginRes = await api.login.wxLogin(loginRes.code);
        // // console.log("wxLoginRes", wxLoginRes);
        if (wxLoginRes.isSuccess) {
          await setJWT(wxLoginRes.jwt);
          Taro.setStorageSync("jwt", wxLoginRes.jwt);
          switchTab("pages/router/index", true);
        } else {
          throw Error(`登录失败`);
        }
      } else {
        throw Error(`登录失败 ${loginRes.errMsg}`);
      }
    } catch (error) {
      setWxButtonContent("登录失败请使用 UIS 登录");
      debounce.current = false;
      // // console.log(error);
    }
  };

  const handleStorageLogin = async (jwt: string): Promise<void> => {
    setWxButtonContent("登录中");
    setButtonContent("已登录UIS");
    await setJWT(jwt);
    setTimeout(() => {
      switchTab("pages/router/index", true);
    }, 1500);
  };

  useEffect(() => {
    const jwt = getLoginStorage();
    if (jwt !== undefined) {
      debounce.current = true;
      void handleStorageLogin(jwt);
    }
  }, []);

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
    switchTab("pages/router/index", true);
  };

  return (
    <div>
      <GlobalNotify />
      {show403 && <Page403 />}
      <div
        className="fixed top-0 left-0 w-[100vw] h-[100vh] -z-10 bg-contain"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      />
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] -z-10 flex items-center justify-center">
        <div
          className="bg-contain bg-no-repeat w-[65%] h-[55%]"
          style={{ backgroundImage: `url("${lionImage}")` }}
        ></div>
      </div>
      <InteractiveDiv
        onClickVibrate
        // onClickSound
        // onClickSoundSrc={AudioSrc.login}
        onClick={() => {
          if (debounce.current) return;
          debounce.current = true;
          clearStore();
          setButtonContent("登录中");
          navigateTo("pages/login/index");
        }}
        className="fixed bottom-[12%] px-8 w-[calc(100%-128rpx)]"
      >
        <div
          className={twMerge(
            "flex items-center justify-center px-2 py-3 border-[6rpx] border-solid rounded-full font-bold gap-3 text-[#000] shadow-[0_8rpx]",
            buttonContent === "登录中"
              ? "shadow-[inset_2rpx_5rpx_8rpx_rgba(0,0,0,0.4)]"
              : "shadow-[0_8rpx]",
          )}
          style={{
            backgroundColor: buttonColor,
          }}
        >
          {buttonContent === "登录中" && <Loading size={20} />}
          {buttonContent}
        </div>
      </InteractiveDiv>
      <InteractiveDiv
        onClickVibrate
        // onClickSound
        // onClickSoundSrc={AudioSrc.login}
        onClick={() => {
          if (debounce.current) return;
          debounce.current = true;
          clearStore();
          setWxButtonContent("登录中");
          void handleWxAuth();
        }}
        className="fixed bottom-[22%] px-8 w-[calc(100%-128rpx)]"
      >
        <div
          className={twMerge(
            "flex items-center justify-center px-2 py-3 border-[6rpx] border-solid rounded-full font-bold gap-3 text-[#000]",
            wxButtonContent === "登录中"
              ? "shadow-[inset_2rpx_5rpx_8rpx_rgba(0,0,0,0.4)]"
              : "shadow-[0_8rpx]",
          )}
          style={{
            backgroundColor: buttonColor,
          }}
        >
          {wxButtonContent === "登录中" && <Loading size={20} />}
          {wxButtonContent}
        </div>
      </InteractiveDiv>
      {/* <div
        onClick={() => {
          clearStore();
          void devLogin("stu");
        }}
        className="fixed bottom-[44%] px-8 w-[calc(100%-128rpx)]"
      >
        <div className="flex items-center justify-center px-2 py-3 border-[6rpx] border-solid rounded-full font-bold gap-3 bg-white">
          Stu 测试登录
        </div>
      </div> */}
      {/* <div
        onClick={() => {
          clearStore();
          void devLogin("admin");
        }}
        className="fixed bottom-[36%] px-8 w-[calc(100%-128rpx)]"
      >
        <div className="flex items-center justify-center px-2 py-3 border-[6rpx] border-solid rounded-full font-bold gap-3 bg-white">
          Admin 测试登录
        </div>
      </div> */}
      {/* <div
        className={twMerge("fixed bottom-[32%] px-8 w-[calc(100%-128rpx)]")}
        onClick={() => {
          clearStore();
          void devLogin("Ultradamin");
        }}
      >
        <div
          className="flex items-center justify-center px-2 py-3 border-[6rpx] border-solid rounded-full font-bold gap-3 text-[#000] shadow-[0_8rpx]"
          style={{
            backgroundColor: buttonColor,
          }}
        >
          UltraAdmin 测试登录
        </div>
      </div> */}
      {/* <div
        className={twMerge("fixed bottom-[32%] px-8 w-[calc(100%-128rpx)]")}
        onClick={() => {
          clearStore();
          navigateTo("pages/module/detail/index?id=106");
        }}
      >
        <div
          className="flex items-center justify-center px-2 py-3 border-[6rpx] border-solid rounded-full font-bold gap-3 text-[#000] shadow-[0_8rpx]"
          style={{
            backgroundColor: buttonColor,
          }}
        >
          无登录 Detail
        </div>
      </div>{" "} */}

      <div className="fixed bottom-[5%] px-8 w-[calc(100%-128rpx)] flex items-center justify-center">
        <Logo />
      </div>
    </div>
  );
};

export default Auth;
