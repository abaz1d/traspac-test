<template>
  <div>
    <LoginForm @success="onLoginSuccess" />
  </div>
</template>

<script setup>
async function onLoginSuccess() {
  await navigateTo("/");
}
</script>
