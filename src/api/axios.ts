import axios from "axios";
import { convertDates } from "@/utils/unit";
import { $UI } from "@/store/UI";
import { taroAdapter } from "./adapter";

export const tacInstance = axios.create({
  baseURL: "https://tac.fudan.edu.cn",
  timeout: 100000,
  adapter: taroAdapter,
});

export const baseURL = "http://124.220.2.31:3000/api";

const instance = axios.create({
  baseURL,
  timeout: 100000,
  adapter: taroAdapter,
});

instance.defaults.headers.get["Content-Type"] = "application/json";
instance.defaults.headers.get.Accept = "*/*";
// TODO: token
// instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`;

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  async (err) => {
    return await Promise.reject(err);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    console.log("res", res, convertDates(res.data));
    if (res.status < 200 || res.status >= 400) {
      $UI.update("axios err", (draft) => {
        draft.notifyMsg = res.data.message;
        draft.showNotify = true;
      });
      console.log(res.data.message, $UI.get());

      return Promise.reject(res.data);
    }

    if (res.config.responseType === "blob") {
      return res; // 返回整个响应以便下载
    }
    return convertDates(res.data);
  },
  async (err) => {
    // TODO: 鉴权

    return await Promise.reject(err);
  },
);

export default instance;
