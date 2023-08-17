import { isUser } from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  try {
    if (!isUser(event.context.user)) {
      return createError({
        statusCode: 401,
        message: "You don't have the rights to access this resource",
      });
    }
    const id_pegawai = event.context.params?.id || (await readBody(event)).id;

    const { data } = await request.get(`/pegawai/${id_pegawai}`);

    return data;
  } catch (error) {
    return error;
  }
});