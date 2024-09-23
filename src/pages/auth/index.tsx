import React, { useEffect, useState } from "react";
import { $User } from "@/store/user";
import { navigateTo } from "@/utils/navigator";
import { api } from "@/api";

const Auth = (): JSX.Element => {
  const stateCallback = $User.use((state) => state.state);
  const stateLocal = $User.use((state) => state.state_key);
  const scope = $User.use((state) => state.scope);
  const code = $User.use((state) => state.code);
  const clientId = $User.use((state) => state.clientId);
  const [msg, setMsg] = useState<string>("登录中");

  // 是否需要 只跳转一次呢

  if (stateCallback === undefined) {
    navigateTo("pages/login/index");
  }

  const handleTacAuth = async (): Promise<void> => {
    const res = await api.login.tac(clientId, code);
    if (res.error !== undefined && res.error !== null) {
      setMsg(res.error_description ?? "tac 出错");
    } else if (res.access_token !== undefined) {
      setMsg("tac 登陆成功");
      console.log(res.access_token);
      const info = await api.login.info(res.access_token);
      console.log(info);
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
      小程序验证中
      <div>stateCallback:{stateCallback}</div>
      <div>stateLocal:{stateLocal}</div>
      <div>scope:{scope}</div>
      <div>code:{code}</div>
      <div>clientId:{clientId}</div>
      <div className="text-xl">{msg}</div>
    </>
  );
};

export default Auth;
