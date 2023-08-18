import axios from "axios";
const config = useRuntimeConfig();

export const request = axios.create({
  baseURL: config.public.apiBase,
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
