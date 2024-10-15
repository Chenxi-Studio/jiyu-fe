/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import Taro from "@tarojs/taro";
import {
  type AxiosAdapter,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

// 定义请求配置的接口
interface TaroConfig extends AxiosRequestConfig {}

// 定义响应的接口
interface TaroResponse extends AxiosResponse {}

const settle = (resolve, reject, res, failed: boolean = false) => {
  if (!failed) {
    resolve(res);
  } else {
    reject(res);
  }
};

export const taroAdapter: AxiosAdapter = async (config: TaroConfig) => {
  return await new Promise<TaroResponse>((resolve, reject) => {
    console.log(config.headers);

    Taro.request({
      ...config,
      url:
        config.baseURL +
        config.url +
        (config.params !== undefined ? "?" + config.params : ""),
      data: config.data,
      method: config.method,
      header: { ...config.headers },
      timeout: config.timeout,
      success: function (res) {
        const response = {
          ...res,
          status: res.statusCode,
          statusText: res.errMsg,
          headers: res.header,
          config,
          request: null,
        };

        settle(resolve, reject, response);
      },
      fail: function (res) {
        const response = {
          ...res,
          statusText: res.errMsg,
          config,
          request: null,
        };

        settle(resolve, reject, response, true);
      },
    });
  });
};
