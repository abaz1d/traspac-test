import { isUser } from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  try {
    if (!isUser(event.context.user)) {
      return createError({
        statusCode: 401,
        message: "You don't have the rights to access this resource",
      });
    }
    const body = await readBody(event);
    const id_pegawai = event.context.params?.id || (await readBody(event)).id;
    const old_picture = body?.data?.map((b: any) => String.fromCharCode(b)).join("") ?? "";
    const headers = event.context.user?.token ? { Authorization: `Bearer ${event.context.user?.token}` } : {};
    const { data } = await request.delete(`/pegawai/${id_pegawai}?gambar_lama=${old_picture}`, { headers });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    return data;
  } catch (error) {
    return createError({
      statusCode: 500,
      message: `${error}`,
    });
  }
});
