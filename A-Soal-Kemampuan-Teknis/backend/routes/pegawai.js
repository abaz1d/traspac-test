var express = require("express");
var router = express.Router();
const fs = require("fs");
var path = require("path");
const { isTokenValid, Response } = require("../helpers/util");

module.exports = function (db) {
  router.get("/", isTokenValid, async function (req, res, next) {
    try {
      // const token = req.headers.authorization;
      // console.log("token", token);
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
          p.foto_profil,
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
          LEFT JOIN agama a ON p.agama = a.id_agama
          LEFT JOIN eselon e ON p.eselon = e.id_eselon
          LEFT JOIN golongan g ON p.golongan = g.id_golongan
          LEFT JOIN jabatan j ON p.jabatan = j.id_jabatan
          LEFT JOIN unit_kerja u ON p.unit_kerja = u.id_uker
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
      const insertFields = [];
      const values = [];

      for (const fieldName in req.body) {
        const value = req.body[fieldName];

        if (value !== "" && value !== "null" && value !== "undefined") {
          insertFields.push(fieldName);
          values.push(value);
        }
      }

      if (req.files?.foto_profil) {
        const gambar = req.files.foto_profil;
        let filename = `FP-${Date.now()}-${gambar.name}`;
        const uploadPath = path.join(
          __dirname,
          "/../public",
          "images",
          filename
        );

        await gambar.mv(uploadPath);
        insertFields.push("foto_profil");
        values.push(filename);
      }

      if (insertFields.length > 0) {
        const query = `
          INSERT INTO pegawai (${insertFields.join(", ")})
          VALUES (${values.map((_, index) => "$" + (index + 1)).join(", ")})
          `;
        db.query(query, values, (err, data) => {
          if (err) throw new Error(err);
          res.json(new Response({ message: "success add" }, true));
        });
      } else {
        res.json(new Response({ message: "body empty" }, false));
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(new Response(err, false));
    }
  });

  router.put("/:id", async function (req, res, next) {
    try {
      const updateFields = [];
      const values = [];
      const excludedFields = ["foto_profil", "gambar_lama"];

      for (const [fieldName, value] of Object.entries(req.body)) {
        if (
          value !== "" &&
          value !== "null" &&
          value !== "undefined" &&
          !excludedFields.includes(fieldName)
        ) {
          updateFields.push(`${fieldName} = $${values.length + 1}`);
          values.push(value);
        }
      }

      if (req.files?.foto_profil) {
        const { gambar_lama } = req.body;
        const gambar = req.files.foto_profil;
        const filename = `FP-${Date.now()}-${gambar.name}`;
        const uploadPath = path.join(
          __dirname,
          "/../public",
          "images",
          filename
        );
        const deletePath = path.join(
          __dirname,
          "..",
          "public",
          "images",
          gambar_lama
        );

        await new Promise((resolve, reject) => {
          gambar.mv(uploadPath, (err) => {
            if (err) reject(err);
            resolve();
          });
        });
        if (fs.existsSync(deletePath)) {
          await new Promise((resolve, reject) => {
            fs.unlink(deletePath, (err) => {
              if (err) reject(err);
              resolve();
            });
          });
        }

        updateFields.push("foto_profil = $" + (values.length + 1));
        values.push(filename);
      }

      if (updateFields.length > 0) {
        values.push(req.params.id); // Menambahkan ID ke parameter

        const query = `
          UPDATE pegawai
          SET ${updateFields.join(", ")}
          WHERE id_pegawai = $${values.length}
        `;
        db.query(query, values, (err, data) => {
          if (err) throw new Error(err);
          res.json(new Response({ message: "success update" }, true));
        });
      } else {
        res.json(new Response({ message: "no changes" }, false));
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(new Response(err, false));
    }
  });

  router.delete("/:id", async function (req, res, next) {
    try {
      const { gambar_lama } = req.query;
      const { rows } = await db.query(
        "DELETE FROM pegawai WHERE id_pegawai = $1 RETURNING foto_profil",
        [req.params.id]
      );
      if (
        rows.length > 0 &&
        rows[0]?.foto_profil !== null &&
        gambar_lama !== ""
      ) {
        let deletePath = path.join(
          __dirname,
          "..",
          "public",
          "images",
          gambar_lama
        );
        if (fs.existsSync(deletePath)) {
          await new Promise((resolve, reject) => {
            fs.unlink(deletePath, (err) => {
              if (err) reject(err);
              resolve();
            });
          });
        }
      }
      res.json(new Response({ message: "Success delete pegawai" }, true));
    } catch (err) {
      console.error(err);
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
