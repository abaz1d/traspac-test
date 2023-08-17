<template>
  <div
    :data-theme="themeStore.theme.dark ? THEMES.DARK : THEMES.LIGHT"
    class="bg-gradient-to-r from-base-100 to-neutral"
  >
    <div class="max-w-8xl mx-auto pb-8 pl-8 pr-8 pt-4">
      <NuxtLoadingIndicator />
      <Header />
      <NuxtPage />
      <NuxtLayout />
    </div>
  </div>
</template>

<script setup lang="ts">
import { THEMES, useThemeStore } from "./stores/theme";
useHead({
  title: "Daftar Pegawai",
  titleTemplate: "%s - Daftar Pegawai",
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { hid: "description", name: "description", content: "Aplikasi Pengelola Pegawai dengan Nuxt 3" },
    { name: "format-detection", content: "telephone=no" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});
const themeStore = useThemeStore();
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
