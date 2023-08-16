import axios from "axios";

export const request = axios.create({
  baseURL: useRuntimeConfig().API_BASE_URL,
  timeout: 3000,
});
