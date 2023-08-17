import { isUser } from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  if (!isUser(event.context.user)) {
    return createError({
      statusCode: 401,
      message: "You don't have the rights to access this resource",
    });
  }

  const headers = { "Content-Type": "multipart/form-data" };
  const dataBuffer = await readMultipartFormData(event);

  if (dataBuffer) {
    const targetName = "id_pegawai";
    const targetData = dataBuffer.find((item) => item.name === targetName);

    const formData = new FormData();

    dataBuffer.forEach((item) => {
      if (item.name == "foto_profil" && item.filename && item.type) {
        const blob = new Blob([item.data], { type: item.type });
        formData.append(item.name, blob, item.filename);
      } else {
        const value = item.data.toString("utf-8");
        formData.append(item.name, value);
      }
    });

    if (targetData) {
      const idPegawaiValue = targetData.data.toString("utf-8");
      let response;
      if (idPegawaiValue != "null") {
        let { data } = await request.put(`/pegawai/${idPegawaiValue}`, formData, headers);
        response = data;
      } else {
        let { data } = await request.post("/pegawai", formData, headers);
        response = data;
      }
      return response;
    }
  }
});
