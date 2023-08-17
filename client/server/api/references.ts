import { isUser } from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  try {
    if (!isUser(event.context.user)) {
      return createError({
        statusCode: 401,
        message: "You don't have the rights to access this resource",
      });
    }
    const { tableName } = getQuery(event);

    if (!tableName) {
      return createError({
        statusCode: 401,
        message: "You don't have table query request",
      });
    }

    const { data } = await request.get(`/pegawai/?table_name=${tableName}`);

    if (data.success) {
      return data.data;
    } else {
      createError({
        statusCode: 500,
        message: "fail get references",
      });
    }
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      message: `${error}`,
    });
  }
});
