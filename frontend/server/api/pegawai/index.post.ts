import formidable from "formidable";
import { isUser } from "~~/server/models/user";

export default defineEventHandler(async (event) => {
  if (!isUser(event.context.user)) {
    return createError({
      statusCode: 401,
      message: "You don't have the rights to access this resource",
    });
  }
  console.log(" send");
  let body;
  const headers = getRequestHeaders(event);

  if (headers["content-type"]?.includes("multipart/form-data")) {
    body = await parseMultipartNodeRequest(event.node.req);
  } else {
    body = await readBody(event);
  }
  console.log(body);

  const {
    id_pegawai,
    nama_lengkap,
    nomer_pegawai,
    tempat_lahir,
    tgl_lahir,
    agama,
    jenis_kelamin,
    alamat_lengkap,
    jabatan,
    tempat_tugas,
    no_hp,
    unit_kerja,
    eslon,
    npwp,
    golongan,
    foto_profile,
    isEdit,
  } = body;

  return true;
});
function parseMultipartNodeRequest(req: any) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true });
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ ...fields, ...files });
    });
  });
}
