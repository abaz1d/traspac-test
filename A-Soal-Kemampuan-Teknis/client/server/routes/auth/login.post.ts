export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string; password: string; rememberMe: boolean }>(event);

  const { email, password, rememberMe } = body;

  const { data } = await request.post("auth", {
    input_user: email,
    password,
  });
  if (data.success) {
    const user = data.data;

    const config = useRuntimeConfig();

    const session = serialize(user);
    const signedSession = sign(session, config.cookieSecret);

    setCookie(event, config.cookieName, signedSession, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: false, // for development uncomment this
      // secure: process.env.NODE_ENV === "production", // for production to deployment mode uncomment the following line
      expires: rememberMe
        ? new Date(Date.now() + config.cookieRememberMeExpires)
        : new Date(Date.now() + config.cookieExpires),
    });

    return {
      user: data.data,
    };
  }
});
