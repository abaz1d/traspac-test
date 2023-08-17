// https://nuxt.com/docs/api/configuration/nuxt-config
const ONE_DAY = 60 * 60 * 24 * 1000;
const ONE_WEEK = ONE_DAY * 7;

export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  modules: ["@pinia/nuxt", "nuxt-icon", "@nuxtjs/tailwindcss"],
  imports: {
    dirs: ["./stores"],
  },
  runtimeConfig: {
    apiBase: process.env.NUXT_PUBLIC_API_BASE,
    cookieName: process.env.COOKIE_NAME || "__traspacsession",
    cookieSecret: process.env.COOKIE_SECRET || "traspac",
    cookieExpires: parseInt(process.env.COOKIE_REMEMBER_ME_EXPIRES || ONE_DAY.toString(), 10), // 1 day
    cookieRememberMeExpires: parseInt(process.env.COOKIE_REMEMBER_ME_EXPIRES || ONE_WEEK.toString(), 10), // 7 days
  },

  pinia: {
    autoImports: [
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  css: ["@/assets/css/main.css"],
});
