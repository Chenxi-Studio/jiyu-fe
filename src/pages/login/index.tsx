import React from "react";
import { WebView } from "@tarojs/components";
import { callbackUrl, clientId } from "@/types/uis";
import { $User } from "@/store/user";

const Login = (): JSX.Element => {
  const uisState = $User.use((state) => state.state_key);

  return (
    <>
      <WebView
        src={`https://tac.fudan.edu.cn/oauth2/authorize.act?client_id=${clientId}&response_type=code&state=${uisState}&redirect_uri=${callbackUrl}`}
        onMessage={(e) => {
          console.log(e.detail.data);
          if (e.detail.data[0] !== undefined) {
            $User.update("login callback", (draft) => {
              draft.state = e.detail.data[0].state;
              draft.code = e.detail.data[0].code;
              draft.scope = e.detail.data[0].scope;
              draft.clientId = e.detail.data[0].clientId;
            });
          }
        }}
      >
        Login
      </WebView>
    </>
  );
};

export default Login;
