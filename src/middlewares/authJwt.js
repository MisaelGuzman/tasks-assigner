const jwt = require("jsonwebtoken");
const  config  = require("../config.js");
const pool = require("../dbConnection.js");

//verify token
const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  try {
    if (!token) return res.status(402).json("No token provided!");

    const decoded = jwt.verify(token, config.MYSECRETKEY);
    req.user_id = decoded.id;
    console.log(decoded);

    const user = await pool.query(
      `
      SELECT * FROM users
      WHERE id= $1;`,
      [req.user_id]
    );

    if (!user) res.status(404).json({ message: "No user found" });
    req.user = user.rows;

    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

//admin
const isAdmin = async (req, res, next) => {
  try {
    const user = req.user.find((u) => (u.id = req.user_id));

    const isAdmin = await pool.query(
      `
      SELECT isadmin FROM users
      WHERE id= $1;
      `,
      [req.user_id]
    );
    if (isAdmin.rows[0].isadmin === true) {
      next();
      return;
    }

    return res.status(403).json({ message: "requer admin role" });
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};
