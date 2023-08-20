import axios from "axios";
const config = useRuntimeConfig();

export const request = axios.create({
  baseURL: config.public.apiBase,
  timeout: 3000,
});
