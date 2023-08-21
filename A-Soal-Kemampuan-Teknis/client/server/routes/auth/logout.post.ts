export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = event.context.user?.token ? { Authorization: `Bearer ${event.context.user?.token}` } : {};
  const { data } = await request.post("/logout", {}, { headers });

  deleteCookie(event, config.cookieName, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return {
    user: null,
  };
});
