import axios from 'axios';

// 创建一个Axios实例
const api = axios.create({
  // baseURL: "/api/DemoTool",
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 6000 // 请求超时时间
});

// 请求拦截器
api.interceptors.request.use(config => {
  // 在请求发送之前，可以对config进行处理，例如添加请求头、请求参数处理等
  return config;
}, error => {
  // 请求发送失败，处理错误
  return Promise.reject(error);
});

// 响应拦截器
api.interceptors.response.use(response => {
  // 在接收到响应数据之前，可以对response进行处理，例如解析响应数据、错误处理等
  return response;
}, error => {
  // 响应数据处理失败，处理错误
  return Promise.reject(error);
});

export default api;