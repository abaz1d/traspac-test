var express = require("express");
var router = express.Router();
const { isTokenValid, Response } = require("../helpers/util");

module.exports = function (db) {
  /* GET pegawai listing. */
  router.get("/", async function (req, res, next) {
    try {
      const { table_name } = req.query;
      if (table_name) {
        let query;
        switch (table_name) {
          case "agama":
            query = `SELECT id_agama AS id, nama_agama AS nama FROM agama`;
            break;
          case "eselon":
            query = `SELECT id_eselon AS id, nama_eselon AS nama FROM eselon`;
            break;
          case "golongan":
            query = `SELECT id_golongan AS id, nama_golongan AS nama FROM golongan`;
            break;
          case "jabatan":
            query = `SELECT id_jabatan AS id, nama_jabatan AS nama FROM jabatan`;
            break;
          case "unit_kerja":
            query = `SELECT id_uker AS id, nama_unit AS nama FROM unit_kerja`;
            break;
          default:
            res.status(400).json({ message: "Invalid table name" });
            return;
        }

        const { rows } = await db.query(query);
        res.json(new Response(rows));
      } else {
        const totalRowDisplay = parseInt(req.query.total_row_display) || 10;
        const pageNumber = parseInt(req.query.page_number) || 1;

        const offset = (pageNumber - 1) * totalRowDisplay;

        const sql = `
        SELECT
        p.id_pegawai,
        p.nip,
        p.nama,
        p.tempat_lahir,
        TO_CHAR(p.tanggal_lahir, 'yyyy-MM-dd') AS tanggal_lahir,
        p.jenis_kelamin,
        g.nama_golongan,
        e.nama_eselon,
        j.nama_jabatan,
        p.tempat_tugas,
        a.nama_agama,
        u.nama_unit,
        p.alamat,
        p.no_hp,
        p.npwp
    FROM
        pegawai p
        JOIN agama a ON p.agama = a.id_agama
        JOIN eselon e ON p.eselon = e.id_eselon
        JOIN golongan g ON p.golongan = g.id_golongan
        JOIN jabatan j ON p.jabatan = j.id_jabatan
        JOIN unit_kerja u ON p.unit_kerja = u.id_uker
    ORDER BY
        p.id_pegawai ASC
    LIMIT $1 OFFSET $2;
    
    `;

        const countSql = `SELECT COUNT(p.id_pegawai)
      FROM pegawai p
      JOIN agama a ON p.agama = a.id_agama
      JOIN eselon e ON p.eselon = e.id_eselon
      JOIN golongan g ON p.golongan = g.id_golongan
      JOIN jabatan j ON p.jabatan = j.id_jabatan
      JOIN unit_kerja u ON p.unit_kerja = u.id_uker`;

        const result = await Promise.all([
          db.query(sql, [totalRowDisplay, offset]),
          db.query(countSql),
        ]);

        const rows = result[0].rows;
        const totalRows = parseInt(result[1].rows[0].count);

        const totalPages = Math.ceil(totalRows / totalRowDisplay);
        res.json(
          new Response({
            rows,
            total_pages: totalPages,
          })
        );
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(new Response(err, false));
    }
  });

  router.get("/:id", async function (req, res, next) {
    try {
      const { rows } = await db.query(
        "SELECT u.*, TO_CHAR(u.tanggal_lahir, 'yyyy-MM-dd') AS tanggal_lahir  FROM pegawai u WHERE id_pegawai = $1",
        [req.params.id]
      );

      res.json(new Response(rows[0]));
    } catch (err) {
      console.error(err);
      res.status(500).json(new Response(err, false));
    }
  });

  router.post("/", async function (req, res, next) {
    try {
      const { email_pegawai, pegawainame, password, role } = req.body;
      // db.query(
      //   "SELECT id_pegawai FROM pegawai WHERE email_pegawai = $1",
      //   [email_pegawai],
      //   (err, email) => {
      //     if (err)
      //       return res.json(
      //         new Response({ message: "failed compare emaile" }, false)
      //       );
      //     if (email.rows.length > 0)
      //       return res.json(
      //         new Response({ message: "e-mail has been registered" }, false)
      //       );

      //     db.query(
      //       "SELECT id_pegawai FROM pegawai WHERE pegawainame = $1",
      //       [pegawainame],
      //       (err, pegawai) => {
      //         if (err)
      //           return res.json(
      //             new Response({ message: "failed compare pegawainame" }, false)
      //           );
      //         if (pegawai.rows.length > 0)
      //           return res.json(
      //             new Response(
      //               { message: "pegawainame has been registered" },
      //               false
      //             )
      //           );

      //         //udah dihash di depan
      //         // bcrypt.hash(password, saltRounds, async function (err, hash) {
      //         //   if (err) return res.json(new Response({ message: "failed hash" }, false))
      //         db.query(
      //           "INSERT INTO pegawai(email_pegawai,pegawainame,password,role) VALUES ($1, $2, $3, $4)",
      //           [email_pegawai, pegawainame, password, role],
      //           (err, rows) => {
      //             if (err)
      //               return res.json(
      //                 new Response({ message: "failed insert" }, false)
      //               );
      //             res.json(new Response({ message: "success insert" }, true));
      //           }
      //         );
      //         // })
      //       }
      //     );
      //   }
      // );

      console.log("post add", req.body, req.body.foto_profile, req.files);
      res.json(new Response({ message: "success add" }, true));
    } catch (err) {
      console.error(err);
      res.status(500).json(new Response(err, false));
    }
  });

  router.put("/:id", async function (req, res, next) {
    try {
      // const { email_pegawai, pegawainame, password, role } = req.body;
      // await db.query(
      //   `UPDATE pegawai SET
      // email_pegawai = $1,
      // pegawainame = $2,
      // password = $3,
      // role = $4
      // WHERE id_pegawai = $5`,
      //   [email_pegawai, pegawainame, password, role, req.params.id]
      // );

      console.log("put update", req.body, req.files, req.params.id);
      res.json(new Response({ message: "success update" }, true));
    } catch (err) {
      console.error(err);
      res.status(500).json(new Response(err, false));
    }
  });

  router.delete("/:id", async function (req, res, next) {
    try {
      // await db.query("DELETE FROM pegawai WHERE id_pegawai = $1", [req.params.id]);
      console.log("delete", req.params.id);
      res.json(new Response({ message: "Succes delete pegawai" }, true));
    } catch (err) {
      res
        .status(500)
        .json(
          new Response(
            { message: "failed delete pegawai" + err.toString() },
            false
          )
        );
    }
  });

  return router;
};
