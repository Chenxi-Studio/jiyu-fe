import axios from "axios";
import { taroAdapter } from "./adapter";

const instance = axios.create({
  baseURL: "http://124.220.2.31:3000/api",
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
    if (res.config.responseType === "blob") {
      return res; // 返回整个响应以便下载
    }
    return res.data;
  },
  async (err) => {
    if (err.response.status === 401 || err.response.status === 422) {
      // TODO: 鉴权
    }
    return await Promise.reject(err);
  },
);

export default instance;
