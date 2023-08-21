import { isUser } from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  try {
    if (!isUser(event.context.user)) {
      return createError({
        statusCode: 401,
        message: "You don't have the rights to access this resource",
      });
    }
    interface PhotoProfile {
      type: string;
      data: number[];
    }
    let gambar_lama = null;
    const getImgUrl = async (fotoProfile: PhotoProfile) => {
      if (fotoProfile) {
        try {
          var buff = fotoProfile.data.map((b: any) => String.fromCharCode(b)).join("");
          let image = new URL(`${useRuntimeConfig().public.apiBase}/images/${buff}`).href;
          const response = await fetch(image, { method: "HEAD" });
          if (response.ok) {
            gambar_lama = buff;
            return image;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error checking image URL:", error);
          return null;
        }
      }
    };
    const id_pegawai = event.context.params?.id || (await readBody(event)).id;
    const headers = event.context.user?.token ? { Authorization: `Bearer ${event.context.user?.token}` } : {};

    const { data } = await request.get(`/pegawai/${id_pegawai}`, { headers });

    if (data.data?.foto_profil != null) {
      data.data.foto_profil = await getImgUrl(data.data?.foto_profil);
    }
    data.data.gambar_lama = gambar_lama;

    return data;
  } catch (error) {
    return createError({
      statusCode: 500,
      message: `${error}`,
    });
  }
});
