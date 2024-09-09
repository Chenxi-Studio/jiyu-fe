import React, { useEffect } from "react";
import { $User } from "@/store/user";
import { navigateTo } from "@/utils/navigator";
import axios from "axios";
import { taroAdapter } from "@/api/adapter";

const Auth = (): JSX.Element => {
  const stateCallback = $User.use((state) => state.state);
  const stateLocal = $User.use((state) => state.state_key);
  const scope = $User.use((state) => state.scope);
  const code = $User.use((state) => state.code);
  const clientId = $User.use((state) => state.clientId);

  // 是否需要 只跳转一次呢

  if (stateCallback === undefined) {
    navigateTo("pages/login/index");
  }

  useEffect(() => {
    void axios
      .create({
        baseURL: "",
        timeout: 100000,
        adapter: taroAdapter,
      })
      .get(
        `https://tac.fudan.edu.cn/oauth2/token.act?client_id=${clientId}&client_secret=8FHFDEySu6zGRW9jG5hc&grant_type=authorization_code&code=${code}`,
      )
      .then((res) => {
        console.log(res);
      });
  }, [scope, code, clientId]);

  return (
    <>
      小程序验证中
      <div>stateCallback:{stateCallback}</div>
      <div>stateLocal:{stateLocal}</div>
      <div>scope:{scope}</div>
      <div>code:{code}</div>
      <div>clientId:{clientId}</div>
      <div className="text-9xl">
        {stateCallback === stateLocal
          ? "前端成功UIS了 还需要后端二次确认"
          : "登录中"}
      </div>
    </>
  );
};

export default Auth;
