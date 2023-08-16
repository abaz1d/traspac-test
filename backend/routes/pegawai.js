var express = require("express");
var router = express.Router();
const { isTokenValid, Response } = require("../helpers/util");

module.exports = function (db) {
  /* GET pegawai listing. */
  router.get("/", async function (req, res, next) {
    try {
      const totalRowDisplay = parseInt(req.query.total_row_display) || 10;
      const pageNumber = parseInt(req.query.page_number) || 1;

      const offset = (pageNumber - 1) * totalRowDisplay;

      const sql = `
      SELECT p.id_pegawai, p.nip, p.nama, p.tempat_lahir, p.tanggal_lahir, p.jenis_kelamin, p.golongan, p.eselon, p.jabatan, p.tempat_tugas, p.agama, p.unit_kerja, p.alamat, p.no_hp, p.npwp
      FROM pegawai p 
      ORDER BY id_pegawai ASC
      LIMIT $1 OFFSET $2
    `;

      const countSql = "SELECT COUNT(id_pegawai) FROM pegawai";

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
    } catch (err) {
      console.error(err);
      res.status(500).json(new Response(err, false));
    }
  });

  router.get("/:id", async function (req, res, next) {
    try {
      const { rows } = await db.query(
        "SELECT u.id_pegawai, u.email_pegawai,u.pegawainame  FROM pegawai u WHERE id_pegawai = $1",
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
