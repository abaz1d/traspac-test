<template>
  <div>
    <LoginForm @success="onLoginSuccess" />
  </div>
</template>

<script setup>
const currentUser = useAuthUser();
async function onLoginSuccess() {
  await navigateTo("/");
}
</script>
