export default defineEventHandler(async (event) => {
  const user = await getUserFromSession(event);
  if (user) event.context.user = user;
  request.interceptors.request.use(function (config) {
    const token = user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers.Authorization = "";
    }
    return config;
  });
});
