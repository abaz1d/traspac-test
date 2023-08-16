var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const path = require("path");
const { isLoggedIn, Response } = require("../helpers/util");

/* GET home page. */
module.exports = function (db) {
  router.get("/", function (req, res, next) {
    res.render("index", { title: "Traspac API" });
  });

  router.post("/auth", async function (req, res) {
    try {
      const { input_user, password } = req.body;
      var data;
      db.query(
        "SELECT * FROM users WHERE email_user = $1",
        [input_user],
        (err, rows) => {
          if (err) {
            throw new Error(err);
          }
          data = rows;
          if (rows.rows.length == 0) {
            //check username
            console.log("check username");
            db.query(
              "SELECT * FROM users WHERE username = $1",
              [input_user],
              (err, rows2) => {
                if (err) {
                  throw new Error(err);
                }

                if (rows2.rows.length == 0) {
                  return res.json(
                    new Response(
                      { message: "unregistered e-mail/username" },
                      false
                    )
                  );
                }
                data = rows2;
                //console.log("data", data, rows2)
                bcrypt.compare(
                  password,
                  data.rows[0].password,
                  async function (err, result) {
                    if (err) throw new Error(err);

                    if (!result) {
                      return res.json(
                        new Response(
                          { message: "password doesn't match" },
                          false
                        )
                      );
                    }
                    //crete token
                    var token = jwt.sign(
                      {
                        userid: data.rows[0].id_user,
                        email: data.rows[0].email_user,
                      },
                      process.env.SECRETKEY
                    );
                    const { rows } = await db.query(
                      `UPDATE public.users SET token = $1 WHERE id_user = $2 RETURNING id_user,email_user, username, token`,
                      [token, data.rows[0].id_user]
                    );
                    console.log("sesion", req.session);
                    res.json(
                      new Response({
                        userid: rows[0].id_user,
                        email: rows[0].email_user,
                        username: rows[0].username,

                        token: rows[0].token,
                      })
                    );
                  }
                );
              }
            );
          } else {
            console.log("check email");
            bcrypt.compare(
              password,
              data.rows[0].password,
              async function (err, result) {
                if (err) throw new Error(err);

                if (!result) {
                  return res.json(
                    new Response({ message: "password doesn't match" }, false)
                  );
                }
                //crete token

                var token = jwt.sign(
                  {
                    userid: data.rows[0].id_user,
                    email: data.rows[0].email_user,
                  },
                  process.env.SECRETKEY
                );
                const { rows } = await db.query(
                  `UPDATE public.users SET token = $1 WHERE id_user = $2 RETURNING id_user,email_user, username, token`,
                  [token, data.rows[0].id_user]
                );
                res.json(
                  new Response({
                    userid: rows[0].id_user,
                    email: rows[0].email_user,
                    username: rows[0].username,

                    token: rows[0].token,
                  })
                );
              }
            );
          }
        }
      );
    } catch (error) {
      res.status(500).json(new Response(error, false));
    }
  });

  router.get("/logout", async function (req, res) {
    const token = req.headers.authorization;
    if (token && token.split(" ")[1]) {
      const pureToken = token.split(" ")[1];
      try {
        const result = jwt.verify(pureToken, process.env.SECRETKEY);
        const { rows } = await pool.query(
          "SELECT token FROM users WHERE id_user = $1 ORDER BY id_user ASC",
          [user.userid]
        );
        console.log(result);
        const user = rows[0];
        var tokenNow = null;
        const { data } = await db.query(
          `UPDATE public.users SET token = $1 WHERE id_user = $2 RETURNING *;`,
          [tokenNow, user.id_user]
        );
        res.json(new Response({ message: "sign out success" }, true));
      } catch (e) {
        res.json(new Response({ message: "token invalid" }, false));
      }
    } else {
      res.json(new Response({ message: "token invalid" }, false));
    }
  });

  return router;
};
