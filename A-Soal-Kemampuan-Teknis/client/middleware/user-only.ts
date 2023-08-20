export default defineNuxtRouteMiddleware(async (event) => {
  const user = useAuthUser();

  if (!user.value) return navigateTo({ name: "login" });
});
