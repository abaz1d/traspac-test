export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  await request.get("/logout");

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
