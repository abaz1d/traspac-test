import axios from "axios";

export const request = axios.create({
  baseURL: useRuntimeConfig().apiBase,
  timeout: 3000,
});

// request.interceptors.request.use(function (config) {
//   const token = user?.token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   } else {
//     config.headers.Authorization = "";
//   }
//   return config;
// });
