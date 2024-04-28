const jwt = require("jsonwebtoken");
require("dotenv/config");
const { v4: uuidv4 } = require("uuid");
const pool = require("../dbConnection");

const MYSECRETKEY = process.env.MYSECRETKEY;

/**/
//Register Function
const userRegister = async (req, res) => {
  const id = uuidv4();
  const { username, password, isadmin = false } = req.body;
  const data = {
    id,
    username,
    password,
    isadmin,
  };
  try {
    await pool.query(
      `INSERT INTO users(
            id, username, password, isadmin)
            VALUES ($1, $2, $3, $4);`,
      [id, username, password, isadmin]
    );
    res.status(201).json({
      message: "Usuario Creado Correctamente",
      data,
    });
  } catch (e) {
    console.log(e);
  }
};

//login function
const userLogin = async (req, res) => {
  const { username, password } = req.query;
  try {
    const users = await pool.query(`SELECT username, password, isadmin
        FROM users;`);
    const user = users.rows.find((u) => {
      return u.username === username && u.password === password;
    });

    if (user) {
      const token = jwt.sign(
        { id: user.id,username: user.username, isadmin: user.isadmin },
        MYSECRETKEY, 
        // {expiresIn: "30s"}
      );
      res.json({
        username: user.username,
        isadmin: user.isadmin,
        token,
      });
    } else {
      res.status(401).json("Username or Password Incorrect");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  userRegister,
  userLogin,
  MYSECRETKEY
};
