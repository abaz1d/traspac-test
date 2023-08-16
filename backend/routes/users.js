var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { isLoggedIn, Response } = require("../helpers/util");

module.exports = function (db) {
  /* GET users listing. */
  router.get("/", async function (req, res, next) {
    try {
      const totalRowDisplay = parseInt(req.query.total_row_display) || 10;
      const pageNumber = parseInt(req.query.page_number) || 1;

      const offset = (pageNumber - 1) * totalRowDisplay;

      const sql = `
      SELECT u.id_user, u.email_user, u.username 
      FROM users u 
      ORDER BY id_user ASC
      LIMIT $1 OFFSET $2
    `;

      const countSql = "SELECT COUNT(*) FROM users";

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
        "SELECT u.id_user, u.email_user,u.username  FROM users u WHERE id_user = $1",
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
      const { email_user, username, password, role } = req.body;
      // db.query(
      //   "SELECT id_user FROM users WHERE email_user = $1",
      //   [email_user],
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
      //       "SELECT id_user FROM users WHERE username = $1",
      //       [username],
      //       (err, user) => {
      //         if (err)
      //           return res.json(
      //             new Response({ message: "failed compare username" }, false)
      //           );
      //         if (user.rows.length > 0)
      //           return res.json(
      //             new Response(
      //               { message: "username has been registered" },
      //               false
      //             )
      //           );

      //         //udah dihash di depan
      //         // bcrypt.hash(password, saltRounds, async function (err, hash) {
      //         //   if (err) return res.json(new Response({ message: "failed hash" }, false))
      //         db.query(
      //           "INSERT INTO users(email_user,username,password,role) VALUES ($1, $2, $3, $4)",
      //           [email_user, username, password, role],
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
      // const { email_user, username, password, role } = req.body;
      // await db.query(
      //   `UPDATE users SET
      // email_user = $1,
      // username = $2,
      // password = $3,
      // role = $4
      // WHERE id_user = $5`,
      //   [email_user, username, password, role, req.params.id]
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
      // await db.query("DELETE FROM users WHERE id_user = $1", [req.params.id]);
      console.log("delete", req.params.id);
      res.json(new Response({ message: "Succes delete user" }, true));
    } catch (err) {
      res
        .status(500)
        .json(
          new Response(
            { message: "failed delete user" + err.toString() },
            false
          )
        );
    }
  });

  return router;
};
