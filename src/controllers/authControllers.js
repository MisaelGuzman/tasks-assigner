const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const pool = require("../dbConnection");
require("dotenv/config");

const config = require('../config.js');
const { encrypt, compare } = require("../helpers/bcryptHelper.js");

//SignUp
const signUp = async (req, res) => {
  const id = uuidv4();
  const { username, password, isadmin = false } = req.body;
  const encryptPass = await encrypt(password);
  const data = {
    id,
    username,
    encryptPass,
    isadmin,
  };

  try {

    await pool.query(
      `INSERT INTO users(
            id, username, password, isadmin)
            VALUES ($1, $2, $3, $4);`,
      [id, username, encryptPass, isadmin]
    );

    const token = jwt.sign({id: id, isadmin: isadmin}, config.MYSECRETKEY,  {
      expiresIn: '24h'
    })

    res.status(201).json({
      message: "User Created",
      token
    });


  } catch (e) {
    console.log(e);
  }
};

//login function
const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {

    const users = await pool.query(`SELECT id, username, password, isadmin
        FROM users;`);

    const user = users.rows.find((u) => {
      return u.username === username;
    });

    const passValidation = await compare(password, user.password) ;

    if(!passValidation) return res.status(401).json({token: null, message: "Invalid Password"});

       const token = jwt.sign(
        { id: user.id, isadmin: user.isadmin },
        config.MYSECRETKEY, 
        {expiresIn: "24h"}
      );

      res.json({
        token,
      });

  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  signUp,
  signIn,
};
