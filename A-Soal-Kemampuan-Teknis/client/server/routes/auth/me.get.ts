export default defineEventHandler(async (event) => {
  const userLogin = event.context.user;

  if (!userLogin) {
    return {
      user: null,
    };
  }

  return { user: userLogin };
});
