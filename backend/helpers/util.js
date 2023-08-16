const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

class Response {
  constructor(data, success = true) {
    this.success = success;
    this.data = data;
  }
}

const isTokenValid = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log("token", token);
  //next()
  if (token && token.split(" ")[1]) {
    const pureToken = token.split(" ")[1];

    try {
      const user = jwt.verify(pureToken, process.env.SECRETKEY);
      const { rows } = await pool.query(
        "SELECT token FROM users WHERE id_user = $1 ORDER BY id_user ASC",
        [user.userid]
      );

      req.user = rows[0];
      console.log("req", rows, req.user.token == pureToken);
      if (req.user.token == pureToken) {
        next();
      } else {
        res.json(new Response({ message: "token invalid" }, false));
      }
    } catch (e) {
      console.error(e);
      console.log("gagal verify");
      res.json(new Response({ message: "token invalid" }, false));
    }
  } else {
    res.json(new Response({ message: "token invalid" }, false));
  }
};

module.exports = { pool, Response, isTokenValid };
