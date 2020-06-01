import Vue from 'vue'
import axios from "axios";
const ipaddress = modeUrlObj[process.env.NODE_ENV];
const service = axios.create({
  baseURL: ipaddress.baseURL, // api的base_url
  timeout: TIME_OUT, // 请求超时时间
});
const HTTP_CODE_MAP = {
  400: "请求错误",
  401: "未授权，请登录", // clear session
  403: "拒绝访问",
  404: "请求地址出错",
  405: "不允许的请求方法",
  408: "请求超时",
  500: "服务未实现",
  502: "网关错误",
  503: "服务不可用",
  504: "网关超时",
};
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// request 拦截器
service.interceptors.request.use(
  (config) => {
    // 这里可以自定义一些config 配置

    return config;
  },
  (error) => {
    //  这里处理一些请求出错的情况

    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 这里处理一些response 正常放回时的逻辑

    return res;
  },
  (error) => {
    // 这里处理一些response 出错时的逻辑
    if (error && error.response) {
      const message = HTTP_CODE_MAP[error.response.status];
      if (message) {
        error.message = message;
      }
    }
    tryHideFullScreenLoading();
    Vue.prototype.$message({
      message: `服务器响应失败,错误信息: ${error.message}`,
      type: "error",
    });
    return Promise.reject(error);
  }
);

export default service;
