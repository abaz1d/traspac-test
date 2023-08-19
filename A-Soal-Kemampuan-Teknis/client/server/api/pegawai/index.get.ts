import { isUser } from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  try {
    if (!isUser(event.context.user)) {
      return createError({
        statusCode: 401,
        message: "You don't have the rights to access this resource",
      });
    }
    const id_pegawai = event.context.params?.id ?? undefined;
    const { page_number, total_row_display } = getQuery(event);
    let response;
    if (!id_pegawai) {
      const { data } = await request.get(`/pegawai?page_number=${page_number}&total_row_display=${total_row_display}`);
      response = data;
    }

    return response;
  } catch (error) {
    return createError({
      statusCode: 500,
      message: `${error}`,
    });
  }
});
